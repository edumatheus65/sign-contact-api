# sign-contact-api
## API para cadastrar clientes e seus respectivos contatos

## Descrição da aplicação:
Esta API REST tem a responsabilidade de gerenciar o cadastro de clientes, cada um podendo ter múltiplos contatos associados. Utilizando o PRISMA como ORM para facilitar a interação com o banco de dados, ZOD para serialização de dados, e PostgreSQL como sistema de gerenciamento de banco de dados, a API também incorpora a geração de tokens criptografados através do JSON Web Token (JWT), garantindo a segurança das informações sensíveis. Além disso, adota o dotenv para proteger dados sensíveis, o bcrypt.js para hash de senhas e express-async-errors para personalização de erros na aplicação.

## Endpoints da API:
| Método | Endpoint          | Descrição                                      | Autenticação e Autorização         |
|--------|-------------------|------------------------------------------------|------------------------------------|
| GET    | /clientes         | Retorna todos os clientes cadastrados          | Apenas administradores             |
| GET    | /clientes/{id}    | Retorna um cliente específico pelo ID         | Admins e donos da conta            |
| POST   | /clientes         | Cadastra um novo cliente                      | Qualquer cliente, token não é necessário |
| PATCH  | /clientes/{id}    | Atualiza os dados de um cliente específico    | Admins e donos da conta            |
| DELETE | /clientes/{id}    | Exclui um cliente pelo ID                     | Admins e donos da conta            |
| POST   | /login            | Gera um token de autenticação                 | Qualquer cliente, token não é necessário |
| POST   | /contact          | Adiciona um novo contato para um cliente      | Donos da conta                     |
| GET    | /contact          | Lista todos os contatos                        | Apenas administradores             |
| GET    | /contact/{id}     | Lista os contatos que pertencem a um cliente  | Admin e cliente dono da conta      |
| DELETE | /contact/{id}     | Deleta o contato que pertence a um cliente    | Admin e cliente dono da conta      |
| PATCH  | /contact/{id}     | Atualiza o contato que pertence a um cliente  | Admin e cliente dono da conta      |


## Passos para a API rodar:
1. Clone o repositório para o seu ambiente local.
2. No diretório do projeto, execute o comando `npm install` para instalar todas as dependências necessárias.
3. Execute o comando `npx prisma migrate dev --name migration` para rodar as migrações do banco de dados. Certifique-se de substituir "migration" pelo nome da migração.
4. Para iniciar o servidor, utilize o comando `npm run dev`. Isso iniciará a API e a disponibilizará para acesso.
