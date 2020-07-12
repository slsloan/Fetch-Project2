
$(document).ready(function () {
  // initMap();
  $('select').formSelect(); // necessary for materialize drop down sliders

  // this will call the file-stack picker modal
  $("#uploadImage").on("click", function (event) {
    client.picker(options).open();
  });

  // this will grap your location and return a latitude and longitude
  $("#locationButton").on("click", function (event) {
    function getLocation(position) {
      $("#longitude").val(position.coords.longitude);
      $("#latitude").val(position.coords.latitude);
      M.updateTextFields();
    }

    navigator.geolocation.getCurrentPosition(getLocation);
  })

  // this will post the info to the database via a route call
  $("#submitButton").on("click", function (event) {
    $.ajax("/api", {
      method: "POST",
      data: jQuery.param({
        name: $("#name").val(),
        breed: $("#breed").val(),
        gender: $("#gender").val(),
        longitude: parseFloat($("#longitude").val()),
        latitude: parseFloat($("#latitude").val()),
        profile_url: $("#profilePreview").attr("src")
      })
    })
      .then((res) => {

      })
  })
});


// File-stack image upload specifications
const API_KEY = "ACx1BamWQaWOwZsvMywt8z";
const client = filestack.init(API_KEY);
const options = {
  transformations: { // forces users to crop their image into a circle
    circle: true,
    force: true
  },
  onUploadDone: (file) => {
    $("#profilePreview").attr("src", file.filesUploaded[0].url);
  }
};


// console.log(file.filesUploaded[0].filename);
// console.log(file.filesUploaded[0].url);
// console.log(file.filesUploaded[0].size);

// $("#loginform").on("submit", function (event) {
//   event.preventDefault();
//   const data = $(this).serializeArray();
//   console.log(data);
//   return false;
// });

  // $.ajax("/", {
  //   method: "GET",
  // }).then(function (res) {
  //   console.log("success!");
