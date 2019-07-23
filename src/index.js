

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/3030`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

getData()
addComment()

function getData() {
  return fetch(`https://randopic.herokuapp.com/images/3030`).then(res => res.json())
  .then(json => renderData(json))
}

function renderData(arg) {
  let image = document.getElementById('image')
  image.src = arg.url
  let h4 = document.getElementById('name')
  h4.innerText = arg.name
  span = document.getElementById('likes')
  span.innerText = arg.like_count
  // comments = document.getElementById('comments')
  // comments.forEach(comment => {
  //   li = createElement('li')
  //   li.innerText = comment
  //   comments.appendChild(li)
  
  const button = document.getElementById('like_button')
  button.addEventListener("click", function(ev) {
    incrementLikes(arg)
  })
}

// function clickLikes() {
//   const button = document.getElementById('like_button')
//   button.addEventListener("click", function(ev) {
//     incrementLikes())
// }

function incrementLikes(arg) {
  // let = likes = .then(json => (document.getElementById('likes').innerText = likes +1))
  return fetch(`https://randopic.herokuapp.com/likes`, {
    method: 'POST',
    headers: {
       'Content-Type':'application/json'
    },
    body: JSON.stringify ({
      image_id: 3030,
      likes: arg.likes + 1,
    })
  }).then(res => res.json())
  
}

function addComment() {
  let form = document.getElementById('comment_form')
  form.addEventListener("submit", ev => {
    ev.preventDefault()
    let ul = document.getElementById('comments')
    let li = document.createElement('li')
    let text = ev.target.comment.value
    li.innerText = text
    ev.target.comment.value = ""
    ul.appendChild(li)
    return fetch(`https://randopic.herokuapp.com/comments/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        image_id: 3030,
        content: text
      })
  }).then(res => res.json())
 
})
}