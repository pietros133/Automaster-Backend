# Automaster API

API do sistema Automaster. Documentação para integração com o front-end React.

---
## 📂 Estrutura de Pastas

```text
.
└── Automaster/
    ├── src/
    │   ├── config/
    │   │   └── .db.js
    │   ├── models/
    │   │   ├── agendamento.js
    │   │   ├── cliente.js
    │   │   ├── usuario.js
    │   │   └── veiculo.js
    │   ├── routes/
    │   │   ├── agendamentoRoutes.js
    │   │   ├── clienteRoutes.js
    │   │   ├── usuarioRoutes.js
    │   │   └── veiculoRoutes.js
    │   └── controllers/
    │       ├── agendamentoController.js
    │       ├── clienteController.js
    │       ├── usuarioController.js
    │       └── veiculoController.js
    └── app.js
```

## 🔹 Clientes

| Método | Rota | Descrição | Body | Response |
|--------|------|-----------|------|----------|
| POST | `/clientes/cadastrarCliente` | Cadastra um novo cliente | `{ "nome": "Pietro", "cpf": "12345678901", "telefone": "99999999" }` | `{ "message": "Cliente cadastrado com sucesso!" }` |
| POST | `/clientes/atualizarCliente` | Atualiza telefone de um cliente existente (busca pelo nome) | `{ "nome": "Pietro", "telefone": "999999999" }` | `{ "message": "Telefone atualizado com sucesso!", "cliente": { "nome": "Pietro", "cpf": "12345678901", "telefone": "999999999" } }` |
| GET | `/clientes/buscarCliente` | Busca um cliente pelo nome (informe no body) | `{ "nome": "Pietro" }` | `{ "message": "Cliente encontrado com sucesso!", "cliente": { "id": 1, "nome": "Pietro", "cpf": "12345678901", "telefone": "99999999" } }` |



---

## 🔹 Veículos

| Método | Rota | Descrição | Body | Response |
|--------|------|-----------|------|----------|
| POST | `/veiculos/cadastrarVeiculo` | Cadastra um veículo vinculado a um cliente | `{ "placa": "ABC1234", "modelo": "Fiat Uno", "cor": "Preto", "nomeCliente": "Pietro" }` | `{ "message": "Veículo cadastrado com sucesso!", "veiculo": { "placa": "ABC1234", "modelo": "Fiat Uno", "cor": "Preto", "cliente": "Pietro" } }` |



---

## 🔹 Agendamentos

| Método | Rota | Descrição | Body | Response |
|--------|------|-----------|------|----------|
| POST | `/agendamentos/cadastrar` | Cadastra um novo agendamento | `{ "placa": "ABC1234", "data": "2025-11-08", "hora": "09:30", "descricao": "Troca de óleo", "preco": "2300" }` | `{ "message": "Agendamento criado com sucesso!", "agendamento": { "id": 1, "nomeCliente": "Pietro", "modelo": "Fiat Uno", "placa": "ABC1234", "cor": "Preto", "data": "2025-11-08", "hora": "09:30", "descricao": "Troca de óleo", "preco": "2300", "status": "pendente" } }` |
| GET | `/agendamentos/buscar` | Lista todos os agendamentos | — | `[ { "id": 1, "nomeCliente": "Pietro", "telefone": "99999999", "modelo": "Fiat Uno", "placa": "ABC1234", "cor": "Preto", "data": "2025-11-08", "hora": "09:30", "descricao": "Troca de óleo", "preco": "2300", "status": "pendente" } ]` |

---

## 🔹 Usuários / Login

| Método | Rota | Descrição | Body | Response |
|--------|------|-----------|------|----------|
| POST | `/usuarios/usuarios` | Cadastra um novo usuário | `{ "nome": "Admin", "email": "admin@mail.com", "senha": "123456" }` | `{ "message": "Usuário cadastrado com sucesso!", "user": { "id": 1, "nome": "Admin", "email": "admin@mail.com" } }` |
| POST | `/usuarios/login` | Login de usuário | `{ "email": "admin@mail.com", "senha": "123456" }` | `{ "message": "Login realizado com sucesso!", "user": { "id": 1, "nome": "Admin", "email": "admin@mail.com" } }` |
| POST | `/usuarios/recuperarsenha` | Redefine a senha do usuário | `{ "email": "admin@mail.com", "novaSenha": "nova1234" }` | `{ "success": true, "message": "Senha redefinida com sucesso!" }` |

---

## 🔹 Observações Gerais

- Todas as rotas esperam que o back-end esteja rodando na **mesma URL configurada no front-end**.  
- Para rotas **POST**, enviar o corpo em **JSON**.  
- Campos obrigatórios devem ser preenchidos, ou a API retornará **status 400** com mensagem de erro.  
- Em caso de erro ou registro não encontrado, a API retorna **status 404** ou **500** com JSON de erro.  
- Algumas rotas buscam registros pelo **nome** em vez de `id` (clientes e veículos).  
