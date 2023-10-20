import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCarsPageRoutingModule } from './list-cars-routing.module';

import { ListCarsPage } from './list-cars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCarsPageRoutingModule
  ],
  declarations: [ListCarsPage]
})
export class ListCarsPageModule {}
