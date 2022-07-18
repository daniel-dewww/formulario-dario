import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Company } from 'src/app/class/company';
import { Driver } from 'src/app/class/driver';
import { Masterdowload } from 'src/app/class/masterdowload';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { ReporteService } from 'src/app/demo/service/reporte-service.service';
import { CoreObservableService } from 'src/app/service/core-observable.service';
import { RouteService, StructService } from 'src/app/util/serviceService/serviceStruct';
import { fnServiceDateSend, fnServiceDateSendString } from 'src/app/util/utilDate';

@Component({
  selector: 'app-report-service-card',
  providers: [MessageService,ReporteService ],
  templateUrl: './report-service-card.component.html',
  styleUrls: ['./report-service-card.component.scss']
})
export class ReportServiceCardComponent implements OnInit {
    productDialog: boolean;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    products: any[];
    product: Product;
    selectedProducts: Product[];
    submitted: boolean;
    cols: any[];
    statuses: any[];
    rowsPerPageOptions = [5, 10, 20];
      //#region  Suscription Maestro
    coreObservableSubscription: Subscription | undefined;
    dataMaestra: Masterdowload = new Masterdowload();
    user_id?: any  = {};
  @ViewChild('selectClient', {static: false}) auto:any;
  constructor(
    private reporteService: ReporteService,
    private breadcrumbService: BreadcrumbService,
    private messageService: MessageService,
    private _coreObservable: CoreObservableService


  ) { 
    this.breadcrumbService.setItems([
      { label: 'Pages' },
      { label: 'Reporte de servicios tarjeta', routerLink: ['/core/service-reports-card'] }
  ]);
  this._coreObservable.masterdownload$.subscribe(
    (dataMaster: Masterdowload) => {
      this.dataMaestra = dataMaster;
    }
  );
  }
  clientList : any[]
  gender : any
  date7 : any 

  async ngOnInit() {
    await this.reporteService.getListClient(this.dataMaestra.companyClient.id).then(data => this.clientList = data);
    this.clientList = this.clientList.map((divition: any) => {
        return {
          ...divition,
          displayLabel: divition.firstName + ' ' + divition.firstLastName,
        };
      });

    this.cols = [
        {field: 'name', header: 'Name'},
        {field: 'price', header: 'Price'},
        {field: 'category', header: 'Category'},
        {field: 'rating', header: 'Reviews'},
        {field: 'inventoryStatus', header: 'Status'}
    ];

    this.statuses = [
        {label: 'INSTOCK', value: 'instock'},
        {label: 'LOWSTOCK', value: 'lowstock'},
        {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}
body: any[] = []; 
driver_id?: any = -1 ;
date_start: Date = new Date();
start_time: string = '00:00';
date_finist: Date = new Date();
finish_time: string = '23:59:59';
lst_company: Company[] = [];
lst_clients: Client[] = [];
company_id?: number = -1;
structServiceArray: any = StructService.ARRAY;
routeServiceDriverList: any = RouteService.maintenanceAutocompleteDriversGet;
initDriver: string = '';
driver: Driver[] = [];
jsonSearchDriver: any = {
  key_word: '',
  page: 1,
  page_size: 15
}
async getListService() {
    await this.reporteService.GetServiceCard(this.getJsonRequest()).then((data: any) => this.body = data.results);
}
onchangeDriver($event: Driver){
    console.log($event);
    if($event) {
      this.driver_id = $event.id;
    } else {
      this.driver_id = -1;
    }
  }
getJsonRequest(): any {
    return {
      page: 1,
      page_size: 10,
      company_id: this.dataMaestra.companyClient.id,
      client_id: this.user_id.id ? this.user_id.id : -1 ,
      driver_id: (this.driver_id) ? this.driver_id : -1,
      date_start: fnServiceDateSend(this.date_start),
      date_finish: fnServiceDateSend(this.date_finist),
    }
  }

}

