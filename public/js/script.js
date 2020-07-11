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
            $("#firstName").val("")
            $("#lastName").val("")
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
            console.log(dogs)

            // append new node for each dog
            dogs.forEach(dog => {
                console.log(dog)
                // destructure dog
                const {
                    first_name,
                    last_name,
                    breed,
                    age,
                    gender,
                    fixed,
                    interests
                } = dog

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
                console.log(card)

                // append card to dom
                $("#dogProfiles").append(card)
            })
        }).catch(err => console.log(err))
    }

    // handle change event for my first name input
    $("#firstName").on("change", event => {
        // destructure event
        first_name = event.target.value

        console.log(first_name)
    })
    // handle change event for my last name input
    $("#lastName").on("change", event => {
        // destructure event
        last_name = event.target.value

        console.log(last_name)
    })
    // handle change event for my breed input
    $("#breed").on("change", event => {
        // destructure event
        breed = event.target.value

        console.log(breed)
    })
    // handle change event for my age input
    $("#age").on("change", event => {
        // destructure event
        age = event.target.value

        console.log(age)
    })
    // handle change event for my gender input
    $("#gender").on("change", event => {
        // destructure event
        gender = event.target.value

        console.log(gender)
    })
    // handle change event for my fixed input
    $("#fixed").on("change", event => {
        // destructure event
        fixed = event.target.value

        console.log(fixed)
    })
    // handle change event for my interests input
    $("#interests").on("change", event => {
        // destructure event
        interests = event.target.value

        console.log(interests)
    })

    // handle submit event
    $("form").on("submit", event => {
        // prevent default
        event.preventDefault()

        // create payload
        const payload = {
            first_name: first_name,
            last_name: last_name,
            breed: breed,
            gender: gender,
            age: age,
            fixed: fixed,
            interests: interests
        }

        // create dog
        createDog(payload)
    })

    // fetch dogs
    fetchDogs()
})
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
  var map = new google.maps.Map(document.getElementById("map"), {
    center: uluru,
    zoom: 12,
  });

  for (var i = 0; i < locations.length; i++) {
    var contentString =
      '<div id="content">' +
      '<img src="' +
      'https://placehold.it/300x250"' +
      'width="300" height="250">' +
      '<h1 id="title" style="font-size: 1.5rem;">' +
      "Hello Map" +
      "</h1>" +
      '<p id="body">' +
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus a ab recusandae perferendis impedit corporis consectetur repellendus nihil maiores velit quis, eligendi incidunt aspernatur, adipisci ipsam numquam earum molestias blanditiis fugiat consequatur officiis necessitatibus quas rerum? Dignissimos dolor quae necessitatibus, mollitia corporis id ipsa ratione? Veniam, consectetur labore! Dolores, quia." +
      "</p>" +
      "</div>";

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    var marker = new google.maps.Marker({
      position: { lat: locations[i].lat, lng: locations[i].lng },
      map: map,
      title: "Fetch - Find Your Dogs Match",
    });
    marker.addListener("click", function () {
      infowindow.open(map, marker);
    });
  }
  // end of .then()
  // });
}
$(document).ready(function () {
  initMap();
  $(".tabs").tabs();
  $(".profile-tabs").tabs();
  $(".sidenav").sidenav();
});
$("#loginform").on("submit", function (event) {
  console.log("working?");
  event.preventDefault();
  const data = $(this).serializeArray();
  console.log(data);
  return false;
});
