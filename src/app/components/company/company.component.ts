import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/demo/domain/product';
import {ProductService} from 'src/app/demo/service/productservice';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {BreadcrumbService} from 'src/app/breadcrumb.service';
import { Masterdowload } from 'src/app/class/masterdowload';
import { Subscription } from 'rxjs';
import { CoreObservableService } from 'src/app/service/core-observable.service';
import { Company, DynamicField, DynamicFieldType, Elements, TypeControl } from '../company/company.class';
import { Router } from '@angular/router';
import { CostCenter } from './company.class';
import { cloneDeep } from 'lodash';
@Component({
    templateUrl: 'company.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['company.component.scss']
})
export class CompanyComponent implements OnInit {

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: any[];

    product: Company;

    selectedProducts: Company[];

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
      private router: Router,
      private confirmationService: ConfirmationService, 
      private breadcrumbService: BreadcrumbService,
      private _coreObservable: CoreObservableService ,

      ) {
        this.breadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'Company', routerLink: ['/core/company'] }
        ]);
        this._coreObservable.masterdownload$.subscribe(
          (dataMaster: Masterdowload) => {
            this.dataMaestra = dataMaster;
          }
        );
    }
    
    lstDynamicControls: DynamicFieldType[] = [];
    listDynamicField: DynamicField[] 
    async ngOnInit() {
        let req = this.dataMaestra.companyClient.id;
        await this.productService.getCompany(req).then(data => this.products = [data]);
        await this.productService.getCompanyTypeControls(this.dataMaestra.companyClient.id).then(data => this.lstDynamicControls  = data);
       
        this.cols = [
            {field: 'id', header: 'id'},
            {field: 'ruc', header: 'ruc'},
            {field: 'razonSocial', header: 'razonSocial'},
            {field: 'nombreComercial', header: 'nombreComercial'},
            {field: 'Pr-asig', header: 'Pr-asig'},
            {field: 'deuda', header: 'deuda'},
            {field: 'saldo', header: 'saldo'}
        ];

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }

    private async ListDynamicField() {
        await this.productService.getCompanyDynamicFields(this.dataMaestra.companyClient.uuid).then(data => this.listDynamicField = data);
    }

    openCostCenter(){
        this.router.navigate(['core/costcenter']);
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Company) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: Company) {
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
            debugger
        this.submitted = true;
        if (this.product.businessName.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
                let da : any 
                let req ={
                    company_id : this.dataMaestra.companyClient.id,
                    area_body :{
                        name : this.product.businessName,
                        description : this.product
                    },
                }
                 da = await this.productService.saveArea(req).then(data => this.response = data);
                 this.response
                 debugger
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
    companyId?: number;
    responseSaveDynamicField : any
    responseDeleteDynamicField : any
    async btnDelete(id: any){
        let req = { 
            company_id :  this.dataMaestra.companyClient.uuid,
            dynamicfield_id : id
        }
       await this.productService.deleteCompanyDynamicField(req).then(data => this.responseDeleteDynamicField = data);
        if (this.responseDeleteDynamicField == null) {
            this.ListDynamicField()   
        }
      }
    changeType(){
        if(this.typeControlId.id == TypeControl.CLOSED) {
          this.isClosed = true;
        } else {
          this.isClosed = false;
        }
    
        let typeControl = this.lstDynamicControls.find(dynamic => dynamic.id == this.typeControlId.id);
        if(typeControl){
          this.typeControl = typeControl;
        } else {
          this.typeControl = null!;
        }
      }
    async saveDynamicField(){
        if(this.validateRequired(true)){
          let elements: Elements[] = [];
          let element: Elements = new Elements();
          this.lstElements.forEach(obj => {
            element.code = obj;
            element.value = obj;
            elements.push(cloneDeep(element));
          })
      
          let req: DynamicField = {
            companyClient: this.dataMaestra.companyClient.id,
            description: this.description,
            isRequired: this.required,
            name: this.fieldName,
            order: 0,
            dynamicFieldType: this.typeControlId,
            values: elements ? elements : []
          }
          let requestPost = {
            company_id: this.dataMaestra.companyClient.uuid,
            dynamic: req
          }
      
          // console.log(req);
            await this.productService.postCompanySaveDynamicField(requestPost).then(data => this.responseSaveDynamicField = data);
            if(this.responseSaveDynamicField == null){
            this.ListDynamicField();
          }
        }
    }
    fieldName?: string;
    description?: string;
    typeControlId?: any = null!;
    typeControl?: DynamicFieldType;
    required: boolean = true;
    lstElements: string[] = [];
    isClosed: boolean = false;
    validateRequired(isShowToast?: boolean): boolean{
        let validate: boolean = true;
        if(!this.typeControlId){
          if(isShowToast) this.messageService.add({severity: 'warning', summary: 'Debe seleccionar el tipo de campo', detail: 'Product Created', life: 3000});
          return false;
        } else if (!this.fieldName){
            if(isShowToast) this.messageService.add({severity: 'warning', summary: 'Debe agregar el nombre del campo', detail: 'Product Created', life: 3000});
          return false;
        } else if (this.typeControlId == TypeControl.CLOSED && this.lstElements && this.lstElements.length < 2){
            if(isShowToast) this.messageService.add({severity: 'warning', summary: 'Debe agregar al menos 2 alternativas.', detail: 'Product Created', life: 3000});
          return false;
        }
        return validate;
      }
}