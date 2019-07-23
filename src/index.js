let imageId = 3034; //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

const likeURL = `https://randopic.herokuapp.com/likes/`;

const commentsURL = `https://randopic.herokuapp.com/comments/`;

fetch(imageURL)
  .then(res => res.json())
  .then(json => {
    showImg(json);
  });

function showImg(img) {
  let imgId = img.id;
  let imgUrl = img.url;
  let imgName = img.name;
  let imgLikes = img.like_count;
  let imgComments = img.comments;

  let pic = document.getElementById("image");
  pic.src = imgUrl;

  let name = document.getElementById("name");
  name.innerText = imgName;

  let likes = document.getElementById("likes");
  likes.innerText = imgLikes;

  imgComments.forEach(function(comment) {
    let comments = document.getElementById("comments");
    let content = comment.content;
    let li = document.createElement("li");
    li.innerText = content;
    comments.appendChild(li);
  });

  let form = document.getElementById("comment_form");
  let button = document.querySelector("submit");

  // let likeButton = document.getElementById("like_button")
  // likeButton.addEventListener('click', addLikes)


  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let commentForm = document.getElementById("comment_input").value;
    commentForm.placeholder = "";

    fetch(commentsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: imgId,
        content: commentForm
      })
    }).then(res => res.json());
  });

}

// function addLikes(e){
//   console.log(e.target.innerText)
// }
