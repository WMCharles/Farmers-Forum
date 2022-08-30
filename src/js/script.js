function fetchPost(){
    fetch("http://localhost:3000/posts")
    .then(response => response.json())
    .then(posts => posts.forEach(post => renderPost(post)))
}

function renderPost(post){
    let content = document.createElement("div")
    content.className = "content"
    content.innerHTML = `
        <h3>${post.title}</h3>
        <p>
            ${post.body}
        </p>
        <div class="icons">
            <p><span><i class="fa-regular fa-thumbs-up"></i></span> ${post.likes} Likes</p>
            <p></i> <i class="fa-regular fa-message"></i> 20 Comments</p>
        </div>
    `
    document.getElementById("contents").appendChild(p)
}

function displayPost(){
    fetchPost()
}