import { Request, Response } from "express";
<<<<<<< HEAD
import { connection } from "../database";
=======
import { prisma } from "../lib/prisma";
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370

export const createUser = async (req: Request, res: Response) => {
  const { nome, email, telefone } = req.body;

<<<<<<< HEAD
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
=======
  const cliente = await prisma.cliente.create({
    data: {
      nome,
      email,
      telefone,
    },
  });

  return res.json(cliente);
};

export const getUsers = async (req: Request, res: Response) => {
  const cliente = await prisma.cliente.findMany();

  return res.json(cliente);
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370
};

export const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;

<<<<<<< HEAD
  const [cliente] = await connection.query(
    `
      SELECT * FROM clientes
      WHERE id = ?
    `,
    [id],
  );
=======
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: Number(id),
    },
  });
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370

  return res.json(cliente);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { nome, email, telefone } = req.body;

<<<<<<< HEAD
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
=======
  const cliente = await prisma.cliente.update({
    where: {
      id: Number(id),
    },

    data: {
      nome,
      email,
      telefone,
    },
  });

  return res.json({cliente, message:"Usuario recebeu um update!"});
};
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370
