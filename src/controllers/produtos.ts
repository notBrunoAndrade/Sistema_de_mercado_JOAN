import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createProduct = async (req: Request, res: Response) => {
  const { nome, descricao, preco, estoque } = req.body;

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

  return res.json(produtos);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const produto = await prisma.produto.findUnique({
    where: {
      id: Number(id),
    },
  });

  return res.json(produto);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { nome, descricao, preco, estoque } = req.body;

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
    message: "Produto atualizado com sucesso!",
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.produto.delete({
    where: {
      id: Number(id),
    },
  });

  return res.json({
    message: "Produto deletado com sucesso!",
  });
};