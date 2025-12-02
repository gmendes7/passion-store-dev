export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  created_at: Date;
  updated_at: Date;
}