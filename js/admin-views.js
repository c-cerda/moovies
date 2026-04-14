/**
 * ARCHIVO: admin-views.js
 * Funciones para las 4 vistas del panel de administración
 * SIN TOCAR script.js
 */

const AdminViews = {
    /**
     * VISTA 1: Catálogo Compacto de Gestión
     * Muestra todas las películas en una tabla para edición rápida.
     */
    renderManagementTable: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const movies = JSON.parse(localStorage.getItem('moovies_movies') || '[]');
        
        let html = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Género</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        movies.forEach(m => {
            html += `
                <tr>
                    <td>${m.id}</td>
                    <td>${escapeHtml(m.titulo)}</td>
                    <td>${escapeHtml(m.genero)}</td>
                    <td>
                        <button onclick="editMovie('${m.id}')">📝</button>
                        <button onclick="deleteMovie('${m.id}')">🗑️</button>
                    </td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    },

    /**
     * VISTA 2: Estadísticas de Comunidad
     * Muestra cuántas reseñas y votos hay por película.
     */
    renderCommunityStats: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const allComments = MooviesStorage.getComments();
        const movies = JSON.parse(localStorage.getItem('moovies_movies') || '[]');

        let html = '<div class="stats-grid">';
        
        movies.forEach(m => {
            const movieComments = allComments.filter(c => String(c.peliculaId) === String(m.id));
            const totalVotes = movieComments.reduce((acc, c) => acc + (c.likedBy?.length || 0) + (c.dislikedBy?.length || 0), 0);
            
            html += `
                <div class="stat-card">
                    <h4>${escapeHtml(m.titulo)}</h4>
                    <p>Reseñas: 🥛 ${movieComments.length}</p>
                    <p>Interacciones: 👍/👎 ${totalVotes}</p>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    },

    /**
     * VISTA 3: Moderación de Usuarios
     * Lista de usuarios y su actividad reciente.
     */
    renderUserModeration: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const users = JSON.parse(localStorage.getItem('moovies_users') || '[]');
        
        let html = '<ul class="user-mod-list">';
        users.forEach(u => {
            html += `
                <li class="user-mod-item">
                    <strong>${escapeHtml(u.nombreUsuario)}</strong> (${escapeHtml(u.email)})
                    <span>Leche: ${u.lecheFavorita}</span>
                    <button onclick="resetUserPassword('${u.nombreUsuario}')">Reset Pass</button>
                </li>
            `;
        });
        html += '</ul>';
        container.innerHTML = html;
    },

    /**
     * VISTA 4: Vista Previa Real (Live Preview)
     * Renderiza cómo se vería una tarjeta en el catálogo actual antes de guardar.
     */
    renderLivePreview: function(containerId, movieData) {
        const container = document.getElementById(containerId);
        if (!container) return;

     
        const card = document.createElement('article');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movieData.imagen || '../images/default_movie.png'}" alt="Preview" class="movie-card__img">
            <div class="movie-card__content">
                <h3 class="movie-card__title">${escapeHtml(movieData.titulo || 'Título de prueba')}</h3>
                <p class="movie-card__genre">${escapeHtml(movieData.genero || 'Género')}</p>
                <p class="movie-card__desc">${escapeHtml(movieData.descripcion || 'Descripción...')}</p>
                <button class="btn-moo" disabled>Vista Previa</button>
            </div>
        `;
        container.innerHTML = '<h5>Vista previa en el catálogo:</h5>';
        container.appendChild(card);
    }
};

// Función auxiliar necesaria si no está cargado el script principal
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
}