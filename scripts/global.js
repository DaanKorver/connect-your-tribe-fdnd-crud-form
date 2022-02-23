import { leave } from './transition.js'

const addBtn = document.querySelector('.add')
const heading = document.querySelector('h1')

addBtn.addEventListener('click', leave.bind(null, 'add.html'))
heading.addEventListener('click', leave.bind(null, 'index.html'))

function getFormValues() {
  const inputs = Array.from(document.querySelectorAll('form select, form input, form textarea'))
  const values = inputs.map(input => {
    if(isNaN(parseInt(input.value))) {
      return input.value
    }
    return parseInt(input.value)
  })
  return values
}

function transformArray(keys, values) {
  const member = {}
  keys.forEach((key, index)=>{
    member[key] = values[index]
  })
  return member
}

export {
  getFormValues,
  transformArray
}