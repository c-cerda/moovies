const MOVIES_JSON = '../json/movies.json';

let moviesCache = [];
let currentMovieId = null;
let currentRating = 0;

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
}

function milkBottlesHTML(count) {
    const n = Math.max(0, Math.min(5, parseInt(count, 10) || 0));
    return '<span class="milk-bottles" aria-label="' + n + ' vasos">' + '🥛'.repeat(n) + '</span>';
}

function requireSession() {
    const u = MooviesStorage.getSessionUser();
    if (!u || !u.nombreUsuario) {
        window.location.href = 'login.html';
        return null;
    }
    return u;
}

function setUserGreeting(user) {
    const el = document.getElementById('userGreeting');
    if (el) el.textContent = 'Hola, ' + (user.nombre || user.nombreUsuario) + ' ▼';
}

function shortDesc(m) {
    if (m.descripcionCorta) return m.descripcionCorta;
    const d = m.descripcion || '';
    if (d.length <= 180) return d;
    return d.slice(0, 177).trim() + '…';
}

function getMovieTitleById(movieId) {
    const m = moviesCache.find((x) => String(x.id) === String(movieId));
    return m ? m.titulo : 'Película #' + movieId;
}

function getMovieById(movieId) {
    return moviesCache.find((x) => String(x.id) === String(movieId)) || null;
}

function currentSessionUsername() {
    const s = MooviesStorage.getSessionUser();
    return s && s.nombreUsuario ? s.nombreUsuario : '';
}

function isAdminSession(session) {
    session = session || MooviesStorage.getSessionUser();
    return (
        session &&
        session.nombreUsuario &&
        String(session.nombreUsuario).toLowerCase() === 'admin'
    );
}

function openAdminPanel() {
    if (isAdminSession()) {
        window.location.href = 'admin.html';
    }
}

function getFilteredMovies() {
    const q = (document.getElementById('searchMovies') && document.getElementById('searchMovies').value) || '';
    const g = (document.getElementById('filterGenre') && document.getElementById('filterGenre').value) || '';
    const needle = q.trim().toLowerCase();
    return moviesCache.filter(function (m) {
        if (g && m.genero !== g) return false;
        if (!needle) return true;
        const blob = (
            (m.titulo || '') +
            ' ' +
            (m.genero || '') +
            ' ' +
            (m.descripcion || '') +
            ' ' +
            (m.director || '') +
            ' ' +
            (m.actores || '')
        ).toLowerCase();
        return blob.indexOf(needle) !== -1;
    });
}

function populateGenreSelect() {
    const sel = document.getElementById('filterGenre');
    if (!sel) return;
    const set = {};
    moviesCache.forEach(function (m) {
        if (m.genero) set[m.genero] = true;
    });
    const genres = Object.keys(set).sort();
    sel.innerHTML = '';
    const o0 = document.createElement('option');
    o0.value = '';
    o0.textContent = 'Todos los géneros';
    sel.appendChild(o0);
    genres.forEach(function (g) {
        const o = document.createElement('option');
        o.value = g;
        o.textContent = g;
        sel.appendChild(o);
    });
}

