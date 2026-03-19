let currentRating = 0;

// --- FUNCIONES DEL MODAL ---
function openModal(title, synopsis, imgUrl) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalSynopsis').innerText = synopsis;
    document.getElementById('modalImg').src = imgUrl;
    document.getElementById('movieModal').style.display = 'block';
    resetRating();
}

function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
}

function setRating(n) {
    currentRating = n;
    const glasses = document.querySelectorAll('.glass');
    glasses.forEach((glass, index) => {
        index < n ? glass.classList.add('active') : glass.classList.remove('active');
    });
}

function resetRating() {
    currentRating = 0;
    document.querySelectorAll('.glass').forEach(g => g.classList.remove('active'));
    document.getElementById('reviewText').value = '';
}

function sendReview() {
    if(currentRating === 0) return alert("¡Por favor, califica la película!");
    alert("¡Reseña enviada con éxito!");
    closeModal();
}

// --- FUNCIONES DE CIERRE DE SESIÓN ---

// Abre y cierra el menú desplegable
function toggleMenu() {
    document.getElementById("logoutMenu").classList.toggle("show");
}

// Maneja el cierre de sesión
function logout(event) {
    event.preventDefault();
    const confirmar = confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (confirmar) {
        // Redirige al login que está en la misma carpeta HTML
        window.location.href = "login.html";
    }
}

// Cierra el menú si haces clic fuera de él
window.onclick = function(event) {
    // Si el clic no es en el botón del usuario, cierra el dropdown
    if (!event.target.matches('.user-info')) {
        const dropdown = document.getElementById("logoutMenu");
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
    
    // Cerrar modal si se hace clic fuera
    let modal = document.getElementById('movieModal');
    if (event.target == modal) {
        closeModal();
    }
}