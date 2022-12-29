import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shell/nav-bar/nav-bar.component';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LeafletComponent } from './map/leaflet/leaflet.component';
import { MapComponent } from "./map/map.component";
import {ChartsComponent} from "./charts/charts.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {LeafletMarkerClusterModule} from "@asymmetrik/ngx-leaflet-markercluster";
import {HttpClientModule} from "@angular/common/http";
import { NgChartsModule } from 'ng2-charts';
import { BarriosEnTiempoComponent } from './charts/barrios-en-tiempo/barrios-en-tiempo.component';
import { RangoDeEdadComponent } from './charts/rango-de-edad/rango-de-edad.component';
import { TotalizadoresComponent } from './charts/totalizadores/totalizadores.component';
import { DatosPorZonaComponent } from './charts/datos-por-zona/datos-por-zona.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    MapComponent,
    LeafletComponent,
    ChartsComponent,
    BarriosEnTiempoComponent,
    RangoDeEdadComponent,
    TotalizadoresComponent,
    DatosPorZonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
