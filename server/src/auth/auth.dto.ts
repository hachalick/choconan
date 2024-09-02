import { ApiProperty } from "@nestjs/swagger";

export class OrderTableDto {
  @ApiProperty({ default: [{ count: 1, product_id: '' }] })
  list_order: { count: number; product_id: string }[];
}
