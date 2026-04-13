// comentarios_admin.js
async function init() {
    await MooviesStorage.ensureLocalJsonSeed();
    render();
}

function render() {
    const comments = MooviesStorage.getComments();
    const tbody = document.getElementById('tablaComentariosBody');
    if (!tbody) return;
    tbody.innerHTML = comments.map(c => `
        <tr>
            <td><strong>${c.usuario}</strong></td>
            <td>"${c.comentario}"</td>
            <td><button class="btn-moo" style="background:red; color:white;" onclick="borrarC('${c.id}')">Eliminar</button></td>
        </tr>
    `).join('');
}

function borrarC(id) {
    if(confirm("¿Eliminar comentario permanentemente? Esto limpiará la vista del catálogo.")) {
        MooviesStorage.deleteCommentById(id);
        render();
    }
}

window.onload = init;