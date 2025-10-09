// Implementação de autenticação segura para o site Águias Vitrine
// Este arquivo contém funções para autenticação de administradores usando Firebase Auth

// Função para inicializar a autenticação do Firebase
function initAuth() {
    // Verificar se o usuário já está autenticado
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Usuário está autenticado
            console.log("Usuário autenticado:", user.email);
            isAdmin = true;
            showAdminContent();
            showNotification('Login de administrador bem-sucedido!');
        } else {
            // Usuário não está autenticado
            isAdmin = false;
            hideAdminContent();
        }
    });
}

// Função para fazer login com email e senha
function loginWithEmailPassword() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const loginError = document.getElementById('loginError');
    
    // Validar campos
    if (!email || !password) {
        loginError.textContent = 'Por favor, preencha todos os campos.';
        return;
    }
    
    // Tentar fazer login com Firebase Auth
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            const user = userCredential.user;
            console.log("Login bem-sucedido:", user.email);
            loginError.textContent = '';
            
            // Verificar se o usuário é um administrador (usando custom claims ou regras de banco de dados)
            checkAdminRole(user);
        })
        .catch((error) => {
            // Tratar erros de login
            console.error("Erro no login:", error.code, error.message);
            
            // Exibir mensagem de erro amigável
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    loginError.textContent = 'Email ou senha incorretos. Tente novamente.';
                    break;
                case 'auth/invalid-email':
                    loginError.textContent = 'Email inválido. Verifique o formato.';
                    break;
                case 'auth/too-many-requests':
                    loginError.textContent = 'Muitas tentativas de login. Tente novamente mais tarde.';
                    break;
                default:
                    loginError.textContent = 'Erro ao fazer login. Tente novamente.';
            }
        });
}

// Função para verificar se o usuário tem papel de administrador
function checkAdminRole(user) {
    // Opção 1: Verificar usando custom claims (requer configuração no Firebase Functions)
    user.getIdTokenResult()
        .then((idTokenResult) => {
            if (idTokenResult.claims.admin === true) {
                isAdmin = true;
                showAdminContent();
            } else {
                // Opção 2: Verificar usando uma lista de administradores no Realtime Database
                checkAdminInDatabase(user.uid);
            }
        })
        .catch((error) => {
            console.error("Erro ao verificar papel de administrador:", error);
            // Fallback para verificação no banco de dados
            checkAdminInDatabase(user.uid);
        });
}

// Função para verificar se o usuário está na lista de administradores no banco de dados
function checkAdminInDatabase(userId) {
    database.ref('admins/' + userId).once('value')
        .then((snapshot) => {
            if (snapshot.exists() && snapshot.val() === true) {
                isAdmin = true;
                showAdminContent();
            } else {
                // Usuário não é administrador
                isAdmin = false;
                firebase.auth().signOut(); // Fazer logout
                document.getElementById('loginError').textContent = 'Você não tem permissão de administrador.';
            }
        })
        .catch((error) => {
            console.error("Erro ao verificar administrador no banco de dados:", error);
            isAdmin = false;
            document.getElementById('loginError').textContent = 'Erro ao verificar permissões. Tente novamente.';
        });
}

// Função para fazer logout
function logout() {
    firebase.auth().signOut()
        .then(() => {
            console.log("Logout bem-sucedido");
            isAdmin = false;
            hideAdminContent();
            closeAdminPanel();
            showNotification('Logout realizado com sucesso!');
        })
        .catch((error) => {
            console.error("Erro no logout:", error);
        });
}

// Função para mostrar o conteúdo de administrador
function showAdminContent() {
    const loginSection = document.getElementById('loginSection');
    const adminContent = document.getElementById('adminContent');
    const logoutButton = document.getElementById('logoutButton');
    
    if (loginSection && adminContent) {
        loginSection.style.display = 'none';
        adminContent.style.display = 'block';
        
        // Mostrar botão de logout
        if (logoutButton) {
            logoutButton.style.display = 'block';
        }
    }
}

// Função para esconder o conteúdo de administrador
function hideAdminContent() {
    const loginSection = document.getElementById('loginSection');
    const adminContent = document.getElementById('adminContent');
    const logoutButton = document.getElementById('logoutButton');
    
    if (loginSection && adminContent) {
        loginSection.style.display = 'block';
        adminContent.style.display = 'none';
        
        // Esconder botão de logout
        if (logoutButton) {
            logoutButton.style.display = 'none';
        }
        
        // Limpar campos de login
        document.getElementById('adminEmail').value = '';
        document.getElementById('adminPassword').value = '';
        document.getElementById('loginError').textContent = '';
    }
}

// Função para criar um novo administrador (apenas para uso inicial)
function createAdminUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuário criado com sucesso:", user.email);
            
            // Adicionar o usuário à lista de administradores no banco de dados
            database.ref('admins/' + user.uid).set(true)
                .then(() => {
                    console.log("Usuário adicionado como administrador");
                    showNotification('Administrador criado com sucesso!');
                })
                .catch((error) => {
                    console.error("Erro ao adicionar administrador:", error);
                });
        })
        .catch((error) => {
            console.error("Erro ao criar usuário:", error);
        });
}

// Função para redefinir a senha
function resetPassword() {
    const email = document.getElementById('adminEmail').value;
    const loginError = document.getElementById('loginError');
    
    if (!email) {
        loginError.textContent = 'Digite seu email para redefinir a senha.';
        return;
    }
    
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            loginError.textContent = '';
            showNotification('Email de redefinição de senha enviado!');
        })
        .catch((error) => {
            console.error("Erro ao enviar email de redefinição:", error);
            
            switch (error.code) {
                case 'auth/user-not-found':
                    loginError.textContent = 'Email não encontrado.';
                    break;
                case 'auth/invalid-email':
                    loginError.textContent = 'Email inválido. Verifique o formato.';
                    break;
                default:
                    loginError.textContent = 'Erro ao enviar email de redefinição.';
            }
        });
}
