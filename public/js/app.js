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
  const data = new FormData(this)
  $.ajax("/api/login", {
    method: "post",
    processData: false,
    contentType: false,
    data

  }).done((profile) => {
    console.log(profile)
    showCurrentProfile(profile)
  }).fail((response) => {
    console.log(response)
  })




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

//dummy image will need if the image is raw
function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = resolve
    reader.readAsDataURL(file)
  })
}

//SECOND STAGE
$("#second_stage_form").on("submit", async function (event) {
  event.preventDefault()
  const data = {
    ...accountData,

    ...formToObject(this), image: this.image.files[0]
  }
  data.fixed = Boolean(parseInt(data.fixed))
  if (data.image) userImage = await readImage(data.image).then((event) => {
    return event.target.result

  })



  console.log(data)
  if (inputMap.UserLocation) {

    data.location = inputMap.UserLocation
    const form = new FormData()
    Object.entries(data).forEach(element => {
      form.append(element[0], element[1])
    });
    $.ajax("/api", {
      method: "post",
      data: form,
      processData: false,
      contentType: false,


    }
    ).done((data) => {
      console.log(data)


    }).fail((fail) => {
      console.log(fail)

    })
    showCurrentProfile(data)
    $.get("/api").done((fail) => {
      console.log(fail)
      renderMatchList(fail)
    }).fail((data) => {
      console.log(data)
    })

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
  $("#cur_name").text(profile.name)
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

  //dummy image info (profile. image)
  $("#cur_image").attr("src", userImage)


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