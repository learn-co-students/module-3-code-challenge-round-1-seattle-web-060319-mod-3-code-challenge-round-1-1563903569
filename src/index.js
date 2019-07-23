document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  imageId = 3029 //Enter the id from the fetched image here

  imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  likeURL = `https://randopic.herokuapp.com/likes/`

  commentsURL = `https://randopic.herokuapp.com/comments/`

  // using a helper function to get the image information from the server and loading the image
  renderImage(imageURL, imageId)

})

function renderImage(imageURL) {
  // selecting the image tag, h4 tag, and likes span tag to populate with the initial fetched data
  const imgTag = document.getElementById('image')
  const h4Tag = document.querySelector('h4#name')
  const likesTag = document.querySelector('span#likes')
  const commentForm = document.querySelector('form')

  // fetching the image information from the server
  fetch(imageURL).then(resp => resp.json()).then(img => {
    imgTag.setAttribute('src', img.url)
    h4Tag.innerText = img.name
    likesTag.innerText = img.like_count

    // adding the event listener to the like button and passing the image info helper function incrementLike when the button is clicked by the user
    document.getElementById('like_button').addEventListener('click', function (e) {
      incrementLike(img)
    })

    // adding the event listener to the submit button on the form, preventing the default action of the submit button, and using executing helper method newComment()
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault()
      let newComment = document.createElement('li')
      newComment.innerText = commentForm.comment.value
      document.getElementById('comments').appendChild(newComment)
    })

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

function incrementLike(img) {
  const likesTag = document.querySelector('span#likes')
  // converts the string to a number so that it will increment at the first click of the like button
  img.like_count = Number(img.like_count)
  // increments the like_count by +1
  img.like_count++
  // optimistically updates the front end to the new likes count
  likesTag.innerText = img.like_count

  // sends the POST request to the server
  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application.json'
    },
    body: JSON.stringify({
      image_id: imageId,
    })
  }).then(resp => resp.json())
}