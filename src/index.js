document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3026 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage()
  pressLike()
  addComment()


  function getImage() {
    fetch(imageURL)
    .then(res => res.json())
    .then(json => displayImage(json))    
  }

  function displayImage(image){
    let pageImage = document.getElementById("image")
    pageImage.src = image.url
    //fix
    pageImage['data-id'] = image.id
    let h4 = document.getElementById("name")
    h4.innerText = image.name
    displayLikes(image.like_count)
    displayComments(image.comments)

  }

  function displayLikes(like_count){
    let likes = document.getElementById("likes")
    likes.innerText = like_count;
  }

  function displayComments(comments){
    ul = document.getElementById('comments')
    comments.forEach(comment => {
      li = document.createElement('li')
      li.innerText = comment.content
      deleteButton = addDeleteToComment(comment)
      deleteButton.addEventListener("click", function(e){
        let li = e.target.parentNode
        ul.removeChild(li)
        fetch(commentsURL + comment.id, {
          method: "DELETE"
        })
      })
      li.appendChild(deleteButton)
      ul.appendChild(li)
    })
  }

  function pressLike(){
    likeButton = document.getElementById("like_button")
    likeButton.addEventListener("click", function(){
      let likes = document.getElementById("likes")
      let like_count = parseInt(likes.innerText) + 1
      displayLikes(like_count)
      fetch(likeURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId
        })
      })
    })
  }

  function addComment(){
    let form = document.getElementById("comment_form")
    form.addEventListener("submit", function(e){
      e.preventDefault()
      commentContent = e.target[0].value
      e.target[0].value = ""
      displayComments([{content: commentContent}])
      fetch(commentsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image_id: imageId,
          content: commentContent
        })
      })
      .then(res => res.json())
      .then(json => addDeleteToComment(json))
    })
  }

  function addDeleteToComment(comment){
    button = document.createElement('button')
    button.innerText = "Delete"
    button.id = comment.id
    return button
  }
})





// {id: 3026, url: "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg", name: "The Internet!", like_count: 0, comments: Array(1)}
// comments: Array(1)
// 0: {id: 53682, content: "first comment!", image_id: 3026, created_at: "2019-07-23T17:49:18.951Z", updated_at: "2019-07-23T17:49:18.951Z"}
// length: 1
// __proto__: Array(0)
// id: 3026
// like_count: 0
// name: "The Internet!"
// url: "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg"
// __proto__: Object

