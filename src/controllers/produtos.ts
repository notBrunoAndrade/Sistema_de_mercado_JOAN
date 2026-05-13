import { Request, Response } from "express";
import { connection } from "../database";

export const createProduct = async (req: Request, res: Response) => {
  const { nome, descricao, preco, estoque } = req.body;

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

  return res.json(produtos);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [produto] = await connection.query(
    `
      SELECT * FROM produtos
      WHERE id = ?
    `,
    [id],
  );

  return res.json(produto);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { nome, descricao, preco, estoque } = req.body;

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
    message: "Produto atualizado com sucesso!",
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  await connection.query(
    `
      DELETE FROM produtos
      WHERE id = ?
    `,
    [id],
  );

  return res.json({
    message: "Produto deletado com sucesso!",
  });
};