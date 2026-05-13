import { Request, Response } from "express";
import { connection } from "../database";
import { CreateSaleBody } from "../types/saleType";

export const createSale = async (req: Request, res: Response) => {
  const { clienteId, itens } = req.body as CreateSaleBody;

  let valorTotal = 0;

  for (const item of itens) {
    const [produtoResult]: any = await connection.query(
      `
        SELECT * FROM produtos
        WHERE id = ?
      `,
      [item.produtoId],
    );

    const produto = produtoResult[0];

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

  const [vendaResult]: any = await connection.query(
    `
      INSERT INTO vendas
      (clienteId, valorTotal)

      VALUES (?, ?)
    `,
    [clienteId, valorTotal],
  );

  const vendaId = vendaResult.insertId;

  for (const item of itens) {
    const [produtoResult]: any = await connection.query(
      `
        SELECT * FROM produtos
        WHERE id = ?
      `,
      [item.produtoId],
    );

    const produto = produtoResult[0];

    await connection.query(
      `
        INSERT INTO item_venda
        (vendaId, produtoId, quantidade, precoUnitario)

        VALUES (?, ?, ?, ?)
      `,
      [vendaId, item.produtoId, item.quantidade, produto.preco],
    );

    await connection.query(
      `
        UPDATE produtos

        SET estoque = estoque - ?

        WHERE id = ?
      `,
      [item.quantidade, item.produtoId],
    );
  }

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