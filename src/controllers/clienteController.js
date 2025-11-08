import Cliente from "../models/cliente.js";

export const clienteController = {
  async create(req, res) {
    try {
      const { nome, cpf, telefone } = req.body;

      if (!nome || !cpf || !telefone) {
        return res
          .status(400)
          .json({ message: "Todos os campos devem ser informados!" });
      }

      if (cpf.length !== 11) {
        return res
          .status(400)
          .json({ message: "O CPF não segue o formato padrão (11 dígitos)!" });
      }

      if (telefone.length < 9) {
        return res
          .status(400)
          .json({ message: "O telefone deve conter ao menos 9 dígitos!" });
      }

      const clienteExistente = await Cliente.findOne({ where: { cpf } });
      if (clienteExistente) {
        return res
          .status(400)
          .json({ message: "Já existe um cliente com esse CPF!" });
      }

      await Cliente.create({ nome, cpf, telefone });

      return res
        .status(201)
        .json({ message: "Cliente cadastrado com sucesso!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao cadastrar cliente!" });
    }
  },

  async findClients(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ message: "Informe o nome do cliente!" });
      }

      const cliente = await Cliente.findOne({ where: { nome } });

      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado!" });
      }

      return res.status(200).json({
        message: "Cliente encontrado com sucesso!",
        cliente,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao buscar cliente!" });
    }
  },

  async atualizarCliente(req, res) {
    try {
      const { nome, telefone } = req.body;

      if (!nome || !telefone) {
        return res
          .status(400)
          .json({ message: "Informe o nome e novo telefone!" });
      }

      const cliente = await Cliente.findOne({ where: { nome } });

      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado!" });
      }

      cliente.telefone = telefone;
      await cliente.save();

      return res.status(200).json({
        message: "Telefone atualizado com sucesso!",
        cliente,
      });
    } catch (error) {
      console.error("Erro ao atualizar telefone:", error);
      return res.status(500).json({
        message: "Erro interno ao atualizar telefone.",
        error: error.message,
      });
    }
  },
};
