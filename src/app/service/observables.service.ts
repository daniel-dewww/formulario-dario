import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PassengerFront } from 'src/app/class/passenger';
import { MovilesxVehiculo } from 'src/app/class/class-directive/movilesxvehiculo';
import { C_OpeBusqueda_Form } from 'src/app/class/operaciones/busquedaOpe';
@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor() { }
  
  public _pasajerosFront: BehaviorSubject<PassengerFront[]>  = new BehaviorSubject<PassengerFront[]>([]);
  public pasajerosFront$ = this._pasajerosFront.asObservable();

  public _movilesXVehiculoFront: BehaviorSubject<MovilesxVehiculo[]>  = new BehaviorSubject<MovilesxVehiculo[]>([]);
  public movilesXVehiculo$ = this._movilesXVehiculoFront.asObservable();

  public _filtersSearch: BehaviorSubject<C_OpeBusqueda_Form> = new BehaviorSubject<C_OpeBusqueda_Form>(new C_OpeBusqueda_Form());
  public filtrosSearch$ = this._filtersSearch.asObservable();

  updatePasajerosFront(pasajeros: PassengerFront[]) {
    this._pasajerosFront.next(pasajeros)
  }

  updateMovilesxVehiculoFront(movilesxVehiculo: MovilesxVehiculo[]) {
    this._movilesXVehiculoFront.next(movilesxVehiculo)
  }

  setFiltersSearch(filters: C_OpeBusqueda_Form){
    this._filtersSearch.next(filters);
  }
}
