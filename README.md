# 🦅 Águias Vitrine - Tudo em Oferta

Uma plataforma moderna e responsiva para marketing de afiliados com sistema completo de gerenciamento de produtos.

## ✨ Funcionalidades Principais

### 🔧 Gerenciamento de Produtos
- **Adição Manual**: Interface intuitiva com validação em tempo real
- **Importação CSV**: Suporte para arquivos CSV da Shopee e outras plataformas
- **Edição Completa**: Edite qualquer produto diretamente na interface
- **Persistência Garantida**: Todos os dados são salvos no LocalStorage do navegador

### 🎨 Interface Responsiva
- **Design Mobile-First**: Otimizado para smartphones e tablets
- **Experiência Desktop**: Interface completa para computadores
- **Navegação Intuitiva**: Filtros por categoria e busca em tempo real
- **Visual Profissional**: Gradientes modernos e animações suaves

### 📊 Recursos Avançados
- **Cálculo Automático de Descontos**: Percentuais e valores de economia
- **Múltiplas Plataformas**: Shopee, Amazon, Mercado Livre, Eduzz, Hotmart, Kiwify
- **Sistema de Badges**: Identificação visual de plataformas e descontos
- **Estatísticas Dinâmicas**: Contador de produtos e desconto médio

## 🚀 Como Usar

### Adicionando Produtos Manualmente

1. **Acesse o Painel**: Clique no botão de engrenagem no canto inferior direito
2. **Aba Manual**: Selecione a aba "➕ Manual"
3. **Preencha os Dados**:
   - Nome do produto (obrigatório)
   - Plataforma de origem
   - Categoria
   - Preços atual e original
   - Link de afiliado (obrigatório)
   - URL da imagem (opcional)
   - Descrição (opcional)
4. **Validação Automática**: O sistema valida os dados em tempo real
5. **Adicionar**: Clique em "Adicionar Produto"

### Importando via CSV

1. **Aba CSV**: Selecione a aba "📊 CSV Shopee"
2. **Upload**: Arraste o arquivo CSV ou clique para selecionar
3. **Processamento**: Clique em "Processar CSV"
4. **Acompanhe**: Veja o status de cada produto importado

### Editando Produtos

1. **Localizar**: Encontre o produto na página principal
2. **Editar**: Clique no botão azul de edição no card do produto
3. **Modificar**: Altere os dados necessários
4. **Salvar**: Confirme as alterações

### Filtrando e Buscando

- **Filtros**: Use os botões de categoria para filtrar produtos
- **Busca**: Digite no campo de busca para encontrar produtos específicos
- **Tempo Real**: Resultados aparecem instantaneamente

## 📱 Compatibilidade Mobile

### Recursos Mobile Otimizados
- **Touch Friendly**: Botões e elementos com tamanho adequado para toque
- **Navegação Simplificada**: Menu adaptado para telas pequenas
- **Formulários Responsivos**: Campos otimizados para teclados móveis
- **Performance**: Carregamento rápido em conexões lentas

### Gestos Suportados
- **Toque**: Navegação por toque em todos os elementos
- **Scroll**: Rolagem suave em listas e produtos
- **Zoom**: Prevenção de zoom acidental em campos de formulário

## 🔧 Configuração Técnica

### Estrutura de Dados

Os produtos são armazenados no LocalStorage com a seguinte estrutura:

