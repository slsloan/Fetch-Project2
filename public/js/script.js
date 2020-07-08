$(function () {
    let title = ''
    let body = ''

    const createPost = payload => {
        $.ajax({
            method: "POST",
            url: "/api",
            data: payload
        }).then(() => {
            // reset form inputs
            $("#title").val("")
            $("#body").val("")

            // navigate to "/posts"
            window.location.href = "/posts"
        }).catch(err => console.log(err))
    }

    const fetchPosts = () => {
        $.ajax({
            method: "GET",
            url: "/api"
        }).then(posts => {
            console.log(posts)

            // append new node for each post
            posts.forEach(post => {
                console.log(post)
                // destructure post
                const {
                    title,
                    body,
                    createdAt
                } = post

                // format post as bootstrap card
                const card = `
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${body}</p>
                                <p class="card-text"><small>${moment(createdAt).fromNow()}</small></p>
                            </div>
                        </div>
                    </div>
                `
                console.log(card)

                // append card to dom
                $("#blogPosts").append(card)
            })
        }).catch(err => console.log(err))
    }

    // handle change event for my title input
    $("#title").on("change", event => {
        // destructure event
        title = event.target.value
    })

    // handle change event for my body input
    $("#body").on("change", event => {
        // destructure event
        body = event.target.value
    })

    // handle submit event
    $("form").on("submit", event => {
        // prevent default
        event.preventDefault()

        // create payload
        const payload = {
            title: title,
            body: body
        }

        // create post
        createPost(payload)
    })

    // fetch posts
    fetchPosts()
})
