import { Request, Response } from "express";
<<<<<<< HEAD
import { connection } from "../database";
=======
import { prisma } from "../lib/prisma";
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370

export const createProduct = async (req: Request, res: Response) => {
  const { nome, descricao, preco, estoque } = req.body;

<<<<<<< HEAD
  await connection.query(
    `
      INSERT INTO produtos
      (nome, descricao, preco, estoque)

      VALUES (?, ?, ?, ?)
    `,
    [nome, descricao, preco, estoque],
  );

  return res.json({
    message: "Produto criado com sucesso!",
  });
};

export const getProducts = async (req: Request, res: Response) => {
  const [produtos] = await connection.query(
    `
      SELECT * FROM produtos
    `,
  );
=======
  const produto = await prisma.produto.create({
    data: {
      nome,
      descricao,
      preco,
      estoque,
    },
  });

  return res.json(produto);
};

export const getProducts = async (req: Request, res: Response) => {
  const produtos = await prisma.produto.findMany();
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370

  return res.json(produtos);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

<<<<<<< HEAD
  const [produto] = await connection.query(
    `
      SELECT * FROM produtos
      WHERE id = ?
    `,
    [id],
  );
=======
  const produto = await prisma.produto.findUnique({
    where: {
      id: Number(id),
    },
  });
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370

  return res.json(produto);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { nome, descricao, preco, estoque } = req.body;

<<<<<<< HEAD
  await connection.query(
    `
      UPDATE produtos

      SET
        nome = ?,
        descricao = ?,
        preco = ?,
        estoque = ?

      WHERE id = ?
    `,
    [nome, descricao, preco, estoque, id],
  );

  return res.json({
=======
  const produto = await prisma.produto.update({
    where: {
      id: Number(id),
    },

    data: {
      nome,
      descricao,
      preco,
      estoque,
    },
  });

  return res.json({
    produto,
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370
    message: "Produto atualizado com sucesso!",
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

<<<<<<< HEAD
  await connection.query(
    `
      DELETE FROM produtos
      WHERE id = ?
    `,
    [id],
  );
=======
  await prisma.produto.delete({
    where: {
      id: Number(id),
    },
  });
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370

  return res.json({
    message: "Produto deletado com sucesso!",
  });
};