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
                    <span><i class="fa-regular fa-message"></i> Comments
                </p>
            </div>
            <div>
                <p>
                    Share <i class="fa-regular fa-share-from-square"></i>
                </p>
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

//Display Posts
function displayPost(){
    fetchPosts()
}
displayPost()