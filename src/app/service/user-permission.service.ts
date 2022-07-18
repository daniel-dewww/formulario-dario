import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ID_Screen } from 'src/app/class/class-directive/enunShortCutService';
import * as Permission from 'src/app/class/class-directive/permission';
import { Masterdowload } from 'src/app/class/masterdowload';
import { environment } from 'src/environments/environment';

import { CoreObservableService } from './core-observable.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService implements OnDestroy {

  lstPermission: Permission.Permission[] = this.testPermission(); //environment.PERMISSION

  //#region Subscription Maestro
  // coreObservableSubscription: Subscription
  // dataMaestra: Masterdowload = new Masterdowload();
  //#endregion Subscription Maestro

  constructor(
    private _coreObservable: CoreObservableService,
    // private _serviceToast: ToastService
  ) {
    // this.coreObservableSubscription = this._coreObservable.masterdownload$
    //   .subscribe((dataMaster: Masterdowload) => {
    //     //  this.dataMaestra = dataMaster;
    //   });
  }

  ngOnDestroy() {
    // this.coreObservableSubscription.unsubscribe();
  }

  getPermission(IdPermission: Permission.ID_Permission, screen: Permission.ScreenPermission): boolean {
    
    this.lstPermission = environment.PERMISSION as Permission.Permission[];
    let objPermisionScreen = this.lstPermission.find(obj => obj.code == screen);
    let permission: boolean = false;
    if(objPermisionScreen && objPermisionScreen.sons){
      objPermisionScreen.sons.forEach(permi => {
        if(permi.code == IdPermission){
          permission = true;
        }
      });
    }
    return permission;
  }

  toastInformation(){
    // this._serviceToast.showInfo(environment.MSJE_CLIENTE.PERMISSION.MSG_DONTPERMISSION);
  }

  testPermission(): Permission.Permission[] {
    return [
      {
        "code": ID_Screen.OPERATION,
        "description": "operaciones",
        "sons": [
          {
            "code": Permission.ID_PermissionOperation.EVENT_NEW_TRIP,
            "description": "Abrir Modal Viaje"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_FIND_TYPE,
            "description": "Tipo Busqueda"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_FIND_STATUS,
            "description": "Estado Viaje"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_OFFER_TRIP,
            "description": "Ofertar Viaje"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_CANCEL_TRIP,
            "description": "Cancelar Viaje"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_REMOVER_DRIVER,
            "description": "Retirar Conductor"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_ASSING_MOVIL,
            "description": "Asignar Movil"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_SHOW_TRACKING,
            "description": "Ver Tracking"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_EDIT_TRIP,
            "description": "Editar Viaje"
          },
          {
            "code": Permission.ID_PermissionOperation.PANEL_MOVIL,
            "description": "Panel de moviles"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_UPDATE_DATA_CONFIDENTIAL,
            "description": "Actualizar data confidencial"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_UPDATE_HOURS_SERVICE,
            "description": "Actualizar Horas de servicio"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_UPDATE_SERVICE,
            "description": "Actualizar Servicio"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_UPDATE_TARIFF_COMPANY,
            "description": "Actualizar tarifas de empresas"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_AUTOMATIC_FIND,
            "description": "Busqueda automatica"
          },
          {
            "code": Permission.ID_PermissionOperation.EVENT_CHANGE_AUTOMATIC_FIND,
            "description": "Cambiar busqueda automatica"
          }
        ]
      },
      {
        "code": ID_Screen.MODAL_TRAVEL,
        "description": "modal_travel",
        "sons": [
          {
            "code": Permission.ID_PermissionModal.EVENT_NEW_CLIENT,
            "description": "Agregar nuevo cliente"
          },
          {
            "code": Permission.ID_PermissionModal.EVENT_CHANGE_COVERAGE,
            "description": "Cambiar Cobertura"
          },
          {
            "code": Permission.ID_PermissionModal.EVENT_ADD_PASSENGER,
            "description": "Agregar Pasajero"
          },
          {
            "code": Permission.ID_PermissionModal.EVENT_MORE_DETAILS,
            "description": "Mas detalles"
          },
          {
            "code": Permission.ID_PermissionModal.EVENT_MANAGE_DESTINATION,
            "description": "Gestionar Destino"
          },
          {
            "code": Permission.ID_PermissionModal.EVENT_CHANGE_PAYMENT_TYPE,
            "description": "Cambio tipo pago"
          },
          {
            "code": Permission.ID_PermissionModal.EVENT_CANCEL_TRIP_MODAL,
            "description": "Cancelar Viaje"
          },
          {
            "code": Permission.ID_PermissionModal.EVENT_REMOVER_DRIVER_MODAL,
            "description": "Remover Conductor"
          },
          {
            "code": Permission.ID_PermissionModal.EVENT_OFFER_TRIP_MODAL,
            "description": "Ofertar Viaje"
          },
          {
            "code": Permission.ID_PermissionModal.EVENT_SAVE_TRIP,
            "description": "Guardar Viaje"
          }
        ]
      },
      {
        "code": ID_Screen.MONITORING,
        "description": "Monitoreo",
        "sons": [
          {
            "code": Permission.ID_PermissionMonitoreo.EVENT_FIND_STATUS_DRIVER,
            "description": "Estado Conductor"
          },
          {
            "code": Permission.ID_PermissionMonitoreo.EVENT_FIND_STATUS_TRIP,
            "description": "Estado Viaje"
          },
          {
            "code": Permission.ID_PermissionMonitoreo.EVENT_FIND_PAYMENT_TYPE,
            "description": "Tipo Pago"
          },
          {
            "code": Permission.ID_PermissionMonitoreo.EVENT_FIND_SERVICE_TYPE,
            "description": "Tipo Servicio"
          }
        ]
      },
      {
        "code": ID_Screen.MAINTAINER_DRIVER,
        "description": "Conductor",
        "sons": [
          {
            "code": Permission.ID_PermissionMaintenanceDriver.EVENT_NEW_DRIVER,
            "description": "Agregar Conductor"
          },
          {
            "code": Permission.ID_PermissionMaintenanceDriver.EVENT_EDIT_DRIVER,
            "description": "Editar Vehiculo"
          },
          {
            "code": Permission.ID_PermissionMaintenanceDriver.EVENT_SEARCH_DRIVER,
            "description": "Buscar conductores"
          }
        ]
      },
      {
        "code": ID_Screen.MAINTAINER_VEHICLE,
        "description": "Vehiculo",
        "sons": [
          {
            "code": Permission.ID_PermissionMaintenanceVehicle.EVENT_NEW_VEHICLE,
            "description": "Agregar Vehiculo"
          },
          {
            "code": Permission.ID_PermissionMaintenanceVehicle.EVENT_EDIT_VEHICLE,
            "description": "Editar Vehiculo"
          },
          {
            "code": Permission.ID_PermissionMaintenanceVehicle.EVENT_SEARCH_VEHICLE,
            "description": "Buscar Vehiculo"
          }
        ]
      },
      {
        "code": Permission.ID_ScreenPermission.SHORT_CUT,
        "description": "Shorcut",
        "sons": [
          {
            "code": Permission.ID_PermissionShortCut.SHORTCUT_EVENT_NEW_TRIP,
            "description": "Nuevo Viaje"
          },
          {
            "code": Permission.ID_PermissionShortCut.SHORTCUT_EVENT_EDIT_TRIP,
            "description": "Editar Viaje"
          },
          {
            "code": Permission.ID_PermissionShortCut.SHORTCUT_EVENT_FIND_SCREEN,
            "description": "Buscar Pantalla"
          },
          {
            "code": Permission.ID_PermissionShortCut.SHORTCUT_EVENT_FIND_MONITORING,
            "description": "Buscar Monitoreo"
          },
          {
            "code": Permission.ID_PermissionShortCut.SHORTCUT_EVENT_TYPE_CAR,
            "description": "Estado Movil"
          },
          {
            "code": Permission.ID_PermissionShortCut.SHORTCUT_EVENT_SEARCH_ID,
            "description": "Buscar Por Id"
          },
          {
            "code": Permission.ID_PermissionShortCut.SHORTCUT_EVENT_LIST_SERVICE,
            "description": "Lista Servicio"
          },
          {
            "code": Permission.ID_PermissionShortCut.SHORTCUT_SMS_INFORMATION_DRIVER,
            "description": "Lista Servicio"
          },
          {
            "code": Permission.ID_PermissionShortCut.SHORTCUT_DRIVER_DETAILS,
            "description": "Detalle del conductor"
          },
        ]
      },
      {
        "code": ID_Screen.MAINTAINER_MESSAGE,
        "description": "Mensaje",
        "sons": [
          {
            "code": Permission.ID_PermissionMaintenanceMessage.EVENT_SEND_MESSAGE,
            "description": "Enviar mensaje" 
          },
          {
            "code": Permission.ID_PermissionMaintenanceMessage.EVENT_FIND_CONVERSATION,
            "description": "Buscar una conversacion"
          },
          {
            "code": Permission.ID_PermissionMaintenanceMessage.EVENT_FIND_TO_CHAT,
            "description": "Buscar en el chat"
          }
        ]
      },
      {
        "code": ID_Screen.MAINTAINER_ZONE,
        "description": "Zona",
        "sons": [
          {
            "code": Permission.ID_PermissionMaintenanceZone.EVENT_NEW_ZONE,
            "description": "Agregar Conductor"
          },
          {
            "code": Permission.ID_PermissionMaintenanceZone.EVENT_EDIT_ZONE,
            "description": "Editar Vehiculo"
          },
          {
            "code": Permission.ID_PermissionMaintenanceZone.EVENT_SEARCH_ZONE,
            "description": "Buscar conductores"
          }
        ]
      },
      // environment
    ]
  }
}
