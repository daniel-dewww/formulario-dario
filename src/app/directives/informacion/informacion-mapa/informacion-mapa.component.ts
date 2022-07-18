import { Component, OnInit, Input, AfterViewInit, OnChanges, Output, EventEmitter, SimpleChanges, OnDestroy, DoCheck, AbstractType } from '@angular/core';
import * as UtilInformacionMapa from './utilInformacionMapa';
import { environment } from 'src/environments/environment';
import { changePositionMarker } from 'src/app/class/operaciones/viajeOpe';
import { isEmpty } from 'src/app/util/utilCopyWithoutReference';
import { RequestGeoAutocomplete } from 'src/app/class/class-directive/serviceGeo';
import { ClassNameControl, PersonalisationMarker, PersonalisationPolyline } from 'src/app/class/enum/enumMapa';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CoreObservableService } from 'src/app/core/service/core-observable.service';
import { Masterdowload } from 'src/app/class/masterdowload';
import { ToastrComponentlessModule } from 'ngx-toastr';
import { GenericObject } from 'src/app/class/genericObject';
import { cloneDeep } from 'lodash';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'nexus-informacion-mapa',
  templateUrl: './informacion-mapa.component.html',
  styleUrls: ['./informacion-mapa.component.scss']
})
export class InformacionMapaComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, DoCheck {

  @Input() coberturePosition: RequestGeoAutocomplete = {
    longitude: environment.CENTER_MAP_DEFAULT.LNG,
    latitude: environment.CENTER_MAP_DEFAULT.LAT,
  };

  @Input() idMap: string = 'map'
  @Input() fitBoundsMap: boolean = true;
  @Input() defaultUI: boolean = false;

  @Input() lstPosiciones: PersonalisationMarker[] = [];
  @Input() LimpiarCoordenadas: boolean = false;
  @Input() viewTime: boolean = false;
  @Input() viewMetros: boolean = false;
  @Input() time?: Date;
  @Input() metros?: number;
  @Input() viewPriceEstimate: boolean = false;
  @Input() priceEstimate?: number;

  @Input() polyline?: google.maps.LatLng[];
  @Input() lstCoordinateEncoded: PersonalisationPolyline[] = [];

  @Output() onChange: EventEmitter<changePositionMarker> = new EventEmitter();//MUEVE MARKERS

  // fullscreem
  @Input() viewFullScreem: boolean = false;
  @Output() fullScreem: EventEmitter<any> = new EventEmitter();

  // heatmap
  @Input() viewHeatmap: boolean = false;
  @Input() heatmapData: google.maps.LatLng[] = [];

  //polygon
  @Input() flagPolygon: boolean = false
  @Input() polygon: any
  @Output() setDataPolygon: EventEmitter<any> = new EventEmitter();
  map?: google.maps.Map;

  lstMarkers: google.maps.Marker[] = [];
  lstPosicionesMarkers: PersonalisationMarker[] = [];

  polylineDirection?: google.maps.Polyline;

  lstPolylinsMapa: google.maps.Polyline[] = [];
  lstPersonalizationPolyline: PersonalisationPolyline[] = [];

  heatmap?: google.maps.visualization.HeatmapLayer;

  //suscription
  coreObservableSuscription: Subscription;
  dataMaestra: Masterdowload = new Masterdowload();

  //settime
  timerMetros?: NodeJS.Timer;
  timerPrice?: NodeJS.Timer;
  timerTime?: NodeJS.Timer;
  timerPolyline?: NodeJS.Timer;

  theRanchPolygon: any;
  // bouns
  fitBoungReserve: boolean = false;
  drawingManager: any;
  bermudaTriangle? : google.maps.Polygon;
  pointGeocerca = { lat: 0,long: 0}
  constructor(
    public translate: TranslateService,
    private _coreObservable: CoreObservableService,
  ) {
    this.coreObservableSuscription = this._coreObservable.masterdownload$
      .subscribe((dataMaster: Masterdowload) => {
        this.dataMaestra = dataMaster;
      });
  }

