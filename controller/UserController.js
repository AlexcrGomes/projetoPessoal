const path = require("path");
const bcrypt = require("bcrypt");

const User = require("../models/User");

let message = "";
let type = "";

// Controller Users

const getById = async (req, res) => {
  try {
    const { id, method } = req.params;
    const usersList = await User.find();

    let user = null;
    let userDelete = null;

    if (method === "update") {
      user = await User.findOne({ _id: id });
    } else {
      userDelete = await User.findOne({ _id: id });
    }

    res.render(path.join(__dirname, "../src/telaadm.ejs"), {
      user,
      userDelete,
      usersList,
      users: usersList,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const signup = async (req, res) => {
  const user = req.body;
  if (!user.nome || !user.email || !user.senha) {
    console.log("Campos obrigatórios ausentes");
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.senha, saltRounds);

    // Substitua a senha original pela senha criptografada antes de criar o usuário
    user.senha = hashedPassword;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      console.log("Email ja cadastrado");
      return res.status(400).json({ error: "Email já está cadastrado" });
    }

    await User.create(user);

    // Redirect on the client side, not here
    return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);

    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).redirect("/login");
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (!existingUser) {
      console.log("Usuário não cadastrado");
      return res.status(401).json({ error: "Usuário não cadastrado." });
    }

    const isPasswordValid = await bcrypt.compare(senha, existingUser.senha);

    if (!isPasswordValid) {
      console.log("Senha incorreta");
      return res.status(401).json({ error: "Senha Incorreta." });
    }

    console.log("Login bem-sucedido");
    const redirectURL = `/${existingUser._id}/telaadm`;
    return res.status(200).json({ redirect: redirectURL });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};

const logout = (req, res) => {
  res.redirect("/");
};

const getALLUsers = async (req, res) => {
  try {
    setTimeout(() => {
      message = "";
    }, 1000);
    const usersList = await User.find();
    return res.render("/telaadm", {
      usersList,
      user: null,
      userDelete: null,
      message,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateOneUser = async (req, res) => {
  try {
    const user = req.body;
    await User.updateOne({ _id: req.params.id }, user);
    return res.redirect("/:_id/telaadm");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const user = req.body;
    await User.deleteOne({ _id: req.params.id });
    res.redirect("/:_id/telaadm");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getByIdUser = async (req, res) => {
  try {
    const usersList = await User.find();
    if (req.params.method == "update") {
      const user = await User.findOne({ _id: req.params.id });
      res.render("/telaadm", {
        user,
        userDelete: null,
        usersList,
        message,
      });
    } else {
      const taskDelete = await User.findOne({ _id: req.params.id });
      res.render("/telaadm", {
        user: null,
        userDelete,
        usersList,
        message,
      });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getById,
  signup,
  signin,
  logout,
  getALLUsers,
  updateOneUser,
  deleteOneUser,
  getByIdUser,
};
