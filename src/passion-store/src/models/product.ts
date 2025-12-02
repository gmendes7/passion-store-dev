import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProductModel {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    this.id = uuidv4();
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.image = data.image;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(data: Partial<Omit<Product, 'id' | 'createdAt'>>) {
    if (data.name) this.name = data.name;
    if (data.description) this.description = data.description;
    if (data.price) this.price = data.price;
    if (data.image) this.image = data.image;
    this.updatedAt = new Date();
  }
}