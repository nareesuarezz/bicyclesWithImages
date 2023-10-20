import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCarsPage } from './list-cars.page';

const routes: Routes = [
  {
    path: '',
    component: ListCarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCarsPageRoutingModule {}
