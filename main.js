console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

const getAllChars = () => {
  clearCharacters()

  axios
  .get(`${baseURL}/characters`)
  .then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      createCharacterCard(res.data[i])
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

const getOneChar = event => {
  clearCharacters()
  const theCharId = event.target.id

  axios
  .get(`${baseURL}/character/${theCharId}`)
  .then((res) => {
    createCharacterCard(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
}

const getOldChars = event => {
  event.preventDefault()
  clearCharacters()
  const age = ageInput.value

  axios
  .get(`${baseURL}/character/?age=${age}`)
  .then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      createCharacterCard(res.data[i])
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

const creatNewChar = event => {
  event.preventDefault()
  clearCharacters()

  let newLikes = newLikesText.value.split(',')

  let body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes
  }

  axios
  .post(`${baseURL}/character`, body)
  .then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      createCharacterCard(res.data[i])
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

// ------ event listeners ----------
getAllBtn.addEventListener('click', getAllChars)

for (let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener('click', getOneChar)
}

ageForm.addEventListener('submit', getOldChars)

createForm.addEventListener('submit', creatNewChar)
//-----------------------------------