function renderMovieGrid() {
    const grid = document.getElementById('movie-grid');
    if (!grid) return;
    const list = getFilteredMovies();
    grid.innerHTML = '';
    if (list.length === 0) {
        grid.innerHTML = '<p class="catalog-error">No hay películas que coincidan con tu búsqueda.</p>';
        return;
    }
    list.forEach((m) => {
        const card = document.createElement('article');
        card.className = 'movie-card';
        card.dataset.movieId = m.id;
        card.innerHTML =
            '<button type="button" class="movie-fav-btn" data-fav-toggle="' +
            escapeHtml(m.id) +
            '" title="Agregar o quitar de favoritos" aria-label="Agregar o quitar de favoritos">☆</button>' +
            '<img src="' +
            escapeHtml(m.imagen) +
            '" alt="' +
            escapeHtml(m.titulo) +
            '" loading="lazy" referrerpolicy="no-referrer">' +
            '<div class="movie-info">' +
            '<h4>' +
            escapeHtml(m.titulo) +
            '</h4>' +
            '<p class="movie-genre">' +
            escapeHtml(m.genero) +
            '</p>' +
            '<p class="movie-desc">' +
            escapeHtml(shortDesc(m)) +
            '</p>' +
            '<div class="opinion-box">' +
            '<p class="opinion-label">¿Qué te pareció?</p>' +
            '<button type="button" class="btn-opinar" data-open-review="' +
            escapeHtml(m.id) +
            '">✨ ¡Quiero opinar! 🥛</button>' +
            '</div></div>';
        grid.appendChild(card);
    });
    grid.querySelectorAll('[data-open-review]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-open-review');
            openModalById(id);
        });
    });
    paintFavoriteButtons();
    grid.querySelectorAll('[data-fav-toggle]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = btn.getAttribute('data-fav-toggle');
            try {
                MooviesStorage.toggleFavoriteMovie(id);
                paintFavoriteButtons();
                renderProfileFavorites();
            } catch (err) {
                alert(err.message || 'No se pudo actualizar favoritos');
            }
        });
    });
}

function paintFavoriteButtons() {
    const uname = currentSessionUsername();
    document.querySelectorAll('[data-fav-toggle]').forEach((btn) => {
        const id = btn.getAttribute('data-fav-toggle');
        const on = uname ? MooviesStorage.isFavoriteMovie(uname, id) : false;
        btn.textContent = on ? '★' : '☆';
        btn.classList.toggle('movie-fav-btn--active', on);
    });
}

async function loadMovies() {
    const grid = document.getElementById('movie-grid');
    const errBox = document.getElementById('catalogLoadError');
    try {
        if (
            typeof window.MOOVIES_SEED !== 'undefined' &&
            Array.isArray(window.MOOVIES_SEED.movies) &&
            window.MOOVIES_SEED.movies.length > 0
        ) {
            moviesCache = window.MOOVIES_SEED.movies;
        } else {
            const res = await fetch(MOVIES_JSON);
            if (!res.ok) throw new Error('No se pudo cargar el catálogo');
            moviesCache = await res.json();
        }
        if (!Array.isArray(moviesCache)) throw new Error('Formato de películas inválido');
        populateGenreSelect();
        const searchEl = document.getElementById('searchMovies');
        const genreEl = document.getElementById('filterGenre');
        if (searchEl) {
            searchEl.oninput = function () {
                renderMovieGrid();
            };
        }
        if (genreEl) {
            genreEl.onchange = function () {
                renderMovieGrid();
            };
        }
        renderMovieGrid();
    } catch (e) {
        if (errBox) {
            errBox.hidden = false;
            errBox.textContent =
                'No se pudo cargar el catálogo. Incluye seed-data.js antes de script.js o revisa JSON/movies.json.';
        }
        grid.innerHTML = '<p class="catalog-error">No hay películas para mostrar.</p>';
    }
}

function userInVoteList(arr, nombre) {
    if (!nombre || !arr || !arr.length) return false;
    const lu = String(nombre).toLowerCase();
    return arr.some(function (x) {
        return String(x).toLowerCase() === lu;
    });
}

function voteRowHtml(commentId, replyId, likedBy, dislikedBy, sessionNombre) {
    const lb = (likedBy || []).length;
    const db = (dislikedBy || []).length;
    const likeOn = sessionNombre && userInVoteList(likedBy, sessionNombre);
    const disOn = sessionNombre && userInVoteList(dislikedBy, sessionNombre);
    const cid = escapeHtml(String(commentId));
    const ridAttr = replyId != null && replyId !== '' ? escapeHtml(String(replyId)) : '';
    return (
        '<div class="comment-votes">' +
        '<button type="button" class="btn-vote' +
        (likeOn ? ' btn-vote--active' : '') +
        '" data-vote-action="like" data-comment-id="' +
        cid +
        '" data-reply-id="' +
        ridAttr +
        '">👍 <span class="vote-num">' +
        lb +
        '</span></button>' +
        '<button type="button" class="btn-vote' +
        (disOn ? ' btn-vote--active' : '') +
        '" data-vote-action="dislike" data-comment-id="' +
        cid +
        '" data-reply-id="' +
        ridAttr +
        '">👎 <span class="vote-num">' +
        db +
        '</span></button>' +
        '</div>'
    );
}

