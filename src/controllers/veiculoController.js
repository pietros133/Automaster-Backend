import Veiculo from "../models/veiculo.js";
import Cliente from "../models/cliente.js";

export const veiculoController = {
  async cadastrarVeiculo(req, res) {
    try {
      const { placa, modelo, cor, nomeCliente } = req.body;

      if (!placa || !modelo || !cor || !nomeCliente) {
        return res
          .status(400)
          .json({ message: "Preencha todos os campos obrigatórios!" });
      }

      if (placa.length < 7) {
        return res
          .status(400)
          .json({ message: "A placa não segue o formato padrão (7 dígitos)." });
      }

      const cliente = await Cliente.findOne({ where: { nome: nomeCliente } });
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado!" });
      }

      const veiculoExistente = await Veiculo.findOne({ where: { placa } });
      if (veiculoExistente) {
        return res.status(400).json({ message: "Placa já cadastrada!" });
      }

      const novoVeiculo = await Veiculo.create({
        placa,
        modelo,
        cor,
        clienteId: cliente.id,
      });

      return res.status(201).json({
        message: "Veículo cadastrado com sucesso!",
        veiculo: {
          placa: novoVeiculo.placa,
          modelo: novoVeiculo.modelo,
          cor: novoVeiculo.cor,
          cliente: cliente.nome,
        },
      });
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};
