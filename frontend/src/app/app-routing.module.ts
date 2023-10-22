import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-cars',
    pathMatch: 'full'
  },
  {
    path: 'add-cars',
    loadChildren: () => import('./add-cars/add-cars.module').then( m => m.AddCarPageModule)
  },
  {
    path: 'list-cars',
    loadChildren: () => import('./list-cars/list-cars.module').then( m => m.ListCarsPageModule)
  },
  {
    path: 'update-car/:id',
    loadChildren: () => import('./update-car/update-car.module').then( m => m.UpdateCarPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
