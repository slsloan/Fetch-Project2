let inputMap
let imageChanged = false // keeps track of whether or not a new image has been uploaded or not by the user

function initMap() {
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

// when the image upload button is pushed
function initUpload() {
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
    $("#map-btn").on("click", () => $(".modal").modal("open"))
    initMap();
    initUpload();

    // get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, deniedPosition);
    } else {
        deniedPosition()
    }

    // in case we fail to get the user's position
    function deniedPosition() {
        M.toast({ html: "location not found" })
        let position = { // set an arbitrary default location in Longmont CO
            coords: {
                latitude: 39.7555,
                longitude: -105.2211
            }
        }
        showPosition(position)
    }

    // set the user's location
    function showPosition(position) {
        inputMap.UserLocation = { lat: position.coords.latitude, lng: position.coords.longitude }
    }

    // handle submit event
    $("#submit").on("click", (event) => {
        event.preventDefault()

        // Make sure we have the necessary fields
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
            gender: $("#gender :selected").text(),
            age: $("#age :selected").text(),
            fixed: $("#fixed").val() != 0 ? true : false,
            interests: $("#interests").val(),
            latitude: inputMap.UserLocation.lat,
            longitude: inputMap.UserLocation.lng,
            interests: $("#interests").val(),
            image: $("#profilePreview").attr("src")
        }

        // create dog
        createDog(payload)
    })

    function createDog(payload) {
        $.ajax({
            method: "POST",
            url: "/api",
            data: payload
        })
            .then(() => {
                location.href = '/'
                console.log('redirecting...');
            })
            .catch(err => {
                console.log(err)
            })
    }
})