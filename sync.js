// Implementação de sincronização em tempo real para o site Águias Vitrine
// Este arquivo contém funções para sincronizar produtos entre dispositivos usando Firebase Realtime Database

// Função para inicializar a sincronização em tempo real
function initSync() {
    console.log("Inicializando sincronização em tempo real...");
    
    // Verificar se o Firebase está inicializado
    if (!firebase || !firebase.database) {
        console.error("Firebase não está inicializado. Verifique se os scripts do Firebase foram carregados corretamente.");
        return;
    }
    
    // Referência para a coleção de produtos no Firebase
    const productsRef = firebase.database().ref('products');
    
    // Ouvir mudanças em tempo real
    productsRef.on('value', (snapshot) => {
        const firebaseProducts = snapshot.val();
        
        if (firebaseProducts) {
            console.log("Dados recebidos do Firebase:", Object.keys(firebaseProducts).length, "produtos");
            
            // Converter objeto para array
            const productsArray = Object.values(firebaseProducts);
            
            // Atualizar a variável global de produtos
            products = productsArray;
            
            // Salvar no localStorage como backup
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
            
            // Atualizar a interface
            renderProducts();
            updateStats();
            
            // Mostrar notificação apenas se não for a primeira carga
            if (initialLoadComplete) {
                showNotification('Produtos sincronizados em tempo real!');
            }
        } else {
            console.log("Nenhum produto encontrado no Firebase.");
            
            // Se não há produtos no Firebase, mas há no localStorage, enviar para o Firebase
            const storedProducts = localStorage.getItem(STORAGE_KEY);
            if (storedProducts && isAdmin) {
                const localProducts = JSON.parse(storedProducts);
                if (localProducts && localProducts.length > 0) {
                    console.log("Enviando produtos do localStorage para o Firebase...");
                    productsRef.set(localProducts)
                        .then(() => {
                            console.log("Produtos enviados com sucesso para o Firebase.");
                        })
                        .catch((error) => {
                            console.error("Erro ao enviar produtos para o Firebase:", error);
                        });
                }
            }
        }
        
        // Marcar que a carga inicial foi concluída
        initialLoadComplete = true;
    }, (error) => {
        console.error("Erro ao sincronizar com o Firebase:", error);
        
        // Em caso de erro, carregar do localStorage
        const storedProducts = localStorage.getItem(STORAGE_KEY);
        if (storedProducts) {
            products = JSON.parse(storedProducts);
            renderProducts();
            updateStats();
        }
    });
}

// Função para salvar produtos com sincronização
function saveProductsWithSync() {
    // Salvar no localStorage como backup
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    
    // Salvar no Firebase se autenticado
    if (isAdmin) {
        firebase.database().ref('products').set(products)
            .then(() => {
                console.log('Produtos salvos no Firebase com sucesso.');
            })
            .catch((error) => {
                console.error('Erro ao salvar produtos no Firebase:', error);
                showNotification('Erro ao sincronizar. Verifique sua conexão.');
            });
    } else {
        console.log('Produtos salvos apenas localmente. Faça login como administrador para sincronizar.');
    }
}

// Função para adicionar um produto com sincronização
function addProductWithSync(product) {
    // Adicionar ao array local
    products.push(product);
    
    // Salvar com sincronização
    saveProductsWithSync();
    
    // Atualizar a interface
    renderProducts();
    updateStats();
    
    return product;
}

// Função para atualizar um produto com sincronização
function updateProductWithSync(index, updatedProduct) {
    // Atualizar no array local
    products[index] = {
        ...products[index],
        ...updatedProduct,
        updatedAt: new Date().toISOString()
    };
    
    // Salvar com sincronização
    saveProductsWithSync();
    
    // Atualizar a interface
    renderProducts();
    updateStats();
    
    return products[index];
}

// Função para excluir um produto com sincronização
function deleteProductWithSync(index) {
    // Remover do array local
    const deletedProduct = products.splice(index, 1)[0];
    
    // Salvar com sincronização
    saveProductsWithSync();
    
    // Atualizar a interface
    renderProducts();
    updateStats();
    
    return deletedProduct;
}

// Função para limpar todos os produtos com sincronização
function clearAllProductsWithSync() {
    // Limpar array local
    products = [];
    
    // Salvar com sincronização
    saveProductsWithSync();
    
    // Atualizar a interface
    renderProducts();
    updateStats();
}

