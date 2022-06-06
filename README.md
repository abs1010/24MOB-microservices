# 24MOB-microservices

Serviço 1 rodando em http://localhost:4000/api/clientes

Serviço 2 rodando em http://localhost:5000/api/banco/


## Serviço 1 (Clientes) rotas:

- GET
[x] /api/clientes - Retorna todos os itens de clientes

- POST
[x] /api/clientes/login - Autentica usuário 
[x] /api/clientes/cadastro - Cadastro um novo cliente

- PUT
[x] /api/clientes/atualizar - Atualiza um cliente pelo id


## Serviço 2 (Banco) rotas:

- GET
[x] /api/banco - Retorna todos os itens de banco

- POST
[x] /api/banco/inclusao - Inclui novas informações bancárias a um id de usuário/cliente

- PUT
[x] /api/banco/atualizar/:id - Atualiza um registro de banco pelo id