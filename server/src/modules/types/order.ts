type TDetailOrder = {
  count: number;
  product_id: string;
};

type TDetailOrders = Array<TDetailOrder>;

type TOrderTable = {
  table: number;
  busy: boolean;
  accept: boolean;
  listOrder: TDetailOrders;
};
