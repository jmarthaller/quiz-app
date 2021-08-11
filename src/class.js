class Spot {
  constructor({ size, vehicle } = {}) {
    this.size = size;
    this.vehicle = vehicle;
  }
  addVehicle(vehicle) {
    if (this.isOccupied()) return false;
    this.vehicle = vehicle;
    return true;
  }
  isOccupied() {
    return !!this.vehicle;
  }
  getVehicle() {
    return this.vehicle;
  }
  releaseVehicle() {
    const currentVehicle = this.vehicle;
    this.vehicle = null;

    return currentVehicle;
  }
}

class ParkingLotManager {
  constructor({ size: { numOfSmallSpot, numOfMediumSpot, numOfLargeSpot } }) {
    this.emptySpots = Array.from({ length: 3 }, (_, i) => {
      if (this._getSizeIndex(1) === i)
        return Array.from(
          { length: numOfSmallSpot },
          () => new Spot({ size: 1 })
        );
      if (this._getSizeIndex(2) === i)
        return Array.from(
          { length: numOfMediumSpot },
          () => new Spot({ size: 2 })
        );
      if (this._getSizeIndex(3) === i)
        return Array.from(
          { length: numOfLargeSpot },
          () => new Spot({ size: 3 })
        );
    });

    this.vehicles = new Map();
  }
  placeVehicle(vehicle) {
    if (this.hasVehicle(vehicle.licenseId))
      throw new Error("duplicate vehicle found");
    const sizeIndex = this._getSizeIndex(vehicle.size);
    for (let i = sizeIndex; i < this.emptySpots.length; i++) {
      if (this.emptySpots[i].length > 0) {
        const spot = this.emptySpots[i].pop();
        spot.addVehicle(vehicle);
        this.vehicles.set(vehicle.licenseId, spot);
        return true;
      }
    }

    return false;
  }
  _getSizeIndex(size) {
    return size - 1;
  }
  hasVehicle(licenseId) {
    return this.vehicles.has(licenseId);
  }
  removeVehicle(vehicle) {
    if (!this.hasVehicle(vehicle.licenseId)) return false;
    const spot = this.vehicles.get(vehicle);
    spot.releaseVehicle();
    this.vehicles.delete(vehicle);
    this.emptySpots[this._getSizeIndex(this.spot.size)].push(spot);

    return true;
  }
}

class Vehicle {
  constructor(id) {
    this.licenseId = id;
  }
}

class Motorcycle extends Vehicle {
  constructor(id) {
    super(id);
    this.size = 1;
  }
}

class Car extends Vehicle {
  constructor(id) {
    super(id);
    this.size = 2;
  }
}

class Truck extends Vehicle {
  constructor(id) {
    super(id);
    this.size = 3;
  }
}

const parkingLotManager = new ParkingLotManager({
  size: {
    numOfSmallSpot: 2,
    numOfMediumSpot: 2,
    numOfLargeSpot: 2,
  },
});
const car1 = new Car("car1");
const car2 = new Car("car2");
const car3 = new Car("car3");

parkingLotManager.placeVehicle(car1);
parkingLotManager.placeVehicle(car2);
parkingLotManager.placeVehicle(car3);

const car4 = new Truck("car4");
const car5 = new Truck("car5");

parkingLotManager.placeVehicle(car4);

console.log(parkingLotManager);
