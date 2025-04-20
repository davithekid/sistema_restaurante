import { readAll } from "../models/clienteModel"; // ajuste o caminho conforme necessário

async function testar() {
  const clientes = await readAll("cliente"); // ou readAll("cliente", "id_cliente = 1")
  console.log("Clientes encontrados:", clientes);
}

testar();
