import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { CreateSaleBody } from "../types/saleType";

export const createSale = async (req: Request, res: Response) => {
  const { clienteId, itens } = req.body as CreateSaleBody;

  let valorTotal = 0;

  for (const item of itens) {
    const produto = await prisma.produto.findUnique({
      where: {
        id: item.produtoId,
      },
    });

    if (!produto) {
      return res.status(404).json({
        message: `Produto ${item.produtoId} não encontrado`,
      });
    }

    if (produto.estoque < item.quantidade) {
      return res.status(400).json({
        message: `Estoque insuficiente para ${produto.nome}`,
      });
    }

    valorTotal += produto.preco * item.quantidade;
  }

  const venda = await prisma.venda.create({
    data: {
      clienteId,
      valorTotal,
    },
  });

  for (const item of itens) {
    const produto = await prisma.produto.findUnique({
      where: {
        id: item.produtoId,
      },
    });

    await prisma.itemVenda.create({
      data: {
        vendaId: venda.id,
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: produto!.preco,
      },
    });

    await prisma.produto.update({
      where: {
        id: item.produtoId,
      },

      data: {
        estoque: {
          decrement: item.quantidade,
        },
      },
    });
  }

  const vendaCompleta = await prisma.venda.findUnique({
    where: {
      id: venda.id,
    },

    include: {
      cliente: true,

      itens: {
        include: {
          produto: true,
        },
      },
    },
  });

  return res.status(201).json(vendaCompleta);
};

export const getSales = async (req: Request, res: Response) => {
  const vendas = await prisma.venda.findMany({
    select: {
      id: true,
      valorTotal: true,
      dataVenda: true,

      cliente: {
        select: {
          id: true,
          nome: true,
        },
      },

      itens: {
        select: {
          quantidade: true,
          precoUnitario: true,

          produto: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      },
    },
  });

  return res.json(vendas);
};

export const getSaleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const venda = await prisma.venda.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      valorTotal: true,
      dataVenda: true,

      cliente: {
        select: {
          id: true,
          nome: true,
        },
      },

      itens: {
        select: {
          quantidade: true,
          precoUnitario: true,

          produto: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      },
    },
  });

  return res.json(venda);
};
