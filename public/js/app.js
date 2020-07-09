function initMap() {
  $.ajax("/", {
    method: "GET",
  }).then(function (res) {
    console.log("success!");

    //  Example Location
    var uluru = { lat: 39.7555, lng: -105.2211 };
    // Map default View
    var map = new google.maps.Map(document.getElementById("map"), {
      center: uluru,
      zoom: 12,
    });

    var contentString =
      '<div id="content">' +
      '<img src="' +
      res.body.image +
      '" width="300" height="250">' +
      '<h1 id="title">' +
      res.body.title +
      "</h1>" +
      "<br />" +
      '<p id="body">' +
      res.body.body +
      "</p>" +
      "</div>";

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      title: "Fetch - Find Your Dogs Match",
    });
    marker.addListener("click", function () {
      infowindow.open(map, marker);
    });

    // end of .then()
  });
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
