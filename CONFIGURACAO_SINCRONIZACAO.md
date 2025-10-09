# Configuração da Sincronização em Tempo Real para o Águias Vitrine

Este guia explica como configurar a sincronização em tempo real para o site "Águias Vitrine - Tudo em Oferta". Com esta funcionalidade, os produtos adicionados em um dispositivo serão automaticamente sincronizados com outros dispositivos, garantindo que todos os usuários vejam o mesmo conteúdo.

## 1. Pré-requisitos

Antes de configurar a sincronização em tempo real, você deve ter:

1. Concluído a configuração do Firebase Authentication conforme descrito no arquivo `CONFIGURACAO_FIREBASE_AUTH.md`
2. Um projeto Firebase ativo com Realtime Database habilitado

## 2. Habilitar o Realtime Database

1. No console do Firebase, selecione seu projeto
2. No menu lateral, clique em "Realtime Database"
3. Clique em "Criar banco de dados" (se ainda não tiver um)
4. Escolha a localização do banco de dados (recomendado: "us-central1")
5. Selecione "Iniciar no modo de teste" para começar (você configurará regras de segurança depois)
6. Clique em "Ativar"

## 3. Configurar Regras de Segurança

1. No Realtime Database, clique na aba "Regras"
2. Substitua as regras existentes pelas seguintes:

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

3. Clique em "Publish" para salvar as regras

Estas regras permitem que:
- Qualquer pessoa possa ler os produtos (para exibição no site)
- Apenas administradores autenticados possam modificar produtos
- Apenas administradores possam ver e modificar a lista de administradores

## 4. Incluir o Arquivo de Sincronização

Certifique-se de incluir o arquivo `sync.js` no seu HTML, logo após a inicialização do Firebase e antes do script principal:

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

<!-- Arquivo de sincronização -->
<script src="sync.js"></script>
```

## 5. Atualizar a Função de Inicialização

Modifique a função `init()` no seu arquivo principal para inicializar a sincronização:

```javascript
// Initialize the application
function init() {
    initAuth();
    initSync(); // Inicializa a sincronização em tempo real
    setupEventListeners();
    renderProducts();
    updateStats();
}
```

## 6. Substituir as Funções de Manipulação de Produtos

Para garantir que todas as alterações sejam sincronizadas, substitua as chamadas de funções existentes pelas novas funções de sincronização:

1. Substitua `saveProducts()` por `saveProductsWithSync()`
2. Substitua adições diretas ao array `products` por `addProductWithSync(product)`
3. Substitua atualizações diretas ao array `products` por `updateProductWithSync(index, updatedProduct)`
4. Substitua exclusões diretas do array `products` por `deleteProductWithSync(index)`
5. Substitua a limpeza do array `products` por `clearAllProductsWithSync()`

## 7. Adicionar Indicador de Status de Conexão (Opcional)

Para mostrar aos usuários se estão online ou offline, adicione este HTML ao seu site:

```html
<div style="position: fixed; bottom: 10px; right: 10px; background-color: white; padding: 5px 10px; border-radius: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-size: 0.8rem;">
    Status: <span id="connectionStatus">Verificando...</span>
</div>
```

E adicione esta linha à função `init()`:

```javascript
checkConnectionStatus();
```

## 8. Adicionar Botão de Sincronização Manual (Opcional)

Para permitir que os administradores forcem a sincronização manualmente, adicione este botão ao painel de administração:

```html
<button id="forceSyncButton" class="form-button secondary" style="margin-top: 10px;">Forçar Sincronização</button>
```

E adicione este event listener à função `setupEventListeners()`:

```javascript
document.getElementById('forceSyncButton').addEventListener('click', forceSyncWithFirebase);
```

## Resolução de Problemas

### Produtos não sincronizam entre dispositivos

1. Verifique se você está logado como administrador em ambos os dispositivos
2. Verifique se a configuração do Firebase está correta em ambos os dispositivos
3. Verifique se o `databaseURL` no objeto `firebaseConfig` está correto
4. Verifique as regras de segurança do Realtime Database
5. Use o botão "Forçar Sincronização" para sincronizar manualmente

### Erros no console

1. Se você ver erros relacionados a permissões, verifique se o usuário está autenticado e tem o papel de administrador
2. Se você ver erros de conexão, verifique sua conexão com a internet e se o Firebase está acessível
3. Se você ver erros de formato de dados, verifique se os produtos têm o formato correto antes de salvá-los

### Conflitos de sincronização

Se houver conflitos entre as versões local e remota dos produtos, o sistema tentará resolvê-los automaticamente usando as seguintes regras:

1. Se um produto existe apenas localmente ou apenas remotamente, ele será mantido
2. Se um produto existe em ambos os lugares, a versão mais recente (com base no campo `updatedAt`) será mantida
3. Se ambas as versões têm a mesma data de atualização mas conteúdos diferentes, será mostrado um diálogo para que você escolha qual versão manter

## Considerações de Segurança

1. **Backup Regular**: Faça backups regulares dos seus produtos exportando-os para um arquivo JSON
2. **Monitoramento de Uso**: Monitore o uso do seu banco de dados no console do Firebase para evitar cobranças inesperadas
3. **Limites de Conexão**: O Firebase Realtime Database tem limites de conexões simultâneas; considere usar o Firebase Firestore para aplicações maiores