```javascript
{
  id: "prod_timestamp_random",
  platform: "shopee|amazon|mercadolivre|eduzz|hotmart|kiwify|aliexpress|outros",
  name: "Nome do Produto",
  category: "moda|calcados|beleza|eletronicos|casa|ebooks",
  currentPrice: 29.90,
  originalPrice: 59.90,
  affiliateLink: "https://...",
  imageUrl: "https://...",
  description: "Descrição do produto",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

### Chave de Armazenamento
- **LocalStorage Key**: `aguias_vitrine_products`
- **Formato**: JSON Array
- **Persistência**: Dados mantidos até limpeza manual do navegador

### Validações Implementadas
- **Nome**: Mínimo 3 caracteres
- **Preços**: Valores numéricos maiores que zero
- **Links**: URLs válidas obrigatórias
- **Imagens**: URLs opcionais com fallback para placeholder

## 🌐 Deploy e Hospedagem

### GitHub Pages (Recomendado)

1. **Criar Repositório**: Novo repositório no GitHub
2. **Upload**: Faça upload de todos os arquivos
3. **Configurar Pages**: Vá em Settings > Pages
4. **Source**: Selecione "Deploy from a branch"
5. **Branch**: Escolha "main" ou "master"
6. **Pasta**: Root (/)
7. **Salvar**: Aguarde alguns minutos para ativação

### Netlify

1. **Arrastar e Soltar**: Acesse netlify.com
2. **Deploy**: Arraste a pasta do projeto
3. **Configuração**: Netlify detecta automaticamente
4. **URL**: Receba o link público instantaneamente

### Vercel

1. **Import Project**: Conecte seu repositório GitHub
2. **Deploy**: Vercel faz deploy automático
3. **Domínio**: Configure domínio personalizado se desejar

### Hospedagem Própria

- **Servidor Web**: Apache, Nginx ou similar
- **Requisitos**: Apenas arquivos estáticos
- **HTTPS**: Recomendado para links de afiliados

## 🔒 Segurança e Privacidade

### Dados Locais
- **Armazenamento**: Apenas no navegador do usuário
- **Privacidade**: Nenhum dado enviado para servidores externos
- **Backup**: Responsabilidade do usuário

### Links de Afiliados
- **Validação**: URLs verificadas antes do salvamento
- **Segurança**: Links abertos em nova aba
- **Rastreamento**: Opcional via Google Analytics

## 🎯 Otimizações de Performance

### Carregamento de Imagens
- **Lazy Loading**: Imagens carregadas conforme necessário
- **Fallback**: Placeholder para imagens quebradas
- **Otimização**: Redimensionamento automático via CSS

### JavaScript
- **Debounce**: Busca otimizada com delay
- **Event Delegation**: Eventos eficientes
- **Memory Management**: Limpeza automática de timeouts

### CSS
- **Mobile First**: Carregamento otimizado para mobile
- **Flexbox/Grid**: Layouts modernos e eficientes
- **Animations**: Transições suaves com GPU acceleration

## 🐛 Solução de Problemas

### Produtos Não Aparecem
1. **Verificar Console**: Abra F12 > Console para erros
2. **LocalStorage**: Verifique se há dados salvos
3. **JavaScript**: Confirme se JavaScript está habilitado

### Imagens Não Carregam
1. **URL Válida**: Verifique se a URL da imagem está correta
2. **CORS**: Algumas imagens podem ter restrições
3. **Formato**: Use JPG, PNG ou WebP

### Deploy Falha
1. **Arquivo .nojekyll**: Certifique-se que existe na raiz
2. **Estrutura**: Mantenha index.html na raiz
3. **Permissões**: Verifique permissões do repositório

### Mobile Não Funciona
1. **Viewport**: Meta tag viewport deve estar presente
2. **Touch Events**: Verifique se eventos touch estão funcionando
3. **Zoom**: Confirme se zoom está desabilitado em inputs

## 📞 Suporte

### Recursos de Ajuda
- **Console do Navegador**: Mensagens de debug detalhadas
- **Validação Visual**: Feedback imediato em formulários
- **Mensagens de Erro**: Alertas claros para problemas

### Logs do Sistema
- **Carregamento**: Logs de inicialização no console
- **Persistência**: Confirmação de salvamento
- **Erros**: Detalhes completos de problemas

## 🔄 Atualizações Futuras

### Recursos Planejados
- **Backup na Nuvem**: Sincronização entre dispositivos
- **Analytics Avançado**: Relatórios de cliques e conversões
- **Temas Personalizados**: Múltiplas opções visuais
- **API Integration**: Conexão com plataformas de afiliados

### Melhorias Contínuas
- **Performance**: Otimizações constantes
- **Compatibilidade**: Suporte para novos navegadores
- **Recursos**: Novas funcionalidades baseadas em feedback

---

## 📄 Licença

Este projeto é de uso livre para fins comerciais e pessoais. Desenvolvido para maximizar conversões em marketing de afiliados.

**Desenvolvido com ❤️ para o sucesso do seu negócio de afiliados!**
