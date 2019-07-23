

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3033
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImageData(imageURL)
});


function getImageData(imageURL){
  return fetch(imageURL)
  .then (resp => resp.json())
  .then (json => renderImageData(json))
}

function renderImageData(data){
  let awesomeImage = data.url
  let awesomePerson = data.name
  let awesomeLikes = data.like_count
  let awesomeComments = data.comments

  let actualImage = document.createElement('img')
  actualImage.src = awesomeImage

  let imageCard = document.getElementById('image_card')
  imageCard.appendChild(actualImage)

  let imageTitle = document.getElementById('name')
  imageTitle.innerHTML = `${awesomePerson}`

  let likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', function(e){
    let imageLikes = document.getElementById("likes")
    let getLikes = awesomeLikes++
    imageLikes.innerHTML = `${awesomeLikes + getLikes}`
  })
}
