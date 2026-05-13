import { Request, Response } from "express";
import { connection } from "../database";

export const createUser = async (req: Request, res: Response) => {
  const { nome, email, telefone } = req.body;

  await connection.query(
    `
      INSERT INTO clientes
      (nome, email, telefone)

      VALUES (?, ?, ?)
    `,
    [nome, email, telefone],
  );

  return res.json({
    message: "Cliente criado com sucesso",
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const [clientes] = await connection.query(
    `
      SELECT * FROM clientes
    `,
  );

  return res.json(clientes);
};

export const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [cliente] = await connection.query(
    `
      SELECT * FROM clientes
      WHERE id = ?
    `,
    [id],
  );

  return res.json(cliente);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { nome, email, telefone } = req.body;

  await connection.query(
    `
      UPDATE clientes

      SET
        nome = ?,
        email = ?,
        telefone = ?

      WHERE id = ?
    `,
    [nome, email, telefone, id],
  );

  return res.json({
    message: "Usuário atualizado com sucesso",
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await connection.query(
    `
      DELETE FROM clientes
      WHERE id = ?
    `,
    [id],
  );

  return res.json({
    message: "Usuário deletado com sucesso",
  });
};