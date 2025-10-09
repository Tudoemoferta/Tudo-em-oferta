# Plano de Testes - Águias Vitrine

Este documento descreve o plano de testes para validar as correções de segurança e a implementação da sincronização em tempo real no site "Águias Vitrine - Tudo em Oferta".

## 1. Testes de Segurança

| Caso de Teste | Passos para Reprodução | Resultado Esperado |
| :--- | :--- | :--- |
| **1.1** | Verificar o histórico de commits do repositório Git. | A chave de API do Firebase não deve estar presente em nenhum commit. |
| **1.2** | Inspecionar o arquivo `index.html`. | O objeto `firebaseConfig` deve conter placeholders como `SUA_API_KEY` e não as chaves reais. |
| **1.3** | Tentar fazer login como administrador com credenciais inválidas. | O login deve falhar e uma mensagem de erro apropriada deve ser exibida. |
| **1.4** | Tentar fazer login como administrador com credenciais válidas. | O login deve ser bem-sucedido e o painel de administração deve ser exibido. |
| **1.5** | Tentar acessar as funções de administrador (adicionar, editar, excluir) sem estar logado. | As ações devem ser bloqueadas e uma notificação deve informar que o login é necessário. |
| **1.6** | Fazer login como administrador e tentar adicionar, editar e excluir um produto. | As ações devem ser executadas com sucesso. |
| **1.7** | Solicitar a redefinição de senha para um email de administrador válido. | Um email de redefinição de senha deve ser enviado para o endereço de email fornecido. |

## 2. Testes de Sincronização em Tempo Real

| Caso de Teste | Passos para Reprodução | Resultado Esperado |
| :--- | :--- | :--- |
| **2.1** | Abrir o site em dois dispositivos/navegadores diferentes e fazer login como administrador em ambos. | Ambos os dispositivos devem exibir a mesma lista de produtos. |
| **2.2** | Adicionar um novo produto em um dos dispositivos. | O novo produto deve aparecer em tempo real no outro dispositivo sem a necessidade de recarregar a página. |
| **2.3** | Editar um produto existente em um dos dispositivos. | As alterações devem ser refletidas em tempo real no outro dispositivo. |
| **2.4** | Excluir um produto em um dos dispositivos. | O produto deve ser removido em tempo real do outro dispositivo. |
| **2.5** | Desconectar um dos dispositivos da internet, adicionar um produto e, em seguida, reconectar. | Após a reconexão, o novo produto deve ser sincronizado com o Firebase e aparecer no outro dispositivo. |
| **2.6** | Verificar o indicador de status de conexão. | O indicador deve exibir "Online" quando conectado ao Firebase e "Offline" quando desconectado. |
| **2.7** | Clicar no botão "Forçar Sincronização". | O sistema deve verificar se há diferenças entre os dados locais e remotos e permitir que o usuário escolha qual versão manter. |

## 3. Testes de Funcionalidades Gerais

| Caso de Teste | Passos para Reprodução | Resultado Esperado |
| :--- | :--- | :--- |
| **3.1** | Adicionar um produto manualmente através do formulário. | O produto deve ser adicionado à lista e exibido corretamente. |
| **3.2** | Importar produtos de um arquivo CSV. | Os produtos do arquivo CSV devem ser adicionados à lista e exibidos corretamente. |
| **3.3** | Filtrar produtos por categoria. | Apenas os produtos da categoria selecionada devem ser exibidos. |
| **3.4** | Pesquisar por um produto usando a barra de pesquisa. | Apenas os produtos que correspondem ao termo de pesquisa devem ser exibidos. |
| **3.5** | Clicar no botão "Limpar Todos" no painel de administração. | Todos os produtos devem ser removidos após a confirmação. |
| **3.6** | Redimensionar a janela do navegador para simular diferentes tamanhos de tela. | O layout do site deve se adaptar e permanecer funcional em todos os tamanhos de tela. |

