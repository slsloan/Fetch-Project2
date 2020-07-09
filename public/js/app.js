function initMap() {
  //  Example Location
  var uluru = { lat: 39.7555, lng: -105.2211 };
  // Map default View
  var map = new google.maps.Map(document.getElementById("map"), {
    center: uluru,
    zoom: 12,
  });
  // Example Marker
  var marker = new google.maps.Marker({ position: uluru, map: map });
  google.maps.event.addListener(map, "click", (event) => {
    console.log(event.latLng.lat(), event.latLng.lng())

  })
  var inputMap = new google.maps.Map(document.getElementById("inputMap"), {
    center: uluru,
    zoom: 12,
  });
  // Example Marker
  var marker = new google.maps.Marker({ position: uluru, map: inputMap });
  google.maps.event.addListener(inputMap, "click", (event) => {
    console.log(event.latLng.lat(), event.latLng.lng())

  })
}
let profileTabs
$(document).ready(function () {
  initMap()
  $('.tabs').tabs();
  profileTabs = $('.profile-tabs').tabs();
  $('.sidenav').sidenav();
  $('select').formSelect();

});
$("#loginform").on("submit", function (event) {
  console.log("working?")
  event.preventDefault()
  const data = $(this).serializeArray()
  console.log(data)
  showCurrentProfile()



  return (false)
})
let accountData
$("#new_account_form").on("submit", function (event) {
  console.log("working?")
  event.preventDefault()
  accountData = formToObject(this)
  // profileTabs.select("second_stage")
  $('.profile-tabs').tabs("select", "second_stage");
  $('.profile-tabs').css("display", "none")

  return (false)
})

$("#second_stage_form").on("submit", function (event) {
  console.log("working?")
  event.preventDefault()
  const data = {
    ...accountData,
    ...formToObject(this)
  }
  console.log(data)
  showCurrentProfile(data)
  return (false)
})


function showCurrentProfile(profile) {
  $('.profile-tabs').css("display", "none")
  $('.profile-tabs').tabs("select", "current_profile");
  $("a[href='#profile']").text("profile")
  $("#logoutbutton").css("display", "")
  $("#cur_dog_name").text(profile.dog_name)
  $("#cur_dog_gender").text(profile.dog_gender)
  $("#cur_dog_breed").text(profile.dog_breed)
  $("#cur_fixed").text(profile.fixed)
  $("#cur_about_your_dog").text(profile.about_your_dog)
  $("#cur_education").text(profile.education)
  $("#cur_playful").text(profile.playful)
  $("#cur_terrain").text(profile.terrain)
  $("#cur_pace").text(profile.pace)
  $("#cur_distance").text(profile.distance)
  $("#cur_c_or_a").text(profile.c_or_a)
}
$("#logoutbutton").on("click", () => {

  $('.profile-tabs').css("display", "")
  $('.profile-tabs').tabs("select", "login");
  $("a[href='#profile']").text("log in")
  $("#logoutbutton").css("display", "none")



})

function formToObject(form) {
  const Data = $(form).serializeArray()
  const object = Data.reduce((object, pair) => {
    object[pair.name] = pair.value
    return (object)

  }, {


  })
  return (object)
}