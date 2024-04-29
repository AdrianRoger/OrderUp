const database = require("../database/Database.js");
const Ordering = require("../model/OrderingModel.js");
const { InternalServerException } = require("../utils/Exception.js");

class OrderingRepository {
  async getOrderingsByTable(dinningTableId) {
    try {
      const results = await database.executeQuery({
        query: `SELECT * FROM ordering WHERE fk_dinning_table_id = $1`,
        args: [dinningTableId],
      });
      const orderings = results.map((result) => {
        return new Ordering({
          id: result.id,
          dinningTableID: result.fk_dinning_table_id,
          orderingDt: result.ordering_dt,
          finished: result.finished,
        });
      });
      return orderings ?? [];
    } catch (error) {
      console.error(`OrderingRepository::getOrderings error [${error}]`);
      throw new InternalServerException();
    }
  }

  async getOrderingById(orderingId) {
    try {
      const result = await database.executeQuery({
        query: "SELECT * FROM ordering WHERE id = $1",
        args: [orderingId],
      });

      if (result.length === 0) {
        return null;
      }

      const ordering = new Ordering({
        id: result[0].id,
        dinningTableID: result[0].fk_dinning_table_id,
        orderingDt: result[0].ordering_dt,
        finished: result[0].finished,
      });

      return ordering;
    } catch (error) {
      console.error(`orderingRepository::getorderingById error [${error}]`);
      throw new InternalServerException();
    }
  }

  async createOrdering({
    orderingDinningTableId,
    orderingDt,
    orderingFinished,
  }) {
    try {
      const result = await database.executeQuery({
        query:
          "INSERT INTO ordering (ordering_dt,finished,fk_dinning_table_id) VALUES ($1, $2, $3) RETURNING *",
        args: [orderingDt, orderingFinished, orderingDinningTableId],
      });

      const createdOrdering = new Ordering({
        id: result[0].id,
        ordering_dt: result[0].orderingDt,
        finished: result[0].finished,
        dinningTableId: result[0].fk_dinning_table_id,
      });

      return createdOrdering;
    } catch (error) {
      console.error(`OrderingRepository::createOrdering error [${error}]`);
      throw new InternalServerException();
    }
  }

  async updateOrdering({ orderingId, orderingFinished }) {
    try {
      const result = await database.executeQuery({
        query: "UPDATE ordering SET finished = $2 WHERE id = $1 RETURNING *",
        args: [orderingId, orderingFinished],
      });
      const updatedOrdering = new Ordering({
        id: result[0].id,
        ordering_dt: result[0].orderingDt,
        finished: result[0].finished,
        dinningTableId: result[0].fk_dinning_table_id,
      });

      return updatedOrdering;
    } catch (error) {
      console.error(`OrderingRepository::editOrdering error [${error}]`);
      throw new InternalServerException();
    }
  }

  async deleteOrdering(orderingId) {
    try {
      const result = await database.executeQuery({
        query: "DELETE FROM ordering WHERE id = $1 RETURNING *",
        args: [orderingId],
      });

      const deletedOrdering = new Ordering({
        id: result[0].id,
        ordering_dt: result[0].orderingDt,
        finished: result[0].finished,
        dinningTableId: result[0].fk_dinning_table_id,
      });

      return deletedOrdering;
    } catch (error) {
      console.error(`OrderingRepository::deleteOrdering error [${error}]`);
      throw new InternalServerException();
    }
  }
}

const orderingRepository = new OrderingRepository();
module.exports = orderingRepository;
