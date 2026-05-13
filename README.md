# 🛒 Sistema de Mercado JOAN - Back-end

API REST desenvolvida para gerenciamento de mercado, permitindo o controle de clientes, produtos, estoque e vendas.

O sistema foi desenvolvido utilizando Node.js, Express e MySQL, seguindo uma arquitetura organizada em rotas, controladores e conexão com banco de dados.

---

# 🚀 Tecnologias Utilizadas

* Node.js
* TypeScript
* Express
* MySQL
* mysql2
* CORS
* TSX

---

# 📂 Estrutura do Projeto

```bash
src/
 ├── controllers/
 │    ├── clientes.ts
 │    ├── produtos.ts
 │    └── venda.ts
 │
 ├── types/
 │    └── saleType.ts
 │
 ├── database.ts
 ├── router.ts
 └── server.ts
```

---

# ⚙️ Funcionalidades da API

## 👤 Clientes

* Criar clientes
* Listar clientes
* Buscar cliente por ID
* Atualizar cliente

## 📦 Produtos

* Criar produtos
* Listar produtos
* Buscar produto por ID
* Atualizar produtos
* Remover produtos
* Controle de estoque

## 💰 Vendas

* Criar vendas
* Listar vendas
* Buscar venda por ID
* Atualização automática do estoque
* Cálculo automático do valor total da venda

---

# 🔌 Rotas da API

## Clientes

| Método | Rota              |
| ------ | ----------------- |
| POST   | `/createUser`     |
| GET    | `/getUsers`       |
| GET    | `/getUsers/:id`   |
| PUT    | `/updateUser/:id` |

---

## Produtos

| Método | Rota                 |
| ------ | -------------------- |
| POST   | `/createProduct`     |
| GET    | `/getProducts`       |
| GET    | `/getProducts/:id`   |
| PUT    | `/updateProduct/:id` |
| DELETE | `/deleteProduct/:id` |

---

## Vendas

| Método | Rota            |
| ------ | --------------- |
| POST   | `/createSale`   |
| GET    | `/getSales`     |
| GET    | `/getSales/:id` |

---

# 🗄️ Banco de Dados

O sistema utiliza MySQL como banco de dados.

Configuração localizada em:

```ts
src/database.ts
```

Exemplo:

```ts
export const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "lojajoan",
});
```

---

# ▶️ Instalação e Execução

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/notBrunoAndrade/Sistema_de_mercado_JOAN.git
```

---

## 2️⃣ Entrar na pasta do projeto

```bash
cd Sistema_de_mercado_JOAN
```

---

## 3️⃣ Instalar dependências

```bash
npm install
```

---

## 4️⃣ Executar o servidor

```bash
npm run dev
```

Servidor disponível em:

```bash
http://localhost:3333
```

---

# 📌 Exemplo de Venda

```json
{
  "clienteId": 1,
  "itens": [
    {
      "produtoId": 1,
      "quantidade": 2
    },
    {
      "produtoId": 3,
      "quantidade": 1
    }
  ]
}
```

---

# 🛡️ Regras Implementadas

* Verificação de estoque disponível
* Validação de produtos existentes
* Atualização automática do estoque após venda
* Cálculo automático do valor total
* Organização modular da aplicação

---

# 👨‍💻 Autor

Desenvolvido por Bruno Andrade.
