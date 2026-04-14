let movies = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadMovies();
    loadUser();
    setupEvents();
});

async function loadMovies() {
    const res = await API.getMovies();

    console.log(res); // DEBUG

    if (!res.success) {
        document.getElementById('catalogLoadError').hidden = false;
        return;
    }

    movies = res.movies;
    renderMovies(movies);
    populateGenres();
}

function renderMovies(list) {
    const grid = document.getElementById('movie-grid');
    grid.innerHTML = '';

    list.forEach(m => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        card.innerHTML = `
            <img src="${m.image}" alt="${m.title}">
            <h3>${m.title}</h3>
            <p>${m.genres || ''}</p>
        `;

	card.addEventListener('click', () => {
            window.location.href = `movie.html?id=${m.id}`;
        });

        grid.appendChild(card);
    });
}

function populateGenres() {
    const select = document.getElementById('filterGenre');
    const set = new Set();

    movies.forEach(m => {
        if (m.genres) {
            m.genres.split(',').forEach(g => set.add(g.trim()));
        }
    });

    select.innerHTML = `<option value="">Todos</option>`;

    set.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g;
        opt.textContent = g;
        select.appendChild(opt);
    });
}

function setupEvents() {
    document.getElementById('searchMovies').addEventListener('input', filterMovies);
    document.getElementById('filterGenre').addEventListener('change', filterMovies);
}

function filterMovies() {
    const text = document.getElementById('searchMovies').value.toLowerCase();
    const genre = document.getElementById('filterGenre').value;

    const filtered = movies.filter(m => {
        const matchText =
            m.title.toLowerCase().includes(text) ||
            (m.description || '').toLowerCase().includes(text);

        const matchGenre =
            !genre || (m.genres && m.genres.includes(genre));

        return matchText && matchGenre;
    });

    renderMovies(filtered);
}

function openMovie(id) {
    alert("Movie ID: " + id);
}


// user 
async function loadUser() {
    try {
        const res = await fetch('../api/me.php');
        const data = await res.json();

        const greeting = document.getElementById('userGreeting');

        if (!data.logged) {
            greeting.textContent = "Iniciar sesión";
            greeting.onclick = () => window.location.href = "login.html";
            return;
        }

        greeting.textContent = `Hola, ${data.user.username} ▼`;

    } catch (err) {
        console.error(err);
    }
}

function toggleMenu() {
    const menu = document.getElementById('logoutMenu');
    menu.classList.toggle('show');
}

window.addEventListener('click', function (e) {
    if (!e.target.closest('.user-menu')) {
        document.getElementById('logoutMenu').classList.remove('show');
    }
});

async function logout(e) {
    e.preventDefault();

    await fetch('../api/util/logout.php');

    window.location.href = "index.html";
}

function openMyProfile(e) {
    e.preventDefault();
    window.location.href = "user.html";
}


