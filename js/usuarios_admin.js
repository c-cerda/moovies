// usuarios_admin.js
async function init() {
    await MooviesStorage.ensureLocalJsonSeed();
    render();
}

function render() {
    const users = MooviesStorage.getUsers();
    const tbody = document.getElementById('tablaUsuariosBody');
    if (!tbody) return;
    tbody.innerHTML = users.map(u => `
        <tr>
            <td>${u.nombreUsuario}</td>
            <td>${u.email}</td>
            <td>
                <button class="btn-moo" onclick="alert('Editando a: ${u.nombreUsuario}')">✏️</button>
                <button class="btn-moo" style="background:red; color:white;" onclick="deleteU('${u.nombreUsuario}')">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function deleteU(username) {
    if(confirm(`¿Deseas eliminar al usuario ${username}? No podrá volver a iniciar sesión.`)) {
        let users = MooviesStorage.getUsers().filter(x => x.nombreUsuario !== username);
        // Usamos el método de tu almacenamiento para guardar
        localStorage.setItem('moovies_users', JSON.stringify(users));
        render();
    }
}

window.onload = init;