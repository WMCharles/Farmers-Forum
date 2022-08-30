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
            <div class="likes">
                <p>
                    <i class="fa-regular fa-thumbs-up"></i></span> ${post.likes} likes
                </p>
                <p>
                    <i class="fa-regular fa-thumbs-down"></i> ${post.dislikes} dislikes
                </p>
                <p>
                    <i class="fa-regular fa-message"></i> Comments
                </p>
            </div>
            <div>
                <p>
                    Share <i class="fa-regular fa-share-from-square"></i>
                </p>
            </div>
        </div>
    `
    document.querySelector(".contents").appendChild(content)
}

//Display Posts
function displayPost(){
    fetchPosts()
}
displayPost()