function renderCommentsList(comments) {
    const container = document.getElementById('commentsList');
    if (!container) return;
    const session = MooviesStorage.getSessionUser();
    const sessionUser = session && session.nombreUsuario ? String(session.nombreUsuario).toLowerCase() : '';
    const sessionNombre = session && session.nombreUsuario ? session.nombreUsuario : '';
    const linked = MooviesStorage.filterCommentsLinkedToUsers(comments);
    if (!linked || linked.length === 0) {
        container.innerHTML = '<p class="comments-empty">Aún no hay reseñas de usuarios registrados.</p>';
        return;
    }
    container.innerHTML = linked
        .map(function (c) {
            MooviesStorage.normalizeComment(c);
            const display = MooviesStorage.getDisplayNameForUsuario(c.usuario);
            const enc = encodeURIComponent(c.usuario);
            const own = c.usuario && sessionUser && String(c.usuario).toLowerCase() === sessionUser;
            const milk = milkBottlesHTML(c.vasosLeche);
            const nameBtn =
                '<button type="button" class="comment-name-link" data-view-profile="' +
                enc +
                '" title="Ver perfil">' +
                escapeHtml(display) +
                ' <span class="comment-nick">(@' +
                escapeHtml(c.usuario) +
                ')</span></button>';
            const cid = escapeHtml(String(c.id));
            const votes = voteRowHtml(c.id, '', c.likedBy, c.dislikedBy, sessionNombre);
            if (own) {
                const rating = Math.max(0, Math.min(5, parseInt(c.vasosLeche, 10) || 0));
                const glasses = [1, 2, 3, 4, 5]
                    .map(function (n) {
                        return (
                            '<span class="glass glass-edit' +
                            (n <= rating ? ' active' : '') +
                            '" data-rating="' +
                            n +
                            '">🥛</span>'
                        );
                    })
                    .join('');
                return (
                    '<div class="comment-thread">' +
                    '<div class="comment-item comment-item--own" data-comment-id="' +
                    cid +
                    '">' +
                    '<div class="comment-item__head">' +
                    nameBtn +
                    milk +
                    '</div>' +
                    votes +
                    '<div class="comment-item__view" data-role="view">' +
                    '<p class="comment-item__text">' +
                    escapeHtml(c.comentario) +
                    '</p>' +
                    '<div class="comment-item-own-actions">' +
                    '<button type="button" class="btn-comment-edit" data-action="edit">Editar</button>' +
                    '<button type="button" class="btn-comment-delete" data-action="delete">Borrar</button>' +
                    '</div></div>' +
                    '<div class="comment-item__edit" data-role="edit" hidden data-edit-rating="' +
                    rating +
                    '">' +
                    '<textarea class="comment-edit-textarea" rows="3" maxlength="2000">' +
                    escapeHtml(c.comentario) +
                    '</textarea>' +
                    '<div class="milk-rating milk-rating--small comment-edit-milk">' +
                    glasses +
                    '</div>' +
                    '<div class="comment-edit-actions">' +
                    '<button type="button" class="btn-send btn-send--inline" data-action="save-edit">Guardar</button>' +
                    '<button type="button" class="btn-comment-cancel" data-action="cancel-edit">Cancelar</button>' +
                    '</div></div>' +
                    '</div></div>'
                );
            }
            return (
                '<div class="comment-thread">' +
                '<div class="comment-item">' +
                '<div class="comment-item__head">' +
                nameBtn +
                milk +
                '</div>' +
                votes +
                '<p class="comment-item__text">' +
                escapeHtml(c.comentario) +
                '</p>' +
                '</div></div>'
            );
        })
        .join('');
    container.querySelectorAll('.comment-name-link').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const raw = btn.getAttribute('data-view-profile');
            let u = '';
            try {
                u = decodeURIComponent(raw || '');
            } catch (err) {
                u = raw || '';
            }
            if (u) openPublicProfileTab(u);
        });
    });
}

