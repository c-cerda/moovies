let movies = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadMovies();
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
