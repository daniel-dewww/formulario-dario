import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import * as Cookies from '../../util/cookies/cookies';
import { Masterdowload, RequestMasterdowload, CourrentUser, FrontMasterdowload, CurrentDriver } from 'src/app/class/masterdowload';
import { StructService, RouteService } from 'src/app/util/serviceService/serviceStruct';
import { Router } from '@angular/router';
import { MasterdownloadService } from 'src/app/service/masterdownload.service';
import { map } from 'rxjs/operators';
import { Parameter, TypeParameter } from 'src/app/class/parameter';
import { environment } from 'src/environments/environment';
import { DriverMaintenance, RegisterBasicDriver } from 'src/app/class/driver';
import { Vehicle } from 'src/app/class/vehicle';
import * as Permission from 'src/app/class/class-directive/permission';
import { cloneDeep } from 'lodash';
import { NewZones } from '../../class/newZone';

@Injectable({
  providedIn: 'root'
})
export class CoreObservableService {

  public _masterdownload: BehaviorSubject<Masterdowload> = new BehaviorSubject<Masterdowload>(new Masterdowload());
  masterdownload$ = this._masterdownload.asObservable();

  public _phone: BehaviorSubject<string> = new BehaviorSubject<string>("");
  phone$ = this._phone.asObservable();

  public _driver: BehaviorSubject<DriverMaintenance> = new BehaviorSubject<DriverMaintenance>(new DriverMaintenance());
  driver$ = this._driver.asObservable();

  public _newZone: BehaviorSubject<NewZones> = new BehaviorSubject<NewZones>(new NewZones());
  newZone$ = this._newZone.asObservable();

  public _registerDriver: BehaviorSubject<RegisterBasicDriver> = new BehaviorSubject<RegisterBasicDriver>(new RegisterBasicDriver());
  registerDriver$ = this._registerDriver.asObservable();

  public _vehicle: BehaviorSubject<Vehicle> = new BehaviorSubject<Vehicle>(new Vehicle());
  vechile$ = this._vehicle.asObservable();

  constructor(
    private router: Router,
    private serviceComponent: ServiceStructService,
    private masterdownloadService: MasterdownloadService,
  ) { }

  // async serviceIniciarSecion(){

  //   // const currentUser = {
  //   //   IdCliente: data.value,
  //   //   Rol: user.Rol
  //   // }

  //   let usuario;

  //   return 

  // }

  serviceMasterDowloadObservable(jsonMaestros: RequestMasterdowload): Observable<any> {
    return this.masterdownloadService.getMasterdownloadObservable(jsonMaestros).pipe(map((descargaMaestro: any) => {
      // console.log('maestroooooooooooooooooooooooooooo')
      if (descargaMaestro && jsonMaestros.user_uuid) {
        this._masterdownload.next(descargaMaestro);
        return descargaMaestro
      } else {
        this.logoutSesion()
      }
    }));
  }


  async serviceMasterDowload(jsonMaestros: RequestMasterdowload) {
    // let descargaMaestro: Masterdowload;
    // if(Cookies.cookieMaestrosAdd(Cookies.maestrosCookieName).length > 0){
    //   descargaMaestro =  JSON.parse(Cookies.cookieMaestrosAdd(Cookies.maestrosCookieName)) as Masterdowload
    // } else {
    let descargaMaestro: Masterdowload = await this.serviceComponent.requestService(StructService.CODE, RouteService.masterdownloadGet, jsonMaestros)
    // await Cookies.cookieMaestrosAdd(descargaMaestro);
    // }
    if (descargaMaestro && jsonMaestros.user_uuid) {

      if (jsonMaestros.anexo && jsonMaestros.anexo.length > 0) {
        descargaMaestro.frontMasterdowload = new FrontMasterdowload();
        descargaMaestro.frontMasterdowload.anexo = jsonMaestros.anexo;
      }
      
      this.setMasterDowload(descargaMaestro)
      // this._masterdownload.next(descargaMaestro);
      return descargaMaestro
    } else {
      this.logoutSesion()
      return undefined;
    }
  }

  setMasterDowload(descargaMaestro: Masterdowload) {
    this.setConfigurationInParameters(descargaMaestro.parameters!);
    this.setPermission(descargaMaestro.permissions!);

    this._masterdownload.next(descargaMaestro);
    // Cookies.setCookie(Cookies.maestrosCookieName, JSON.stringify(descargaMaestro));
    // console.log('setMasterDowload');
    // console.log(Cookies.getCookie(Cookies.maestrosCookieName).length);
  }

  getMasterDowload(): Masterdowload {
    return this._masterdownload.value;
  }

  async loginSesion(currentUser: CourrentUser, maestros?: Masterdowload) {
    await Cookies.setCookie(Cookies.userCookieName, JSON.stringify(currentUser));
    this._phone.next(currentUser.phone!);

    if (maestros) {
      this.setMasterDowload(maestros);

      return maestros
    }
    Cookies.cookieTokenAdd('Prueba');
    return undefined
  }


