import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Barrio} from "./charts/barrio";

export interface BarrioResponse {
  data: Barrio[]
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPuntos(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/puntos')
  }
  getBarriosPuntos(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/barrios-puntos')
  }
  getBarrios(): Observable<BarrioResponse> {
    return this.http.get<BarrioResponse>('http://localhost:3000/barrios')
  }
}
