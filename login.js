document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginUser = document.getElementById('login-username');
    const loginPass = document.getElementById('login-password');
    const loginPassGroup = document.getElementById('login-pass-group');

    const registerForm = document.getElementById('register-form');
    const regUser = document.getElementById('reg-username');
    const regPass = document.getElementById('reg-password');
    const regPass2 = document.getElementById('reg-password2');
    const regPassGroup = document.getElementById('reg-pass-group');
    const regPass2Group = document.getElementById('reg-pass2-group');

    const msg = document.getElementById('login-msg');
    const logoLink = document.getElementById('home-logo');

    const toRegister = document.getElementById('to-register');
    const toLogin = document.getElementById('to-login');
    const formTitle = document.getElementById('form-title');

    // Abrir Main como invitado para evitar redirección
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Main.html?guest=1';
        });
    }

    // helpers para mostrar/ocultar con animación
    function showEl(el) {
        if (!el) return;
        el.classList.remove('hidden');
        // trigger reflow para reiniciar animación si es necesario
        void el.offsetWidth;
        el.classList.add('fade-in');
    }
    function hideEl(el) {
        if (!el) return;
        el.classList.remove('fade-in');
        el.classList.add('hidden');
    }

    // Utilidades usuarios en localStorage
    function loadUsers() {
        try {
            return JSON.parse(localStorage.getItem('mkl_users') || '{}');
        } catch {
            return {};
        }
    }
    function saveUsers(users) {
        localStorage.setItem('mkl_users', JSON.stringify(users));
    }

    // Si ya está logueado, ir a Main directamente
    if (localStorage.getItem('mkl_logged') === '1') {
        window.location.href = 'Main.html';
        return;
    }

    // Toggle entre login / register
    function showRegister() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        toRegister.style.display = 'none';
        toLogin.style.display = 'inline';
        formTitle.textContent = 'Registrarse';
        msg.textContent = '';
        // ocultar campos de contraseña hasta validar username
        hideEl(regPassGroup);
        hideEl(regPass2Group);
    }
    function showLogin() {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        toRegister.style.display = 'inline';
        toLogin.style.display = 'none';
        formTitle.textContent = 'Iniciar sesión';
        msg.textContent = '';
        // ocultar campo contraseña hasta validar usuario
        hideEl(loginPassGroup);
    }

    toRegister.addEventListener('click', showRegister);
    toLogin.addEventListener('click', showLogin);

    // Manejar login (dos pasos: usuario -> mostrar pass -> validar)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginUser.value.trim();
        const password = loginPass ? loginPass.value : '';

        // si el grupo de password está oculto: validar existencia del usuario
        if (loginPassGroup && loginPassGroup.classList.contains('hidden')) {
            if (!username) {
                msg.style.color = '#ff6961';
                msg.textContent = 'Ingresa un usuario.';
                return;
            }
            const users = loadUsers();
            if (!users[username]) {
                msg.style.color = '#ff6961';
                msg.textContent = 'Usuario no encontrado.';
                return;
            }
            // usuario correcto -> mostrar contraseña con animación
            msg.textContent = 'Usuario encontrado. Ingresa tu contraseña.';
            msg.style.color = '#66fcf1';
            showEl(loginPassGroup);
            if (loginPass) loginPass.focus();
            return;
        }

        // si ya está visible, validar credenciales
        if (!username || !password) {
            msg.style.color = '#ff6961';
            msg.textContent = 'Completa usuario y contraseña.';
            return;
        }

        const users = loadUsers();
        if (!users[username]) {
            msg.style.color = '#ff6961';
            msg.textContent = 'Usuario no encontrado.';
            return;
        }
        if (users[username] !== password) {
            msg.style.color = '#ff6961';
            msg.textContent = 'Contraseña incorrecta.';
            return;
        }

        // Login exitoso
        localStorage.setItem('mkl_logged', '1');
        localStorage.setItem('mkl_user', username);
        msg.style.color = '#66fcf1';
        msg.textContent = `Bienvenido, ${username}`;

        setTimeout(() => {
            window.location.href = 'Main.html';
        }, 500);
    });

    // Manejar registro en dos pasos: primero username -> mostrar passwords -> completar
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = regUser.value.trim();
        const password = regPass ? regPass.value : '';
        const password2 = regPass2 ? regPass2.value : '';

        // si campos de password ocultos -> validar username y mostrar contraseñas
        if (regPassGroup && regPassGroup.classList.contains('hidden')) {
            if (!username) {
                msg.style.color = '#ff6961';
                msg.textContent = 'Ingresa un nombre de usuario.';
                return;
            }
            const users = loadUsers();
            if (users[username]) {
                msg.style.color = '#ff6961';
                msg.textContent = 'El usuario ya existe.';
                return;
            }
            msg.style.color = '#66fcf1';
            msg.textContent = 'Usuario disponible. Completa las contraseñas.';
            showEl(regPassGroup);
            showEl(regPass2Group);
            if (regPass) regPass.focus();
            return;
        }

        // si las contraseñas ya están visibles, validar y guardar
        if (!username || !password || !password2) {
            msg.style.color = '#ff6961';
            msg.textContent = 'Completa todos los campos.';
            return;
        }
        if (password.length < 4) {
            msg.style.color = '#ff6961';
            msg.textContent = 'La contraseña debe tener al menos 4 caracteres.';
            return;
        }
        if (password !== password2) {
            msg.style.color = '#ff6961';
            msg.textContent = 'Las contraseñas no coinciden.';
            return;
        }

        const users = loadUsers();
        if (users[username]) {
            msg.style.color = '#ff6961';
            msg.textContent = 'El usuario ya existe.';
            return;
        }

        // Guardar nuevo usuario
        users[username] = password;
        saveUsers(users);

        // Auto-login y redirección
        localStorage.setItem('mkl_logged', '1');
        localStorage.setItem('mkl_user', username);
        msg.style.color = '#66fcf1';
        msg.textContent = `Cuenta creada. Bienvenido, ${username}`;

        setTimeout(() => {
            window.location.href = 'Main.html';
        }, 700);
    });

    // Al cargar la página, asegurar que los grupos ocultos estén ocultos por clase
    if (loginPassGroup) hideEl(loginPassGroup);
    if (regPassGroup) hideEl(regPassGroup);
    if (regPass2Group) hideEl(regPass2Group);
});
