document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3029 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // using a helper function to get the image information from the server and loading the image
  loadImage(imageURL, imageId)

})

function loadImage(imageURL, imageId) {
  // selecting the image tag, h4 tag, and likes span tag to populate with the initial fetched data
  const imgTag = document.getElementById('image')
  const h4Tag = document.querySelector('h4#name')
  const likesTag = document.querySelector('span#likes')

  // fetching the image information from the server
  fetch(imageURL).then(resp => resp.json()).then(img => {
    imgTag.setAttribute('src', img.url)
    h4Tag.innerText = img.name
    likesTag.innerText = img.like_count

    // using a helper function to list out the comments
    listComments(img.comments)
  })
}

function listComments(commentsArray) {
  // selects the comments unordered list
  const commentsList = document.getElementById('comments')

  // iterates through the array of comments and creates an li tag for each comment.  Updates the li to contain the comment content. Then appends the li to the ul commentsList
  commentsArray.forEach(comment => {
    let liTag = document.createElement('li')
    liTag.innerText = comment.content
    commentsList.appendChild(liTag)
  });
}