  ngOnInit() {
  }

  //condicion para limpiar las coordenadas
  if(LimpiarCoordenadas = true) {
    console.log('El valor del boton es: ', LimpiarCoordenadas, 'color:red');
  }
  async ngAfterViewInit() {
 
    this.map = UtilInformacionMapa.fnInitMap(this.idMap, this.coberturePosition.latitude!, this.coberturePosition.longitude!, this.defaultUI);

    this.lstMarkers = this.fnActualizarPosicionMapa(this.lstMarkers, this.lstPosiciones);
    UtilInformacionMapa.setMapAll(this.map, this.lstMarkers);

    if (environment.CONFIGURATION.MAPA.DIRECTION) {
      this.polylineDirection = UtilInformacionMapa.fnCrearPolilyne(this.map);
    }

    await UtilInformacionMapa.crearControlMap(this.map, this.time!, this.viewTime, this.metros!, this.viewMetros, this.viewFullScreem, this.fullScreem, this.viewPriceEstimate, this.priceEstimate!);

    if (this.viewHeatmap && this.heatmapData) {
      this.heatmap = UtilInformacionMapa.fnInitHeadMap(this.map);
    }
    if (this.flagPolygon) this.drawPolygon()
    this.getPolygon()
    this.fnActualizarPolylineMapa();

  }
  