function handleCommentsListClick(e) {
    const voteBtn = e.target.closest('[data-vote-action]');
    if (voteBtn) {
        e.preventDefault();
        const cid = voteBtn.getAttribute('data-comment-id');
        const rid = voteBtn.getAttribute('data-reply-id') || '';
        const kind = voteBtn.getAttribute('data-vote-action');
        try {
            MooviesStorage.toggleCommentVote(cid, rid || null, kind);
            loadCommentsForMovie(String(currentMovieId));
        } catch (err) {
            alert(err.message || 'No se pudo votar');
        }
        return;
    }
    const glass = e.target.closest('.glass-edit');
    if (glass) {
        e.preventDefault();
        const n = parseInt(glass.getAttribute('data-rating'), 10);
        const editWrap = glass.closest('.comment-item__edit');
        if (!editWrap || isNaN(n)) return;
        editWrap.querySelectorAll('.glass-edit').forEach(function (g, index) {
            if (index < n) g.classList.add('active');
            else g.classList.remove('active');
        });
        editWrap.dataset.editRating = String(n);
        return;
    }
    const editBtn = e.target.closest('[data-action="edit"]');
    if (editBtn) {
        const item = editBtn.closest('.comment-item--own');
        if (!item) return;
        const view = item.querySelector('[data-role="view"]');
        const edit = item.querySelector('[data-role="edit"]');
        if (view) view.hidden = true;
        if (edit) {
            const ta = edit.querySelector('.comment-edit-textarea');
            const textP = view ? view.querySelector('.comment-item__text') : null;
            if (ta && textP) ta.value = textP.textContent;
            edit.hidden = false;
        }
        return;
    }
    const delBtn = e.target.closest('[data-action="delete"]');
    if (delBtn) {
        const item = delBtn.closest('.comment-item--own');
        if (!item) return;
        const cid = item.getAttribute('data-comment-id');
        if (!cid || !confirm('¿Borrar tu reseña? Esta acción no se puede deshacer.')) return;
        try {
            MooviesStorage.deleteCommentById(cid);
            loadCommentsForMovie(String(currentMovieId));
            renderProfileMyReviews();
        } catch (err) {
            alert(err.message || 'No se pudo borrar');
        }
        return;
    }
    const cancelBtn = e.target.closest('[data-action="cancel-edit"]');
    if (cancelBtn) {
        loadCommentsForMovie(String(currentMovieId));
        return;
    }
    const saveBtn = e.target.closest('[data-action="save-edit"]');
    if (saveBtn) {
        const item = saveBtn.closest('.comment-item--own');
        const edit = item ? item.querySelector('[data-role="edit"]') : null;
        if (!item || !edit) return;
        const cid = item.getAttribute('data-comment-id');
        const ta = edit.querySelector('.comment-edit-textarea');
        const text = (ta && ta.value ? ta.value : '').trim();
        let rating = parseInt(edit.dataset.editRating, 10);
        if (isNaN(rating) || rating < 1) {
            const active = edit.querySelectorAll('.glass-edit.active').length;
            rating = active > 0 ? active : 0;
        }
        if (rating < 1 || rating > 5) {
            alert('Elige una calificación con los vasos de leche.');
            return;
        }
        if (!text) {
            alert('Escribe un comentario.');
            return;
        }
        try {
            MooviesStorage.updateCommentById(cid, { comentario: text, vasosLeche: rating });
            loadCommentsForMovie(String(currentMovieId));
            renderProfileMyReviews();
        } catch (err) {
            alert(err.message || 'No se pudo guardar');
        }
    }
}

