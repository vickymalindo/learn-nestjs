import { HttpException, Injectable } from '@nestjs/common';
import { CARS } from './cars.mock';

@Injectable()
export class CarService {
  private cars = CARS;

  public getCars() {
    return this.cars;
  }

  public postCar(car) {
    return this.cars.push(car);
  }

  public getCarById(id: number) {
    const car = this.cars.find((val) => val.id === id);
    if (car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }

  public deleteCarById(id: number) {
    const index = this.cars.findIndex((val) => val.id === id);
    if (index < 0) {
      throw new HttpException('Not Found', 404);
    }

    this.cars.filter((val) => val.id !== id);
    return this.cars;
  }

  public putCarById(id: number, propertyName: string, propertyValue: string) {
    const index = this.cars.findIndex((val) => val.id === id);
    if (id < 0) {
      throw new HttpException('Not Found', 404);
    }

    this.cars[index][propertyName] = propertyValue;
    return this.cars;
  }
}
