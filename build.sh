set -o errexit

# Instala as dependências do projeto
yarn

# Compila o código TypeScript (se estiver usando TypeScript)
yarn build

# Aplica migrações de banco de dados usando Prisma
npx prisma migrate deploy --preview-feature