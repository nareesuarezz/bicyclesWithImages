import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCarPageRoutingModule } from './add-cars-routing.module';

import { AddCarPage } from './add-cars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddCarPageRoutingModule
  ],
  declarations: [AddCarPage]
})
export class AddCarPageModule {}
