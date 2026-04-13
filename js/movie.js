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
    document.getElementById('modalTitle').textContent = m.title;
    document.getElementById('modalGenre').textContent = m.genres;

    document.getElementById('modalSynopsis').value = m.description;

    document.getElementById('modalImg').src = m.image;

    const trailer = document.getElementById('modalTrailerBtn');
    if (m.trailer) {
        trailer.href = m.trailer;
        trailer.style.display = 'inline-flex';
    } else {
        trailer.style.display = 'none';
    }

    // CAST
    document.getElementById('modalDirector').textContent =
        (cast.director || []).join(', ');

    document.getElementById('modalActores').textContent =
        (cast.actor || []).join(', ');

    document.getElementById('modalCompositor').textContent =
        (cast.composer || []).join(', ');

    document.getElementById('modalGuionistas').textContent =
        (cast.writer || []).join(', ');
}

