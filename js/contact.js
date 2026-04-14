// for update ...

// --- FUNCIÓN DE CONTACTO (Archivo separado) ---
function contactUs() {
    const email = "feriva00526@gmail.com";
    const subject = "Duda sobre MOOVIES";
    const body = "Hola, tengo una duda sobre la página web...";
    
    // Abre el cliente de correo predeterminado
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
