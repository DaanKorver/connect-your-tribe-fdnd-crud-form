import { getMembers } from './api.js'
import { enter, leave } from './transition.js'

// //Elements
const table = document.querySelector("table")

// Story 🍿
fillTable()

async function fillTable() {
  const members = await getMembers()
  members.forEach(member=>{
    const fullName = `${member.name}${member.prefix} ${member.surname}`
    table.insertAdjacentHTML('beforeend', 
    `
      <tr data-id=${member.memberId}>
        <td>${member.memberId}</td>
        <td class="avatar">
          <img src="${member.avatar || './assets/avatar.png'}" alt="avatar">
          <p>${fullName}</p>
        </td>
        <td>${member.type[0].toUpperCase() + member.type.slice(1)}</td>
        <td class="actions">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" class="edit" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.7" stroke="orange" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
            </svg>
          </button>
        </td>
      </tr>
    `
    )
    addEvents(member.memberId)
  })
  enter()
}

function addEvents(id) {
  const actions = document.querySelector(`tr[data-id="${id}"] .actions`)
  actions.querySelector('.edit').addEventListener('click', edit.bind(null, id))
}

function edit(id) {
  leave(`edit.html?id=${id}`)
} 