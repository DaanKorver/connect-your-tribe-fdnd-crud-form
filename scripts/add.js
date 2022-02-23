import { addMember } from './api.js'
import { enter } from './transition.js'
import { getFormValues, transformArray } from './global.js'

const submit = document.querySelector('.submit')

enter()
submit.addEventListener('click', getFormData)

async function getFormData(e) {
  e.preventDefault()
  const values = getFormValues()
  const keys = ['squadId', 'type', 'nickname', 'name', 'prefix', 'surname', 'avatar', 'githubHandle', 'bio', 'url']
  const member = transformArray(keys, values)
  await addMember(JSON.stringify(member))
  window.location.reload()
}