# 📋 Funcionalidades

## Backend
- **Gerenciamento de Produtos**:
  - Listagem de produtos com suporte a paginação.
  - Busca de produtos por nome.
  - Cache de respostas para melhorar a performance.
- **Gerenciamento de Cupons**:
  - Aplicação de cupons de desconto na compra.
- **Health Check**:
  - Endpoint para verificar o status da API.

## Frontend
- **Consumo da API**:
  - Listagem e busca de produtos por nome.
  - Filtragem de produtos por cupons aplicáveis.
  - Busca e gerenciamento de cupons.
  - Adição de produtos ao carrinho.
- **Interface Amigável**:
  - Design responsivo e intuitivo para melhor experiência do usuário.

---

# 🛠 Guia de Uso

## 📥 Instalação

1. Acesse o terminal na raiz do projeto.
2. Execute o seguinte comando para instalar todas as dependências:
   ```bash
   npm run install:project
   ```
3. Inicie o servidor backend (localizado em `./backend`) com:
   ```bash
   npm run start:dev
   ```
4. Inicie o frontend (localizado em `./frontend`) com:
   ```bash
   npm run dev
   ```

## 🧪 Testes

### Backend
- Rodar os testes E2E:
  ```bash
  cd backend && npm run test:e2e
  ```
- Rodar os testes E2E em modo `watch`:
  ```bash
  cd backend && npm run test:e2e:watch
  ```
- Rodar os testes unitários:
  ```bash
  cd backend && npm run test
  ```

---

# 🚀 Tecnologias e Conceitos Utilizados

## Backend
- **Node.js** com **Express** – Framework para construção da API.
- **TypeScript** – Tipagem estática para maior segurança e produtividade.
- **Node-Cache** – Cache em memória para otimizar o desempenho.
- **Pino** – Logger rápido e eficiente.
- **Helmet e CORS** – Segurança e controle de acesso.
- **Jest com Supertest** – Testes unitários e E2E garantindo a qualidade da API.

## Frontend
- **React** – Framework para construção da interface do usuário.
- **Vite** (se aplicável) – Ferramenta de build rápida para desenvolvimento.

---
Feito com 💘 por Lucas Felipe Timoteo
