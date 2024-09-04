import { Injectable } from '@nestjs/common';
import { FactorPresentOrderEntity } from '../modules/entity/mysql/Factor-Present-Order.entity';
import { PresentOrderTableEntity } from '../modules/entity/mysql/Present-Order-Table.entity';
import { ProductMenuEntity } from '../modules/entity/mysql/Product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(ProductMenuEntity)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,
    @InjectRepository(PresentOrderTableEntity)
    private readonly presentOrderTableRepository: Repository<PresentOrderTableEntity>,
    @InjectRepository(FactorPresentOrderEntity)
    private readonly factorPresentOrderRepository: Repository<FactorPresentOrderEntity>,
  ) {}

  async getTables(): Promise<{ table: number; table_id: string }[]> {
    const resPresentOrder = await this.presentOrderTableRepository.find({
      order: { table: 'ASC' },
      select: { table: true, present_order_table_id: true },
    });
    return resPresentOrder.map((res) => ({
      table_id: res.present_order_table_id,
      table: res.table,
    }));
  }

  async getOrderTables() {
    const resPresentOrder = await this.presentOrderTableRepository.find({
      where: {
        factorPresentOrderTable: { factor_present_order_id: Not(IsNull()) },
      },
      order: { table: 'ASC' },
      relations: { factorPresentOrderTable: { products: true } },
    });
    return resPresentOrder;
  }

  async getOrderTableTables({ table_id }: { table_id: string }) {
    const resPresentOrder = await this.presentOrderTableRepository.findOne({
      where: { present_order_table_id: table_id },
      order: { table: 'ASC' },
      relations: { factorPresentOrderTable: { products: true } },
    });
    return resPresentOrder;
  }

  async orderTable({
    table_id,
    listOrder,
  }: {
    table_id: string;
    listOrder: TDetailOrders;
  }) {
    await this.presentOrderTableRepository.update(
      {
        present_order_table_id: table_id,
      },
      { busy: true },
    );
    const resTable = await this.presentOrderTableRepository.findOne({
      where: { present_order_table_id: table_id },
      relations: { factorPresentOrderTable: true },
    });
    resTable.factorPresentOrderTable.forEach(async (val) => {
      await this.factorPresentOrderRepository.delete(
        val.factor_present_order_id,
      );
    });
    listOrder.forEach(async (val) => {
      const { count, product_id } = val;
      const pro = await this.productMenuRepository.findOne({
        where: { product_id },
      });
      const newFactor = this.factorPresentOrderRepository.create({
        count,
        products: pro,
        presentOrderTable: resTable,
      });
      await this.factorPresentOrderRepository.save(newFactor);
    });
    return { submit: true };
  }

  async createTable({ table_number }: { table_number: number }) {
    const newTable = this.presentOrderTableRepository.create({
      accept: false,
      table: table_number,
      busy: false,
    });
    const res = await this.presentOrderTableRepository.save(newTable);
    return { create: true, table_id: res.present_order_table_id };
  }

  async deleteTable({ table_id }: { table_id: string }) {
    await this.presentOrderTableRepository.delete(table_id);
    return { delete: true };
  }

  async getStatusTable({ table_id }: { table_id: string }) {
    const res = await this.presentOrderTableRepository.findOne({
      where: { present_order_table_id: table_id },
    });
    return { can_order: res.accept && res.busy };
  }

  async acceptStatusTable({ table_id }: { table_id: string }) {
    await this.presentOrderTableRepository.update(
      { present_order_table_id: table_id },
      { accept: true },
    );
    return { accept: true };
  }

  async deleteStatusTable({ table_id }: { table_id: string }) {
    await this.presentOrderTableRepository.update(
      { present_order_table_id: table_id },
      { accept: false, busy: false },
    );
    const resPresent = await this.presentOrderTableRepository.findOne({
      where: { present_order_table_id: table_id },
      relations: { factorPresentOrderTable: true },
    });
    for (let i in resPresent.factorPresentOrderTable) {
      await this.factorPresentOrderRepository.delete({
        factor_present_order_id:
          resPresent.factorPresentOrderTable[i].factor_present_order_id,
      });
    }
    return { delete: true };
  }

  async editableStatusTable({ table_id }: { table_id: string }) {
    await this.presentOrderTableRepository.update(
      { present_order_table_id: table_id },
      { accept: false, busy: true },
    );
    return { change: true };
  }
}