  ngOnDestroy() {

    if (this.coreObservableSuscription) {
      this.coreObservableSuscription.unsubscribe();
    }

    if (this.timerMetros) {
      clearTimeout(this.timerMetros);
    }
    if (this.timerPrice) {
      clearTimeout(this.timerPrice);
    }

    if (this.timerTime) {
      clearTimeout(this.timerTime);
    }
  }
  getPolygon(){
    var  polygonListCords : any[] =[]
    if(this.polygon){
      this.polygon.forEach((element : any ) => {
        this.pointGeocerca =  { lat: 0, long: 0 }
        this.pointGeocerca.lat = element.latitude
        this.pointGeocerca.long = element.longitude
        polygonListCords.push(new google.maps.LatLng(this.pointGeocerca.lat, this.pointGeocerca.long))
      });
    }
    this.setDataPolygon.emit(polygonListCords)
  //   var triangleCoords = [
  //     new google.maps.LatLng(-12.202136, -77.056974),
  //     new google.maps.LatLng(-12.202136, -77.048047),
  //     new google.maps.LatLng(-12.209686, -77.055343),
  //     new google.maps.LatLng(-12.202136, -77.056974)
  // ];
   // Construct the polygon
    this.bermudaTriangle = new google.maps.Polygon({
    paths: polygonListCords,
    draggable: false,
    editable: false,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
});
  this.bermudaTriangle.setMap(this.map!);
  }
  drawPolygon() {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]
      }
    });

    this.drawingManager.setMap(this.map);
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
      // Polygon drawn
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        //this is the coordinate, you can assign it to a variable or pass into another function.
        this.overlaySetPolygone = event.overlay
          this.setDataPolygon.emit(event.overlay.getPath().getArray())
        
     
        //  alert(event.overlay.getPath().getArray());
      }
    });
  }
  ngDoCheck() {
    if (UtilInformacionMapa.fnDiferentPositionAndLenght(this.lstMarkers, this.lstPosiciones, this.lstPosicionesMarkers)) {
      // console.log('Do ch3eckkkkkkkkkkkkkkkkkkkkkkkkkkkk')
      if (this.map) {
        this.lstMarkers = this.fnActualizarPosicionMapa(this.lstMarkers, this.lstPosiciones);
      }
    }

  }
  overlaySetPolygone : any 
 eliminarPoligon(){
   if(this.overlaySetPolygone != undefined){
    this.overlaySetPolygone.setMap(null)
   }

 }
  ngOnChanges(changes: SimpleChanges) {
    console.log("entrando ngOnChanges")
    if (environment.CONFIGURATION.MAPA.DIRECTION) {
      var LatLngBounds = google.maps.LatLngBounds
      this.polylineDirection = UtilInformacionMapa.fnCrearPolilyne(this.map!);
    
    }
     if (!this.flagPolygon || this.overlaySetPolygone) {
      this.eliminarPoligon()
     }else{
      this.drawPolygon()
     }
     
     this.bermudaTriangle?.setMap(null)
 
 

    // if (UtilInformacionMapa.fnDiferentPositionAndLenght(this.lstMarkers, this.lstPosiciones, this.lstPosicionesMarkers)) {
    //   console.log('ngOnChanges')
    //   if (this.map) {
    //     this.lstMarkers = this.fnActualizarPosicionMapa(this.lstMarkers, this.lstPosiciones);
    //   }
    // }

    if (changes.metros && environment.CONFIGURATION.MAPA.MOSTRAT_KM) {
      UtilInformacionMapa.editarControlMap(UtilInformacionMapa.converMetrotoFormat(this.metros!), ClassNameControl.DISTANCIA);
      if (this.metros && !document.getElementsByClassName(ClassNameControl.DISTANCIA)[0]) {
        this.timerMetros = setTimeout(() => {
          UtilInformacionMapa.editarControlMap(UtilInformacionMapa.converMetrotoFormat(this.metros!), ClassNameControl.DISTANCIA);
        }, 2000);
      }

    }
    if (changes.priceEstimate && environment.CONFIGURATION.MAPA.MOSTRAR_PRICE_ESTIMATE) {
      UtilInformacionMapa.editarControlMap(UtilInformacionMapa.convertFormatPrice(this.priceEstimate!), ClassNameControl.PRICE_ESTIMATE);
      if (this.priceEstimate && !document.getElementsByClassName(ClassNameControl.PRICE_ESTIMATE)[0]) {
        this.timerPrice = setTimeout(() => {
          UtilInformacionMapa.editarControlMap(UtilInformacionMapa.convertFormatPrice(this.priceEstimate!), ClassNameControl.PRICE_ESTIMATE);
        }, 2000);
      }

    }

    if (changes.time && environment.CONFIGURATION.MAPA.MOSTRAT_TIEMPO) {
      UtilInformacionMapa.editarControlMap(UtilInformacionMapa.convertFormatTime(this.time!), ClassNameControl.TIEMPO);
      if (this.time && !document.getElementsByClassName(ClassNameControl.TIEMPO)[0]) {
        this.timerTime = setTimeout(() => {
          UtilInformacionMapa.editarControlMap(UtilInformacionMapa.convertFormatTime(this.time!), ClassNameControl.TIEMPO);
        }, 2000);
      }
    }

    if (changes.polyline && environment.CONFIGURATION.MAPA.DIRECTION) {
      if (!this.polylineDirection) {
        this.polylineDirection = UtilInformacionMapa.fnCrearPolilyne(this.map!);
      }

      if (this.polyline && this.polyline.length > 0 && this.map) {
        this.polylineDirection.setMap(this.map);
        this.polylineDirection.setPath(this.polyline);
      } else {
        this.polylineDirection.setPath([]);
        this.polylineDirection.setMap(null);
      }
    }

    if (changes.viewHeatmap && this.map) {
      this.heatmapData = (this.viewHeatmap) ? this.heatmapData : [];

      if (!this.heatmap) {
        this.heatmap = UtilInformacionMapa.fnInitHeadMap(this.map);
      }

      if (this.viewHeatmap) {
        this.heatmap.setData(this.heatmapData);
        this.heatmap.setMap(this.map);
      } else {
        this.heatmap.setData(this.heatmapData);
        this.heatmap.setMap(null);
      }
    }

    if (changes.heatmapData && this.viewHeatmap && this.map) {
      if (!this.heatmap) {
        this.heatmap = UtilInformacionMapa.fnInitHeadMap(this.map);
      }
      this.heatmapData = (this.heatmapData) ? this.heatmapData : [];
      this.heatmap.setData(this.heatmapData);
    }

    if (changes.lstCoordinateEncoded) {
      if (UtilInformacionMapa.fnDiferentCoordinateEncoded(this.lstCoordinateEncoded, this.lstPersonalizationPolyline)) {
        if (this.map) {
          this.fnActualizarPolylineMapa();
        }
      }
    }
  }

  fnActualizarPosicionMapa(lstMarkers: google.maps.Marker[], lstPosiciones: PersonalisationMarker[]): google.maps.Marker[] {

    if (lstPosiciones) {
      if (lstPosiciones.length == lstMarkers.length) {
        for (let i = 0; i < lstMarkers.length; i++) {
          if (!isEmpty(lstMarkers[i])) {
            this.actualizarMarker(lstMarkers, lstPosiciones, i)
          }
        }
      } else if (lstPosiciones.length < lstMarkers.length) {
        for (let i = 0; i < lstMarkers.length; i++) {
          if (!isEmpty(lstMarkers[i]) && i < lstPosiciones.length) {
            this.actualizarMarker(lstMarkers, lstPosiciones, i)
          } else if (!isEmpty(lstMarkers[i])) {
            if (this.lstPosicionesMarkers[i].showInfowindow && this.lstPosicionesMarkers[i].infoWindow) {
              this.lstPosicionesMarkers[i].infoWindow!.close()
              this.lstPosicionesMarkers[i].infoWindow!.setContent('')
            }
            lstMarkers[i].setMap(null);
          }
        }

        this.lstPosicionesMarkers.splice(lstPosiciones.length, (lstMarkers.length - lstPosiciones.length));
        lstMarkers.splice(lstPosiciones.length, (lstMarkers.length - lstPosiciones.length));
      } else if (lstPosiciones.length > lstMarkers.length) {
        for (let i = 0; i < lstMarkers.length; i++) {
          if (!isEmpty(lstMarkers[i])) {
            this.actualizarMarker(lstMarkers, lstPosiciones, i)
          }
        }
        for (let i = lstMarkers.length; i < lstPosiciones.length; i++) {
          let estados: GenericObject[] = UtilInformacionMapa.lstEstados(lstPosiciones[i].estado!, this.dataMaestra)
          let marker = UtilInformacionMapa.fnCrearMarker(i, lstPosiciones[i], this.map!, estados);
          // marker.setTitle(fnCrearMarker)
          // this.lstPosicionesMarkers.push((lstPosiciones[i]));
          this.lstPosicionesMarkers.push(UtilInformacionMapa.CloneDetalleMarker(lstPosiciones[i]));
          let infoWindow = new google.maps.InfoWindow()
          infoWindow.setContent(infoWindow.getContent())
          // this.lstPosicionesMarkers.push(cloneDeep(lstPosiciones[i]));
          this.lstPosicionesMarkers[i].infoWindow = infoWindow;

          lstMarkers.push(marker);
          this.markerListener(lstMarkers[i], i, lstPosiciones[i]);
        }
      }
    }

    if (this.fitBoundsMap) {
      UtilInformacionMapa.fitBounds(this.map!, this.coberturePosition, lstMarkers)
    }

    return lstMarkers;
  }

  // fnActualizarPolylineMapa(lstPersonalizationPolyline: PersonalisationPolyline[], lstCoordinateEncoded: PersonalisationPolyline[]): google.maps.Polyline[] {
  fnActualizarPolylineMapa() {

    if (this.lstCoordinateEncoded) {
      if (this.lstCoordinateEncoded.length == this.lstPersonalizationPolyline.length) {
        for (let i = 0; i < this.lstPersonalizationPolyline.length; i++) {
          if (!isEmpty(this.lstPersonalizationPolyline[i])) {
            this.actualizarLstPolyline(i)
          }
        }
      } else if (this.lstCoordinateEncoded.length < this.lstPersonalizationPolyline.length) {
        for (let i = 0; i < this.lstPersonalizationPolyline.length; i++) {
          if (!isEmpty(this.lstPersonalizationPolyline[i]) && i < this.lstCoordinateEncoded.length) {
            this.actualizarLstPolyline(i)
          } else if (!isEmpty(this.lstPolylinsMapa[i])) {
            this.lstPolylinsMapa[i].setMap(null);
          }
        }

        this.lstPolylinsMapa.splice(this.lstCoordinateEncoded.length, (this.lstPersonalizationPolyline.length - this.lstCoordinateEncoded.length));
        this.lstPersonalizationPolyline.splice(this.lstCoordinateEncoded.length, (this.lstPersonalizationPolyline.length - this.lstCoordinateEncoded.length));
      } else if (this.lstCoordinateEncoded.length > this.lstPersonalizationPolyline.length) {
        for (let i = 0; i < this.lstPersonalizationPolyline.length; i++) {
          if (!isEmpty(this.lstPolylinsMapa[i])) {
            this.actualizarLstPolyline(i)
          }
        }
        for (let i = this.lstPersonalizationPolyline.length; i < this.lstCoordinateEncoded.length; i++) {
          let polyline = UtilInformacionMapa.fnCrearPolilyne(this.map!, this.lstCoordinateEncoded[i])

          // marker.setTitle(fnCrearMarker)
          this.lstPersonalizationPolyline.push(cloneDeep(this.lstCoordinateEncoded[i]));

          this.lstPolylinsMapa.push(polyline);
          if (!this.map) {
            this.lstPolylinsMapa[i].setMap(this.map!);
          } else {
            this.lstPolylinsMapa[i].setMap(this.map);
          }
          this.lstPolylinsMapa[i].setPath(UtilInformacionMapa.decodingPolyline(this.lstCoordinateEncoded[i].coordinateEncoded!))
        }
      }
    }

    if (this.fitBoundsMap) {
      UtilInformacionMapa.fitBounds(this.map!, this.coberturePosition, this.lstMarkers, this.lstPolylinsMapa)
    }
  }

  actualizarMarker(lstMarkers: google.maps.Marker[], lstPosiciones: PersonalisationMarker[], i: number) {
    if (lstMarkers[i].getPosition() && lstPosiciones[i].posicion &&
      lstMarkers[i].getPosition()!.lat() != lstPosiciones[i].posicion!.lat() ||
      lstMarkers[i].getPosition()!.lng() != lstPosiciones[i].posicion!.lng()) {
      lstMarkers[i].setPosition(lstPosiciones[i].posicion ? lstPosiciones[i].posicion! : new google.maps.LatLng(0, 0));
    }

    if (lstMarkers[i].getDraggable() != lstPosiciones[i].isDragable) {
      lstMarkers[i].setDraggable(lstPosiciones[i].isDragable ? lstPosiciones[i].isDragable! : false)
    };

    if (lstPosiciones[i].showTittle &&
      lstMarkers[i].getTitle() != lstPosiciones[i].tittle) {
      lstMarkers[i].setTitle((lstPosiciones[i].tittle) ? lstPosiciones[i].tittle! : null);
    }

    if (this.lstPosicionesMarkers[i].tipoMarker != lstPosiciones[i].tipoMarker) {
      lstMarkers[i].setIcon(UtilInformacionMapa.getUrlIcon(lstPosiciones[i]));
    };

    if (lstPosiciones[i].showInfowindow &&
      lstPosiciones[i].infoWindow &&
      this.lstPosicionesMarkers[i].infoWindow &&
      this.lstPosicionesMarkers[i].infoWindow!.getContent() != lstPosiciones[i].infoWindow!.getContent()) {
      // this.lstPosicionesMarkers[i].infoWindow.close();
      // console.log('Actualizar InfoWindow')

      let infoWindow = new google.maps.InfoWindow()
      infoWindow.setContent(infoWindow.getContent())
      this.lstPosicionesMarkers[i].infoWindow = infoWindow;
    };

    if (this.lstPosicionesMarkers[i].idDestino != lstPosiciones[i].idDestino) {
      this.lstPosicionesMarkers[i].idDestino = (lstPosiciones[i].idDestino) ? lstPosiciones[i].idDestino! : undefined!;
    };


    if (this.lstPosicionesMarkers[i].selector != lstPosiciones[i].selector ||
      this.lstPosicionesMarkers[i].estado != lstPosiciones[i].estado ||
      this.lstPosicionesMarkers[i].idEstado != lstPosiciones[i].idEstado) {
      if (lstPosiciones[i].selector && lstPosiciones[i].idEstado) {
        this.lstPosicionesMarkers[i].selector = (lstPosiciones[i].selector) ? lstPosiciones[i].selector : undefined;
        this.lstPosicionesMarkers[i].estado = (lstPosiciones[i].estado) ? lstPosiciones[i].estado : undefined;
        this.lstPosicionesMarkers[i].idEstado = (lstPosiciones[i].idEstado) ? lstPosiciones[i].idEstado : undefined;
        lstMarkers[i].set("labelClass", lstPosiciones[i].selector)
      }
    };

    if (this.lstPosicionesMarkers[i].labelSelector != lstPosiciones[i].labelSelector &&
      lstMarkers[i].get("labelContent") != lstPosiciones[i].labelSelector) {
      lstMarkers[i].set("labelContent", (lstPosiciones[i].labelSelector) ? lstPosiciones[i].labelSelector : null);
    };

    this.lstPosicionesMarkers[i] = UtilInformacionMapa.CloneDetalleMarker(lstPosiciones[i]);
    // this.lstPosicionesMarkers[i] = cloneDeep(lstPosiciones[i]);
  }

  actualizarLstPolyline(i: number) {
    if (this.lstPolylinsMapa[i].getMap()) {
      this.lstPolylinsMapa[i].setMap(this.map!);
    }

    if (this.lstPersonalizationPolyline[i].coordinateEncoded != this.lstCoordinateEncoded[i].coordinateEncoded) {
      this.lstPolylinsMapa[i].setPath(UtilInformacionMapa.decodingPolyline(this.lstCoordinateEncoded[i].coordinateEncoded!))
    };

    if (this.lstPersonalizationPolyline[i].color != this.lstCoordinateEncoded[i].color) {
      this.lstPolylinsMapa[i].setOptions(UtilInformacionMapa.OptionsPolyline(this.lstCoordinateEncoded[i]))
    };

    this.lstPersonalizationPolyline[i] = cloneDeep(this.lstCoordinateEncoded[i]);
  }

  markerListener(marker: google.maps.Marker, index: number, detalleMarker: PersonalisationMarker) {
    detalleMarker.isDragable = (detalleMarker.isDragable) ? (detalleMarker.isDragable) : false

    if (detalleMarker.showInfowindow && this.lstPosicionesMarkers[index].infoWindow) {
      google.maps.event.addListener(marker, 'click', () => {
        this.lstPosicionesMarkers[index].infoWindow!.open(this.map, this.lstMarkers[index])
      });
    }

    if (detalleMarker.isDragable) {

      console.log('markerCreate ' + index + '       ', this.fitBoungReserve, '      ', this.fitBoundsMap)

      this.fitBoungReserve = cloneDeep(this.fitBoundsMap)
      google.maps.event.addListener(marker, 'dragstart', () => {
        this.fitBoungReserve = cloneDeep(this.fitBoundsMap)
        this.fitBoundsMap = false;
      });

      google.maps.event.addListener(marker, 'dragend', () => {
        let booleanFitBouns = cloneDeep(this.fitBoungReserve);
        this.fitBoundsMap = cloneDeep(booleanFitBouns);
        this.calcularCoordenadasMarkers(index);
      });
    }
  }

  calcularCoordenadasMarkers(index: number) {
    let jsonResponse: changePositionMarker = {
      index: index,
      marker: this.lstMarkers[index],
      lstMarker: this.lstMarkers
    }

    this.onChange.emit(jsonResponse);
  }

  ////#region encode polyline

  //#fin encode polyline
}