function openPublicProfileTab(username) {
    try {
        localStorage.setItem('moovies_open_profile_username', username);
    } catch (e) {
        /* ignore */
    }
    window.open('profile-view.html?user=' + encodeURIComponent(username), '_blank', 'noopener,noreferrer');
}

function loadCommentsForMovie(peliculaId) {
    const container = document.getElementById('commentsList');
    if (!container) return;
    const pid = String(peliculaId);
    const all = MooviesStorage.getComments();
    const filtered = all.filter(function (c) {
        return c && String(c.peliculaId) === pid;
    });
    filtered.sort(function (a, b) {
        var ta = a.fecha ? Date.parse(a.fecha) : 0;
        var tb = b.fecha ? Date.parse(b.fecha) : 0;
        return tb - ta;
    });
    renderCommentsList(filtered);
}

function openModalById(movieId) {
    const m = moviesCache.find((x) => String(x.id) === String(movieId));
    if (!m) return;
    currentMovieId = m.id;
    document.getElementById('modalTitle').innerText = m.titulo;
    const genreEl = document.getElementById('modalGenre');
    if (genreEl) genreEl.textContent = m.genero;
    document.getElementById('modalDirector').textContent = m.director || '—';
    document.getElementById('modalCompositor').textContent = m.compositor || '—';
    document.getElementById('modalGuionistas').textContent = m.guionistas || '—';
    document.getElementById('modalActores').textContent = m.actores || '—';
    const syn = document.getElementById('modalSynopsis');
    if (syn) {
        syn.value = m.descripcion || m.descripcionCorta || '';
    }
    document.getElementById('modalImg').src = m.imagen;
    document.getElementById('modalImg').alt = m.titulo;
    const tr = document.getElementById('modalTrailerBtn');
    if (tr) {
        if (m.trailerYoutube) {
            tr.href = m.trailerYoutube;
            tr.style.display = 'inline-flex';
        } else {
            tr.href = '#';
            tr.style.display = 'none';
        }
    }
    document.getElementById('movieModal').style.display = 'flex';
    syncBodyOverflow();
    resetRating();
    loadCommentsForMovie(String(m.id));
}

function syncBodyOverflow() {
    const mm = document.getElementById('movieModal');
    const pm = document.getElementById('profileModal');
    const em = document.getElementById('editAccountModal');
    const anyOpen = [mm, pm, em].some(function (el) {
        return el && el.style.display === 'flex';
    });
    document.body.style.overflow = anyOpen ? 'hidden' : '';
}

function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
    currentMovieId = null;
    syncBodyOverflow();
}

function setRating(n) {
    currentRating = n;
    const glasses = document.querySelectorAll('#milkRatingRow .glass');
    glasses.forEach((glass, index) => {
        if (index < n) glass.classList.add('active');
        else glass.classList.remove('active');
    });
}

function resetRating() {
    currentRating = 0;
    document.querySelectorAll('#milkRatingRow .glass').forEach((g) => g.classList.remove('active'));
    const ta = document.getElementById('reviewText');
    if (ta) ta.value = '';
}

function sendReview() {
    if (!currentMovieId) return;
    const session = MooviesStorage.getSessionUser();
    if (!session || !session.nombreUsuario) {
        window.location.href = 'login.html';
        return;
    }
    if (currentRating === 0) {
        alert('¡Por favor, califica la película con los vasos de leche!');
        return;
    }
    const text = (document.getElementById('reviewText').value || '').trim();
    if (!text) {
        alert('Escribe un comentario para tu reseña.');
        return;
    }
    try {
        MooviesStorage.addComment({
            peliculaId: String(currentMovieId),
            comentario: text,
            vasosLeche: currentRating,
        });
        resetRating();
        loadCommentsForMovie(String(currentMovieId));
        renderProfileMyReviews();
    } catch (err) {
        alert(err.message || 'No se pudo guardar la reseña');
    }
}

function toggleMenu() {
    document.getElementById('logoutMenu').classList.toggle('show');
}

