const orderingService = require("../services/OrderingService.js");
const { BadRequestException } = require("../utils/Exception.js");
const HttpResponse = require("../utils/HttpResponse.js");

class OrderingController {
  async getOrderingsByDeviceId(req, res) {
    try {
      const deviceId = String(req.body.deviceId ?? "");
      const orderings = await orderingService.getOrderingsByDeviceId({ deviceId });

      if (deviceId.length === 0) {
        throw new BadRequestException(
          "Dinning table id must be a non-empty string"
        );
      }
      const response = new HttpResponse({
        statusCode: 200,
        data: orderings,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getOrderingById(req, res) {
    try {
      const orderingId = String(req.params.id ?? "");
      if (orderingId.length === 0) {
        throw new BadRequestException(
          "Ordering id must be a non-empty string"
        );
      }
      const ordering = await orderingService.getOrderingById({ orderingId });
      const response = new HttpResponse({
        statusCode: 200,
        data: ordering,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async createOrdering(req, res) {
    try {

      const orderingDeviceId = String(req.body.dinning_table_id ?? "");
      const orderingDt = new Date();
      const orderingFinished = false;

      if (orderingDeviceId.length === 0) {
        throw new BadRequestException(
          "Organization id must be a non-empty string"
        );
      }
      console.log(orderingFinished);
      const createdOrdering = await orderingService.createOrdering({
        deviceId,
        orderingDt,
        orderingFinished,
      });

      const response = new HttpResponse({
        statusCode: 200,
        data: createdOrdering,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateOrdering(req, res) {
    try {
      const orderingId = String(req.params.id ?? "");
      const orderingFinished = true;

      if (orderingId.length === 0) {
        throw new BadRequestException("Ordering id must be a non-empty string");
      }

      const updatedOrdering = await orderingService.updateOrdering({
        orderingId,
        orderingFinished,
      });

      const response = new HttpResponse({
        statusCode: 200,
        data: updatedOrdering,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async deleteOrdering(req, res) {
    try {
      const orderingId = String(req.params.id ?? "");

      if (orderingId.length === 0) {
        throw new BadRequestException("Ordering id must be a non-empty string");
      }

      const deletedOrdering = await orderingService.deleteOrdering({ orderingId });

      const response = new HttpResponse({
        statusCode: 200,
        data: deletedOrdering,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

}

const orderingController = new OrderingController();

module.exports = orderingController;