// Função para verificar o status da conexão
function checkConnectionStatus() {
    const connectedRef = firebase.database().ref('.info/connected');
    
    connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
            console.log('Conectado ao Firebase Realtime Database');
            document.getElementById('connectionStatus').textContent = 'Online';
            document.getElementById('connectionStatus').style.color = '#4caf50';
        } else {
            console.log('Desconectado do Firebase Realtime Database');
            document.getElementById('connectionStatus').textContent = 'Offline';
            document.getElementById('connectionStatus').style.color = '#f44336';
        }
    });
}

// Função para forçar a sincronização manual
function forceSyncWithFirebase() {
    if (!isAdmin) {
        showNotification('Você precisa estar logado como administrador para sincronizar.');
        return;
    }
    
    showNotification('Sincronizando produtos...');
    
    // Obter produtos do Firebase
    firebase.database().ref('products').once('value')
        .then((snapshot) => {
            const firebaseProducts = snapshot.val();
            
            if (firebaseProducts) {
                // Converter objeto para array
                const productsArray = Object.values(firebaseProducts);
                
                // Verificar se há diferenças
                const localProductsJSON = JSON.stringify(products.sort((a, b) => a.id.localeCompare(b.id)));
                const firebaseProductsJSON = JSON.stringify(productsArray.sort((a, b) => a.id.localeCompare(b.id)));
                
                if (localProductsJSON !== firebaseProductsJSON) {
                    // Há diferenças, perguntar ao usuário o que fazer
                    if (confirm('Há diferenças entre os produtos locais e os do Firebase. Deseja:\n\n- OK: Baixar produtos do Firebase (substituirá os locais)\n- Cancelar: Enviar produtos locais para o Firebase (substituirá os remotos)')) {
                        // Baixar do Firebase
                        products = productsArray;
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
                        renderProducts();
                        updateStats();
                        showNotification('Produtos baixados do Firebase com sucesso!');
                    } else {
                        // Enviar para o Firebase
                        firebase.database().ref('products').set(products)
                            .then(() => {
                                showNotification('Produtos enviados para o Firebase com sucesso!');
                            })
                            .catch((error) => {
                                console.error('Erro ao enviar produtos para o Firebase:', error);
                                showNotification('Erro ao enviar produtos para o Firebase.');
                            });
                    }
                } else {
                    showNotification('Produtos já estão sincronizados!');
                }
            } else {
                // Não há produtos no Firebase, perguntar se deseja enviar os locais
                if (confirm('Não há produtos no Firebase. Deseja enviar os produtos locais?')) {
                    firebase.database().ref('products').set(products)
                        .then(() => {
                            showNotification('Produtos enviados para o Firebase com sucesso!');
                        })
                        .catch((error) => {
                            console.error('Erro ao enviar produtos para o Firebase:', error);
                            showNotification('Erro ao enviar produtos para o Firebase.');
                        });
                }
            }
        })
        .catch((error) => {
            console.error('Erro ao obter produtos do Firebase:', error);
            showNotification('Erro ao sincronizar com o Firebase. Verifique sua conexão.');
        });
}

// Função para resolver conflitos de sincronização
function resolveConflicts(localProducts, remoteProducts) {
    // Criar mapas para facilitar a busca
    const localMap = {};
    const remoteMap = {};
    
    localProducts.forEach(product => {
        localMap[product.id] = product;
    });
    
    remoteProducts.forEach(product => {
        remoteMap[product.id] = product;
    });
    
    // Arrays para armazenar produtos mesclados
    const mergedProducts = [];
    const conflicts = [];
    
    // Processar produtos locais
    localProducts.forEach(localProduct => {
        const remoteProduct = remoteMap[localProduct.id];
        
        if (!remoteProduct) {
            // Produto existe apenas localmente
            mergedProducts.push(localProduct);
        } else {
            // Produto existe em ambos
            const localDate = new Date(localProduct.updatedAt);
            const remoteDate = new Date(remoteProduct.updatedAt);
            
            if (localDate > remoteDate) {
                // Versão local é mais recente
                mergedProducts.push(localProduct);
            } else if (remoteDate > localDate) {
                // Versão remota é mais recente
                mergedProducts.push(remoteProduct);
            } else {
                // Mesma data de atualização, verificar se há diferenças
                if (JSON.stringify(localProduct) !== JSON.stringify(remoteProduct)) {
                    // Há diferenças, marcar como conflito
                    conflicts.push({
                        local: localProduct,
                        remote: remoteProduct
                    });
                } else {
                    // Sem diferenças, usar qualquer um
                    mergedProducts.push(localProduct);
                }
            }
        }
    });
    
    // Adicionar produtos que existem apenas remotamente
    remoteProducts.forEach(remoteProduct => {
        if (!localMap[remoteProduct.id]) {
            mergedProducts.push(remoteProduct);
        }
    });
    
    return {
        mergedProducts,
        conflicts
    };
}

