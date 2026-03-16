# QA 4Blue - Teste Técnico - QA Tester | Processo Seletivo

![Cypress Tests](https://github.com/victorbarsanele/qa-4blue-e2e/workflows/Cypress%20Tests/badge.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-green)
![Cypress Version](https://img.shields.io/badge/cypress-15.11.0-0db7ed)
![Status](https://img.shields.io/badge/status-Test%20Automation%20Suite-success)

## 📋 Visão Geral

Este projeto é um **Web Testing Automation Suite** desenvolvido para avaliar capacidades em automação de testes e QA. Ele contém testes funcionais, de integração e UI para um microsistema web com autenticação, cadastro de usuários e fluxos de sucesso.

### Ambiente de Testes

- **URL Base:** [https://qa-play-sim.lovable.app/](https://qa-play-sim.lovable.app/)
- **Framework:** Cypress 15.11.0
- **Linguagem:** JavaScript (CommonJS)
- **Relatórios:** Mochawesome (com screenshots e vídeos)

---

## 🚀 Instalação e Setup

### Pré-requisitos

- **Node.js** versão 18.0.0 ou superior
- **npm** (incluído no Node.js)
- **Git**

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/victorbarsanele/qa-4blue-e2e.git
cd qa-4blue-e2e
```

### Passo 2: Instalar dependências

```bash
npm install
```

### Passo 3: Configurar variáveis de ambiente (opcional)

O projeto já vem pré-configurado com:

- Base URL: `https://qa-play-sim.lovable.app/`
- Reporter: Mochawesome com videos e screenshots

---

## 🧪 Estrutura do Projeto

```
qa-4blue-e2e/
├── cypress/
│   ├── e2e/                    # Testes end-to-end
│   │   ├── login.cy.js        # Testes de autenticação
│   │   └── signup.cy.js       # Testes de cadastro
│   ├── fixtures/               # Dados de teste (fixtures)
│   │   └── user.json          # Usuário base para testes
│   ├── pages/                  # Page Object Model
│   │   ├── loginPage.js       # Encapsulamento da página de login
│   │   └── signupPage.js      # Encapsulamento da página de signup
│   ├── support/                # Suporte e configurações
│   │   ├── commands.js        # Comandos customizados do Cypress
│   │   ├── locators.js        # Seletores CSS/XPath centralizados
│   │   ├── e2e.js             # Configuração global e2e
│   │   └── apiCommands.js     # Comandos para testes de API (se houver)
│   ├── reports/                # Relatórios de execução
│   │   ├── index.html         # Relatório interativo (abra em navegador)
│   │   └── videos/            # Vídeos das execuções
│   └── utils.js/
│       └── helper.js          # Funções utilitárias (geração de dados, etc)
├── .github/
│   └── workflows/
│       └── cypress.yml        # Pipeline CI/CD (GitHub Actions)
├── cypress.config.js           # Configuração principal do Cypress
├── package.json                # Dependências e scripts
└── README.md                   # Este arquivo
```

---

## ⚙️ Configuração do Cypress

### cypress.config.js

```javascript
{
  baseUrl: 'https://qa-play-sim.lovable.app/',
  video: true,                    // Grava vídeos das falhas
  screenshotOnRunFailure: true,  // Captura screenshots em falhas
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    embeddedScreenshots: true
  }
}
```

---

## 🧑‍💻 Executando os Testes

### Executar todos os testes (modo headless)

```bash
npm run test:full
```

### Modo interativo (Cypress GUI)

```bash
npm run cy:open
```

### Executar especificamente Login

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

### Executar especificamente Signup

```bash
npx cypress run --spec "cypress/e2e/signup.cy.js"
```

---

## 📊 Cenários de Teste

### 1️⃣ **Login** (`cypress/e2e/login.cy.js`)

| #   | Cenário                                                      | Tipo      | Status   |
| --- | ------------------------------------------------------------ | --------- | -------- |
| 1   | Deve permitir login com credenciais válidas                  | Funcional | ✅ PASSA |
| 2   | Deve exibir erro ao logar com credenciais inválidas          | Funcional | ✅ PASSA |
| 3   | Deve exibir validação ao logar com campos vazios             | Validação | ❌ BUG   |
| 4   | Deve exibir erro ao logar com email não registrado           | Funcional | ✅ PASSA |
| 5   | Deve exibir erro ao logar com senha muito curta              | Validação | ❌ BUG   |
| 6   | Deve exibir erro ao logar com senha sem caracteres especiais | Validação | ❌ BUG   |
| 7   | Deve navegar para signup ao clicar em "Criar conta"          | Navegação | ✅ PASSA |
| 8   | Deve exibir formulário com todos os campos obrigatórios      | UI        | ❌ BUG   |
| 9   | Deve verificar largura dos campos de input                   | UI        | ✅ PASSA |
| 10  | Deve exibir requisitos de força da senha                     | UI        | ✅ PASSA |
| 11  | Deve fazer logout ao clicar em "Sair da conta"               | Funcional | ✅ PASSA |

### 2️⃣ **Signup / Cadastro** (`cypress/e2e/signup.cy.js`)

| #   | Cenário                                               | Tipo      | Status   |
| --- | ----------------------------------------------------- | --------- | -------- |
| 1   | Deve permitir cadastro com credenciais válidas        | Funcional | ✅ PASSA |
| 2   | Deve exibir erro ao cadastrar com email duplicado     | Funcional | ❌ BUG   |
| 3   | Deve exibir validações ao cadastrar com campos vazios | Validação | ❌ BUG   |
| 4   | Deve exibir erro ao cadastrar com senhas diferentes   | Validação | ❌ BUG   |
| 5   | Deve validar nome com números/caracteres especiais    | Edge Case | ❌ BUG   |
| 6   | Deve validar telefone com letras                      | Edge Case | ❌ BUG   |
| 7   | Deve validar formato de email                         | Validação | ❌ BUG   |
| 8   | Deve validar limites máximos de caracteres            | Boundary  | ❌ BUG   |
| 9   | Deve validar senha muito curta                        | Validação | ❌ BUG   |
| 10  | Deve validar senha sem caracteres especiais           | Validação | ❌ BUG   |
| 11  | Deve exibir formulário com todos os campos            | UI        | ✅ PASSA |
| 12  | Deve verificar largura dos campos de input            | UI        | ❌ BUG   |
| 13  | Deve exibir requisitos de força da senha              | UI        | ✅ PASSA |
| 14  | Deve para a página de login quando clicado            | UI        | ✅ PASSA |
| 15  | Deve navegar para login após sucesso                  | Navegação | ✅ PASSA |

---

## 📹 Visualizando Resultados

### Abrir Relatório Interativo

1. Execute os testes:
    ```bash
    npm run test:full
    ```
2. Abra o relatório em seu navegador:
    ```bash
    cypress/reports/index.html
    ```

### Elementos do Relatório

- ✅ **Resumo de Execução:** Total de testes, taxa de sucesso/falha
- 📊 **Gráficos:** Distribuição de resultados por categoria
- 🎥 **Vídeos:** Gravações das execuções com falhas
- 📸 **Screenshots:** Capturas de tela dos momentos de erro
- 📝 **Detalhes:** Stack traces e mensagens de erro completas

---

## 🐛 Análise de Bugs Encontrados

### Pergunta 1: Quais 2 bugs você corrigiria primeiro e por quê?

#### 🔴 **BUG #1: Validações de campos vazios não funcionam no LOGIN**

**Prioridade:** CRÍTICA | **Severidade:** ALTA

**Por que corrigir primeiro:**

- Afeta fluxo básico de validação de entrada
- Permite que usuários enviem formulários sem dados obrigatórios
- Impacta a robustez e usabilidade da aplicação
- Mensagens de erro não aparecem conforme esperado

---

#### 🔴 **BUG #2: Validações de força de senha não funcionam (LOGIN)**

**Prioridade:** CRÍTICA | **Severidade:** ALTA

**Por que corrigir primeiro:**

- Afeta a segurança da aplicação (aceita senhas fracas)
- Impede validação de senhas muito curtas (< 8 caracteres)
- Impede validação de senhas sem caracteres especiais
- Bloqueia 2 cenários críticos de testes de autenticação

---

### Pergunta 2: Descrição detalhada dos bugs encontrados

---

#### 🐛 **BUG #1: Validações de campos vazios não funcionam no LOGIN**

| Campo                      | Descrição                                                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Título**                 | Mensagens de validação não aparecem ao enviar login sem preencher campos obrigatórios                                                                                                                  |
| **Descrição**              | Ao clicar no botão "Entrar" sem preencher nenhum campo (email e senha vazios), o sistema não exibe as mensagens de validação esperadas "O campo e-mail é obrigatório" e "O campo senha é obrigatório". |
| **Passos para Reproduzir** | 1. Acessar a página de login (https://qa-play-sim.lovable.app/)<br>2. NÃO preencher nenhum campo<br>3. Clicar no botão "Entrar"<br>4. Observar se há mensagens de validação                            |
| **Resultado Atual**        | ❌ Nenhuma mensagem de erro é exibida, formulário silenciosamente falha ou redireciona incorretamente                                                                                                  |
| **Resultado Esperado**     | ✅ Deve exibir:<br> - "O campo e-mail é obrigatório"<br> - "O campo senha é obrigatório"                                                                                                               |
| **Severidade**             | 🔴 CRÍTICA                                                                                                                                                                                             |
| **Prioridade**             | 🔴 ALTA                                                                                                                                                                                                |
| **Afeta**                  | Validação de Entrada, UX, Fluxo de Login                                                                                                                                                               |
| **Evidências**             | Screenshot/vídeo em `cypress/reports/index.html` - cenário #3 "Deve exibir validação ao logar com campos vazios"                                                                                       |

---

#### 🐛 **BUG #2: Validações de força de senha não funcionam no LOGIN**

| Campo                      | Descrição                                                                                                                                                                                                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Título**                 | Sistema aceita senhas que não atendem aos requisitos de força mínima durante login                                                                                                                                                                                                                                                      |
| **Descrição**              | O sistema não valida adequadamente a força da senha no fluxo de login. Permite senhas que violam os requisitos mínimos: mínimo 8 caracteres com pelo menos 1 caractere especial.                                                                                                                                                        |
| **Passos para Reproduzir** | **Teste 1 - Senha muito curta:**<br>1. Acessar login<br>2. Email: qualquer email válido<br>3. Senha: "short" (5 caracteres)<br>4. Clicar "Entrar"<br><br>**Teste 2 - Senha sem caracteres especiais:**<br>1. Acessar login<br>2. Email: qualquer email válido<br>3. Senha: "Password123" (sem caractere especial)<br>4. Clicar "Entrar" |
| **Resultado Atual**        | ❌ Sistema não valida; aceita senhas fracas ou exibe alerta genérico                                                                                                                                                                                                                                                                    |
| **Resultado Esperado**     | ✅ Deve exibir:<br> - Para "short": "A senha deve conter pelo menos 8 caracteres."<br> - Para "Password123": "A senha deve conter pelo menos um caractere especial."                                                                                                                                                                    |
| **Severidade**             | 🔴 CRÍTICA                                                                                                                                                                                                                                                                                                                              |
| **Prioridade**             | 🔴 ALTA                                                                                                                                                                                                                                                                                                                                 |
| **Afeta**                  | Segurança, Validação de Entrada, Requisitos de Senha                                                                                                                                                                                                                                                                                    |
| **Evidências**             | Screenshots/vídeos em `cypress/reports/index.html` - cenários #5 e #6 do Login                                                                                                                                                                                                                                                          |

---

#### 🐛 **BUG #3: Validações não funcionam no formulário de SIGNUP (Múltiplas deficiências)**

| Campo                      | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Título**                 | Sistema signup possui múltiplas falhas de validação em campos obrigatórios e formatos                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Descrição**              | O formulário de cadastro não valida apropriadamente campos obrigatórios, formatos de entrada (nome, email, telefone) e força de senha. Permite dados inválidos ou não exibe mensagens de erro apropriadas.                                                                                                                                                                                                                                                                                      |
| **Passos para Reproduzir** | **Validação 1 - Campos vazios:**<br>1. Acessar signup<br>2. NÃO preencher nada<br>3. Clicar "Criar conta"<br>4. Observar validações<br><br>**Validação 2 - Email duplicado:**<br>1. Criar usuário (ex: test@example.com)<br>2. Tentar criar outro com mesmo email<br>3. Observar mensagem de erro<br><br>**Validação 3 - Senhas diferentes:**<br>1. Preencher Senha: "Test123!"<br>2. Confirmar senha: "Test456!"<br>3. Clicar "Criar conta"<br>4. Observar se exibe: "As senhas não coincidem" |
| **Resultado Atual**        | ❌ Múltiplas validações falham:<br> - Campos vazios: nenhuma mensagem<br> - Email duplicado: não valida<br> - Senhas diferentes: não valida                                                                                                                                                                                                                                                                                                                                                     |
| **Resultado Esperado**     | ✅ Deve validar e exibir:<br> - Campos vazios: mensagens específicas<br> - Email duplicado: "E-mail já cadastrado"<br> - Senhas diferentes: "As senhas não coincidem"                                                                                                                                                                                                                                                                                                                           |
| **Severidade**             | 🔴 CRÍTICA                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Prioridade**             | 🔴 ALTA                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Afeta**                  | Signup, Validação de Entrada, Integridade de Dados                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Evidências**             | Screenshots/vídeos em `cypress/reports/index.html` - cenários #3, #2 e #4 do Signup                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Obs.**                   | Afeta 6+ cenários de validação no Signup (vide tabela acima)                                                                                                                                                                                                                                                                                                                                                                                                                                    |

---

#### 🐛 **BUG #4: Mensagem "Erro inesperado" após login bem-sucedido**

| Campo                      | Descrição                                                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Título**                 | Mensagem de erro inofensiva exibida após login bem-sucedido                                                                                                                    |
| **Descrição**              | Após realizar login com credenciais válidas, uma mensagem "Erro inesperado" é exibida na tela, mesmo com o login sendo concluído com sucesso e o redirecionamento funcionando. |
| **Passos para Reproduzir** | 1. Acessar página de login<br>2. Preencher email e senha válidos<br>3. Clicar em "Entrar"<br>4. Observar mensagem de erro exibida                                              |
| **Resultado Atual**        | ❌ Mensagem "Erro inesperado" é exibida, mas não impede o funcionamento do login                                                                                               |
| **Resultado Esperado**     | ✅ Não deve exibir nenhuma mensagem de erro quando o login for bem-sucedido                                                                                                    |
| **Severidade**             | 🟡 BAIXA                                                                                                                                                                       |
| **Prioridade**             | 🟡 BAIXA                                                                                                                                                                       |
| **Afeta**                  | UX, Mensagens de Feedback                                                                                                                                                      |
| **Observação**             | ⚠️ **Erro conhecido** - Não afeta funcionalidade; apenas visual/cosmético                                                                                                      |

---

### Pergunta 3: Sugestões de Melhorias para as Telas

#### 🎨 **Melhorias na Experiência do Usuário (UX)**

| Aspecto                     | Problema                                                               | Sugestão                                                                        |
| --------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Feedback de Erro**        | Mensagens de erro são genéricas ou não aparecem                        | Implementar toast notifications ou modal com erro específico e ação recomendada |
| **Validação em Tempo Real** | Usuário só descobre erro após enviar form                              | Adicionar validação client-side (ex: "Email inválido" enquanto digita)          |
| **Links de Navegação**      | Links "Criar conta" e "Esqueci minha senha" poderiam ser mais visíveis | Destacar com ícones ou cores diferentes; adicionar hover effects                |
| **Responsividade**          | Alguns inputs têm larguras fixas (200px, 400px)                        | Implementar grid system responsivo (ex: Bootstrap, Tailwind) para mobile        |
| **Acessibilidade**          | Possível falta de labels, aria-labels ou tab order                     | Adicionar `<label>` vinculadas via `for` attribute; labels acessíveis           |
| **Reset de Senha**          | Link "Esqueci minha senha" existe mas funcionalidade incerta           | Implementar fluxo completo de reset com envio de email                          |

#### 🔒 **Melhorias na Segurança**

| Aspecto                  | Problema                                                   | Sugestão                                                        |
| ------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------- |
| **Força da Senha**       | Requisitos mostrados mas pode não ser validado server-side | Implementar barra visual de força (fraco/médio/forte)           |
| **Rate Limiting**        | Sem proteção contra brute force                            | Implementar limite de tentativas de login (ex: 5 por 5 minutos) |
| **Confirmação de Email** | Email não é confirmado antes de usar                       | Adicionar fluxo de verificação por link/código                  |
| **HTTPS**                | Certificado pode estar em risco                            | Renovar certificado SSL/TLS; manter HSTS headers                |
| **Session Timeout**      | Sessão pode ficar aberta indefinidamente                   | Implementar session timeout (ex: 30 minutos inativo)            |

#### 📱 **Melhorias Técnicas**

| Aspecto                  | Problema                                        | Sugestão                                                                                                           |
| ------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Seletores de Teste**   | Seletores frágeis acoplados a CSS/texto         | Adicionar atributos `data-test` nos elementos chave do HTML para tornar os testes mais estáveis e fáceis de manter |
| **Testes Automatizados** | Alguns fluxos críticos podem não estar cobertos | Aumentar cobertura para 80%+; adicionar testes de API                                                              |
| **Tratamento de Erros**  | Mensagens de erro não padronizadas              | Criar um componente de erro reutilizável no frontend                                                               |
| **Logging**              | Sem registro de eventos de autenticação         | Implementar logging server-side para auditoria                                                                     |
| **CORS**                 | Se houver consumo de APIs externas              | Configurar CORS adequadamente                                                                                      |
| **Performance**          | Possível lentidão nas validações                | Implementar debounce nas validações em tempo real                                                                  |

#### 📊 **Melhorias na Forma & Design**

| Aspecto                 | Problema                                                | Sugestão                                                          |
| ----------------------- | ------------------------------------------------------- | ----------------------------------------------------------------- |
| **Consistência Visual** | Larguras fixas (200px vs 400px) inconsistentes          | Padronizar: todos inputs devem ter mesma largura ou estar em grid |
| **Spacing & Padding**   | Espaçamento pode ser irregular                          | Usar escala de espaçamento (8px, 16px, 24px, 32px)                |
| **Tipografia**          | Tamanhos de fonte podem não estar claros                | Definir scale: heading (24px), body (16px), small (14px)          |
| **Estados do Botão**    | Botão "Entrar" pode não ter estado hover/disabled claro | Adicionar efeitos visuais em hover, focus, disabled               |
| **Cores**               | Sem contraste suficiente ou cores vibrantes demais      | Seguir WCAG 2.1 AA para contraste; paleta de cores consistente    |

---

## 🔄 CI/CD Pipeline

O projeto está configurado com **GitHub Actions**. A cada push para a branch `main`:

1. ✅ Checkout do código
2. 📦 Instala dependências (`npm install`)
3. 🧪 Executa testes Cypress (`npm run test:full`)
4. 📊 Gera relatório Mochawesome
5. 🎥 Armazena vídeos e screenshots

### Status do Pipeline

![Build Status](https://github.com/victorbarsanele/qa-4blue-e2e/actions/workflows/cypress.yml/badge.svg)

---

## 📋 Evidências e Artefatos

Para manter o repositório leve e, ao mesmo tempo, facilitar a avaliação técnica, esta entrega versiona apenas o relatório consolidado em HTML.

### ✅ Artefato versionado no GitHub

```
cypress/reports/index.html
```

Esse arquivo contém:

- Resumo da execução
- Cenários com status
- Screenshots embutidas no relatório
- Referências dos testes que falharam

### 🗂️ Artefatos locais (não versionados)

```
cypress/videos/
cypress/screenshots/
cypress/reports/videos/
```

Esses arquivos são gerados localmente para depuração e podem ser consultados na máquina durante a análise, mas não são enviados ao repositório por serem pesados.

### 🔎 Como o avaliador deve consultar as evidências

1. Abrir `cypress/reports/index.html` no repositório clonado.
2. Navegar pelos cenários de `Login` e `Signup`.
3. Conferir os erros documentados na seção de bugs deste README.

---

## 🛠️ Troubleshooting

### Problema: "baseUrl is not defined"

**Solução:** Verifique se `cypress.config.js` tem `baseUrl` configurado.

### Problema: Testes ficam lentos

**Solução:** Aumente timeout em `cypress.config.js`:

```javascript
defaultCommandTimeout: 10000,
requestTimeout: 10000
```

### Problema: Clicks não registram valores

**Solução:** Use `cy.force(true)` ou `{ force: true }` em elementos ocultos:

```javascript
cy.get(selector).click({ force: true });
```

### Problema: Fixtures não carregam

**Solução:** Verifique caminho relativo em `cy.fixture('user')` → arquivo deve estar em `cypress/fixtures/user.json`

---

## 📚 Tecnologias Utilizadas

| Tecnologia         | Versão  | Propósito                        |
| ------------------ | ------- | -------------------------------- |
| **Cypress**        | 15.11.0 | Framework de automação de testes |
| **Node.js**        | 18+     | Runtime JavaScript               |
| **Mochawesome**    | 7.1.4   | Gerador de relatórios            |
| **npm**            | 9+      | Gerenciador de pacotes           |
| **GitHub Actions** | Latest  | CI/CD                            |

---

## 📞 Contato

**Autor:** Víctor Barsanele de Andrade
**Email:** victor.barsanele@gmail.com
**LinkedIn:** https://www.linkedin.com/in/victorbarsanele/
