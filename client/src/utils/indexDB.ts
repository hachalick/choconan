import Dexie, { type EntityTable } from "dexie";

interface IIndexDB<T> {
  add({ data }: { data: T }): Promise<void>;
  addById({ data }: { data: TID<T> }): Promise<void>;
  sortIds(): Promise<void>;
  getAll(): Promise<Array<T>>;
  deleteById({ id }: { id: number }): Promise<void>;
}

export class IndexDB<T> implements IIndexDB<T> {
  private db: Dexie & {
    [key: string]: EntityTable<T>;
  };
  private nameDb;
  private nameTable;
  private nameCols;

  constructor({
    nameDb,
    nameTable,
    nameCols,
  }: {
    nameDb: string;
    nameTable: string;
    nameCols: string;
  }) {
    this.nameDb = nameDb;
    this.nameTable = nameTable;
    this.nameCols = nameCols;
    this.db = new Dexie(nameDb) as Dexie & {
      [key: string]: EntityTable<T>;
    };
    this.db.version(1).stores({
      [nameTable]: nameCols,
    });
  }

  async getAll(): Promise<TID<T>[]> {
    return (await this.db[this.nameTable].toArray()) as TID<T>[];
  }

  async getOne({
    data,
  }: {
    data: Partial<TID<T>>;
  }): Promise<TID<T> | undefined> {
    return (
      ((await this.db[this.nameTable].get({ ...data })) as TID<T>) || undefined
    );
  }

  async sortIds(): Promise<void> {
    const listAll = await this.getAll();
    for (let i = 0; i < listAll.length; i++) {
      if (i !== listAll[i].id) {
        const { id } = listAll[i];
        listAll[i].id = i;
        await this.addById({ data: listAll[i] });
        await this.deleteById({ id });
      }
    }
  }

  async addById({ data }: { data: TID<T> }): Promise<void> {
    await this.db[this.nameTable].add(data);
  }

  async deleteById({ id }: { id: number }): Promise<void> {
    await this.db[this.nameTable].delete(id as never);
  }

  async add({ data }: { data: T }): Promise<void> {
    this.sortIds();
    const listAll = await this.getAll();
    const id = listAll.length;
    await this.db[this.nameTable].add({ id, ...data });
  }

  async updateById({ id, data }: { id: number; data: Partial<T> }) {
    await this.db[this.nameTable].update(id as T, { ...data } as any);
  }

  async clear() {
    await this.db[this.nameTable].clear();
  }
}
