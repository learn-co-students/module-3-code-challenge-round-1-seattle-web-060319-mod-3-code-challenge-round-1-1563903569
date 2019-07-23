document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');
  main();
});

function main() {
  fetchImage();

  // likeImage();
}
let imageId = 3032;//this is your id parameter;
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

function fetchImage() {
  return fetch('https://randopic.herokuapp.com/images/3032')
  .then(response => response.json())
  .then(data => renderImageInfo(data)); //usually a fucntion here
};

function renderImageInfo(data) {
  let name = data.name;
  let count = data.like_count;
  let id = data.id;
  let url = data.url;
  let comments = data.comments[0].content;

  //we may have to iterate through this later if more comments get added
  createImageElements(name, count, comments, id, url);

  // console.log('**data**', name, count, comments, id, url)
};


function createImageElements(name, count, comments, id, url) {
  const imageTag = document.getElementById('image');
  imageTag.src = url;
  const hTag = document.getElementById('name');
  hTag.innerText = name;
  const spanTag = document.getElementById('likes');
  const likeButton = document.getElementById('like_button');
  updatedCount = count;
  spanTag.innerText = `${count} Likes`;
  likeButton.addEventListener('click', (e) => {
    updatedCount += 1;
    spanTag.innerText = `${updatedCount} Likes`;
    //put likes
    return fetch(likeURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        image_id: 3032,
      }),
  }).then(response => response.json());
});

  const ul = document.getElementById('comments');
  const li = document.createElement('li');
  ul.appendChild(li).innerText = comments;
  let commentForm = document.getElementById('comment_form');
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newComment = e.target['comment'].value
    let newLi = document.createElement('li');
    newLi.innerText = newComment;
    ul.appendChild(newLi);
  });
}
