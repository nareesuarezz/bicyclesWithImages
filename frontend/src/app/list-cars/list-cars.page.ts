import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services/cars.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.page.html',
  styleUrls: ['./list-cars.page.scss'],
})
export class ListCarsPage implements OnInit {

  cars: any = [];

  constructor(private carService: CarService, private router: Router, public alertController: AlertController) { }

  ngOnInit() { }

  ionViewDidEnter(){
    this.getAllCars();
  }

  getAllCars() {
    this.carService.getCars().subscribe(cars => {
      console.log(cars);
      this.cars = cars;
    })
  }

  // DECOMMENT:
  addCars(){
    this.router.navigateByUrl("/add-cars");
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe(response => {
      this.getAllCars();
    });
  }

  deleteAllCars() {
    this.carService.deleteAllCars().subscribe(response => {
      this.getAllCars();
    });
  }

  async deleteAllCarConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirmar borrado',
      message: `¿Seguro que quieres borrar todos los coches?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Borrar',
          handler: () => {
            this.deleteAllCars();
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteCarConfirmation(c:any) {
    const alert = await this.alertController.create({
      header: 'Confirmar borrado',
      message: `¿Seguro que quieres borrar el coche ${c.brand}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Borrar',
          handler: () => {
            this.deleteCar(c.id);
          },
        },
      ],
    });
    await alert.present();
  }
}
