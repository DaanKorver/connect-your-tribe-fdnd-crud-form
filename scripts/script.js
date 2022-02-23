const API_URL = "https://tribe.api.fdnd.nl/v1"

//Elements
const tableHead = document.getElementById("table-head")
const tableBody = document.getElementById("table-body")


async function fillTable() {
  const members = await getMembers()
  members.data.forEach(member=>{
    const tr = document.createElement('tr')
    const {avatar, name, prefix, surname} = member
    const fullName = `${name} ${prefix} ${surname}`
    const content = [avatar, fullName]
    content.forEach((dataItem, index)=>{
      const td = document.createElement('td')
      if(index == 0) {
        td.innerHTML = dataItem != "" ? `<div><img src="${dataItem}"/></div>` : `<div><img src="./assets/avatar.png"/></div>`
        td.classList.add("avatar")
      } else {
        td.innerText = dataItem
      }
      tr.appendChild(td)
    })
    tableBody.appendChild(tr)
  })
}

async function getMembers() {
  const req = await fetch(`${API_URL}/member`)
  const res = await req.json()
  return res
}

fillTable()