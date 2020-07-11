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
