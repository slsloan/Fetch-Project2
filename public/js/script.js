// Make sure we wait to attach our handlers until the DOM is fully loaded
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
            window.location.href = "/dogs"
        }).catch(err => console.log(err))
    }

    const fetchDogs = () => {
        $.ajax({
            method: "GET",
            url: "/api"
        }).then(dogs => {

            // append new node for each dog
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
                    long
                } = dog

                var contentString =
                    '<div id="content">' +
                    '<img src="' +
                    'https://placehold.it/300x250"' +
                    'width="300" height="250">' +
                    '<h1 id="title" style="font-size: 1.5rem;">' +
                    `${first_name}, ${last_name}` +
                    "</h1>" +
                    '<p id="body">' +
                    `<h5 class="card-title"></h5>
                    <p class="card-text">Breed: ${breed}</p>
                    <p class="card-text">Age: ${age}</p>
                    <p class="card-text">Gender: ${gender}</p>
                    <p class="card-text">Fixed: ${fixed}</p>
                    <p class="card-text">Interests: ${interests}</p>`
                "</p>" +
                    "</div>";

                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });

                var marker = new google.maps.Marker({
                    position: { lat, lng: long },
                    map: map,
                    title: "Fetch - Find Your Dogs Match",
                });
                marker.addListener("click", function () {
                    infowindow.open(map, marker);
                });

                // format dog as bootstrap card
                const card = `
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${first_name}, ${last_name}</h5>
                                <p class="card-text">Breed: ${breed}</p>
                                <p class="card-text">Age: ${age}</p>
                                <p class="card-text">Gender: ${gender}</p>
                                <p class="card-text">Fixed: ${fixed}</p>
                                <p class="card-text">Interests: ${interests}</p>
                            </div>
                        </div>
                    </div>
                `

                // append card to dom
                $("#dogProfiles").append(card)
            })
        }).catch(err => console.log(err))
    }

    // handle change event for my first name input
    $("#dog_name").on("change", event => {
        // destructure event
        first_name = event.target.value

    })
    // handle change event for my last name input
    $("dog_last_name").on("change", event => {
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

        if (!inputMap.UserLocation) return alert('loc required;')


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
            long: inputMap.UserLocation.lng

            //image: $("#image")[0].files[0]
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
    map = new google.maps.Map(document.getElementById("map"), {
        center: uluru,
        zoom: 12,
    });



    // end of .then()
    // });
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
$(document).ready(function () {
    initMap();
    $(".tabs").tabs();
    $(".profile-tabs").tabs();
    $(".sidenav").sidenav();
});
