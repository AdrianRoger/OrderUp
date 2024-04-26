const orderingProductRepository = require("../repositories/OrderingProductRepository.js");
const {NotFoundException,UnauthorizedException} = require("../utils/Exception.js");

class OrderingProductService {
  async getOrderingProduct(orderingId) {
    try {
      return await orderingProductRepository.getOrderingProducts(orderingId);
    } catch (exception) {
      throw exception;
    }
  }
  async createOrderingProduct({
    status,
    orderingId,
    productId,
  }) {
    try {
     
     let createdOrderingProduct = [];
     for(const id of productId){
       let productId = id;
       createdOrderingProduct.push(
        await orderingProductRepository.createOrderingProduct({
          status,
          orderingId,
          productId,
        }));
      }
     
      return createdOrderingProduct;
    } catch (exception) {
      throw exception;
    }
  }

  async updateOrderingProduct({ status, orderingId, productId }) {
    try {
      const orderingProductToUpdate =
        await orderingProductRepository.getOrderingProductByProduct(
          orderingId,
          productId
        );

      if (!orderingProductToUpdate) {
        throw new NotFoundException("OrderingProduct not found");
      }
      
       orderingProductToUpdate.map((orderingProduct) => {
         if (orderingProduct.statusId === "Pronto") {
           throw new UnauthorizedException(
             "OrderingProduct is ready and cannot be updated"
           );
         }
       });

      const updatedOrderingProduct =
        await orderingProductRepository.updateOrderingProduct({
          status,
          orderingId,
          productId,
        });

      return updatedOrderingProduct;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteAllOrderingProduct(orderingId,productId) {
    try {
      const orderingProductToDelete = await orderingProductRepository.getOrderingProductByProduct(orderingId,productId);
      if (!orderingProductToDelete) {
        throw new NotFoundException("orderingProduct not found");
      }

      orderingProductToDelete.map((orderingProduct) => {
        if (orderingProduct.statusId !== "Em Espera") {
          throw new UnauthorizedException(
            "Product is in preparation or ready and cannot be updated"
          );
        }
      });

      const deletedOrderingProduct = await orderingProductRepository.deleteAllOrderingProduct(orderingId,productId);

      return deletedOrderingProduct;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteOrderingProduct(orderingId,productId,qtd) {
    try {
      const orderingProductToDelete = await orderingProductRepository.getOrderingProductByProduct(orderingId,productId);
      
      if (!orderingProductToDelete) {
        throw new NotFoundException("orderingProduct not found");
      }
      
      orderingProductToDelete.map((orderingProduct) => {
        if (orderingProduct.statusId !== "Em Espera") {
          throw new UnauthorizedException(
            "Product is in preparation or ready and cannot be updated"
          );
        }
      });

      let deletedOrderingProduct;
      
       for(let i = 0;i< qtd;i++){
         deletedOrderingProduct = await orderingProductRepository.deleteOrderingProduct(orderingProductToDelete[i].id);
       }

      return deletedOrderingProduct;
    } catch (exception) {
      throw exception;
    }
  }
}

const orderingProductService = new OrderingProductService();

module.exports = orderingProductService;