// Função para mostrar e resolver conflitos
function showConflictsDialog(conflicts) {
    // Criar um modal para mostrar os conflitos
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '2000';
    
    const content = document.createElement('div');
    content.style.backgroundColor = 'white';
    content.style.borderRadius = '12px';
    content.style.padding = '20px';
    content.style.maxWidth = '800px';
    content.style.maxHeight = '80vh';
    content.style.overflow = 'auto';
    
    content.innerHTML = `
        <h2 style="margin-top: 0;">Conflitos de Sincronização</h2>
        <p>Foram encontrados ${conflicts.length} produtos com conflitos. Por favor, escolha qual versão manter para cada um:</p>
        <div id="conflictsList"></div>
        <div style="text-align: right; margin-top: 20px;">
            <button id="resolveAllLocal" style="margin-right: 10px; padding: 8px 16px; background-color: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">Usar Todos Locais</button>
            <button id="resolveAllRemote" style="padding: 8px 16px; background-color: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;">Usar Todos Remotos</button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    const conflictsList = document.getElementById('conflictsList');
    
    // Adicionar cada conflito à lista
    conflicts.forEach((conflict, index) => {
        const conflictItem = document.createElement('div');
        conflictItem.style.marginBottom = '20px';
        conflictItem.style.padding = '15px';
        conflictItem.style.border = '1px solid #ddd';
        conflictItem.style.borderRadius = '8px';
        
        conflictItem.innerHTML = `
            <h3 style="margin-top: 0;">${conflict.local.name}</h3>
            <div style="display: flex; gap: 20px;">
                <div style="flex: 1;">
                    <h4>Versão Local</h4>
                    <p><strong>Preço:</strong> R$ ${conflict.local.currentPrice.toFixed(2)}</p>
                    <p><strong>Atualizado:</strong> ${new Date(conflict.local.updatedAt).toLocaleString()}</p>
                </div>
                <div style="flex: 1;">
                    <h4>Versão Remota</h4>
                    <p><strong>Preço:</strong> R$ ${conflict.remote.currentPrice.toFixed(2)}</p>
                    <p><strong>Atualizado:</strong> ${new Date(conflict.remote.updatedAt).toLocaleString()}</p>
                </div>
            </div>
            <div style="text-align: right; margin-top: 10px;">
                <button class="useLocal" data-index="${index}" style="margin-right: 10px; padding: 6px 12px; background-color: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">Usar Local</button>
                <button class="useRemote" data-index="${index}" style="padding: 6px 12px; background-color: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;">Usar Remoto</button>
            </div>
        `;
        
        conflictsList.appendChild(conflictItem);
    });
    
    // Adicionar event listeners
    document.querySelectorAll('.useLocal').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            conflicts[index].resolved = conflicts[index].local;
            button.parentElement.parentElement.style.backgroundColor = '#e8f5e9';
            checkAllResolved();
        });
    });
    
    document.querySelectorAll('.useRemote').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            conflicts[index].resolved = conflicts[index].remote;
            button.parentElement.parentElement.style.backgroundColor = '#e3f2fd';
            checkAllResolved();
        });
    });
    
    document.getElementById('resolveAllLocal').addEventListener('click', () => {
        conflicts.forEach(conflict => {
            conflict.resolved = conflict.local;
        });
        document.querySelectorAll('#conflictsList > div').forEach(item => {
            item.style.backgroundColor = '#e8f5e9';
        });
        checkAllResolved();
    });
    
    document.getElementById('resolveAllRemote').addEventListener('click', () => {
        conflicts.forEach(conflict => {
            conflict.resolved = conflict.remote;
        });
        document.querySelectorAll('#conflictsList > div').forEach(item => {
            item.style.backgroundColor = '#e3f2fd';
        });
        checkAllResolved();
    });
    
    function checkAllResolved() {
        const allResolved = conflicts.every(conflict => conflict.resolved);
        if (allResolved) {
            // Todos os conflitos foram resolvidos
            const resolvedProducts = conflicts.map(conflict => conflict.resolved);
            
            // Fechar o modal
            document.body.removeChild(modal);
            
            // Retornar os produtos resolvidos
            return resolvedProducts;
        }
    }
}

// Adicionar variável global para controlar se a carga inicial foi concluída
let initialLoadComplete = false;
