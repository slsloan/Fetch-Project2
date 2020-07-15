// Make sure we wait to attach our handlers until the DOM is fully loaded
let map
let allDogs = []
let markers = []

const fetchDogs = () => {
    $.ajax({
        method: "GET",
        url: "/api"
    }).then(dogs => {
        markers.forEach((marker) => marker.setMap(null))
        markers = []
        allDogs = dogs// append new node for each dog
        dogs.forEach(dog => {
            // destructure dog
            const { first_name, last_name, latitude, longitude, image, interests, id } = dog

            var contentString =
                '<div id="content">' +
                '<img src="' +
                `${image}  "` +
                'width="100" height="75">' +
                `<h1 class="dog-title" onclick="handleInfoClick(${id})" style="font-size: 1.5rem;">` +
                `${first_name}, ${last_name}` +
                "</h1>" +
                "</div>";

            var infowindow = new google.maps.InfoWindow({
                content: contentString,
            });

            var marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
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

$("#map-back").on("click", () => {
    $('.tabs').tabs("select", "map-tab");
})

function showCurrentProfile(profile) {
    $('.tabs').tabs("select", "profile");
    $("#cur_gender").text(profile.gender)
    $("#cur_breed").text(profile.breed)
    $("#cur_fixed").text(profile.fixed)
    $("#cur_interests").text(profile.interests)
    $("#cur_age").text(profile.age)
    $("#cur_location").text(profile.lat + " " + profile.long)
    $("#cur_dog_name").text(profile.first_name + " " + profile.last_name)

    //dummy image info (profile. image)
    $("#cur_image").attr("src", profile.image)
}

function handleInfoClick(id) {
    const dog = allDogs.find((dog) => id == dog.id)
    showCurrentProfile(dog)
}

$(document).ready(() => {
    $(".tabs").tabs()
    $(".sidenav").sidenav()
    $(".modal").modal()

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

    function showPosition(position) {
        let uluru = { lat: position.coords.latitude, lng: position.coords.longitude }

        map = new google.maps.Map(document.getElementById("map"), {
            center: uluru,
            zoom: 13,
        });

        // populate the map with the dogs in our database
        fetchDogs()
    }
});