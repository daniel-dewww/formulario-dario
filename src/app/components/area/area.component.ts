import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/demo/domain/product';
import {ProductService} from 'src/app/demo/service/productservice';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {BreadcrumbService} from 'src/app/breadcrumb.service';
import { Masterdowload } from 'src/app/class/masterdowload';
import { Subscription } from 'rxjs';
import { CoreObservableService } from 'src/app/service/core-observable.service';
import { Area } from './area.class';
@Component({
    templateUrl: 'area.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['area.component.scss']
})
export class AreaComponent implements OnInit {

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Area[];

    product: Area;

    area: Area = new Area();

    selectedProducts: Area[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];
    body: any[] = [];
    flagSpinner: boolean = false;
    page: number = 1;
    page_size: number = 10;
    idCompany?: string = "1";
    total_records: number = 0;
    //#region  Suscription Maestro
    coreObservableSubscription: Subscription  | undefined;
    dataMaestra: Masterdowload = new Masterdowload();
    selectedDrop?: any;
    constructor(
      private productService: ProductService, 
      private messageService: MessageService,
      private confirmationService: ConfirmationService, 
      private breadcrumbService: BreadcrumbService,
      private _coreObservable: CoreObservableService ,

      ) {
        this.breadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'area', routerLink: ['/core/area'] }
        ]);
        this._coreObservable.masterdownload$.subscribe(
          (dataMaster: Masterdowload) => {
            this.dataMaestra = dataMaster;
          }
        );
    }
    
 
    async ngOnInit() {

        await this.getListArea();

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'Description', header: 'Description'},
            {field: 'ID Area asociado', header: 'ID Area asociado'},
            {field: 'Area asociado', header: 'Area asociado'},
            {field: 'Estado', header: 'Estado'}
        ];

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }

    private async getListArea() {

     let req = {
     company_id : this.dataMaestra.companyClient.id
    }
     await this.productService.getProducts(req).then(data => this.products = data); 
     }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Area) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: Area) {
        this.deleteProductDialog = true;
        this.product = {...product};
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

   async confirmDelete(){
       debugger
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        // Delete
        if (this.product.id) {
            let da : any;
            let areaId:any; 
            let idCompany;
            idCompany = this.dataMaestra.companyClient.id;
            areaId = this.product.id;
            let jsonRequest  = {
              company_id: idCompany,
              area_id: areaId,
              area: this.product
            }
             da = await this.productService.deleteArea(jsonRequest).then(data => this.products = data);
             this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            this.product = {};
            await this.getListArea()
        }
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    response : any 
        async saveProduct() {
            debugger
        this.submitted = true;
        if (this.product.name.trim()) {
            if (this.product.area) {
                let da : any;
                let areaId:any; 
                let idCompany;
                idCompany = this.dataMaestra.companyClient.id;
                areaId = this.product.id;
                let jsonRequest  = {
                  company_id: idCompany,
                  area_id: areaId,
                  area: this.product
                }
                 da = await this.productService.updateArea(jsonRequest).then(data => this.products = data);
                 this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                await this.getListArea()
                
            } 
            else 
            {
                let da : any;
                let areaId:any; 
                let idCompany;
                idCompany = this.dataMaestra.companyClient.id;
                areaId = this.product.id;
                let jsonRequest  = {
                  company_id: idCompany,
                  area_id: areaId,
                  area: this.product
                }
                 da = await this.productService.saveArea(jsonRequest).then(data => this.products = data);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
                await this.getListArea()
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}