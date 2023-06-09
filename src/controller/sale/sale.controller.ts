import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SaleService } from 'src/service/sale/sale.service';
import { CreateSaleDto } from 'src/dto/sale.dto';
import { Sale } from 'src/persistance/sale.interface';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  async findAll(): Promise<Sale[]> {
    return this.saleService.findAll();
  }

  @Get('summary/item')
  async summarizeByItem(): Promise<Sale[]> {
    return this.saleService.summarizeByItem();
  }

  @Get('summary/client')
  async summarizeByClient(): Promise<Sale[]> {
    return this.saleService.summarizeByClient();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() createSaleDto: CreateSaleDto,
  ): Promise<Sale> {
    return this.saleService.update(id, createSaleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Sale> {
    return this.saleService.delete(id);
  }
}
