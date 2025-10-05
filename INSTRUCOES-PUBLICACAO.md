# 📋 Instruções Completas para Publicação

## 🚀 Guia Passo a Passo para Publicar seu Site

### 📁 **PASSO 1: Preparar o Repositório GitHub**

#### 1.1 Criar Conta no GitHub
- Acesse [github.com](https://github.com)
- Clique em "Sign up" se não tiver conta
- Use o e-mail: **tudoemperta123@gmail.com**
- Escolha um nome de usuário (ex: `aguias-vitrine` ou `tudoemofertas123`)

#### 1.2 Criar Novo Repositório
1. Clique no botão **"New"** (verde)
2. Nome do repositório: `aguias-vitrine`
3. Descrição: `Site de ofertas e afiliados - Águias Vitrine`
4. Marque como **"Public"**
5. Marque **"Add a README file"**
6. Clique em **"Create repository"**

### 📤 **PASSO 2: Fazer Upload dos Arquivos**

#### 2.1 Via Interface Web (Mais Fácil)
1. No seu repositório, clique em **"uploading an existing file"**
2. Arraste todos os arquivos da pasta `aguias-vitrine/`
3. Ou clique em **"choose your files"** e selecione todos
4. Escreva uma mensagem: `"Primeira versão do site Águias Vitrine"`
5. Clique em **"Commit changes"**

#### 2.2 Arquivos que Devem Ser Enviados:
```
✅ index.html
✅ README.md
✅ LICENSE
✅ _config.yml
✅ .gitignore
✅ robots.txt
✅ sitemap.xml
✅ google-sites-version.html
✅ assets/
   ├── style.css
   ├── script.js
   ├── favicon.png
   ├── apple-touch-icon.png
   ├── og-image.jpg
   └── images/
       ├── conjunto-alfaiataria.jpg
       ├── blusa-cropped.jpg
       ├── sandalia-conforto.jpg
       ├── kit-batom.jpg
       ├── fone-bluetooth.jpg
       ├── organizador.jpg
       ├── ebook-moda.jpg
       ├── ebook-beleza.jpg
       └── ebook-organizacao.jpg
```

### 🌐 **PASSO 3: Ativar GitHub Pages**

#### 3.1 Configurar Pages
1. No seu repositório, clique na aba **"Settings"**
2. Role para baixo até encontrar **"Pages"** no menu lateral
3. Em **"Source"**, selecione **"Deploy from a branch"**
4. Em **"Branch"**, selecione **"main"**
5. Deixe **"/ (root)"** selecionado
6. Clique em **"Save"**

#### 3.2 Aguardar Publicação
- O GitHub levará alguns minutos para publicar
- Você receberá um link como: `https://SEU_USUARIO.github.io/aguias-vitrine`
- O site ficará disponível em até 10 minutos

### 🔧 **PASSO 4: Configurações Importantes**

#### 4.1 Configurar Links de Afiliados
Edite o arquivo `assets/script.js` e substitua os links:

```javascript
// Encontre esta seção no arquivo:
const affiliateLinks = {
    'conjunto-alfaiataria': {
        'shopee': 'SEU_LINK_SHOPEE_AQUI',
        'mercadolivre': 'SEU_LINK_ML_AQUI',
        'amazon': 'SEU_LINK_AMAZON_AQUI'
    },
    // Continue para todos os produtos...
};
```

#### 4.2 Configurar Google Analytics
1. Crie uma conta no [Google Analytics](https://analytics.google.com)
2. Obtenha seu ID de medição (ex: `G-XXXXXXXXXX`)
3. No arquivo `index.html`, substitua `GA_MEASUREMENT_ID` pelo seu ID real

#### 4.3 Configurar E-mail de Contato
- Verifique se `tudoemperta123@gmail.com` está correto em todos os arquivos
- Se quiser alterar, edite nos arquivos: `index.html`, `README.md`, `_config.yml`

### 📱 **PASSO 5: Configurar para Instagram**

#### 5.1 Link para Bio do Instagram
Seu link será: `https://SEU_USUARIO.github.io/aguias-vitrine`

#### 5.2 Texto Sugerido para Bio:
```
🦅 Águias Vitrine - Tudo em Oferta!
🔥 As melhores promoções em um só lugar
👗 Moda | 💄 Beleza | 📱 Tech | 🏠 Casa
📚 Ebooks gratuitos
👇 Link para todas as ofertas
```

### 🌐 **PASSO 6: Configurar Google Sites (Alternativa)**

#### 6.1 Criar Site no Google Sites
1. Acesse [sites.google.com](https://sites.google.com)
2. Clique em **"Criar"**
3. Escolha um template em branco
4. Nome do site: **"Águias Vitrine"**

#### 6.2 Adicionar Conteúdo
1. Use o arquivo `google-sites-version.html` como referência
2. Copie e cole o conteúdo em seções do Google Sites
3. Adicione as imagens manualmente
4. Configure os links de afiliados

#### 6.3 Publicar no Google Sites
1. Clique em **"Publicar"**
2. Escolha um URL: `aguias-vitrine` ou `tudoemofertas123`
3. Seu site ficará: `https://sites.google.com/view/aguias-vitrine`

### 🔄 **PASSO 7: Manutenção e Atualizações**

#### 7.1 Como Atualizar Produtos
1. Edite o arquivo `index.html`
2. Adicione novos cards de produtos
3. Atualize preços e links
4. Faça commit das mudanças

#### 7.2 Como Adicionar Novas Imagens
1. Faça upload para a pasta `assets/images/`
2. Atualize as referências no HTML
3. Otimize as imagens (máximo 500KB cada)

#### 7.3 Como Monitorar Performance
- Use Google Analytics para ver visitantes
- Monitore cliques nos links de afiliados
- Acompanhe downloads de ebooks

### 🆘 **PASSO 8: Solução de Problemas**

#### 8.1 Site Não Carrega
- Verifique se o GitHub Pages está ativado
- Aguarde até 10 minutos após mudanças
- Verifique se não há erros no código

#### 8.2 Imagens Não Aparecem
- Verifique se as imagens foram enviadas
- Confirme os nomes dos arquivos (sem espaços)
- Use apenas formatos: JPG, PNG, WebP

#### 8.3 Links Não Funcionam
- Verifique se os links de afiliados estão corretos
- Teste cada link individualmente
- Confirme se não há caracteres especiais

### 📊 **PASSO 9: Otimizações Avançadas**

#### 9.1 SEO (Otimização para Buscadores)
- O site já inclui meta tags otimizadas
- Sitemap.xml configurado
- Robots.txt incluído
- Schema markup para produtos

#### 9.2 Performance
- Imagens otimizadas com lazy loading
- CSS e JavaScript minificados
- CDN para fontes e ícones

#### 9.3 Analytics
- Google Analytics configurado
- Tracking de eventos para cliques
- Monitoramento de conversões

### 🎯 **PASSO 10: Estratégias de Marketing**

#### 10.1 Instagram (@tudoemofertas123)
- Poste stories com produtos em destaque
- Use o link da bio para direcionar tráfego
- Crie highlights por categoria

#### 10.2 WhatsApp
- Configure um número para atendimento
- Use o link: `https://wa.me/5511999999999`
- Responda dúvidas sobre produtos

#### 10.3 E-mail Marketing
- Colete e-mails através do formulário
- Envie newsletters semanais
- Promova ofertas exclusivas

---

## 🎉 **Parabéns! Seu Site Está Pronto!**

Agora você tem:
- ✅ Site profissional e responsivo
- ✅ Hospedagem gratuita no GitHub Pages
- ✅ Versão alternativa para Google Sites
- ✅ Otimização para SEO e performance
- ✅ Integração com redes sociais
- ✅ Sistema de analytics
- ✅ Documentação completa

### 📞 **Suporte**
Se precisar de ajuda:
- 📧 E-mail: tudoemperta123@gmail.com
- 📱 Instagram: @tudoemofertas123
- 📖 Documentação: README.md

**🦅 Águias Vitrine - Voando alto nas melhores ofertas!**
