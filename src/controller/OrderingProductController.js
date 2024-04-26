const orderingProductService = require("../services/OrderingProductService.js");
const { BadRequestException } = require("../utils/Exception.js");
const HttpResponse = require("../utils/HttpResponse.js");

class OrderingProductController {
  async getOrderingProducts(req, res) {
    try {
      const orderingId = String(req.body.ordering_id ?? "");
      const orderingProducts = await orderingProductService.getOrderingProduct(
        orderingId
      );

      if (orderingId.length === 0) {
        throw new BadRequestException("Ordering id must be a non-empty string");
      }
      const response = new HttpResponse({
        statusCode: 200,
        data: orderingProducts,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async createOrderingProduct(req, res) {
    try {
      const orderingId = String(req.body.ordering_id ?? "");
      const productId = req.body.product_id;
      const status = String(req.body.status ?? "");
     
      if (orderingId.length === 0) {
        throw new BadRequestException("Ordering id must be a non-empty string");
      }

      if (productId.length === 0) {
        throw new BadRequestException("Products id must be a non-empty array");
      }

      if (status.length === 0) {
        throw new BadRequestException(
          "OrderingProduct status must be a non-empty string"
        );
      }

      const createdOrderingProduct =
        await orderingProductService.createOrderingProduct({
          status,
          orderingId,
          productId,
        });

      const response = new HttpResponse({
        statusCode: 200,
        data: createdOrderingProduct,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateOrderingProduct(req, res) {
    try {
      const orderingId = String(req.body.ordering_id ?? "");
      const productId = String(req.body.product_id ?? "");
      const status = String(req.body.status ?? "");

      if (orderingId.length === 0) {
        throw new BadRequestException("Ordering id must be a non-empty string");
      }

      if (productId.length === 0) {
        throw new BadRequestException("Products id must be a non-empty string");
      }

      if (status.length === 0) {
        throw new BadRequestException(
          "OrderingProduct status must be a non-empty string"
        );
      }

      if (status.includes("Em Espera")) {
        throw new BadRequestException(
          "OrderingProduct cannot be updated to status 'Em Espera'"
        );
      }

      const updatedOrderingProduct =
        await orderingProductService.updateOrderingProduct({
          status,
          orderingId,
          productId,
        });

      const response = new HttpResponse({
        statusCode: 200,
        data: updatedOrderingProduct,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async deleteOrderingProduct(req, res) {
    try {
      const orderingId = String(req.body.ordering_id ?? "");
      const productId = String(req.body.product_id ?? "");
      const qtd = Number(req.body.qtd ?? NaN);

      if (orderingId.length === 0) {
        throw new BadRequestException("Ordering id must be a non-empty string");
      }

      if (productId.length === 0) {
        throw new BadRequestException("Products id must be a non-empty string");
      }
      
      let deletedOrderingProduct;
      
      if (Number.isNaN(qtd)) {
        deletedOrderingProduct =
          await orderingProductService.deleteAllOrderingProduct(orderingId,productId);
      } else {
        deletedOrderingProduct =
          await orderingProductService.deleteOrderingProduct(orderingId,productId,qtd);
      }
     
      const response = new HttpResponse({
        statusCode: 200,
        data: deletedOrderingProduct,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }
}
const orderingProductController = new OrderingProductController();

module.exports = orderingProductController;
