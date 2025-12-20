/**
 * Vox Schola - Script Maestro
 */

// CONFIGURACIÓN DE USUARIO SIMULADA
const USUARIO_SESION = {
    nombre: "Jose Luis Armenta",
    rol: "admin",      // Cambia a "padre" para ocultar el formulario de registro
    verificado: false  
};

document.addEventListener('DOMContentLoaded', () => {

    // === 1. CONTROL DE ACCESO (ADMIN VS PADRE) ===
    const seccionAdmin = document.getElementById('seccion-admin-registro');
    
    if (seccionAdmin) {
        if (USUARIO_SESION.rol === 'admin') {
            seccionAdmin.classList.remove('hidden');
        } else {
            seccionAdmin.classList.add('hidden');
        }
    }

    // === 2. LÓGICA DE VERIFICACIÓN DE CUENTA ===
    const btnVerificar = document.getElementById('btn-verificar-cuenta');
    const statusText = document.getElementById('status-text');
    const statusDot = document.getElementById('status-dot');
    const cardVerificacion = document.getElementById('card-verificacion');

    if (btnVerificar) {
        btnVerificar.addEventListener('click', () => {
            btnVerificar.innerText = "Verificando...";
            btnVerificar.disabled = true;

            setTimeout(() => {
                if (statusText) {
                    statusText.innerText = "Verificado";
                    statusText.style.color = "#10b981";
                }
                if (statusDot) statusDot.innerText = "🟢";
                if (cardVerificacion) cardVerificacion.style.display = "none";
                
                USUARIO_SESION.verificado = true;
                alert("¡Cuenta verificada con éxito!");
            }, 1500);
        });
    }

    // === 3. GESTIÓN DE FINANZAS CON PERSISTENCIA (LOCALSTORAGE) ===
    const formFinanzas = document.getElementById('form-finanzas');

    if (formFinanzas) {
        formFinanzas.addEventListener('submit', function(e) {
            e.preventDefault();

            // Extraer datos
            const nuevoMovimiento = {
                fecha: document.getElementById('fecha').value,
                desc: document.getElementById('descripcion').value,
                cat: document.getElementById('categoria').value,
                monto: document.getElementById('monto').value,
                tipo: document.getElementById('tipo').value
            };

            // Guardar en la "memoria" del navegador (localStorage)
            let lista = JSON.parse(localStorage.getItem('datosVox')) || [];
            lista.push(nuevoMovimiento);
            localStorage.setItem('datosVox', JSON.stringify(lista));

            // Actualizar la tabla y el resumen (llama a la función que ya definimos antes)
            if (typeof cargarDatos === 'function') {
                cargarDatos();
            } else {
                location.reload(); // Recarga para mostrar cambios si no encuentra la función
            }

            formFinanzas.reset();
        });
    }

    // === 4. LÓGICA DE VOTACIONES ===
    const voteBtns = document.querySelectorAll('.vote-button');
    voteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!USUARIO_SESION.verificado) {
                alert("Debes verificar tu cuenta primero para poder votar.");
            } else {
                alert("Voto registrado. ¡Gracias por participar!");
                btn.disabled = true;
                btn.innerText = "Votado";
            }
        });
    });
});