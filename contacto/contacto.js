document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('status-msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    //* limpiar errores previos.
    //* -> función:
    //* x evitar que mensajes antiguos se acumulen o sigan visibles después de un nuevo intento.
    //* x evita que campos queden marcados erróneamente si se corrigen.
    //* x hace que la interfaz refñeje únicamente el estado más reciente del formulario, evitando confusión.
    document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

    let valido = true;

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const asunto = form.asunto.value.trim();
    const fecha = form.fecha.value.trim();
    const entero = form.entero.value.trim();
    const decimal = form.decimal.value.trim();
    const mensaje = form.mensaje.value.trim();

    //* validaciones
    //* 1) nombre
    if (!nombre) {
      mostrarError('nombre', 'Campo obligatorio');
      valido = false;
    }

    //* 2) email
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!email) {
      mostrarError('email', 'Campo obligatorio');
      valido = false;
    } else if (!emailRegex.test(email)) {
      mostrarError('email', 'Correo no válido');
      valido = false;
    }

    //* 3) asunto
    if (!asunto) {
      mostrarError('asunto', 'Campo obligatorio');
      valido = false;
    }

    //* 4) fecha (formato y validez)
    if (!fecha) {
      mostrarError('fecha', 'Campo obligatorio');
      valido = false;
    } else if (!fechaValida(fecha)) {
      mostrarError('fecha', 'Fecha no válida');
      valido = false;
    }

    //* 5) entero (mayor a 0)
    const numEntero = parseInt(entero);
    if (!entero) {
      mostrarError('entero', 'Campo obligatorio');
      valido = false;
    } else if (isNaN(numEntero) || numEntero <= 0) {
      mostrarError('entero', 'Debe ser un número entero mayor a 0');
      valido = false;
    }

    //* 6) decimal (opcional)
    if (decimal && isNaN(parseFloat(decimal))) {
      mostrarError('decimal', 'Debe ser un número decimal válido');
      valido = false;
    }

    //* 7) mensaje
    if (!mensaje) {
      mostrarError('mensaje', 'Campo obligatorio');
      valido = false;
    } else if (mensaje.length > 300) {
      mostrarError('mensaje', 'Máximo 300 caracteres');
      valido = false;
    }

    //* mostrar resultado
    if (valido) {
      statusMsg.textContent = "✅ Formulario válido. Enviado con éxito.";
      form.reset();
    } else {
      statusMsg.textContent = "❌ Errores detectados. Revisá los campos marcados.";
      statusMsg.style.color = "#ff6b6b";
    }
  });

  //* funciones auxiliares
  function mostrarError(campo, mensaje) {
    const input = document.getElementById(campo);
    const msg = input.parentElement.querySelector('.error-msg');
    input.classList.add('error');
    msg.textContent = mensaje;
  }

  function fechaValida(fechaStr) {
    const [año, mes, dia] = fechaStr.split('-').map(Number);
    const fecha = new Date(año, mes - 1, dia);
    // *validamos que coincida con lo ingresado y sea posible
    return (
      fecha.getFullYear() === año &&
      fecha.getMonth() === mes - 1 &&
      fecha.getDate() === dia
    );
  }
});
