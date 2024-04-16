class Ordering {
  constructor({id, orderingDt, finished, diningTableId}){
    this.id = id;
    this.orderingDt = orderingDt;
    this.finished = finished;
    this.diningTableId = diningTableId;
  }
}

module.exports = Ordering;