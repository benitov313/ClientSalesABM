import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSaleDto } from 'src/dto/sale.dto';
import { Sale } from 'src/persistance/sale.interface';
@Injectable()
export class SaleService {
  constructor(@InjectModel('Sale') private readonly saleModel: Model<Sale>) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const createdSale = new this.saleModel(createSaleDto);
    return createdSale.save();
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().exec();
  }

  // async summarizeByItem(): Promise<Record<string, number>> {
  //   const sales = await this.saleModel.find().exec();
  //   const summary: Record<string, number> = {};

  //   for (const sale of sales) {
  //     const item = sale.item;
  //     const quantity = sale.quantity;

  //     if (item in summary) {
  //       summary[item] += quantity;
  //     } else {
  //       summary[item] = quantity;
  //     }
  //   }

  //   return summary;
  // }

  // async summarizeByClient(): Promise<Record<string, number>> {
  //   const sales = await this.saleModel.find().exec();
  //   const summary: Record<string, number> = {};

  //   for (const sale of sales) {
  //     const client = sale.clientName;
  //     const quantity = sale.quantity;

  //     if (client in summary) {
  //       summary[client] += quantity;
  //     } else {
  //       summary[client] = quantity;
  //     }
  //   }

  //   return summary;
  // }

  async summarizeByItem(): Promise<Sale[]> {
    return this.saleModel
      .aggregate([
        {
          $group: {
            _id: '$item',
            totalQuantity: { $sum: '$quantity' },
          },
        },
        {
          $project: {
            _id: 0,
            item: '$_id',
            totalQuantity: 1,
          },
        },
      ])
      .exec();
  }

  async summarizeByClient(): Promise<Sale[]> {
    return this.saleModel
      .aggregate([
        {
          $group: {
            _id: '$clientName',
            totalQuantity: { $sum: '$quantity' },
          },
        },
        {
          $project: {
            _id: 0,
            clientName: '$_id',
            totalQuantity: 1,
          },
        },
      ])
      .exec();
  }

  async update(id: string, createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.saleModel
      .findByIdAndUpdate(id, createSaleDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Sale> {
    return this.saleModel.findByIdAndRemove(id).exec();
  }
}
