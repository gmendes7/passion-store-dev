# PHP Backend (simples)

Este diretório contém uma API PHP minimalista que se conecta a um banco PostgreSQL usando PDO.

Endpoints

- `GET /products` — lista produtos
- `GET /products/{id}` — obtém produto por `id`

Como usar (WSL)

1. Configure variáveis de ambiente (ou copie `.env.example`):

```bash
export DB_HOST=127.0.0.1
export DB_PORT=5432
export DB_NAME=passion_store
export DB_USER=postgres
export DB_PASS=secret
```

2. Crie o banco (exemplo usando `psql`) e importe a migration:

```bash
# crie o database se necessário
createdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME

# importe o arquivo SQL de migração
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f php-backend/migrations/20251127225404_fcf2c47e-1562-4c84-94bc-4ddf5934e1f4.sql
```

3. Rode o servidor PHP embutido (no WSL):

```bash
cd php-backend
php -S 0.0.0.0:8000 -t public
```

4. Teste as rotas:

```bash
curl http://localhost:8000/products
curl http://localhost:8000/products/<id>
```

Observações

- Este backend foi feito para ser mínimo e fácil de rodar. Para produção, adicione validação, autenticação e tratamento de erros mais robusto.
