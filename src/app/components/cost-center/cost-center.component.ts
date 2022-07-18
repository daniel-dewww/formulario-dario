import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/demo/domain/product';
import {ProductService} from 'src/app/demo/service/productservice';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {BreadcrumbService} from 'src/app/breadcrumb.service';
import { Masterdowload } from 'src/app/class/masterdowload';
import { Subscription } from 'rxjs';
import { CoreObservableService } from 'src/app/service/core-observable.service';
import { CenterCost } from 'src/app/class/centerCost';
import { Company } from 'src/app/class/company';
import { CostCenter } from '../../demo/domain/company.class';
@Component({
    templateUrl: 'cost-center.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['cost-center.component.scss']
})
export class CostCenterComponent implements OnInit {

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: CostCenter[];

    product: CostCenter;
    
    selectedProducts: CostCenter[];

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
    costCenter: CenterCost = new CenterCost();
    company: Company = new Company();
    selectedDrop?: any;
    observableCompanySubscription: any;
    constructor(
      private productService: ProductService, 
      private messageService: MessageService,
      private confirmationService: ConfirmationService, 
      private breadcrumbService: BreadcrumbService,
      private _coreObservable: CoreObservableService ,

      ) {
        this.breadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'costcenter', routerLink: ['/core/costcenter'] }
        ]);
        this._coreObservable.masterdownload$.subscribe(
          (dataMaster: Masterdowload) => {
            this.dataMaestra = dataMaster;
          }
        );
        this._coreObservable.company$.subscribe(
          (company: Company) => {
            this.company = company;
          }
        );
        
    }
    
 
    async ngOnInit() {
        let req = {
            company_id : this.idCompany
          }
        await this.productService.getCostCenter(req).then(data => this.products = data);

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'AreaId', header: 'ID Area asociado'},
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

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = {...product};
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete(){
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    response : any 
        async saveProduct() {
            let req:any;
            let da : any 
        this.submitted = true;
        if (this.product.codeName1.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
                // this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
              let res: CostCenter = this.costCenter  
                 req ={
                  costcenter_id: this.product.id,
                  costcenter_body: res
                    }
                }
                 da = await this.productService.SaveCostCenter(req).then(data => this.response = data);
                 this.response
                // this.product.id = this.createId();
                // this.product.code = this.createId();
                // this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                // this.products.push(this.product);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    // findIndexById(id: any) {
    //     let index = -1;
    //     for (let i = 0; i < this.products.length; i++) {
    //         if (this.products[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    // createId(): string {
    //     let id = '';
    //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }
