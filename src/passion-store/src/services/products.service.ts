import { db } from '../db'; // Importa a instância do cliente de banco de dados
import { Product } from '../models/product'; // Importa o modelo Product

export class ProductsService {
  async getAllProducts(): Promise<Product[]> {
    const products = await db('products').select('*'); // Seleciona todos os produtos
    return products;
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await db('products').where({ id }).first(); // Seleciona um produto pelo ID
    return product || null;
  }

  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const [newProduct] = await db('products').insert(productData).returning('*'); // Insere um novo produto
    return newProduct;
  }

  async updateProduct(id: string, productData: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product | null> {
    const [updatedProduct] = await db('products').where({ id }).update(productData).returning('*'); // Atualiza um produto existente
    return updatedProduct || null;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const deletedCount = await db('products').where({ id }).del(); // Deleta um produto pelo ID
    return deletedCount > 0; // Retorna verdadeiro se um produto foi deletado
  }
}