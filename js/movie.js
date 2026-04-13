document.addEventListener('DOMContentLoaded', async () => {
    const id = getMovieId();

    const res = await fetch(`../api/movie.php?id=${id}`);
    const data = await res.json();

    if (!data.success) {
        alert("Error cargando película");
        return;
    }

    renderMovie(data.movie,data.cast);
});

function getMovieId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderMovie(m, cast = {}) {
    document.getElementById('movieTitle').textContent = m.title;

    document.getElementById('movieGenres').textContent = m.genres;
    document.getElementById('movieDescription').textContent = m.description;

    // cast
    document.getElementById('movieDirector').textContent =
        (cast.director || []).join(', ');

    document.getElementById('movieActors').textContent =
        (cast.actor || []).join(', ');

    document.getElementById('movieComposer').textContent =
        (cast.composer || []).join(', ');

    document.getElementById('movieWriter').textContent =
        (cast.writer || []).join(', ');

}

