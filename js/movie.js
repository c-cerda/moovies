document.addEventListener('DOMContentLoaded', async () => {
    const id = getMovieId();

    const res = await fetch(`../api/movie.php?id=${id}`);
    const data = await res.json();

    console.log(data);
    if (!data.success) {
        alert("Error cargando película");
        return;
    }

renderMovie(data.movie);
renderComments(data.comments);
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
    (m.directors || '').split(',').join(', ') || '—';

document.getElementById('modalActores').textContent =
    (m.actors || '').split(',').join(', ') || '—';

document.getElementById('modalCompositor').textContent =
    (m.composers || '').split(',').join(', ') || '—';

document.getElementById('modalGuionistas').textContent =
    (m.writers || '').split(',').join(', ') || '—';

}

function renderComments(comments) {
    const container = document.getElementById('commentsList');
    container.innerHTML = '';

    if (!comments || comments.length === 0) {
        container.innerHTML = '<p>No hay comentarios aún.</p>';
        return;
    }

    comments.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comment-item';

        div.innerHTML = `
            <strong>${c.username}</strong>
            <p>${c.comment}</p>
            <p>${'🥛'.repeat(c.rating)}</p>
        `;

        container.appendChild(div);
    });
}

// rating 
let currentRating = 0;

function setRating(n) {
    currentRating = n;

    const glasses = document.querySelectorAll('#milkRatingRow .glass');

    glasses.forEach((g, index) => {
        if (index < n) {
            g.classList.add('active');
        } else {
            g.classList.remove('active');
        }
    });
}

async function sendReview() {
    const movieId = getMovieId();
    const text = document.getElementById('reviewText').value.trim();

    if (!text) {
        alert("Escribe un comentario");
        return;
    }

    if (currentRating === 0) {
        alert("Selecciona una calificación");
        return;
    }

    try {
        const res = await fetch('../api/comentario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movie_id: movieId,
                content: text,
                rating: currentRating
            })
        });

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.error || "Error al comentar");
        }

        // reset UI
        document.getElementById('reviewText').value = '';
        setRating(0);

        // reload comments
const res2 = await fetch(`../api/movie.php?id=${movieId}`);
const data2 = await res2.json();
renderComments(data2.comments);

     } catch (err) {
        alert(err.message);
    }
}
