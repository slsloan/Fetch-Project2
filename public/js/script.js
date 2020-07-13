// Make sure we wait to attach our handlers until the DOM is fully loaded
$(".modal").modal()

let allDogs = []
let markers = []
$(function () {
    let first_name = ''
    let last_name = ''
    let breed = ''
    let gender = ''
    let age = ''
    let fixed = ''
    let interests = ''

    const createDog = payload => {
        $.ajax({
            method: "POST",
            url: "/api",
            data: payload
        }).then(() => {
            // reset form inputs
            $("#dog_name").val("")
            $("dog_last_name").val("")
            $("#breed").val("")
            $("#age").val("")
            $("#gender").val("")
            $("#fixed").val("")
            $("#interests").val("")

            // navigate to "/dogs"
            $('.tabs').tabs('select', 'index');
            window.location.href = "/dogs"

        }).catch(err => console.log(err))
    }

    const fetchDogs = () => {
        $.ajax({
            method: "GET",
            url: "/api"
        }).then(dogs => {
            console.log(dogs)
            markers.forEach((marker) => marker.setMap(null))
            markers = []
            allDogs = dogs// append new node for each dog
            dogs.forEach(dog => {
                // destructure dog
                const {
                    first_name,
                    last_name,
                    breed,
                    age,
                    gender,
                    fixed,
                    interests,
                    lat,
                    long,
                    image,
                    id,
                } = dog

                var contentString =
                    '<div id="content">' +
                    '<img src="' +
                    `${image}  "` +
                    'width="100" height="75">' +
                    `<h1 onclick="handleInfoClick(${id})" style="font-size: 1.5rem;">` +
                    `${first_name}, ${last_name}` +
                    "</h1>" +


                    "</div>";

                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });

                var marker = new google.maps.Marker({
                    position: { lat, lng: long },
                    map: map,
                    title: "Fetch - Find Your Dogs Match",

                });
                markers.push(marker)
                marker.addListener("click", function () {
                    infowindow.open(map, marker);
                });

                // format dog as bootstrap card
                if (markers.length) {
                    map.setCenter(markers[0].getPosition())

                }
            })
        }).catch(err => console.log(err))
    }

    // handle change event for my first name input
    $("#firstName").on("change", event => {
        // destructure event
        first_name = event.target.value

    })
    // handle change event for my last name input
    $("#lastName").on("change", event => {
        // destructure event
        last_name = event.target.value

    })
    // handle change event for my breed input
    $("#breed").on("change", event => {
        // destructure event
        breed = event.target.value

    })
    // handle change event for my age input
    $("#age").on("change", event => {
        // destructure event
        age = event.target.value

    })
    // handle change event for my gender input
    $("#gender").on("change", event => {
        // destructure event
        gender = event.target.value

    })
    // handle change event for my fixed input
    $("#fixed").on("change", event => {
        // destructure event
        fixed = parseFloat(event.target.value)

    })
    // handle change event for my interests input
    $("#interests").on("change", event => {
        // destructure event
        interests = event.target.value

    })

    // handle submit event
    $("form").on("submit", event => {
        // prevent default
        event.preventDefault()
        if (!imageURL) return (M.toast({
            html: "Image Required"
        }))
        if (!inputMap.UserLocation) return (M.toast({
            html: "location required"
        }))





        // create payload
        const payload = {
            first_name: first_name,
            last_name: last_name,
            breed: breed,
            gender: gender,
            age: age,
            fixed: fixed,
            interests: interests,
            lat: inputMap.UserLocation.lat,
            long: inputMap.UserLocation.lng,

            image: imageURL
        }

        // create dog
        createDog(payload)
    })

    // fetch dogs
    fetchDogs()
})
let map
function initMap() {
    // $.ajax("/", {
    //   method: "GET",
    // }).then(function (res) {
    //   console.log("success!");

    //  Example Location
    var uluru = { lat: 39.7555, lng: -105.2211 };

    var locations = [
        { lat: 39.7455, lng: -105.2112 },
        { lat: 39.7655, lng: -105.2311 },
        { lat: 39.7555, lng: -105.2211 },
    ];
    // Map default View
    if ($("#map").length) {

        map = new google.maps.Map(document.getElementById("map"), {
            center: uluru,
            zoom: 12,
        });
    }


    // end of .then()
    // });
} if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        if (!inputMap) inputMap = {

        }
        inputMap.UserLocation = { lat: position.coords.latitude, lng: position.coords.longitude }

    }, () => {
        prompt("location required")

    })


}
let inputMap
if ($("#inputMap").length) {
    console.log("working")
    inputMap = new google.maps.Map(document.getElementById("inputMap"), {
        center: { lat: 39.7555, lng: -105.2211 },
        zoom: 12,
    });
    // Example Marker
    ;
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
let mainTabs
$(document).ready(function () {
    initMap();
    mainTabs = $(".tabs").tabs();

    $(".sidenav").sidenav();
    $(".modal").modal()
});
//todo remove
let imageURL
const API_KEY = "ACx1BamWQaWOwZsvMywt8z";
const client = filestack.init(API_KEY);
const options = {
    transformations: { // forces users to crop their image into a circle
        circle: true,
        force: true
    },
    onUploadDone: (file) => {
        $("#profilePreview").attr("src", file.filesUploaded[0].url);
        console.log($("#profilePreview"));
        console.log(file.filesUploaded[0].filename);
        console.log(file.filesUploaded[0].url);
        imageURL = file.filesUploaded[0].url;
        console.log(file.filesUploaded[0].size);
    }
};
$("#uploadImage").on("click", () => {
    client.picker(options).open()
})


$("#map-back").on("click", () => {
    $('.tabs').tabs("select", "map-tab");


})

function showCurrentProfile(profile) {
    console.log(profile)
    $('.tabs').tabs("select", "profile");
    $("#cur_gender").text(profile.gender)
    $("#breed").text(profile.breed)
    $("#cur_fixed").text(profile.fixed)
    $("#cur_interests").text(profile.interests)
    $("#cur_age").text(profile.age)
    $("#cur_location").text(profile.lat + " " + profile.long)
    $("cur_dog_name").text(profile.first_name + " " + profile.last_name)

    //dummy image info (profile. image)
    $("#cur_image").attr("src", profile.image)


} function handleInfoClick(id) {
    const dog = allDogs.find((dog) => id == dog.id)
    showCurrentProfile(dog)
}

// form select options 
$(document).ready(function () {
    $('select').formSelect()
})

