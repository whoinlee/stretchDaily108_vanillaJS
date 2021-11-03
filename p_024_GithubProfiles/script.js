const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard("No profile with this username");
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos?sort=created"); //order by 'created'
    addReposToCard(data);
  } catch (err) {
    createErrorCard("Problem fetching repos");
  }
}

function createUserCard(user) {
  const userID = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  main.innerHTML = `
    <div class="card">
      <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
      </div>
      <div class="user-info">
        <h2>${userID}</h2>
        ${userBio}
        <ul>
          <li>${user.followers} <strong>Followers</strong></li>
          <li>${user.following} <strong>Following</strong></li>
          <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos"></div>
      </div>
    </div>
    `;
}

function createErrorCard(msg) {
  main.innerHTML = `
    <div class="card">
        <h1>${msg}</h1>
    </div>
    `;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  //-- display only the first 5 repos
  /* 
  <a class="repo" href="https://github.com/whoinlee/dataViz_ReactD3" target="_blank">dataViz_ReactD3</a>
   */
  reposEl.innerHTML = repos
    .slice(0, 5)
    .map(
      (repo) => `
  <a class="repo" href="${repo.html_url}" target="_blank">${repo.name}</a>
    `
    )
    .join("");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = search.value;
  if (username) {
    getUser(username);
    search.value = "";
  }
});
