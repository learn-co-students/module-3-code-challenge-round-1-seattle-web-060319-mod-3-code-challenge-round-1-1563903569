document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  main();
  let imageId = 3032//this is your id parameter
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
})

function main() {
  fetchImage();
  // likeImage();
}

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
  imageTag.src = url
  const hTag = document.getElementById('name');
  hTag.innerText = name;
  const spanTag = document.getElementById('likes');
  const likeButton = document.getElementById('like_button');
  updatedCount = count
  spanTag.innerText = `${count} Likes`;
  likeButton.addEventListener('click', (e) => {
    updatedCount += 1;
    console.log(updatedCount);
    spanTag.innerText = `${updatedCount} Likes`;
})
  const ul = document.getElementById('comments');
  ul.innerText = comments
}
