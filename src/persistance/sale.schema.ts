import * as mongoose from 'mongoose';

export const SaleSchema = new mongoose.Schema({
  clientName: String,
  item: String,
  quantity: Number,
});
