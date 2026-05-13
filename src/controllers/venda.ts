import { Request, Response } from "express";
<<<<<<< HEAD
import { connection } from "../database";
=======
import { prisma } from "../lib/prisma";
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370
import { CreateSaleBody } from "../types/saleType";

export const createSale = async (req: Request, res: Response) => {
  const { clienteId, itens } = req.body as CreateSaleBody;

  let valorTotal = 0;

<<<<<<< HEAD
  // =========================
  // VALIDAR PRODUTOS
  // E CALCULAR TOTAL
  // =========================

  for (const item of itens) {
    const [produtoResult]: any = await connection.query(
      `
        SELECT * FROM produtos
        WHERE id = ?
      `,
      [item.produtoId],
    );

    const produto = produtoResult[0];
=======
  for (const item of itens) {
    const produto = await prisma.produto.findUnique({
      where: {
        id: item.produtoId,
      },
    });
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370

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

<<<<<<< HEAD
  // =========================
  // CRIAR VENDA
  // =========================

  const [vendaResult]: any = await connection.query(
    `
      INSERT INTO vendas
      (clienteId, valorTotal)

      VALUES (?, ?)
    `,
    [clienteId, valorTotal],
  );

  const vendaId = vendaResult.insertId;

  // =========================
  // CRIAR ITENS DA VENDA
  // =========================

  for (const item of itens) {
    const [produtoResult]: any = await connection.query(
      `
        SELECT * FROM produtos
        WHERE id = ?
      `,
      [item.produtoId],
    );

    const produto = produtoResult[0];

    // =========================
    // INSERIR ITEM DA VENDA
    // =========================

    await connection.query(
      `
        INSERT INTO item_venda
        (vendaId, produtoId, quantidade, precoUnitario)

        VALUES (?, ?, ?, ?)
      `,
      [vendaId, item.produtoId, item.quantidade, produto.preco],
    );

    // =========================
    // ATUALIZAR ESTOQUE
    // =========================

    await connection.query(
      `
        UPDATE produtos

        SET estoque = estoque - ?

        WHERE id = ?
      `,
      [item.quantidade, item.produtoId],
    );
  }

  // =========================
  // BUSCAR VENDA COMPLETA
  // =========================

  const [vendaCompleta]: any = await connection.query(
    `
      SELECT
        vendas.id,
        vendas.valorTotal,
        vendas.dataVenda,

        clientes.id AS clienteId,
        clientes.nome AS clienteNome

      FROM vendas

      INNER JOIN clientes
      ON vendas.clienteId = clientes.id

      WHERE vendas.id = ?
    `,
    [vendaId],
  );

  // =========================
  // BUSCAR ITENS DA VENDA
  // =========================

  const [itensVenda]: any = await connection.query(
    `
      SELECT
        item_venda.quantidade,
        item_venda.precoUnitario,

        produtos.id AS produtoId,
        produtos.nome AS produtoNome

      FROM item_venda

      INNER JOIN produtos
      ON item_venda.produtoId = produtos.id

      WHERE item_venda.vendaId = ?
    `,
    [vendaId],
  );

  return res.status(201).json({
    venda: vendaCompleta[0],
    itens: itensVenda,
  });
};

export const getSales = async (req: Request, res: Response) => {
  const [vendas]: any = await connection.query(
    `
      SELECT
        vendas.id,
        vendas.valorTotal,
        vendas.dataVenda,

        clientes.nome AS clienteNome

      FROM vendas

      INNER JOIN clientes
      ON vendas.clienteId = clientes.id
    `,
  );

  for (const venda of vendas) {
    const [itens]: any = await connection.query(
      `
        SELECT
          item_venda.quantidade,
          item_venda.precoUnitario,

          produtos.nome AS produtoNome

        FROM item_venda

        INNER JOIN produtos
        ON item_venda.produtoId = produtos.id

        WHERE item_venda.vendaId = ?
      `,
      [venda.id],
    );

    venda.itens = itens;
  }

  return res.json(vendas);
};
export const getSaleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [venda]: any = await connection.query(
    `
      SELECT
        vendas.id,
        vendas.valorTotal,
        vendas.dataVenda,

        clientes.nome AS clienteNome

      FROM vendas

      INNER JOIN clientes
      ON vendas.clienteId = clientes.id

      WHERE vendas.id = ?
    `,
    [id],
  );

  const [itens]: any = await connection.query(
    `
      SELECT
        item_venda.quantidade,
        item_venda.precoUnitario,

        produtos.nome AS produtoNome

      FROM item_venda

      INNER JOIN produtos
      ON item_venda.produtoId = produtos.id

      WHERE item_venda.vendaId = ?
    `,
    [id],
  );

  return res.json({
    venda: venda[0],
    itens,
  });
};
=======
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
>>>>>>> ef8e3b32d429590b2d6f9f5534d464bc52f07370
