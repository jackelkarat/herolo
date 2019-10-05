import { FavoritesComponent } from './favorites/favorites.component';
import { ForecastComponent } from './forecast/forecast.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: ForecastComponent},
  {path: 'forecast', component: ForecastComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: '**', component: ForecastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
