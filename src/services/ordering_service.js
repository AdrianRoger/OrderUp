const orderingRepository = require("../repositories/ordering_repository.js");
const { NotFoundException,UnauthorizedException } = require("../utils/exceptions.js");

class OrderingService {
  async getOrderingsByTable(dinningTableId) {
    try {
      return await orderingRepository.getOrderingsByTable(dinningTableId);
    } catch (exception) {
      throw exception;
    }
  }

  async getOrderingById(orderingId) {
    try {
      return await orderingRepository.getOrderingById(orderingId);
    } catch (exception) {
      throw exception;
    }
  }

  async createOrdering({
    orderingDinningTableId,
        orderingDt,
        orderingFinished,
  }) {
    try {
    
      const createdOrdering = await orderingRepository.createOrdering({
        orderingDinningTableId,
        orderingDt,
        orderingFinished,
      });
      
      return createdOrdering;
    } catch (exception) {
      throw exception;
    }
  }

  async updateOrdering({ orderingId,orderingFinished }) {
    try {
      const orderingToUpdate = await orderingRepository.getOrderingById(orderingId);
      
      if (!orderingToUpdate) {
        throw new NotFoundException("ordering not found");
      }
      if (orderingToUpdate.finished === true) {
        throw new UnauthorizedException("ordering alredy finished can't be updated");
      }
      const updatedOrdering = await orderingRepository.updateOrdering({
        orderingId,
        orderingFinished,
      });

      return updatedOrdering;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteOrdering(orderingId) {
    try {
      const orderingToDelete = await orderingRepository.getOrderingById(orderingId);
      console.log(orderingToDelete);
     
      if (!orderingToDelete) {
        throw new NotFoundException("ordering not found");
      }

      if (orderingToDelete.finished === false) {
        throw new UnauthorizedException("ordering not finished can't be deleted");
      }

      const deletedOrdering = await orderingRepository.deleteOrdering(orderingId);

      return deletedOrdering;
    } catch (exception) {
      throw exception;
    }
  }
}

const orderingService = new OrderingService();

module.exports = orderingService;
