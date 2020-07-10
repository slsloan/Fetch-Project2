let inputMap
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
  inputMap = new google.maps.Map(document.getElementById("inputMap"), {
    center: uluru,
    zoom: 12,
  });
  // Example Marker
  ;
  let userMarker
  google.maps.event.addListener(inputMap, "click", (event) => {
    console.log(event.latLng.lat(), event.latLng.lng())
    inputMap.UserLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() }
    if (!userMarker) {
      userMarker = new google.maps.Marker({ position: inputMap.UserLocation, map: inputMap })

    }
    else {
      userMarker.setPosition(inputMap.UserLocation)


    }
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
  event.preventDefault()
  accountData = formToObject(this)
  // profileTabs.select("second_stage")
  accountData.age = parseInt(accountData.age)
  $('.profile-tabs').tabs("select", "second_stage");
  $('.profile-tabs').css("display", "none")
  return (false)
})

$("#second_stage_form").on("submit", function (event) {
  event.preventDefault()
  const data = {
    ...accountData,

    ...formToObject(this), image: this.image.files
  }
  data.fixed = Boolean(parseInt(data.fixed))

  console.log(data)
  if (inputMap.UserLocation) {

    data.location = inputMap.UserLocation
    showCurrentProfile(data)

  }
  else {
    alert("user location required")
  }
  return (false)
})


/*module.exports = function (sequelize, DataTypes) {
  var Dog = sequelize.define("Dog", {
    image: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    breed: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    fixed: DataTypes.BOOLEAN,
    location: DataTypes.INTEGER,
    interests: DataTypes.TEXT
});
return Dog;
};*/

function showCurrentProfile(profile) {
  $('.profile-tabs').css("display", "none")
  $('.profile-tabs').tabs("select", "current_profile");
  $("a[href='#profile']").text("profile")
  $("#logoutbutton").css("display", "")
  $("#cur_dog_name").text(profile.dog_name)
  $("#cur_gender").text(profile.gender)
  $("#breed").text(profile.breed)
  $("#cur_fixed").text(profile.fixed)
  $("#cur_interests").text(profile.interests)
  $("#cur_education").text(profile.education)
  $("#cur_playful").text(profile.playful)
  $("#cur_terrain").text(profile.terrain)
  $("#cur_pace").text(profile.pace)
  $("#cur_distance").text(profile.distance)
  $("#cur_c_or_a").text(profile.c_or_a)
  $("#cur_age").text(profile.age)
  $("#cur_location").text(profile.location)

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


// html template for sniffind distance
function renderMatchList(matches) {
  const matchTab = $("#match")
  matchTab.html("<ul class='collection'></ul > ")
  for (let i = 0; i < matches.length; i++) {

    matchTab.find(".collection").append($(`<li data-id="${matches[i].id}" class="collection-item avatar">
    <img src="${matches[i].image}" alt="" class="circle">
      <span class="title">${matches[i].name}</span>

      <div>speed<p class="speed">${matches[i].speed} </p>
      </div>
      <div>terrain<p class="terrain"> ${matches[i].terrain}</p>

      </div>
</li> `))
  }
} renderMatchList([{ name: "fido" }, { name: "steve" }])