function openMyProfile(event) {
    if (event) event.preventDefault();
    const menu = document.getElementById('logoutMenu');
    if (menu) menu.classList.remove('show');
    fillProfileModal();
    const pm = document.getElementById('profileModal');
    if (pm) {
        pm.style.display = 'flex';
        syncBodyOverflow();
    }
}

function closeProfileModal() {
    const pm = document.getElementById('profileModal');
    if (pm) pm.style.display = 'none';
    syncBodyOverflow();
}

function fillProfileModal() {
    const session = MooviesStorage.getSessionUser();
    if (!session || !session.nombreUsuario) return;
    const rec = MooviesStorage.getUserRecordByUsername(session.nombreUsuario);
    if (!rec) return;
    const set = function (id, val) {
        const el = document.getElementById(id);
        if (el) el.textContent = val || '';
    };
    set('profileDisplayName', rec.nombre || rec.nombreUsuario);
    set('profileUsername', rec.nombreUsuario);
    set('profileLeche', rec.lecheFavorita || '—');
    const adminBtn = document.getElementById('adminPanelButton');
    if (adminBtn) {
        const isAdmin = String(rec.nombreUsuario).toLowerCase() === 'admin';
        adminBtn.hidden = !isAdmin;
        adminBtn.disabled = !isAdmin;
    }
    const ta = document.getElementById('profileDescripcion');
    if (ta) ta.value = rec.descripcion != null ? rec.descripcion : '';
    renderProfileMyReviews();
    renderProfileFavorites();
}

function renderProfileMyReviews() {
    const box = document.getElementById('profileMyReviews');
    if (!box) return;
    const session = MooviesStorage.getSessionUser();
    if (!session || !session.nombreUsuario) {
        box.innerHTML = '';
        return;
    }
    const uname = session.nombreUsuario;
    const all = MooviesStorage.getComments().filter(function (c) {
        return c && String(c.usuario).toLowerCase() === String(uname).toLowerCase();
    });
    all.sort(function (a, b) {
        var ta = a.fecha ? Date.parse(a.fecha) : 0;
        var tb = b.fecha ? Date.parse(b.fecha) : 0;
        return tb - ta;
    });
    box.innerHTML = '';
    if (all.length === 0) {
        box.innerHTML = '<p class="comments-empty">Aún no has reseñado películas.</p>';
        return;
    }
    all.forEach(function (c) {
        const card = document.createElement('article');
        card.className = 'profile-review-card';
        card.innerHTML =
            '<h4>' +
            escapeHtml(getMovieTitleById(c.peliculaId)) +
            '</h4>' +
            '<div class="profile-review-card__meta">' +
            milkBottlesHTML(c.vasosLeche) +
            '</div>' +
            '<p class="profile-review-card__text">' +
            escapeHtml(c.comentario) +
            '</p>';
        box.appendChild(card);
    });
}

function renderFavoriteCardsInto(containerId, username, emptyText) {
    const box = document.getElementById(containerId);
    if (!box) return;
    const ids = MooviesStorage.getFavoritesForUser(username);
    box.innerHTML = '';
    if (!ids.length) {
        box.innerHTML = '<p class="comments-empty">' + escapeHtml(emptyText) + '</p>';
        return;
    }
    ids.forEach(function (movieId) {
        const m = getMovieById(movieId);
        if (!m) return;
        const card = document.createElement('article');
        card.className = 'profile-review-card';
        card.innerHTML =
            '<h4>' + escapeHtml(m.titulo) + '</h4>' +
            '<p class="profile-review-card__text">' + escapeHtml(m.genero || 'Sin género') + '</p>';
        box.appendChild(card);
    });
}

function renderProfileFavorites() {
    const session = MooviesStorage.getSessionUser();
    if (!session || !session.nombreUsuario) return;
    renderFavoriteCardsInto('profileFavoriteMovies', session.nombreUsuario, 'Aún no tienes favoritas.');
}

