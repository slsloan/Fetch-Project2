// Make sure we wait to attach our handlers until the DOM is fully loaded

let inputMap;
const initMap = () => {
  inputMap = new google.maps.Map(document.getElementById("inputMap"), {
    center: { lat: 39.7555, lng: -105.2211 },
    zoom: 12,
  });
  // Example Marker
  let userMarker;
  google.maps.event.addListener(
    inputMap,
    "click",
    (event) => {
      inputMap.UserLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      $("#uploadImage").on("click", () => {
        client.picker(options).open();
      });
    },

    $(function () {
      $("select").formSelect();
      $(".sidenav").sidenav();
      $(".modal").modal();
      initMap();
      initUpload();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (!inputMap) inputMap = {};
            inputMap.UserLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          },
          () => {
            M.toast({ html: "location required" });
          }
        );
      }
      $("#map-btn").on("click", () => $(".modal").modal("open"));

      let first_name = "";
      let last_name = "";
      let breed = "";
      let gender = "";
      let age = "";
      let fixed = "";
      let interests = "";

      const createDog = (payload) => {
        $.ajax({
          method: "POST",
          url: "/api",
          data: payload,
        })
          .then(() => {
            // reset form inputs
            $("#dog_name").val("");
            $("dog_last_name").val("");
            $("#breed").val("");
            $("#age").val("");
            $("#gender").val("");
            $("#fixed").val("");
            $("#interests").val("");

            // navigate to "/dogs"
            $(".tabs").tabs("select", "index");

            return navto("/dogs");
          })
          .catch((err) => console.log(err));
      };
    })
  );
};

let imageURL;

const initUpload = () => {
  const API_KEY = process.env.FILESTACK_API_KEY;
  const client = filestack.init(API_KEY);
  const options = {
    transformations: {
      // forces users to crop their image into a circle
      circle: true,
      force: true,
    },
    onUploadDone: (file) => {
      $("#profilePreview").attr("src", file.filesUploaded[0].url);
      imageURL = file.filesUploaded[0].url;
    },
  };
  $("#uploadImage").on("click", () => {
    client.picker(options).open();
  });
};
$(function () {
  $("select").formSelect();
  $(".sidenav").sidenav();
  $(".modal").modal();
  initMap();
  initUpload();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!inputMap) inputMap = {};
        inputMap.UserLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      () => {
        M.toast({ html: "location required" });
      }
    );
  }
  $("#map-btn").on("click", () => $(".modal").modal("open"));

  let first_name = "";
  let last_name = "";
  let breed = "";
  let gender = "";
  let age = "";
  let fixed = "";
  let interests = "";

  const createDog = (payload) => {
    $.ajax({
      method: "POST",
      url: "/api",
      data: payload,
    })
      .then(() => {
        // reset form inputs
        $("#dog_name").val("");
        $("dog_last_name").val("");
        $("#breed").val("");
        $("#age").val("");
        $("#gender").val("");
        $("#fixed").val("");
        $("#interests").val("");

        // navigate to "/dogs"
        $(".tabs").tabs("select", "index");
        window.location.href = "/dogs";
      })
      .catch((err) => console.log(err));
  };

  // handle change event for my first name input
  $("#firstName").on("change", (event) => {
    // destructure event
    first_name = event.target.value;
  });
  // handle change event for my last name input
  $("#lastName").on("change", (event) => {
    // destructure event
    last_name = event.target.value;
  });
  // handle change event for my breed input
  $("#breed").on("change", (event) => {
    // destructure event
    breed = event.target.value;
  });
  // handle change event for my age input
  $("#age").on("change", (event) => {
    // destructure event
    age = event.target.value;
  });
  // handle change event for my gender input
  $("#gender").on("change", (event) => {
    // destructure event
    gender = event.target.value;
  });
  // handle change event for my fixed input
  $("#fixed").on("change", (event) => {
    // destructure event
    fixed = parseFloat(event.target.value);
  });
  // handle change event for my interests input
  $("#interests").on("change", (event) => {
    // destructure event
    interests = event.target.value;
  });

  // handle submit event
  $("form").on("submit", (event) => {
    // prevent default
    event.preventDefault();
    if (!imageURL)
      return M.toast({
        html: "Image Required",
      });
    if (!inputMap.UserLocation)
      return M.toast({
        html: "location required",
      });

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

      image: imageURL,
    };

    // create dog
    createDog(payload);
  });
});
