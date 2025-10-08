# 🦅 Águias Vitrine - Site de Ofertas

## 📋 Sobre o Projeto

O **Águias Vitrine** é uma plataforma web moderna e responsiva para exibição de produtos em oferta com sistema de afiliados. Desenvolvido com HTML5, CSS3 e JavaScript puro, sem dependências externas.

## ✨ Funcionalidades

### 🛍️ **Para Visitantes**
- Navegação por categorias (Moda, Calçados, Beleza, Eletrônicos, Casa, Ebooks)
- Sistema de busca em tempo real
- Visualização de produtos com descontos
- Interface responsiva (desktop, tablet, mobile)
- Links diretos para compra

### ⚙️ **Para Administradores**
- **Importação CSV**: Upload de arquivos da Shopee e outras plataformas
- **Adição Manual**: Formulário completo para cadastro individual
- **Persistência Local**: Dados salvos no navegador (localStorage)
- **Estatísticas**: Contadores automáticos de produtos e descontos

## 🚀 Como Usar

### **Acessar o Painel Admin**
1. Clique no botão ⚙️ (canto inferior direito)
2. Escolha entre **CSV Shopee** ou **Manual**

### **Importar Produtos via CSV**
1. Prepare um arquivo CSV com colunas: Nome, Preço, Link
2. Arraste o arquivo para a área de upload
3. Clique em "Processar CSV"

### **Adicionar Produto Manual**
1. Preencha os campos obrigatórios (Nome, Preço, Link)
2. Clique em "Adicionar Produto"

## 📁 Estrutura do Projeto

```
aguias-vitrine/
├── index.html          # Arquivo principal
├── .nojekyll          # Configuração GitHub Pages
└── README.md          # Este arquivo
```

## 🌐 Deploy

### **GitHub Pages**
1. Faça upload dos arquivos para um repositório GitHub
2. Ative GitHub Pages nas configurações
3. O site estará disponível em: `https://seuusuario.github.io/nome-do-repo`

### **Netlify**
1. Arraste a pasta do projeto para netlify.com
2. O site será publicado automaticamente

### **Vercel**
1. Conecte seu repositório GitHub ao Vercel
2. Deploy automático a cada commit

## 🔧 Personalização

### **Cores e Estilo**
- Edite as variáveis CSS no `<style>` do index.html
- Cor principal: `#ff6b6b` (vermelho coral)
- Gradiente: `#667eea` para `#764ba2`

### **Categorias**
- Modifique o array de categorias no JavaScript
- Adicione novos ícones e nomes conforme necessário

### **Plataformas**
- Edite o `<select>` de plataformas no formulário manual
- Adicione novas opções como Amazon, Mercado Livre, etc.

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:
- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

## 🔒 Segurança

- Validação de URLs nos links de afiliado
- Sanitização de dados de entrada
- Abertura de links em nova aba com `noopener,noreferrer`

## 🐛 Solução de Problemas

### **Produtos não aparecem**
- Verifique se o localStorage está habilitado
- Teste em modo anônimo/privado

### **CSV não importa**
- Verifique se o arquivo tem cabeçalho
- Certifique-se que há colunas de Nome, Preço e Link

### **Site não carrega no GitHub Pages**
- Verifique se o arquivo `.nojekyll` existe
- Confirme que o repositório é público

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Teste em diferentes navegadores
3. Verifique o console do navegador (F12)

## 📄 Licença

Este projeto é de uso livre para fins comerciais e pessoais.

---

**Desenvolvido com ❤️ para o sucesso do seu negócio de afiliados!**
