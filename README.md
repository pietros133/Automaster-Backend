# Automaster API

API do sistema Automaster. Documentação completa para integração com o front-end React.

---

## 🔹 Clientes

| Método | Rota | Descrição | Body | Response |
|--------|------|-----------|------|----------|
| POST | `/cadastrarCliente` | Cadastra um novo cliente | `{ "nome": "Pietro", "telefone": "99999999", "email": "pietro@mail.com" }` | `{ "success": true, "id": 1 }` |
| POST | `/atualizarCliente` | Atualiza dados de um cliente existente | `{ "id": 1, "nome": "Pietro Miranda", "telefone": "99999999" }` | `{ "success": true }` |
| GET | `/buscarCliente` | Lista todos os clientes | — | `[ { "id": 1, "nome": "Pietro", "telefone": "99999999" } ]` |

---

## 🔹 Veículos

| Método | Rota | Descrição | Body | Response |
|--------|------|-----------|------|----------|
| POST | `/cadastrarVeiculo` | Cadastra um veículo ligado a um cliente | `{ "clienteId": 1, "modelo": "Fiat Uno", "placa": "ABC-1234" }` | `{ "success": true, "id": 1 }` |

---

## 🔹 Agendamentos

| Método | Rota | Descrição | Body | Response |
|--------|------|-----------|------|----------|
| POST | `/cadastrar` | Cadastra um novo agendamento | `{ "clienteId": 1, "veiculoId": 1, "data": "2025-11-08", "servico": "Troca de óleo" }` | `{ "success": true, "id": 1 }` |
| GET | `/buscar` | Lista todos os agendamentos | — | `[ { "id": 1, "clienteId": 1, "veiculoId": 1, "data": "2025-11-08", "servico": "Troca de óleo" } ]` |

---

## 🔹 Usuários / Login

| Método | Rota | Descrição | Body | Response |
|--------|------|-----------|------|----------|
| POST | `/usuarios` | Cadastra um novo usuário | `{ "nome": "Admin", "email": "admin@mail.com", "senha": "123456" }` | `{ "success": true, "id": 1 }` |
| POST | `/login` | Login de usuário | `{ "email": "admin@mail.com", "senha": "123456" }` | `{ "success": true, "token": "abc123" }` |
| POST | `/recuperarsenha` | Recupera senha do usuário | `{ "email": "admin@mail.com" }` | `{ "success": true, "message": "Email de recuperação enviado" }` |

---

## 🔹 Observações Gerais

- Todas as rotas esperam que o back-end esteja rodando na **mesma URL configurada no front-end**.  
- Para rotas **POST**, enviar o corpo em **JSON**.  
- Para rotas que usam `id` ou `clienteId`, substituir pelo número do registro real.  
- Em caso de erro, o back-end retorna:
```json
{
  "success": false,
  "message": "Registro não encontrado"
}
