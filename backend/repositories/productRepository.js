const db = require('../config/db'); // knex instance
const Product = require('../models/productModel'); // optional { tableName: 'products' }

class ProductRepository {
  async create(data) {
    const [product] = await db(Product.tableName).insert(data).returning('*');
    return product;
  }

  async findAll() {
    return await db(Product.tableName).select('*');
  }

  async findById(id) {
    return await db(Product.tableName).where({ id }).first();
  }

  async update(condition, data) {
    return await db(Product.tableName).where(condition).update(data).returning('*');
  }

  async delete(condition) {
    return await db(Product.tableName).where(condition).del();
  }
}

module.exports = new ProductRepository();
