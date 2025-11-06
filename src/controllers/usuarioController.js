import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

export const UserController = {
  async create(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !senha || !email) {
        return res
          .status(400)
          .json({ message: "Todos os campos devem ser preenchidos!" });
      }

      if (senha.length < 6) {
        return res
          .status(400)
          .json({ message: "A senha deve conter no mínimo seis caracteres!" });
      }

      const hashedPassword = await bcrypt.hash(senha, 10);

      const user = await Usuario.create({
        nome,
        email,
        senha: hashedPassword,
      });

      const { senha: _, ...userWithoutPassword } = user.toJSON();

      return res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        user: userWithoutPassword,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  },

  async Login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ message: "Informe email e senha!" });
      }

      const user = await Usuario.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      const isValid = await bcrypt.compare(senha, user.senha);

      if (!isValid) {
        return res.status(401).json({ message: "Senha incorreta!" });
      }

      const { senha: _, ...userWithoutPassword } = user.toJSON();

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: userWithoutPassword,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao realizar login" });
    }
  },
  async atualizarSenha(req, res) {
    try {
      const { email, senhaAntiga, novaSenha } = req.body;

      if (!email || !senhaAntiga || !novaSenha) {
        return res.status(400).json({
          success: false,
          message: "Preencha todos os dados obrigatórios!",
        });
      }

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado!",
        });
      }

      const isValid = await bcrypt.compare(senhaAntiga, usuario.senha);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Senha antiga incorreta!",
        });
      }

      const isSamePassword = await bcrypt.compare(novaSenha, usuario.senha);
      if (isSamePassword) {
        return res.status(400).json({
          success: false,
          message: "A nova senha não pode ser igual à anterior!",
        });
      }

      if (novaSenha.length < 6) {
        return res.status(400).json({
          success: false,
          message: "A nova senha deve ter no mínimo 6 caracteres!",
        });
      }

      const hashedPassword = await bcrypt.hash(novaSenha, 10);
      usuario.senha = hashedPassword;
      await usuario.save();

      return res.status(200).json({
        success: true,
        message: "Senha atualizada com sucesso!",
      });
    } catch (err) {
      console.error("Erro ao atualizar senha:", err);
      return res.status(500).json({
        success: false,
        message: "Erro interno ao atualizar a senha!",
      });
    }
  },
};
