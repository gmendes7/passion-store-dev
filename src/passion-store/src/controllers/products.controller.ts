export class ProductsController {
  constructor(private productsService: ProductsService) {}

  async listProducts(req, res) {
    try {
      const products = await this.productsService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving products', error });
    }
  }

  async createProduct(req, res) {
    try {
      const newProduct = await this.productsService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    try {
      const updatedProduct = await this.productsService.updateProduct(id, req.body);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      await this.productsService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  }
}