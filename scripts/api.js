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

export {
  getMember,
  getMembers
}