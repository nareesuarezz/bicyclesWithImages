import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
}

@Injectable({
  providedIn: 'root'
})

export class CarService {

  endPoint = "http://localhost:8080/api/cars"; 

  constructor(private httpClient: HttpClient) { }

  getCars(){
    return this.httpClient.get(this.endPoint);
  }

  //DECOMMENT:
  createCar(car, blob){
    let formData = new FormData();
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("motor", car.motor);
    formData.append("file", blob);

    console.log(car);

    return this.httpClient.post(this.endPoint, formData);
  }

  getOne(id: number){
    return this.httpClient.get(this.endPoint+`/${id}`);
  }

  deleteCar(id: number){
    return this.httpClient.delete(this.endPoint+`/${id}`);
  }

  deleteAllCars() {
    return this.httpClient.delete(this.endPoint);
  }

 updateCar(id: number, car, blob){
  let formData = new FormData();
  formData.append("brand", car.brand);
  formData.append("model", car.model);
  formData.append("motor", car.motor);
  if (blob) {
    formData.append("file", blob);
  }

  return this.httpClient.put(this.endPoint+`/${id}`, formData);
}


  
}
