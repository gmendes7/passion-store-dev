# Passion Store

## Descrição

O Passion Store é uma aplicação de e-commerce que permite gerenciar produtos de forma eficiente. O projeto utiliza TypeScript e integra-se com um banco de dados SQL para armazenar informações sobre os produtos.

## Estrutura do Projeto

```
passion-store
├── src
│   ├── app.ts                # Ponto de entrada da aplicação
│   ├── server.ts             # Inicializa o servidor
│   ├── controllers           # Controladores para gerenciar a lógica de negócios
│   │   └── products.controller.ts  # Controlador de produtos
│   ├── routes                # Define as rotas da aplicação
│   │   └── products.routes.ts # Rotas relacionadas a produtos
│   ├── services              # Lógica de negócios
│   │   └── products.service.ts # Serviço de produtos
│   ├── db                   # Configuração do banco de dados
│   │   ├── index.ts         # Conexão com o banco de dados
│   │   └── migrations        # Scripts de migração do banco de dados
│   │       └── 20251127225404_fcf2c47e-1562-4c84-94bc-4ddf5934e1f4.sql # Criação da tabela de produtos
│   ├── models                # Modelos de dados
│   │   └── product.ts       # Modelo de produto
│   └── types                 # Tipos utilizados na aplicação
│       └── index.ts         # Interfaces de tipos
├── prisma                    # Configuração do Prisma
│   └── schema.prisma        # Esquema do banco de dados
├── package.json              # Configuração do npm
├── tsconfig.json             # Configuração do TypeScript
├── .env.example              # Exemplo de variáveis de ambiente
└── README.md                 # Documentação do projeto
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd passion-store
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Renomeie `.env.example` para `.env` e preencha as informações necessárias.

4. Execute as migrações do banco de dados:
   ```
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   ```
   npm run start
   ```

## Uso

A aplicação estará disponível em `http://localhost:PORTA`, onde `PORTA` é a porta configurada no arquivo `server.ts`. Você pode acessar as rotas relacionadas a produtos para listar, criar, atualizar e deletar produtos.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.