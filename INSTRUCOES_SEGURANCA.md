# Instruções de Segurança e Atualização do Repositório

Esta versão do site "Águias Vitrine - Tudo em Oferta" foi corrigida para remover a chave de API do Firebase que estava exposta publicamente no histórico de commits do seu repositório no GitHub. A exposição de chaves de API é uma falha de segurança grave que pode permitir que pessoas não autorizadas acessem seus serviços do Firebase, resultando em cobranças inesperadas e/ou roubo de dados.

## O que foi feito

1.  **Remoção da Chave de API do Histórico do Git:** Utilizei a ferramenta `git-filter-repo` para reescrever o histórico do seu repositório, removendo completamente a chave de API exposta. Isso garante que a chave não possa ser encontrada em commits antigos.

2.  **Substituição da Chave por Placeholders:** No arquivo `index.html`, a chave de API foi substituída por placeholders (ex: `SUA_API_KEY`). Você deverá substituir esses placeholders pelas suas chaves reais em um ambiente seguro.

## Próximos Passos e Instruções

Para garantir a segurança do seu site e evitar que este problema ocorra novamente, siga as instruções abaixo:

### 1. Atualize seu Repositório no GitHub

Como o histórico do seu repositório foi reescrito, você precisará forçar o envio das alterações para o GitHub. **ATENÇÃO: Este comando irá sobrescrever o histórico do seu repositório no GitHub. Certifique-se de que não há outras pessoas trabalhando no mesmo repositório antes de executar este comando.**

Abra um terminal ou prompt de comando, navegue até o diretório onde o seu repositório está clonado e execute os seguintes comandos:

```bash
# Adicione o remote novamente, caso tenha sido removido
git remote add origin https://github.com/Tudoemoferta/Aguias-Vitrine.git

# Force o envio das alterações para o GitHub
git push origin --force --all
```

### 2. Proteja suas Chaves de API

Nunca armazene chaves de API diretamente no seu código-fonte, especialmente em repositórios públicos. A melhor prática é utilizar variáveis de ambiente para armazenar informações sensíveis.

Como o seu site está hospedado no GitHub Pages, que não suporta variáveis de ambiente no lado do servidor, a solução mais segura é utilizar o Firebase Authentication com regras de segurança do Realtime Database para controlar o acesso aos seus dados. Desta forma, a chave de API pode ser pública, mas apenas usuários autenticados terão acesso para modificar os dados.

Nas próximas etapas, irei implementar um sistema de autenticação seguro para o painel de administração.
