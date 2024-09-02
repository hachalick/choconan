import { IndexDB } from "./indexDB";
import { EIndexDb } from "@/enum/IndexDb.enum";

export const dbOrders = new IndexDB<TOrder>({
  nameCols: "id, id_product_menu, category, count",
  nameDb: EIndexDb.NAME_DB,
  nameTable: EIndexDb.NAME_TB_ORDERS,
});
