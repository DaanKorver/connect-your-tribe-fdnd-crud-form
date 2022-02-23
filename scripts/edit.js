import { getMember } from './api.js'
import { enter, leave } from './transition.js'

const nameEl = document.querySelector('h2')
const avatarEl = document.querySelector('.avatar')
const avatarInput = document.querySelector('.avatar-form input')
const avatarFormEl = document.querySelector('.avatar-form img')
const typeEl = document.querySelector('select')
const bioEl = document.querySelector('textarea')
const inputs = document.querySelectorAll('input')

fillForm()

avatarInput.addEventListener('keyup', changeAvatar)

async function fillForm() {
  const id = parseInt(new URLSearchParams(window.location.search).get('id'))
  const member = await getMember(id)
  const fullName = `${member.name}${member.prefix} ${member.surname}`

  nameEl.innerText = `Editing ${fullName}`
  avatarEl.src = member.avatar || './assets/avatar.png'
  avatarFormEl.src = member.avatar || './assets/avatar.png'
  setSelected(member.type)

  const {nickname, name, prefix, surname, avatar, githubHandle, url} = member
  const inputValues = [nickname, name, prefix, surname, avatar, githubHandle, url]

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = inputValues[i]
  }

  bioEl.value = member.bio

  enter()
}

function changeAvatar() {
  avatarFormEl.src = this.value
}

function setSelected(type) {
  const options = typeEl.querySelectorAll('option')
  options.forEach(option =>{
    if(option.innerText.toLowerCase() == type) {
      typeEl.value = type
    }
  })
}