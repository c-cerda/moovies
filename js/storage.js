/**
 * Persistencia local (solo navegador): los comentarios se guardan como el mismo array
 * que define json/comments.json, pero en localStorage (clave: moovies_comments_v6).
 * JavaScript en el cliente no puede sobrescribir archivos .json del proyecto en disco.
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
    }

    function getComments() {
        var raw = parseJsonArray(localStorage.getItem(K_COMMENTS), []);
        return raw.map(function (c) {
            return normalizeComment(JSON.parse(JSON.stringify(c)));
        });
    }

    function saveComments(comments) {
        localStorage.setItem(K_COMMENTS, JSON.stringify(comments));
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
        
        var nuLower = nu.toLowerCase();
        for (var j = 0; j < users.length; j++) {
            if (j === idx) continue;
            if (users[j].nombreUsuario && String(users[j].nombreUsuario).toLowerCase() === nuLower) {
                throw new Error('Ese nombre de usuario ya está en uso');
            }
        }

        var prevUser = users[idx].nombreUsuario;
        if (prevUser !== nu) {
            // Actualizar usuario en comentarios y votos
            var comments = getComments();
            comments.forEach(function (c) {
                if (String(c.usuario).toLowerCase() === oldLower) c.usuario = nu;
                replaceUsernameInVoteArrays(c.likedBy, prevUser, nu);
                replaceUsernameInVoteArrays(c.dislikedBy, prevUser, nu);
                if (c.respuestas) {
                    c.respuestas.forEach(function (rep) {
                        if (String(rep.usuario).toLowerCase() === oldLower) rep.usuario = nu;
                        replaceUsernameInVoteArrays(rep.likedBy, prevUser, nu);
                        replaceUsernameInVoteArrays(rep.dislikedBy, prevUser, nu);
                    });
                }
            });
            saveComments(comments);

            // Migrar favoritos
            var favoritesMap = getFavoritesMap();
            if (favoritesMap[oldLower]) {
                favoritesMap[nuLower] = favoritesMap[oldLower];
                delete favoritesMap[oldLower];
                saveFavoritesMap(favoritesMap);
            }
        }

        users[idx].nombreUsuario = nu;
        users[idx].nombre = nm;
        users[idx].email = em;
        users[idx].lecheFavorita = leche;
        if (patch.password) users[idx].password = patch.password;

        saveUsers(users);
        return users[idx];
    }

    function updateUserDescripcion(nombreUsuario, descripcion) {
        if (!nombreUsuario) throw new Error('Usuario inválido');
        var users = getUsers();
        var want = String(nombreUsuario).toLowerCase();
        var idx = -1;
        for (var i = 0; i < users.length; i++) {
            if (users[i].nombreUsuario && String(users[i].nombreUsuario).toLowerCase() === want) {
                idx = i;
                break;
            }
        }
        if (idx < 0) throw new Error('Usuario no encontrado');
        users[idx].descripcion = descripcion != null ? String(descripcion) : '';
        saveUsers(users);
        return users[idx];
    }

    function ensureLocalJsonSeed() {
        return new Promise(function (resolve) {
            var seed = global.MOOVIES_SEED || {};
            if (localStorage.getItem(K_USERS) === null) {
                saveUsers(Array.isArray(seed.users) ? seed.users : []);
            }
            if (localStorage.getItem(K_COMMENTS) === null) {
                saveComments(Array.isArray(seed.comments) ? seed.comments : []);
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
        return arr.some(function(u) { return String(u).toLowerCase() === lu; });
    }

    function removeUserFromList(arr, nombreUsuario) {
        var lu = String(nombreUsuario).toLowerCase();
        return arr.filter(function (x) {
            return String(x).toLowerCase() !== lu;
        });
    }

    function rewriteArray(target, newValues) {
        target.length = 0;
        newValues.forEach(function(v) { target.push(v); });
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
        } else if (kind === 'dislike') {
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
        
        var comments = getComments();
        var comment = comments.find(function(c) { return String(c.id) === String(commentId); });
        if (!comment) throw new Error('Comentario no encontrado');

        if (!replyId) {
            toggleVoteOnArrays(comment.likedBy, comment.dislikedBy, session.nombreUsuario, kind);
        } else {
            var reply = comment.respuestas.find(function(r) { return String(r.id) === String(replyId); });
            if (!reply) throw new Error('Respuesta no encontrada');
            toggleVoteOnArrays(reply.likedBy, reply.dislikedBy, session.nombreUsuario, kind);
        }

        saveComments(comments);
        return comment;
    }

    function addComment(entry) {
        var session = getSessionUser();
        if (!session) throw new Error('Sesión inválida');
        
        var comments = getComments();
        var row = {
            id: 'c_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
            peliculaId: String(entry.peliculaId),
            usuario: session.nombreUsuario,
            comentario: entry.comentario,
            vasosLeche: parseInt(entry.vasosLeche, 10) || 0,
            fecha: new Date().toISOString(),
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
        getDisplayNameForUsuario: getDisplayNameForUsuario,
        getUserRecordByUsername: getUserRecordByUsername,
        updateAccountForUsername: updateAccountForUsername,
        updateUserDescripcion: updateUserDescripcion,
        toggleCommentVote: toggleCommentVote,
        getFavoritesForUser: getFavoritesForUser,
        setFavoritesForUser: setFavoritesForUser,
        isFavoriteMovie: isFavoriteMovie,
        toggleFavoriteMovie: toggleFavoriteMovie,
        downloadJsonFile: downloadJsonFile,
        normalizeComment: normalizeComment
    };
})(typeof window !== 'undefined' ? window : this);