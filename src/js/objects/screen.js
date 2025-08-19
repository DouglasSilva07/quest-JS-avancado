const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = ` <div class="info">
                             <img src= "${user.avatarUrl}" alt="Foto de perfil"/>
                            <div class="data">
                                 <h1>${user.name ?? 'Não possui nome cadastrado😒'}</h1>
                                 <p>${user.bio ?? 'Não possui bio cadastrada😒'}</p>
                                 <p> 👥Seguidores: ${user.followers} | 👥Seguindo: ${user.following}</p>
                            </div>
                         </div>`;




 // 2) Repositórios
    if (user.repositories.length > 0) {
      const repositoriesItems = user.repositories
        .map(repo => `
          <li class="repo-card">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 👀 ${repo.watchers_count}</p>
            <p>🧑‍🏫 ${repo.language}</p>
          </li>
        `)
        .join('')

      this.userProfile.innerHTML += `
        <div class="repositories section">
          <h2>Repositórios</h2>
          <ul>${repositoriesItems}</ul>
        </div>
      `
    }

    // 3) Eventos (opcional)
    if (user.events.length > 0){
      console.log('Eventos recebidos:', user.events);
      const eventsItems = user.events
      .filter(ev => ev.type === "PushEvent" || ev.type === "CreateEvent")
      .slice(0,10)
      .map(ev => {
        const repoName = ev.repo.name;
        let message;

        if(ev.type === "PushEvent"){
          message = ev.payload.commits[0]?.message || "Sem mensagem de commit";
        } else if (ev.type === "CreateEvent"){
          message = "Sem mensagem de commit";
        }

        return `<li><strong>${repoName}</strong> - ${message}</li>`;
      })
      .join('');

      this.userProfile.innerHTML += `
      <div class="events section">
      <h3>Eventos Recentes</h3>
      <ul>${eventsItems}</ul>
      </div>
      `;

    }
  },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado!</h3>"
    }
}

export { screen }