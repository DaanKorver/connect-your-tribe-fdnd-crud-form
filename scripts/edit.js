import { getMember, editMember } from './api.js'
import { enter, leave } from './transition.js'
import { getFormValues } from './global.js'

const nameEl = document.querySelector('h2')
const avatarEl = document.querySelector('.avatar')
const avatarInput = document.querySelector('.avatar-form input')
const avatarFormEl = document.querySelector('.avatar-form img')
const typeEl = document.querySelector('select')
const bioEl = document.querySelector('textarea')
const memberIdEl = document.querySelector('.memberId')
const squadIdEl = document.querySelector('.squadId')
const inputs = document.querySelectorAll('input:not([type="number"])')
const submit = document.querySelector('.submit')

fillForm()
avatarInput.addEventListener('keyup', changeAvatar)
submit.addEventListener('click', getFormData)

async function fillForm() {
  const id = parseInt(new URLSearchParams(window.location.search).get('id'))
  const member = await getMember(id)
  const fullName = `${member.name}${member.prefix} ${member.surname}`

  memberIdEl.value = id
  squadIdEl.value = member.squadId

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

async function getFormData(e) {
  e.preventDefault()
  const values = getFormValues()
  const keys = ['memberId', 'squadId', 'type', 'nickname', 'name', 'prefix', 'surname', 'avatar', 'githubHandle', 'bio', 'url']
  const member = transformArray(keys, values)
  await editMember(JSON.stringify(member))
  window.location.reload()
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