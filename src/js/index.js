import { getUserProfile, getUserEvents } from './services/users.js'
import { getRepositories } from './services/repositories.js'

import { user } from './objects/users.js'
import { screen } from './objects/screen.js'

// Botão Buscar
const btnSearch = document.getElementById('btn-search')
const inputSearch = document.getElementById('input-search')

btnSearch.addEventListener('click', handleSearch)
inputSearch.addEventListener('keyup', e => {
  if (e.key === 'Enter') handleSearch()
})

async function handleSearch() {
  const userName = inputSearch.value.trim()
  if (!userName) {
    alert('Por favor, digite um usuário válido!')
    return
  }

  try {
    // 1) Perfil e repositórios
    const profile = await getUserProfile(userName)
    if (profile.message === 'Not Found') {
      screen.renderNotFound()
      return
    }

    const repos = await getRepositories(userName)
    user.setInfo(profile)
    user.setRepositories(repos)

    // 2) (Opcional) Eventos
    const events = await getUserEvents(userName)
    user.setEvents(events)

    // 3) Renderiza tudo
    screen.renderUser(user)
  } catch (error) {
    console.error(error)
    alert('Ocorreu um erro ao buscar dados. Tente novamente.')
  }
}

