const API_URL = "https://tribe.api.fdnd.nl/v1"

async function getAllMembers() {
  const response = await fetch(`${API_URL}/member`)
  const json = await response.json()
  return json.data
}

async function getMembers() {
  const members = await getAllMembers()
  return members.filter(member => member.squadId === 1)
}

async function getMember(id) {
  const members = await getAllMembers()
  return members.find(member => member.memberId === id)
}

async function editMember(member) {
  const response = await fetch(`${API_URL}/member`, {
    method: 'PATCH',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: member,
  })
  const json = await response.json()
  return json
}

async function addMember(member) {
  const response = await fetch(`${API_URL}/member`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: member
  })
  const json = await response.json()
  return json
}

export {
  getMember,
  getMembers,
  editMember,
  addMember
}