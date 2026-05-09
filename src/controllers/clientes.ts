import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createUser = async (req: Request, res: Response) => {
  const { nome, email, telefone } = req.body;

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
};

export const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cliente = await prisma.cliente.findUnique({
    where: {
      id: Number(id),
    },
  });

  return res.json(cliente);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { nome, email, telefone } = req.body;

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
