document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('../api/perfil.php');
    const data = await res.json();
    console.log(data);
    if (!data.success) {
        document.getElementById('profileViewError').textContent = data.error;
        document.getElementById('profileViewError').hidden = false;
        return;
    }

    renderUser(data.user);
    renderReviews(data.reviews);

    document.getElementById('profileViewContent').hidden = false;
});

function renderUser(user) {
    document.getElementById('pvUsername').textContent = user.username;
    document.getElementById('pvLeche').textContent = user.milk || '—';

    // 🔥 preload inputs
    document.getElementById('editUsername').value = user.username;

    // optional: map milk text → select
    const milkMap = {
        "Entera": "1",
        "Deslactosada": "2",
        "Almendra": "3"
    };

    const milkSelect = document.getElementById('editMilk');
    milkSelect.value = milkMap[user.milk] || "";
}

function renderReviews(reviews) {
    const container = document.getElementById('pvReviews');
    container.innerHTML = '';

    if (!reviews.length) {
        container.innerHTML = '<p>No has hecho reseñas aún.</p>';
        return;
    }

    reviews.forEach(r => {
        const div = document.createElement('div');
        div.className = 'profile-review-card';

        div.innerHTML = `
            <h4>${r.movie_title}</h4>
            <p>${r.content}</p>
            <p>${'🥛'.repeat(r.rating)}</p>
            <a href="movie.html?id=${r.movie_id}">Ver película</a>
        `;

        container.appendChild(div);
    });
}

async function updateProfile() {
    const username = document.getElementById('editUsername').value.trim();
    const milk_id = document.getElementById('editMilk').value;

    const payload = {};

    if (username) payload.username = username;
    if (milk_id) payload.milk_id = milk_id;

    const res = await fetch('../api/update_profile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.success) {
        alert("Perfil actualizado");
        location.reload();
    } else {
        alert("Error: " + data.error);
    }
}
