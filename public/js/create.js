// Make sure we wait to attach our handlers until the DOM is fully loaded
let inputMap
let imageChanged = false // keeps track of whether or not a new image has been uploaded or not by the user

const initMap = () => {
    inputMap = new google.maps.Map(document.getElementById("inputMap"), {
        center: { lat: 39.7555, lng: -105.2211 },
        zoom: 12,
    });

    // Example Marker
    let userMarker
    google.maps.event.addListener(inputMap, "click", (event) => {
        inputMap.UserLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        if (!userMarker) {
            userMarker = new google.maps.Marker({ position: inputMap.UserLocation, map: inputMap })
        }
        else {
            userMarker.setPosition(inputMap.UserLocation)
        }
    })
}


const initUpload = () => {
    const API_KEY = "ACx1BamWQaWOwZsvMywt8z";
    const client = filestack.init(API_KEY);
    const options = {
        transformations: { // forces users to crop their image into a circle
            circle: true,
            force: true
        },
        onUploadDone: (file) => {
            $("#profilePreview").attr("src", file.filesUploaded[0].url);
            imageChanged = true;
        }
    };
    $("#uploadImage").on("click", () => {
        client.picker(options).open()
    })
}

// once it finishes loading the page
$(document).ready(() => {
    $('select').formSelect()
    $(".sidenav").sidenav();
    $(".modal").modal();
    initMap();
    initUpload();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            if (!inputMap) inputMap = {

            }
            inputMap.UserLocation = { lat: position.coords.latitude, lng: position.coords.longitude }

        }, () => {
            M.toast({ html: "location required" })

        })
    }
    $("#map-btn").on("click", () => $(".modal").modal("open"))

    const createDog = (payload) => {
        $.ajax({
            method: "POST",
            url: "/api",
            data: payload
        }).then(() => {
            // after the post requests
        }).catch(err => console.log(err))
    }

    // handle submit event
    $("#submit").on("click", (event) => {
        // prevent default
        event.preventDefault()
        let imageURL = $("#profilePreview").attr("src");

        if (!imageChanged) return (M.toast({
            html: "Image Required"
        }))
        if (!inputMap.UserLocation) return (M.toast({
            html: "location required"
        }))


        // create payload
        const payload = {
            first_name: $("#firstName").val(),
            last_name: $("#lastName").val(),
            breed: $("#breed").val(),
            gender: $("gender").val(),
            age: $("#age").text(),
            fixed: $("#fixed").val() != 0 ? true : false,
            interests: $("#interests").val(),
            latitude: inputMap.UserLocation.lat,
            longitude: inputMap.UserLocation.lng,
            interests: $("#interests").val(),
            image: imageURL
        }

        // create dog
        createDog(payload)
    })
})