/**
 * Persistencia local + exportación por descarga (file:// no puede escribir en disco).
 * Comentarios: votos (like/dislike), respuestas anidadas.
 */
(function (global) {
    var K_USERS = 'moovies_users_v4';
    var K_COMMENTS = 'moovies_comments_v6';
    var K_FAVORITES = 'moovies_favorites_v1';
    var K_SESSION = 'moovies_session';

    function parseJsonArray(raw, fallback) {
        try {
            var a = JSON.parse(raw);
            return Array.isArray(a) ? a : fallback;
        } catch (e) {
            return fallback;
        }
    }

    function downloadJsonFile(filename, data) {
        try {
            var text = JSON.stringify(data, null, 2);
            var blob = new Blob([text], { type: 'application/json;charset=utf-8' });
            var a = document.createElement('a');
            var url = URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.rel = 'noopener';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function () {
                URL.revokeObjectURL(url);
            }, 2000);
        } catch (e) {
            console.error(e);
        }
    }

    function normalizeReply(r) {
        if (!r) return r;
        if (!Array.isArray(r.likedBy)) r.likedBy = [];
        if (!Array.isArray(r.dislikedBy)) r.dislikedBy = [];
        return r;
    }

    function normalizeComment(c) {
        if (!c) return c;
        if (!Array.isArray(c.respuestas)) c.respuestas = [];
        if (!Array.isArray(c.likedBy)) c.likedBy = [];
        if (!Array.isArray(c.dislikedBy)) c.dislikedBy = [];
        c.respuestas.forEach(normalizeReply);
        return c;
    }

    function getUsers() {
        return parseJsonArray(localStorage.getItem(K_USERS), []);
    }

    function saveUsers(users) {
        localStorage.setItem(K_USERS, JSON.stringify(users));
        downloadJsonFile('users.json', users);
    }

    function getComments() {
        var raw = parseJsonArray(localStorage.getItem(K_COMMENTS), []);
        return raw.map(function (c) {
            return normalizeComment(JSON.parse(JSON.stringify(c)));
        });
    }

    function saveComments(comments) {
        localStorage.setItem(K_COMMENTS, JSON.stringify(comments));
        downloadJsonFile('comments.json', comments);
    }

    function getFavoritesMap() {
        try {
            var raw = localStorage.getItem(K_FAVORITES);
            var obj = raw ? JSON.parse(raw) : {};
            if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return {};
            return obj;
        } catch (e) {
            return {};
        }
    }

    function saveFavoritesMap(map) {
        localStorage.setItem(K_FAVORITES, JSON.stringify(map || {}));
    }

    function normalizeMovieIdList(arr) {
        if (!Array.isArray(arr)) return [];
        var out = [];
        var seen = {};
        for (var i = 0; i < arr.length; i++) {
            var id = String(arr[i]);
            if (!seen[id]) {
                seen[id] = true;
                out.push(id);
            }
        }
        return out;
    }

    function getFavoritesForUser(nombreUsuario) {
        if (!nombreUsuario) return [];
        var map = getFavoritesMap();
        var key = String(nombreUsuario).toLowerCase();
        return normalizeMovieIdList(map[key]);
    }

    function setFavoritesForUser(nombreUsuario, movieIds) {
        if (!nombreUsuario) throw new Error('Usuario inválido');
        var map = getFavoritesMap();
        var key = String(nombreUsuario).toLowerCase();
        map[key] = normalizeMovieIdList(movieIds);
        saveFavoritesMap(map);
        return map[key];
    }

    function isFavoriteMovie(nombreUsuario, peliculaId) {
        var list = getFavoritesForUser(nombreUsuario);
        var pid = String(peliculaId);
        for (var i = 0; i < list.length; i++) {
            if (String(list[i]) === pid) return true;
        }
        return false;
    }

    function toggleFavoriteMovie(peliculaId) {
        var session = getSessionUser();
        if (!session || !session.nombreUsuario) throw new Error('Inicia sesión para guardar favoritos');
        if (!isRegisteredUsername(session.nombreUsuario)) throw new Error('Cuenta no registrada');
        var pid = String(peliculaId);
        var list = getFavoritesForUser(session.nombreUsuario);
        var exists = false;
        var next = [];
        for (var i = 0; i < list.length; i++) {
            if (String(list[i]) === pid) {
                exists = true;
                continue;
            }
            next.push(String(list[i]));
        }
        if (!exists) next.push(pid);
        setFavoritesForUser(session.nombreUsuario, next);
        return !exists;
    }

    function getRegisteredUsernamesLower() {
        var users = getUsers();
        var set = {};
        for (var i = 0; i < users.length; i++) {
            var nu = users[i].nombreUsuario;
            if (nu) set[String(nu).toLowerCase()] = true;
        }
        return set;
    }

    function isRegisteredUsername(nombreUsuario) {
        if (!nombreUsuario) return false;
        var want = String(nombreUsuario).toLowerCase();
        var users = getUsers();
        for (var i = 0; i < users.length; i++) {
            if (users[i].nombreUsuario && String(users[i].nombreUsuario).toLowerCase() === want) {
                return true;
            }
        }
        return false;
    }

    function filterCommentsLinkedToUsers(comments) {
        var set = getRegisteredUsernamesLower();
        return (comments || []).filter(function (c) {
            return c && c.usuario && set[String(c.usuario).toLowerCase()];
        });
    }

    function getDisplayNameForUsuario(nombreUsuario) {
        if (!nombreUsuario) return '';
        var want = String(nombreUsuario).toLowerCase();
        var users = getUsers();
        for (var i = 0; i < users.length; i++) {
            if (users[i].nombreUsuario && String(users[i].nombreUsuario).toLowerCase() === want) {
                return users[i].nombre || users[i].nombreUsuario;
            }
        }
        return nombreUsuario;
    }

    function getUserRecordByUsername(nombreUsuario) {
        if (!nombreUsuario) return null;
        var want = String(nombreUsuario).toLowerCase();
        var users = getUsers();
        for (var i = 0; i < users.length; i++) {
            if (users[i].nombreUsuario && String(users[i].nombreUsuario).toLowerCase() === want) {
                return users[i];
            }
        }
        return null;
    }

    function updateUserDescripcion(nombreUsuario, descripcion) {
        var users = getUsers();
        var want = String(nombreUsuario).toLowerCase();
        for (var i = 0; i < users.length; i++) {
            if (users[i].nombreUsuario && String(users[i].nombreUsuario).toLowerCase() === want) {
                users[i].descripcion = descripcion == null ? '' : String(descripcion);
                saveUsers(users);
                return users[i];
            }
        }
        throw new Error('Usuario no encontrado');
    }

    function replaceUsernameInVoteArrays(arr, oldU, newU) {
        var ol = String(oldU).toLowerCase();
        for (var i = 0; i < arr.length; i++) {
            if (String(arr[i]).toLowerCase() === ol) {
                arr[i] = newU;
            }
        }
    }

    function updateAccountForUsername(oldUsername, patch) {
        var users = getUsers();
        var oldLower = String(oldUsername).toLowerCase();
        var idx = -1;
        for (var i = 0; i < users.length; i++) {
            if (users[i].nombreUsuario && String(users[i].nombreUsuario).toLowerCase() === oldLower) {
                idx = i;
                break;
            }
        }
        if (idx < 0) throw new Error('Usuario no encontrado');
        var nu = patch.nombreUsuario != null ? String(patch.nombreUsuario).trim() : users[idx].nombreUsuario;
        var em = patch.email != null ? String(patch.email).trim() : users[idx].email;
        var nm = patch.nombre != null ? String(patch.nombre).trim() : users[idx].nombre;
        var leche = patch.lecheFavorita != null ? patch.lecheFavorita : users[idx].lecheFavorita;
        if (!nu || nu.length < 3) throw new Error('Nombre de usuario inválido');
        if (!em) throw new Error('Correo inválido');
        var nuLower = nu.toLowerCase();
        var emLower = em.toLowerCase();
        for (var j = 0; j < users.length; j++) {
            if (j === idx) continue;
            if (users[j].nombreUsuario && String(users[j].nombreUsuario).toLowerCase() === nuLower) {
                throw new Error('Ese nombre de usuario ya está en uso');
            }
            if (users[j].email && String(users[j].email).toLowerCase() === emLower) {
                throw new Error('Ese correo ya está registrado');
            }
        }
        var newPass = patch.password != null ? String(patch.password) : null;
        if (newPass !== null && newPass !== '' && newPass.length < 4) {
            throw new Error('La contraseña debe tener al menos 4 caracteres');
        }
        var prevUser = users[idx].nombreUsuario;
        if (prevUser !== nu) {
            var comments = getComments();
            for (var k = 0; k < comments.length; k++) {
                var c = comments[k];
                if (!c) continue;
                if (String(c.usuario).toLowerCase() === oldLower) {
                    c.usuario = nu;
                }
                replaceUsernameInVoteArrays(c.likedBy, prevUser, nu);
                replaceUsernameInVoteArrays(c.dislikedBy, prevUser, nu);
                if (Array.isArray(c.respuestas)) {
                    for (var r = 0; r < c.respuestas.length; r++) {
                        var rep = c.respuestas[r];
                        if (!rep) continue;
                        if (String(rep.usuario).toLowerCase() === oldLower) {
                            rep.usuario = nu;
                        }
                        replaceUsernameInVoteArrays(rep.likedBy, prevUser, nu);
                        replaceUsernameInVoteArrays(rep.dislikedBy, prevUser, nu);
                    }
                }
            }
            saveComments(comments);
            var favoritesMap = getFavoritesMap();
            var oldFavKey = String(prevUser).toLowerCase();
            var newFavKey = String(nu).toLowerCase();
            if (favoritesMap[oldFavKey]) {
                favoritesMap[newFavKey] = normalizeMovieIdList(favoritesMap[oldFavKey]);
                delete favoritesMap[oldFavKey];
                saveFavoritesMap(favoritesMap);
            }
        }
        users[idx].nombreUsuario = nu;
        users[idx].nombre = nm;
        users[idx].email = em;
        users[idx].lecheFavorita = leche;
        if (newPass !== null && newPass !== '') {
            users[idx].password = newPass;
        }
        saveUsers(users);
        return users[idx];
    }

    function ensureLocalJsonSeed() {
        return new Promise(function (resolve) {
            var seed = global.MOOVIES_SEED || {};
            if (localStorage.getItem(K_USERS) === null) {
                var u = Array.isArray(seed.users) ? seed.users : [];
                localStorage.setItem(K_USERS, JSON.stringify(u));
            }
            if (localStorage.getItem(K_COMMENTS) === null) {
                var c = Array.isArray(seed.comments) ? seed.comments : [];
                localStorage.setItem(K_COMMENTS, JSON.stringify(c));
            }
            resolve();
        });
    }

    function getSessionUser() {
        try {
            var raw = sessionStorage.getItem(K_SESSION);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function setSessionUser(user) {
        sessionStorage.setItem(K_SESSION, JSON.stringify(user));
    }

    function clearMooviesSession() {
        sessionStorage.removeItem(K_SESSION);
    }

    function hasUserInList(arr, nombreUsuario) {
        var lu = String(nombreUsuario).toLowerCase();
        for (var i = 0; i < arr.length; i++) {
            if (String(arr[i]).toLowerCase() === lu) return true;
        }
        return false;
    }

    function removeUserFromList(arr, nombreUsuario) {
        var lu = String(nombreUsuario).toLowerCase();
        return arr.filter(function (x) {
            return String(x).toLowerCase() !== lu;
        });
    }

    function rewriteArray(target, newValues) {
        target.length = 0;
        for (var i = 0; i < newValues.length; i++) target.push(newValues[i]);
    }

    function toggleVoteOnArrays(likedBy, dislikedBy, nombreUsuario, kind) {
        var u = nombreUsuario;
        if (kind === 'like') {
            if (hasUserInList(likedBy, u)) {
                rewriteArray(likedBy, removeUserFromList(likedBy, u));
            } else {
                rewriteArray(dislikedBy, removeUserFromList(dislikedBy, u));
                likedBy.push(u);
            }
            return;
        }
        if (kind === 'dislike') {
            if (hasUserInList(dislikedBy, u)) {
                rewriteArray(dislikedBy, removeUserFromList(dislikedBy, u));
            } else {
                rewriteArray(likedBy, removeUserFromList(likedBy, u));
                dislikedBy.push(u);
            }
        }
    }

    function toggleCommentVote(commentId, replyId, kind) {
        var session = getSessionUser();
        if (!session || !session.nombreUsuario) throw new Error('Inicia sesión para votar');
        if (!isRegisteredUsername(session.nombreUsuario)) throw new Error('Cuenta no registrada');
        var u = session.nombreUsuario;
        var comments = getComments();
        var ci = -1;
        for (var i = 0; i < comments.length; i++) {
            if (comments[i] && String(comments[i].id) === String(commentId)) {
                ci = i;
                break;
            }
        }
        if (ci < 0) throw new Error('Comentario no encontrado');
        normalizeComment(comments[ci]);
        if (!replyId || replyId === '') {
            toggleVoteOnArrays(comments[ci].likedBy, comments[ci].dislikedBy, u, kind);
            saveComments(comments);
            return comments[ci];
        }
        var resp = comments[ci].respuestas;
        var ri = -1;
        for (var r = 0; r < resp.length; r++) {
            if (resp[r] && String(resp[r].id) === String(replyId)) {
                ri = r;
                break;
            }
        }
        if (ri < 0) throw new Error('Respuesta no encontrada');
        normalizeReply(resp[ri]);
        toggleVoteOnArrays(resp[ri].likedBy, resp[ri].dislikedBy, u, kind);
        saveComments(comments);
        return comments[ci];
    }

    function findCommentIndexForUserAndMovie(peliculaId, nombreUsuario) {
        if (!nombreUsuario) return -1;
        var want = String(nombreUsuario).toLowerCase();
        var pid = String(peliculaId);
        var comments = getComments();
        for (var i = 0; i < comments.length; i++) {
            if (
                comments[i] &&
                String(comments[i].peliculaId) === pid &&
                String(comments[i].usuario).toLowerCase() === want
            ) {
                return i;
            }
        }
        return -1;
    }

    function updateCommentById(commentId, patch) {
        var session = getSessionUser();
        if (!session || !session.nombreUsuario) {
            throw new Error('Sesión inválida');
        }
        var comments = getComments();
        var idx = -1;
        for (var i = 0; i < comments.length; i++) {
            if (comments[i] && String(comments[i].id) === String(commentId)) {
                idx = i;
                break;
            }
        }
        if (idx < 0) throw new Error('Comentario no encontrado');
        if (String(comments[idx].usuario).toLowerCase() !== String(session.nombreUsuario).toLowerCase()) {
            throw new Error('No puedes editar este comentario');
        }
        if (patch.comentario != null) {
            comments[idx].comentario = String(patch.comentario);
        }
        if (patch.vasosLeche != null) {
            comments[idx].vasosLeche = parseInt(patch.vasosLeche, 10) || 0;
        }
        comments[idx].fecha = new Date().toISOString();
        saveComments(comments);
        return comments[idx];
    }

    function deleteCommentById(commentId) {
        var session = getSessionUser();
        if (!session || !session.nombreUsuario) {
            throw new Error('Sesión inválida');
        }
        var comments = getComments();
        var idx = -1;
        for (var i = 0; i < comments.length; i++) {
            if (comments[i] && String(comments[i].id) === String(commentId)) {
                idx = i;
                break;
            }
        }
        if (idx < 0) throw new Error('Comentario no encontrado');
        if (String(comments[idx].usuario).toLowerCase() !== String(session.nombreUsuario).toLowerCase()) {
            throw new Error('No puedes borrar este comentario');
        }
        comments.splice(idx, 1);
        saveComments(comments);
    }

    function addComment(entry) {
        var session = getSessionUser();
        if (!session || !session.nombreUsuario) {
            throw new Error('Sesión inválida');
        }
        if (!isRegisteredUsername(session.nombreUsuario)) {
            throw new Error('Tu cuenta no está registrada');
        }
        var pid = String(entry.peliculaId);
        var comments = getComments();
        var row = {
            id: entry.id || 'c_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8),
            peliculaId: pid,
            usuario: session.nombreUsuario,
            comentario: entry.comentario,
            vasosLeche: parseInt(entry.vasosLeche, 10) || 0,
            fecha: entry.fecha || new Date().toISOString(),
            likedBy: [],
            dislikedBy: [],
            respuestas: [],
        };
        comments.push(row);
        saveComments(comments);
        return row;
    }

    global.MooviesStorage = {
        ensureLocalJsonSeed: ensureLocalJsonSeed,
        getUsers: getUsers,
        saveUsers: saveUsers,
        getComments: getComments,
        saveComments: saveComments,
        getSessionUser: getSessionUser,
        setSessionUser: setSessionUser,
        clearMooviesSession: clearMooviesSession,
        addComment: addComment,
        filterCommentsLinkedToUsers: filterCommentsLinkedToUsers,
        getDisplayNameForUsuario: getDisplayNameForUsuario,
        getUserRecordByUsername: getUserRecordByUsername,
        updateUserDescripcion: updateUserDescripcion,
        updateAccountForUsername: updateAccountForUsername,
        findCommentIndexForUserAndMovie: findCommentIndexForUserAndMovie,
        updateCommentById: updateCommentById,
        deleteCommentById: deleteCommentById,
        toggleCommentVote: toggleCommentVote,
        getFavoritesForUser: getFavoritesForUser,
        setFavoritesForUser: setFavoritesForUser,
        isFavoriteMovie: isFavoriteMovie,
        toggleFavoriteMovie: toggleFavoriteMovie,
        isRegisteredUsername: isRegisteredUsername,
        downloadJsonFile: downloadJsonFile,
        normalizeComment: normalizeComment,
    };
})(typeof window !== 'undefined' ? window : this);