  /**asdf */

  logoutSesion() {
    Cookies.removeCookie(Cookies.tokenCookieName);
    Cookies.removeCookie(Cookies.userCookieName);
    // Cookies.removeCookie(Cookies.maestrosCookieName);

    Cookies.cookieTokenRemove();
    this.router.navigate(['/']);
  }

  async loginSesionDriver(currentUser: CurrentDriver, driver?: RegisterBasicDriver) {
    await Cookies.setCookie(Cookies.userDriverCookieName, JSON.stringify(currentUser));
    if(driver) {
      this.setDriver(driver);
      return driver;
    }

    Cookies.cookieTokenAdd('Prueba2');
    return undefined;
  }

  logoutSessionDriver() {
    Cookies.removeCookie(Cookies.tokenCookieName);
    Cookies.removeCookie(Cookies.userDriverCookieName);

    Cookies.cookieTokenRemove();
    this.router.navigate(['/view/driver-register/signin']);
  }

  async serviceMasterDriver(driver_id: number, verifyId?: string, isEmail?: boolean, cellPhone?: string){
    let driver: RegisterBasicDriver = await this.serviceComponent.requestService(StructService.ARRAY, RouteService.driverProfileGet, driver_id);

    if(driver && driver_id){
      driver.verifyId = (verifyId) ? verifyId : driver.verifyId;
      driver.isEmail = (isEmail) ? isEmail : false;
      driver.cellphone = (cellPhone) ? cellPhone : null!;
      this.setRegisterDriver(driver);
      return driver;
    } else {
      this.logoutSessionDriver();
      return undefined;
    }
  }

  setConfigurationInParameters(parameters: Parameter[]) {
    if (parameters) {
      parameters.forEach(parameter => {
        switch (parameter.code) {
          case 'BACKOFFICE_DISPATCH_SHOW_POLYLINE':
            environment.CONFIGURATION.MAPA.DIRECTION = this.typeParameter(parameter.parametertype_id!, parameter.defaultvalue!, environment.CONFIGURATION.MAPA.DIRECTION);
            break;
          case 'TimerBusquedaViajes':
            environment.CONFIGURATION.TIMER.BUSQUEDA_VIAJE = this.typeParameter(parameter.parametertype_id!, parameter.defaultvalue!, environment.CONFIGURATION.TIMER.BUSQUEDA_VIAJE);
            break;
          case 'TimerContadorVeehiculos':
            environment.CONFIGURATION.TIMER.CONTADOR_VEHICULOS = this.typeParameter(parameter.parametertype_id!, parameter.defaultvalue!, environment.CONFIGURATION.TIMER.CONTADOR_VEHICULOS);
            break;
          case 'TimerMonitoreroConductor':
            environment.CONFIGURATION.TIMER.MONITOREO_CONDUCTOR = this.typeParameter(parameter.parametertype_id!, parameter.defaultvalue!, environment.CONFIGURATION.TIMER.MONITOREO_CONDUCTOR);
            break;
          case 'TimerTablaVehiculos':
            environment.CONFIGURATION.TIMER.TABLA_VEHICULOS = this.typeParameter(parameter.parametertype_id!, parameter.defaultvalue!, environment.CONFIGURATION.TIMER.TABLA_VEHICULOS);
            break;
          default:
            break;
        }
      });
    }
  }

  setPermission(permissions: any[]) {
    if (permissions) {
      let permiso: Permission.Permission = new Permission.Permission();
      let lstPermission: Permission.Permission[] = [];
      permissions.forEach(permission => {
        permiso.code = permission.code;
        permiso.description = permission.description;
        permiso.sons = permission.children;
        lstPermission.push(cloneDeep(permiso))
      });
      environment.PERMISSION = lstPermission as any[];
      // console.log('environment.PERMISSION', environment.PERMISSION)
    }
  }

  typeParameter(typeId: number, value: string, valueEnviroment: any): any {
    switch (typeId) {
      case TypeParameter.STRING:
        return value
      case TypeParameter.BOOLEAN:
        return (value == '1') ? true : false;
      default:
        return valueEnviroment;
    }
  }

  setDriver(driver: DriverMaintenance) {
    this._driver.next(driver);
  }

  getDriver(): DriverMaintenance {
    return this._driver.value;
  }

  setRegisterDriver(driver: RegisterBasicDriver) {
    this._registerDriver.next(driver);
  }

  getRegisterDriver(): RegisterBasicDriver {
    return this._registerDriver.value;
  }

  setVehicle(vehicle: Vehicle) {
    this._vehicle.next(vehicle);
  }

  getVehicle(): Vehicle {
    return this._vehicle.value;
  }
}
