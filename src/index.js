let imageId = 3034; //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

const likeURL = `https://randopic.herokuapp.com/likes/`;

const commentsURL = `https://randopic.herokuapp.com/comments/`;

main();

function main() {
  getImg();
}

function getImg() {
  fetch(imageURL)
    .then(res => res.json())
    .then(json => {
      renderImg(json);
    });
}

function renderImg(img) {
  const imgTag = document.getElementById("image");
  imgTag.src = img.url;

  const ul = document.createElement("ul");
  ul.innerText = img.name;
  const div = document.getElementById("image_card");
  div.appendChild(ul);

  let comments = img.comments
  comments.forEach(function(comment){
    let li = document.createElement("li")
    let ul = document.getElementById('comments')
    li.innerText = comment.content
    ul.appendChild(li)
  })

  const likes = document.getElementById("like_button");
  const likeCount = img.like_count;
  const span = document.getElementById("likes");
  span.innerText = `${likeCount}`;
  likes.addEventListener("click", function(e) {
    span.innerText++;
    console.log(span.innerText);
    increaseLikes(e, img);
  });

  const commentForm = document.getElementById("comment_form")
  commentForm.addEventListener("submit", function(e){
    
    addComment(e, img)
  })

}

function addComment(e, img){
  e.preventDefault()
  let commentContent = e.target[0].value
  let ul = document.getElementById("comments")
  let li = document.createElement("li")
  ul.appendChild(li)
  li.innerText = commentContent


  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      image_id: img.id,
      content: commentContent
    })
  }).then(res => res.json())
}

function increaseLikes(e, img) {
  fetch(likeURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      image_id: img.id,
    })
  }).then(res => res.json())
}
