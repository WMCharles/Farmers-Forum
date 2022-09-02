//Fetch Posts
function fetchPosts(){
    fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => posts.forEach(post => renderPost(post)))
}

//Render Posts
function renderPost(post){
    let content = document.createElement("div")
    content.className = "content"
    content.innerHTML = 
    `   <div class="heading">
            <h3>${post.title}</h3>
            <div class="dropdown">
                <i class="material-icons">more_horiz</i>
                <div class="dropdown-content">
                    <div class="save">
                        <span><i class="fa fa-bookmark-o" style="font-size:24px"></i> Save Post
                    </div>
                    <div class="delete">
                        <p><span><i class="fa fa-trash-o" style="font-size:24px"></i></span> Delete Post</p>
                    </div>
                    <div class="notification">
                        <p><span><i class="fa fa-bell-o" style="font-size:24px"></i></span> Turn on notification</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="image">
            <img src="${post.image}" alt="">
        </div>
        <p>
            ${post.body}
        </p>
        <div class="icons">
            <div class="reactions">
                <p>
                    <i class="fa-regular fa-thumbs-up"></i>
                    <span class="like">${post.likes} likes</span>
                </p>
                <p>
                    <i class="fa-regular fa-thumbs-down"></i> 
                    <span class="dislike">${post.dislikes} dislikes</span>
                </p>
                <p>
                    <span><i class="fa-regular fa-message" id="toggle"></i>
                </p>
            </div>
            
        </div>

        <div id="comments">
            <div class="comment-form">
                <form action="/" class="form" id="myForm">
                    <div class="input-control">
                        <label for="comment">Comment:</label>
                        <input type="text" name="" id="comment">
                    </div>
                </form>
            </div>
            <div class="comment-items">
                
            </div>   
        </div>
    `
    // Comments
    // 1. Get each post
    // 2. Get the comments array
    // 3. iterate through the array
    // 4. Add content to DOM
    let text = ""

    let commentArray = post.comments

    commentArray.forEach(comment => {

        text += `<p class="comment-item">${comment.message}</p>`

    })

    content.querySelector(".comment-items").innerHTML = text

    

    //Likes Event Listener
    content.querySelector(".fa-thumbs-up").addEventListener("click", () => {
        post.likes +=1
        console.log("It responds!!!")
        content.querySelector(".like").textContent = ` ${post.likes} likes`
        updateReaction(post)
    })

    //Dislike Event Listener
    content.querySelector(".fa-thumbs-down").addEventListener("click", () => {
        post.dislikes +=1
        content.querySelector(".dislike").textContent = ` ${post.dislikes} dislikes`
        updateReaction(post)
    })

    // Show & Hide Comment Section
    const targetDiv = content.querySelector("#comments");
    const btn = content.querySelector("#toggle");
    btn.onclick = function () {
    if (targetDiv.style.display !== "block") {
        targetDiv.style.display = "block";
    } else {
        targetDiv.style.display = "none";
    }
    };

    // show and hide menu when user clicks ellipsis icon
    content.querySelector(".material-icons").addEventListener("click", ()=>{
        let dropdown = content.querySelector(".dropdown-content")
        if(dropdown.style.display !== "block"){
            dropdown.style.display = "block"
        } else {
            dropdown.style.display = "none"
        }
    })

    // Deleting post
    content.querySelector(".fa-trash-o").addEventListener("click", ()=> {
        content.remove()
        deletePost(post.id)
    })

    document.querySelector(".contents").appendChild(content)
}

//Updates likes or Dislikes in the server
function updateReaction(post){
    fetch(`http://localhost:3000/posts/${post.id}`, {
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(post)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

//Function that takes user input values
function userPost(e){

    e.preventDefault()

    let postObj = {
        title:e.target.post_title.value,
        body:e.target.description.value,
        comments:[],
        image:e.target.image.value,
        likes:0,
        dislikes:0
    }

    savePost(postObj)
    renderPost(postObj)
}

//Add user post to server
function savePost(postObj){
    fetch("http://localhost:3000/posts", {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(postObj)
    })
    .then(response => response.json())
    .then(data => console.log(data))
}

// Delete Post from Server
function deletePost(id){
    fetch(`http://localhost:3000/posts/${id}`, {
        method:"DELETE",
        header:{
            "content-type":"application/json"
        }
    })
    .then(resp => resp.json())
    .then(post => console.log(post))
}

//Submit form event-listener
document.getElementById("form").addEventListener("submit", userPost)

//Display Posts
function displayPost(){
    fetchPosts()
}
displayPost()
   
// Event Listeners for Handling Modal 

// When User Clicks Ask Question Section
document.getElementById("question").addEventListener("click", ()=> {
    document.getElementById("modal").style.display = "block"
})

// When User Clicks on the "x" icon to close modal
document.getElementById("close").addEventListener("click", ()=>{
    document.getElementById("modal").style.display = "none"
})

// When User Clicks anywhere outside the modal to close it
window.onclick = function(event) {
    if (event.target == document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none"
    }
}