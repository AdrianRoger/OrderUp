const database = require("../database/Database.js");
const OrderingProduct = require("../model/OrderingProductModel.js");
const { InternalServerException } = require("../utils");

class OrderingProductRepository {
  async getOrderingProducts({ orderingId }) {
    try {
      const results = await database.executeQuery({
        query: `SELECT fk_ordering_id, string_agg(cast(fk_product_id as varchar), ', ') AS products FROM ordering_product WHERE fk_ordering_id = $1 GROUP BY fk_ordering_id`,
        args: [orderingId],
      });
      const orderingProducts = results.map((result) => {
        return new OrderingProduct({
          id: result.id,
          statusId: result.status,
          orderingId: result.fk_ordering_id,
          productId: result.products,
        });
      });

      return orderingProducts ?? [];
    } catch (error) {
      console.error(
        `orderingProductRepository::getorderingProduct error [${error}]`
      );
      throw new InternalServerException();
    }
  }
  async getOrderingProductByProduct({ orderingId, productId }) {
    try {
      const results = await database.executeQuery({
        query: `SELECT * FROM ordering_product WHERE fk_ordering_id = $1 AND fk_product_id = $2`,
        args: [orderingId, productId],
      });
      const orderingProducts = results.map((result) => {
        return new OrderingProduct({
          id: result.id,
          statusId: result.status,
          orderingId: result.fk_ordering_id,
          productId: result.fk_product_id,
        });
      });

      return orderingProducts ?? [];
    } catch (error) {
      console.error(
        `orderingProductRepository::getorderingProduct error [${error}]`
      );
      throw new InternalServerException();
    }
  }

  async createOrderingProduct({ status, orderingId, productId }) {
    try {
      const results = await database.executeQuery({
        query:
          "INSERT INTO ordering_product (status,fk_ordering_id,fk_product_id) VALUES ($1, $2,$3) RETURNING *",
        args: [status, orderingId, productId],
      });

      const createdOrderingProduct = results.map((result) => {
        return new OrderingProduct({
          id: result.id,
          statusId: result.status,
          orderingId: result.fk_ordering_id,
          productId: result.fk_product_id,
        });
      });

      return createdOrderingProduct;
    } catch (error) {
      console.error(
        `orderingProductRepository::createorderingProduct error [${error}]`
      );
      throw new InternalServerException();
    }
  }
  async updateOrderingProduct({ status, orderingId, productId }) {
    try {
      const results = await database.executeQuery({
        query:
          "UPDATE ordering_product SET status = $1 WHERE fk_ordering_id = $2 AND fk_product_id = $3 RETURNING *",
        args: [status, orderingId, productId],
      });

      const updatedOrderingProduct = results.map((result) => {
        return new OrderingProduct({
          id: result.id,
          statusId: result.status,
          orderingId: result.fk_ordering_id,
          productId: result.fk_product_id,
        });
      });
      return updatedOrderingProduct;
    } catch (error) {
      console.error(
        `OrderingProductRepository::editOrderingProduct error [${error}]`
      );
      throw new InternalServerException();
    }
  }

  async deleteAllOrderingProduct({ orderingId, productId }) {
    try {
      const results = await database.executeQuery({
        query:
          "DELETE FROM ordering_product WHERE fk_ordering_id = $1 AND fk_product_id = $2 RETURNING *",
        args: [orderingId, productId],
      });

      const deletedOrderingProduct = results.map((result) => {
        return new OrderingProduct({
          id: result.id,
          statusId: result.status,
          orderingId: result.fk_ordering_id,
          productId: result.fk_product_id,
        });
      });
      return deletedOrderingProduct;
    } catch (error) {
      console.error(
        `OrderingProductRepository::deleteOrderingProduct error [${error}]`
      );
      throw new InternalServerException();
    }
  }

  async deleteOrderingProduct({ id }) {
    try {
      const results = await database.executeQuery({
        query: "DELETE FROM ordering_product WHERE id = $1 RETURNING *",
        args: [id],
      });

      const deletedOrderingProduct = results.map((result) => {
        return new OrderingProduct({
          id: result.id,
          statusId: result.status,
          orderingId: result.fk_ordering_id,
          productId: result.fk_product_id,
        });
      });
      return deletedOrderingProduct;
    } catch (error) {
      console.error(
        `OrderingProductRepository::deleteOrderingProduct error [${error}]`
      );
      throw new InternalServerException();
    }
  }
}

const orderingProductRepository = new OrderingProductRepository();

module.exports = orderingProductRepository;
