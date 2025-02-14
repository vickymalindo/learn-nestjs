import { HttpException, Injectable } from '@nestjs/common';
import { CARS } from './cars.mock';

@Injectable()
export class CarService {
  private cars = CARS;

  public getCars() {
    return this.cars;
  }

  public postCar(car) {
    this.cars = [...this.cars, car];
    return this.cars;
  }

  public getCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const car = this.cars.find((val) => val.id === carId);
      if (!car) {
        throw new HttpException('Not Found', 404);
      }
      return resolve(car);
    });
  }

  public deleteCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((val) => val.id === carId);
      if (index < 0) {
        throw new HttpException('Not Found', 404);
      }

      this.cars = this.cars.filter((val) => val.id !== carId);
      return resolve(this.cars);
    });
  }

  public putCarById(id: number, propertyName: string, propertyValue: string) {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((val) => val.id === carId);
      if (index < 0) {
        throw new HttpException('Not Found', 404);
      }

      this.cars[index][propertyName] = propertyValue;
      return resolve(this.cars[index]);
    });
  }
}
