import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import {
  validateCpf,
  validateCnpj,
  validateEmail,
  validateDate,
} from "./utils/validators.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: cors para desenvolvimento não foi configurado para remover em prod
app.use(cors());
app.use(express.json());

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.post("/registration", (req, res) => {
  const data = req.body;

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  const fieldAliases = {
    mailAddress: "Endereço de e-mail",
    accountType: "Tipo de conta",
    nameCompanyName: "Nome / Razão Social",
    cpfCnpj: "CPF / CNPJ",
    birthOrOpenDate: "Data de Nascimento / Abertura",
    phone: "Telefone",
    password: "Senha",
  };

  for (const [field, alias] of Object.entries(fieldAliases)) {
    if (!data[field]) {
      return res.status(400).json({ error: `O campo ${alias} é obrigatório` });
    }
  }

  if (!validateEmail(data.mailAddress)) {
    return res.status(400).json({ error: "E-mail inválido" });
  }

  if (data.accountType === "pf") {
    if (!validateCpf(data.cpfCnpj)) {
      return res.status(400).json({ error: "CPF inválido" });
    }
  } else if (data.accountType === "pj") {
    if (!validateCnpj(data.cpfCnpj)) {
      return res.status(400).json({ error: "CNPJ inválido" });
    }
  }

  if (!validateDate(data.birthOrOpenDate)) {
    return res.status(400).json({ error: "Data inválida" });
  }

  res.status(201).json({ message: "Cadastro recebido", data });
});

app.get("/", (req, res) => {
  res.redirect("/registration");
});

app.use(express.static(path.join(__dirname, "../dist")));

app.listen(PORT, () => {
  console.log(`Run in porta ${PORT}`);
});
