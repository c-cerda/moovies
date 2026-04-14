// cast_admin.js
async function init() {
    await MooviesStorage.ensureLocalJsonSeed();
    const local = localStorage.getItem('moovies_movies');
    const movies = local ? JSON.parse(local) : (window.MOOVIES_SEED ? window.MOOVIES_SEED.movies : []);
    const tbody = document.getElementById('tablaCastBody');
    if (!tbody) return;
    
    tbody.innerHTML = movies.flatMap(m => 
        (m.actores || "").split(',').map(actor => `
            <tr>
                <td>${actor.trim()}</td>
                <td><em>${m.titulo}</em></td>
                <td><button class="btn-moo" onclick="alert('Editando actor: ${actor.trim()}')">✏️</button></td>
            </tr>
        `)
    ).join('');
}

window.onload = init;