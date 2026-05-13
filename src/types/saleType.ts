export type SaleItem = {
  produtoId: number;
  quantidade: number;
};

export type CreateSaleBody = {
  clienteId: number;
  itens: SaleItem[];
};