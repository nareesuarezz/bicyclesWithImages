import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/cars.service';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.page.html',
  styleUrls: ['./update-car.page.scss'],
})
export class UpdateCarPage implements OnInit {

  carForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  carId: number;
  carData: any; // Objeto que almacena los datos del coche a actualizar
  img: any;

  constructor(
    public formBuilder: FormBuilder,
    private carService: CarService,
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carForm = this.formBuilder.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      motor: ['', [Validators.required]],
    });

    // Obtén el ID del coche a actualizar desde la ruta
    this.carId = +this.route.snapshot.paramMap.get('id');

    // Recupera los datos del coche a actualizar
    this.carService.getOne(this.carId).subscribe(data => {
      this.carData = data;
      this.img = this.carData.filename;
      this.fillFormWithData();
    });
  }

  fillFormWithData() {
    // Rellena el formulario con los datos del coche
    this.carForm.patchValue({
      brand: this.carData.brand,
      model: this.carData.model,
      motor: this.carData.motor,
    });
  
    // Asigna la URL de la imagen
    console.log("URL de la imagen del servidor: ", this.carData.filename);
    this.capturedPhoto = 'http://localhost:8080/images/' + this.carData.filename;
    console.log("URL de la imagen asignada: ", this.capturedPhoto);
  }


  get errorControl() {
    return this.carForm.controls;
  }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      console.log("URL de la foto tomada: ", data.webPath);
      this.capturedPhoto = data.webPath;
    });
  }
  
  pickImage() {
    this.photoService.pickImage().then(data => {
      console.log("URL de la imagen seleccionada: ", data.webPath);
      this.capturedPhoto = data.webPath;
    });
  }


  discardImage() {
    this.capturedPhoto = "";
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.carForm.valid) {
      console.log('Por favor, proporcione todos los valores requeridos.');
      return;
    }
  
    let blob = null;
    // Comprueba si se ha seleccionado una nueva imagen
    if (this.capturedPhoto !== 'http://localhost:8080/images/' + this.carData.filename) {
      // Comprueba si this.capturedPhoto es una URL o un blob
      if (typeof this.capturedPhoto === 'string') {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
        console.log("Blob creado a partir de la imagen: ", blob);
      } else {
        // Si this.capturedPhoto es un blob, simplemente asigna el valor a blob
        blob = this.capturedPhoto;
      }
    }
  
    this.carService.updateCar(this.carId, this.carForm.value, blob)
      .subscribe(data => {
        console.log("Respuesta del servidor: ", data);
        console.log("Coche actualizado con éxito.");
        this.router.navigateByUrl("/list-cars");
      }, error => {
        console.error("Error al actualizar el coche: " + error);
      });
  }
  
  
}
