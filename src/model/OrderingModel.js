class Ordering {
  constructor({id, orderingDt, finished, deviceId}){
    this.id = id;
    this.orderingDt = orderingDt;
    this.finished = finished;
    this.deviceId = deviceId;
  }
}

module.exports = Ordering;