import Agendamento from "../models/agendamento.js";
import Veiculo from "../models/veiculo.js";
import Cliente from "../models/cliente.js";

export const agendamentoController = {
  async cadastrarAgendamento(req, res) {
    try {
      const { placa, data, hora, descricao, preco } = req.body;

      if (!placa || !data || !hora) {
        return res.status(400).json({
          message: "Preencha os campos obrigatórios: placa, data e hora!",
        });
      }

      const veiculo = await Veiculo.findOne({ where: { placa } });
      if (!veiculo) {
        return res.status(404).json({ message: "Veículo não encontrado!" });
      }

      const cliente = await Cliente.findByPk(veiculo.clienteId);
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado!" });
      }

      const novoAgendamento = await Agendamento.create({
        clienteId: cliente.id,
        placaVeiculo: veiculo.placa,
        data,
        hora,
        descricao,
        preco,
      });

      return res.status(201).json({
        message: "Agendamento criado com sucesso!",
        agendamento: {
          id: novoAgendamento.id,
          nomeCliente: cliente.nome,
          modelo: veiculo.modelo,
          placa: veiculo.placa,
          cor: veiculo.cor,
          data,
          hora,
          descricao,
          preco,
          status: novoAgendamento.status,
        },
      });
    } catch (error) {
      console.error("Erro ao cadastrar agendamento:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async listarAgendamentos(req, res) {
    try {
      const agendamentos = await Agendamento.findAll({
        include: [
          {
            model: Cliente,
            as: "cliente",
            attributes: ["nome", "telefone"],
          },
          {
            model: Veiculo,
            as: "veiculo",
            attributes: ["modelo", "placa", "cor"],
          },
        ],
        order: [
          ["data", "ASC"],
          ["hora", "ASC"],
        ],
      });

      if (agendamentos.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum agendamento encontrado!" });
      }

      const dados = agendamentos.map((a) => ({
        id: a.id,
        nomeCliente: a.cliente?.nome,
        telefone: a.cliente?.telefone,
        modelo: a.veiculo?.modelo,
        placa: a.veiculo?.placa,
        cor: a.veiculo?.cor,
        data: a.data,
        hora: a.hora,
        descricao: a.descricao,
        preco: a.preco,
        status: a.status,
      }));

      return res.status(200).json(dados);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};
