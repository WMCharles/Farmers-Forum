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
    `   <h3><i class="fa-regular fa-user"></i> - ${post.title}</h3>
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
                    <span><i class="fa-regular fa-message" id="toggle"></i> Comments
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, explicabo ut? Nemo quos eveniet perferendis soluta itaque omnis quasi. Labore ratione mollitia delectus amet asperiores, exercitationem autem officia. Nisi, ullam!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis non expedita tempora deleniti provident earum voluptate incidunt nesciunt animi deserunt doloribus assumenda, culpa quidem aut odio dolorum sapiente dignissimos magni?</p>
            </div>   
        </div>
    `

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