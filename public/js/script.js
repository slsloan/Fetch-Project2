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
                    <div class="row">
                        <div class="col s12 m6">
                            <div class="card blue-grey darken-1">
                                <div class="card-content white-text">
                                    <span class="card-title"><b>${first_name} ${last_name}</b></span>
                                    <p>Age: ${age}</p>
                                    <p>Breed: ${breed}</p>
                                    <p>Gender: ${gender}</p>
                                    <p>Fixed: ${fixed}</p>
                                    <p>Interests: ${interests}</p>
                                </div>
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
        fixed = JSON.parse(event.target.value)

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

    // form select options 
    $(document).ready(function () {
        $('select').formSelect()
    })
})