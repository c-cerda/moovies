// peliculas_admin.js
let movies = [];

async function init() {
    await MooviesStorage.ensureLocalJsonSeed();
    const local = localStorage.getItem('moovies_movies');
    // Usamos la estructura de tu proyecto para obtener las películas
    movies = local ? JSON.parse(local) : (window.MOOVIES_SEED ? window.MOOVIES_SEED.movies : []);
    render();
}

function render() {
    const tbody = document.getElementById('tablaPelisBody');
    if (!tbody) return;
    tbody.innerHTML = movies.map(m => `
        <tr>
            <td>${m.id}</td>
            <td><strong>${m.titulo}</strong></td>
            <td>${m.genero}</td>
            <td>
                <button class="btn-moo" onclick="openModal('${m.id}')">✏️ Editar</button>
                <button class="btn-moo" style="background:#d9534f; color:white;" onclick="eliminar('${m.id}')">🗑️ Borrar</button>
            </td>
        </tr>
    `).join('');
}

function openModal(id = null) {
    const modal = document.getElementById('modalPeli');
    const form = document.getElementById('formPeli');
    if (!modal || !form) return;

    if(id) {
        const p = movies.find(x => String(x.id) === String(id));
        form.titulo.value = p.titulo || '';
        form.genero.value = p.genero || '';
        form.dataset.id = id;
    } else {
        form.reset();
        delete form.dataset.id;
    }
    modal.style.display = 'block';
}

function eliminar(id) {
    if(confirm("¿Confirmas la eliminación definitiva del sistema? Esta película desaparecerá del catálogo.")) {
        movies = movies.filter(x => String(x.id) !== String(id));
        localStorage.setItem('moovies_movies', JSON.stringify(movies));
        render();
    }
}

window.onload = init;