function saveProfileDescripcion() {
    const session = MooviesStorage.getSessionUser();
    if (!session || !session.nombreUsuario) return;
    const ta = document.getElementById('profileDescripcion');
    const text = ta ? ta.value : '';
    try {
        MooviesStorage.updateUserDescripcion(session.nombreUsuario, text);
        alert('Descripción guardada.');
    } catch (e) {
        alert(e.message || 'No se pudo guardar');
    }
}

function openEditAccountModal() {
    const session = MooviesStorage.getSessionUser();
    if (!session || !session.nombreUsuario) return;
    const rec = MooviesStorage.getUserRecordByUsername(session.nombreUsuario);
    if (!rec) return;
    const msg = document.getElementById('editAccountMessage');
    if (msg) {
        msg.hidden = true;
        msg.textContent = '';
    }
    document.getElementById('editNombreUsuario').value = rec.nombreUsuario || '';
    document.getElementById('editNombre').value = rec.nombre || '';
    document.getElementById('editEmail').value = rec.email || '';
    document.getElementById('editLeche').value = rec.lecheFavorita || 'Entera';
    document.getElementById('editPassword').value = '';
    const em = document.getElementById('editAccountModal');
    if (em) {
        em.style.display = 'flex';
        syncBodyOverflow();
    }
}

function closeEditAccountModal() {
    const em = document.getElementById('editAccountModal');
    if (em) em.style.display = 'none';
    syncBodyOverflow();
}

function logout(event) {
    event.preventDefault();
    if (!confirm('¿Estás seguro de que quieres cerrar sesión?')) return;
    MooviesStorage.clearMooviesSession();
    window.location.href = 'login.html';
}

window.onclick = function (event) {
    if (!event.target.closest('.user-menu')) {
        const dropdown = document.getElementById('logoutMenu');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
    const movieModal = document.getElementById('movieModal');
    if (event.target === movieModal) closeModal();
    const profileModal = document.getElementById('profileModal');
    if (event.target === profileModal) closeProfileModal();
    const editAccountModal = document.getElementById('editAccountModal');
    if (event.target === editAccountModal) closeEditAccountModal();
};

document.addEventListener('DOMContentLoaded', async function () {
    try {
        await MooviesStorage.ensureLocalJsonSeed();
    } catch (e) {
        console.error(e);
    }
    const commentsListEl = document.getElementById('commentsList');
    if (commentsListEl) {
        commentsListEl.addEventListener('click', handleCommentsListClick);
    }
    const user = requireSession();
    if (!user) return;
    setUserGreeting(user);
    await loadMovies();
    const form = document.getElementById('editAccountForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const msg = document.getElementById('editAccountMessage');
            const session = MooviesStorage.getSessionUser();
            if (!session || !session.nombreUsuario) return;
            const oldName = session.nombreUsuario;
            const pwdRaw = (document.getElementById('editPassword').value || '').trim();
            if (pwdRaw.length > 0 && pwdRaw.length < 4) {
                if (msg) {
                    msg.textContent = 'La contraseña debe tener al menos 4 caracteres o déjala en blanco.';
                    msg.hidden = false;
                }
                return;
            }
            try {
                const updated = MooviesStorage.updateAccountForUsername(oldName, {
                    nombreUsuario: document.getElementById('editNombreUsuario').value.trim(),
                    nombre: document.getElementById('editNombre').value.trim(),
                    email: document.getElementById('editEmail').value.trim(),
                    lecheFavorita: document.getElementById('editLeche').value,
                    password: pwdRaw.length ? pwdRaw : null,
                });
                MooviesStorage.setSessionUser({
                    nombreUsuario: updated.nombreUsuario,
                    nombre: updated.nombre,
                    email: updated.email,
                });
                setUserGreeting(MooviesStorage.getSessionUser());
                closeEditAccountModal();
                fillProfileModal();
                if (msg) {
                    msg.hidden = true;
                }
                alert('Cuenta actualizada.');
            } catch (err) {
                if (msg) {
                    msg.textContent = err.message || 'Error al guardar';
                    msg.hidden = false;
                }
            }
        });
    }
});
