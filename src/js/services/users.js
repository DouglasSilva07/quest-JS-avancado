import { baseUrl} from './variables.js'

async function getUserProfile(userName) {
    const response = await fetch(`${baseUrl}/${userName}`)
    return await response.json()
}

async function getUserEvents(userName) {
  const response = await fetch(`${baseUrl}/${userName}/events`)
  return await response.json()
}

export {getUserProfile, getUserEvents}