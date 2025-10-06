# 🦅 Águias Vitrine - Tudo em Oferta

**Site profissional de marketing de afiliados para exibição e gerenciamento de produtos de múltiplas plataformas**

## 📋 Sobre o Projeto

O **Águias Vitrine** é um site completo de marketing de afiliados desenvolvido para exibir produtos de diversas plataformas como Shopee, Amazon, Mercado Livre, Hotmart, Eduzz e outras. O site oferece uma interface moderna, responsiva e funcionalidades avançadas de gerenciamento de produtos.

## ✨ Funcionalidades Principais

### 🎯 Para Visitantes
- **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e mobile
- **Busca Inteligente**: Sistema de busca por nome e descrição dos produtos
- **Filtros por Categoria**: Moda, Calçados, Beleza, Suplemento, Celular, Informática, Eletrônicos, Casa e Ebooks
- **Exibição Profissional**: Cards de produtos com imagens, preços e descontos
- **Links de Afiliados**: Redirecionamento direto para as plataformas de compra

### ⚙️ Para Administradores
- **Painel de Administração**: Interface completa para gerenciar produtos
- **Importação CSV**: Sistema robusto para importar produtos da Shopee via CSV
- **Entrada Manual**: Adicionar produtos individuais de qualquer plataforma
- **Edição de Produtos**: Modificar informações, preços e links
- **Sistema de Imagens**: Carregamento inteligente com fallback automático
- **Validação em Tempo Real**: Feedback instantâneo nos formulários

## 🚀 Como Usar

### Publicação no GitHub Pages

1. **Faça upload dos arquivos**:
   - `index.html` (arquivo principal)
   - `.nojekyll` (necessário para GitHub Pages)

2. **Configure o repositório**:
   - Vá em Settings > Pages
   - Selecione "Deploy from a branch"
   - Escolha "main" branch e "/ (root)"
   - Clique em "Save"

3. **Acesse seu site**:
   - URL: `https://seuusuario.github.io/nome-do-repositorio`

### Gerenciamento de Produtos

#### 📊 Importação via CSV (Shopee)

1. **Clique no botão de configurações** (⚙️) no canto inferior direito
2. **Selecione a aba "CSV Shopee"**
3. **Faça upload do arquivo CSV** com as colunas:
   - `Item Id`: ID único do produto
   - `Item Name`: Nome do produto
   - `Price`: Preço atual
   - `Offer Link`: Link de afiliado

4. **Clique em "Processar CSV"** e aguarde a importação

#### ➕ Entrada Manual

1. **Acesse o painel administrativo**
2. **Selecione a aba "Manual"**
3. **Preencha os campos**:
   - Plataforma (Shopee, Amazon, etc.)
   - Nome do produto
   - Categoria
   - Preços atual e original
   - Link de afiliado
   - URL da imagem (opcional)
   - Descrição

4. **Clique em "Adicionar Produto"**

#### ✏️ Edição de Produtos

1. **Clique no botão "Editar"** (✏️) em qualquer produto
2. **Modifique as informações** desejadas
3. **Salve as alterações** ou exclua o produto

## 🛠️ Recursos Técnicos

### Sistema de Imagens Inteligente
- **Múltiplas Estratégias**: Tenta diferentes URLs de CDN
- **Fallback Automático**: Usa placeholder se a imagem falhar
- **Cache Inteligente**: Evita recarregamentos desnecessários
- **Timeout de 5s**: Não trava o carregamento da página

### Parser CSV Robusto
- **Detecção Automática**: Identifica separadores (vírgula, ponto-vírgula, tab)
- **Mapeamento de Headers**: Aceita nomes alternativos de colunas
- **Correção de Encoding**: Corrige problemas de acentuação
- **Validação Completa**: Verifica dados antes de importar

### Design Responsivo
- **Mobile-First**: Otimizado para dispositivos móveis
- **Breakpoints**: 480px, 768px, 1024px
- **Touch-Friendly**: Botões com tamanho adequado para touch
- **Performance**: Carregamento lazy de imagens

## 📱 Plataformas Suportadas

| Plataforma | Badge | Cor |
|------------|-------|-----|
| Shopee | SHOPEE | Vermelho (#ee4d2d) |
| Amazon | AMAZON | Laranja (#ff9900) |
| Mercado Livre | MERCADO LIVRE | Amarelo (#fff159) |
| Eduzz | EDUZZ | Roxo (#7b68ee) |
| Hotmart | HOTMART | Laranja (#ff6b35) |
| Kiwify | KIWIFY | Vermelho (#ff6b6b) |
| AliExpress | ALIEXPRESS | Vermelho (#ff4747) |
| Outros | OUTROS | Cinza (#6c757d) |

## 🎨 Personalização

### Cores Principais
- **Primária**: #ff6b6b (Vermelho coral)
- **Secundária**: #74b9ff (Azul claro)
- **Gradiente**: #667eea → #764ba2

### Fontes
- **Principal**: Poppins (Google Fonts)
- **Ícones**: Font Awesome 6.4.0

### Categorias
- 👗 Moda Feminina
- 👕 Moda Masculina
- 🧒🏻 Moda Infantil
- 👩‍⚕️ Moda Hospitalar
- 🩱 Moda Praia
- 🏋️‍♀️ Moda Fitness
- 🆙 Treino
- 👠 Calçados
- 💄 Beleza
- 📱 Celular
- 💻 Informática
- 📺 Eletrônicos
- 🏠 Casa & Decoração
- 📚 Ebooks & Cursos

## 📞 Contato e Suporte

- **Instagram**: [@tudoemofertas123](https://instagram.com/tudoemofertas123)
- **Email**: tudoemperta123@gmail.com
- **WhatsApp**: Configurar no código

## 🔧 Requisitos Técnicos

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões recentes)
- **JavaScript**: Habilitado
- **LocalStorage**: Para persistência de dados
- **Conexão**: Para carregamento de imagens e fontes

## 📄 Licença

Este projeto foi desenvolvido para uso comercial. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para maximizar suas vendas de afiliados!**
