# Configuração do Firebase Authentication para o Águias Vitrine

Este guia explica como configurar o Firebase Authentication para proteger o painel de administração do seu site "Águias Vitrine - Tudo em Oferta". Seguindo estas instruções, você terá um sistema de autenticação seguro que permite apenas usuários autorizados a acessar as funcionalidades de administrador.

## 1. Criar um Projeto no Firebase (se ainda não tiver)

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Dê um nome ao seu projeto (ex: "Águias Vitrine")
4. Siga as instruções para criar o projeto

## 2. Habilitar a Autenticação por Email/Senha

1. No console do Firebase, selecione seu projeto
2. No menu lateral, clique em "Authentication"
3. Clique na aba "Sign-in method"
4. Habilite o provedor "Email/Password"
5. Salve as alterações

## 3. Criar um Usuário Administrador

1. Ainda na seção "Authentication", clique na aba "Users"
2. Clique em "Add user"
3. Digite seu email e uma senha segura
4. Clique em "Add user" para criar o usuário

## 4. Configurar Regras de Segurança no Realtime Database

1. No menu lateral, clique em "Realtime Database"
2. Clique na aba "Rules"
3. Substitua as regras existentes pelas seguintes:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null && root.child('admins').child(auth.uid).exists()"
    },
    "admins": {
      ".read": "auth != null && root.child('admins').child(auth.uid).exists()",
      ".write": "auth != null && root.child('admins').child(auth.uid).exists()"
    }
  }
}
```

4. Clique em "Publish" para salvar as regras

## 5. Adicionar o Primeiro Administrador ao Banco de Dados

1. No menu lateral, clique em "Realtime Database"
2. Clique na aba "Data"
3. Clique no botão "+" para adicionar um novo nó
4. Digite "admins" como nome do nó e clique em "Add"
5. Clique no botão "+" ao lado do nó "admins"
6. No campo "Name", cole o UID do usuário que você criou (você pode encontrar o UID na seção "Authentication" > "Users")
7. No campo "Value", digite "true" e clique em "Add"

## 6. Atualizar as Configurações do Firebase no Seu Site

1. No console do Firebase, clique em "Project settings" (ícone de engrenagem)
2. Role para baixo até a seção "Your apps"
3. Se você ainda não adicionou um app da Web, clique no ícone da Web (</>) para adicionar um
4. Registre seu app com um apelido (ex: "aguias-vitrine-web")
5. Copie o objeto `firebaseConfig` que aparece na tela
6. Abra o arquivo `index.html` do seu site
7. Substitua o objeto `firebaseConfig` existente pelo que você copiou

## 7. Atualizar o HTML para o Novo Sistema de Autenticação

Modifique a seção de login no seu arquivo `index.html` para incluir um campo de email:

```html
<div class="login-container">
    <h2 class="login-title">🔐 Acesso Administrativo</h2>
    <div class="login-form">
        <div class="form-group">
            <label class="form-label" for="adminEmail">Email</label>
            <input type="email" id="adminEmail" class="form-control" placeholder="Digite seu email" required>
        </div>
        <div class="form-group">
            <label class="form-label" for="adminPassword">Senha</label>
            <input type="password" id="adminPassword" class="form-control" placeholder="Digite sua senha" required>
        </div>
        <button id="loginButton" class="form-button login-button">Entrar</button>
        <button id="resetPasswordButton" class="form-button secondary login-button" style="margin-top: 10px;">Esqueci minha senha</button>
        <div id="loginError" class="login-error"></div>
        <div class="login-info">
            <p>Esta área é restrita apenas para administradores do site.</p>
            <p>Visitantes não têm permissão para adicionar ou modificar produtos.</p>
        </div>
    </div>
</div>
```

Adicione um botão de logout no cabeçalho do painel de administração:

```html
<div class="admin-header">
    <h2 class="admin-title" id="adminTitle">⚙️ Gerenciar Produtos</h2>
    <div>
        <button class="form-button secondary" id="logoutButton">Sair</button>
        <button class="close-button" id="closeAdmin">✕</button>
    </div>
</div>
```

## 8. Incluir o Arquivo de Autenticação

Certifique-se de incluir o arquivo `auth.js` no seu HTML, logo após a inicialização do Firebase:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>

<!-- Configuração do Firebase -->
<script>
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "SUA_API_KEY",
        authDomain: "SEU_AUTH_DOMAIN",
        databaseURL: "SUA_DATABASE_URL",
        projectId: "SEU_PROJECT_ID",
        storageBucket: "SEU_STORAGE_BUCKET",
        messagingSenderId: "SEU_MESSAGING_SENDER_ID",
        appId: "SEU_APP_ID"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
</script>

<!-- Arquivo de autenticação -->
<script src="auth.js"></script>
```

## 9. Atualizar os Event Listeners

Modifique a função `setupEventListeners()` para incluir os novos botões:

```javascript
// Login
loginButton.addEventListener('click', loginWithEmailPassword);
resetPasswordButton.addEventListener('click', resetPassword);
logoutButton.addEventListener('click', logout);
```

## 10. Inicializar a Autenticação

Adicione a chamada para inicializar a autenticação na função `init()`:

```javascript
function init() {
    initAuth();
    loadProducts();
    setupEventListeners();
    renderProducts();
    updateStats();
}
```

## Segurança Adicional

Com esta configuração, seu site terá as seguintes camadas de segurança:

1. **Autenticação por Email/Senha**: Apenas usuários com credenciais válidas podem fazer login
2. **Verificação de Papel de Administrador**: Mesmo com login válido, o usuário precisa estar na lista de administradores
3. **Regras de Segurança do Firebase**: Apenas administradores autenticados podem modificar dados no banco de dados
4. **Sem Senhas Hardcoded**: Nenhuma senha está codificada diretamente no código-fonte
5. **Recuperação de Senha**: Os usuários podem redefinir suas senhas se necessário

Estas medidas garantem que apenas pessoas autorizadas possam gerenciar os produtos do seu site, protegendo-o contra acessos não autorizados.
