document.addEventListener("DOMContentLoaded", () => {
    const inputAmigo = document.getElementById("amigo");
    const listaAmigos = document.getElementById("listaAmigos");
    const resultado = document.getElementById("resultado");
    const addButton = document.getElementById("addButton");
    const drawButton = document.getElementById("drawButton");

    let amigos = [];

    // Contenedor de notificaciones
    const notificacion = document.createElement("div");
    notificacion.classList.add("notificacion-container");
    document.body.appendChild(notificacion);

    // Asignar eventos
    addButton.addEventListener("click", agregarAmigo);
    drawButton.addEventListener("click", sortearAmigo);
    inputAmigo.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            agregarAmigo();
        }
    });

    /**
     * Muestra un mensaje en pantalla en la parte superior.
     * @param {string} texto - Texto del mensaje.
     * @param {string} tipo - Tipo de mensaje (error o éxito).
     */
    function mostrarMensaje(texto, tipo) {
        const mensaje = document.createElement("div");
        mensaje.classList.add("notificacion", tipo);
        mensaje.textContent = texto;
        
        notificacion.appendChild(mensaje);
        
        setTimeout(() => {
            mensaje.classList.add("desaparecer");
            setTimeout(() => mensaje.remove(), 500);
        }, 3000);
    }

    /* Agrega un nuevo amigo a la lista si es válido.
     */
    function agregarAmigo() {
        const nombre = inputAmigo.value.trim();
        
        if (!validarNombre(nombre)) return;
        if (amigos.length >= 6) {
            mostrarMensaje("⚠️ No puedes añadir más de 5 amigos.", "error");
            return;
        }

        amigos.push(nombre);
        actualizarLista();
        limpiarInput();
        mostrarMensaje(`✅ "${nombre}" ha sido agregado correctamente.`, "exito");
    }

    
    function validarNombre(nombre) {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/; // Solo letras y espacios

        if (!nombre) {
            mostrarMensaje("⚠️ Ingresa un nombre válido.", "error");
            return false;
        }

        if (!regex.test(nombre)) {
            mostrarMensaje("⚠️ Solo se permiten nombres con letras y espacios.", "error");
            return false;
        }

        if (amigos.includes(nombre)) {
            mostrarMensaje("⚠️ Ese nombre ya ha sido agregado.", "error");
            return false;
        }

        return true;
    }

    /** Actualiza la lista visual de amigos en el DOM de manera eficiente.
     */
    function actualizarLista() {
        listaAmigos.innerHTML = amigos.map(amigo => `<li>${amigo}</li>`).join("");
    }

    /**
     * Limpia el campo de entrada y lo enfoca para facilitar el ingreso.
     */
    function limpiarInput() {
        inputAmigo.value = "";
        inputAmigo.focus();
    }

    /**
     * Realiza el sorteo del amigo secreto de manera aleatoria.
     * Después de 5 segundos, se reinicia el juego.
     */
    function sortearAmigo() {
        if (amigos.length === 0) {
            mostrarMensaje("⚠️ Añade al menos un amigo para realizar el sorteo.", "error");
            return;
        }
        if (amigos.length !== 6) {
            mostrarMensaje("⚠️ Debes añadir exactamente 6 amigos para realizar el sorteo.", "error");
            return;
        }

        const indiceAleatorio = Math.floor(Math.random() * amigos.length);
        resultado.textContent = `🎉 ¡El amigo secreto es: ${amigos[indiceAleatorio]}!`;

        // Reiniciar el juego después de 5 segundos
        setTimeout(() => {
            amigos = [];
            actualizarLista();
            resultado.textContent = "";
            mostrarMensaje("🔄 Lista reiniciada. ¡Añade nuevos amigos!", "exito");
        }, 5000);
    }
});
