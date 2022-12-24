import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {MapComponent} from "./map/map.component";
import {ChartsComponent} from "./charts/charts.component";

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'charts', component: ChartsComponent },
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
