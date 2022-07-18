import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Company } from 'src/app/class/company';
import { Masterdowload } from 'src/app/class/masterdowload';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ProductService } from 'src/app/demo/service/productservice';
import { CoreObservableService } from 'src/app/service/core-observable.service';
import { CompanyClient, Credit, documentType, gender, UserModelCorporative, week } from '../client/client.class';
import { CostCenter } from '../company/company.class';

@Component({
  //selector: 'app-client-company',
  templateUrl: './client-company.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./client-company.component.scss']
})
export class ClientCompanyComponent implements OnInit {

  clientDialog: boolean;

  passwordInput: boolean;

  passwordChange: string;

  deleteClientDialog: boolean = false;

  deleteClientsDialog: boolean = false;

  clients: UserModelCorporative[];

  client: UserModelCorporative = new UserModelCorporative();

  documentType: documentType = new documentType();

  companyC: CompanyClient = new CompanyClient();

  credit: Credit = new Credit();

  gender: gender = new gender();

  week: week = new week();

  dayvalue: boolean;

  costCenters: CostCenter[];
  costCenter: CostCenter = new CostCenter();

  idCentroCosto : any;

  selectedClients: UserModelCorporative[];

  submitted: boolean;

  cols: any[];

  genders?: any[];
  documentTypes?: any[];

  profile?: any[];

  statuses: any[];

  rowsPerPageOptions = [5,10,20];
  body: any[] = [];
  flagSpinner: boolean = false;
  page: number = 1;
  page_size: number = -1;
  key_word: any = "";
  idCompany?: string = "1";
  total_records: number = 0;
  //#region  Suscription Maestro
  coreObservableSubscription: Subscription | undefined;
  dataMaestra: Masterdowload = new Masterdowload();
  clientCompany: UserModelCorporative = new UserModelCorporative();
  company: Company = new Company();
  selectedDrop?: any;
  observableCompanySubscription: any;
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService,
    private _coreObservable: CoreObservableService
  ) { 
    this.breadcrumbService.setItems([
      { label: 'Pages' },
      { label: 'clientcompany', routerLink: ['/core/clientcompany']}
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
    )
  }

  async ngOnInit() {

    await this.getClientsCompanyList();

    this.idCentroCosto = this.companyC.costcenter;

    this.cols = [
      {field: 'firstName', header: 'Nombre'},
      {field: 'firstLastName', header: 'Apellido'},
      {field: 'email', header: 'Email'},
      {field: 'credit_line', header: 'Pr.Asignado'},
      {field: 'debt', header: 'Deuda'},
      {field: 'balance', header: 'Saldo'},
      {field: 'status', header: 'Estado'}
    ]

    this.genders = [
      {label: 'Masculino', value: 9},
      {label: 'Femenino', value: 10},
      {label: 'Prefieron no decirlo', value: 11}
    ]

    this.documentTypes = [
      {label: 'DNI', value: 12},
      {label: 'PTP', value: 13},
      {label: 'Carnet de Extranjeria', value: 14},
      {label: 'Pasaporte', value: 15}
    ]

    this.profile = [
      {label: 'ADMIN CORPORATIVO', value: 'ADMIN_CORPORATIVE' },
      {label: 'CORPORATIVO', value: 'CORPORATIVE'}
    ]
  }

  private async getClientsCompanyList() {
    let req: any;
    req = {
      page: this.page,
      page_size: this.page_size,
      key_word: this.key_word,
      company_id: this.dataMaestra.companyClient.id
    };
    await this.productService.getClientsCompany(req).then(data => this.clients = data.results);
  }

  openNew() {
    
    this.costCenterList();
    this.client = {};
    this.submitted = false;
    this.clientDialog = true;
  }

  showPasswordInput(){
    this.passwordInput = ! this.passwordInput;
  }

  private costCenterList() {
    let reqCC = {
      company_id: this.dataMaestra.companyClient.id
    };
    this.productService.getCostCenter(reqCC).then(data => this.costCenters = data);
  }

  deleteSelectedClients() {
    this.deleteClientsDialog = true;
  }

  editClient(client: UserModelCorporative){
    this.client = {...client};
    this.credit.credit_line = client.company[0].credit.credit_line;
    this.documentType.id = client.documentType.id;
    this.gender.id = client.gender.id;
    this.companyC.profile = client.company[0].profile;
    this.week.L = client.company[0].credit.days.L;
    this.week.M = client.company[0].credit.days.M;
    this.week.X = client.company[0].credit.days.X;
    this.week.J = client.company[0].credit.days.J;
    this.week.V = client.company[0].credit.days.V;
    this.week.S = client.company[0].credit.days.S;
    this.week.D = client.company[0].credit.days.D;
    this.client.password! = null;
    this.costCenterList();
    this.credit.payment_date_type = client.company[0].credit.payment_date_type;
    this.clientDialog = true;
  }

  deleteClient(client: UserModelCorporative){
    this.deleteClientDialog = true;
    this.client = {...client};
  }

  async confirmDelete(){
    this.clients = this.clients.filter(val => val.id !== this.client.id);
    this.deleteClientDialog = false;
    if(this.client.id){
      let da: any;
      let req = {
        cellPhone: this.client.cellPhone,
            company: [
              {
                businessName: this.dataMaestra.companyClient.businessName,
                //costcenter: this.idCentroCosto.id!,
                credit:{
                  credit_line: this.credit.credit_line,
                  //days:{}
                  enable: this.credit.enable,
                  payment_date_type: this.credit.payment_date_type
                },
                id: this.dataMaestra.companyClient.id,
                profile: this.companyC.profile,
                tradeName: this.dataMaestra.companyClient.tradeName,
                uuid: this.dataMaestra.companyClient.uuid,
              }
            ],
            countryCode: this.client.countryCode,
            document: this.client.document,
            documentType: {
              id: this.documentType.id
            },
            email: this.client.email,
            enable: false,
            firstName: this.client.firstName,
            firstLastName: this.client.firstLastName,
            secondLastName: this.client.secondLastName,
            gender: {
              id: this.gender.id,
            },
            id: this.client.id
      }
      da = await this.productService.UneableClientCompany(req).then(data => this.response = data);
      await this.getClientsCompanyList();
    }
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Client Unabled', life: 3000});
    this.client = {};
  }

  confirmDeleteSelected(){
    this.deleteClientDialog = false;
    this.clients = this.clients.filter(val => !this.selectedClients.includes(val));
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Client Deleted', life: 3000})
    this.selectedClients = null;
  }


  hideDialog() {
    this.clientDialog = false;
    this.passwordInput = false;
    this.passwordChange = '';
    this.submitted = false;
  }

  async ChangePassword(){

    if(this.passwordChange?.length! < 8){
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Password must be at least 8 characters ', life: 4000});
    } else {
      let res: any;
      let req = {
        password : this.passwordChange,
        client_id: this.client.id
      }
      res = await this.productService.SaveNewPassword(req).then(data => this.response = data);
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Password Changed', life: 3000});
    }

  }
   
  response : any
    async saveClient(){
       let req: any;
       let da: any;
    this.submitted = true; 
    if(this.client.firstName.trim()){
      if (this.client.id){
        let da: any;
        let req = {
          area_body: {
            cellPhone: this.client.cellPhone,
            company: [
              {
                businessName: this.dataMaestra.companyClient.businessName,
                costcenter: this.idCentroCosto.id!,
                credit:{
                  credit_line: this.credit.credit_line,
                  //days:{}
                  enable: this.credit.enable,
                  payment_date_type: this.credit.payment_date_type
                },
                id: this.dataMaestra.companyClient.id,
                profile: this.companyC.profile,
                tradeName: this.dataMaestra.companyClient.tradeName,
                uuid: this.dataMaestra.companyClient.uuid,
              }
            ],
            countryCode: this.client.countryCode,
            document: this.client.document,
            documentType: {
              id: this.documentType.id
            },
            email: this.client.email,
            enable: this.client.enable,
            firstName: this.client.firstName,
            firstLastName: this.client.firstLastName,
            secondLastName: this.client.secondLastName,
            gender: {
              id: this.gender.id,
            },
            id: this.client.id
          }
        }
        da = await this.productService.EditClientCompany(req).then(data => this.response = data);
        //this.clients = [...this.clients];
          this.clientDialog = false;
          //this.client = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000});
        await this.getClientsCompanyList();

      } else {
        if(this.client.password?.length! < 8){
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Password must be at least 8 characters ', life: 4000});
          
        } else if (this.client.document?.length! < 8){
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Document must be at least 8 characters ', life: 4000});
        } else {

          let da : any;
          let req = {
            area_body : {
              firstName: this.client.firstName,
              firstLastName: this.client.firstName,
              secondLastName: this.client.secondLastName,
              countryCode: this.client.countryCode,
              cellPhone: this.client.cellPhone,
              company:[{
                businessName: this.dataMaestra.companyClient.businessName,
                costcenter: this.idCentroCosto.id,
                credit:{
                  credit_line: this.credit.credit_line,
                  days:{
                      L: this.week.L,
                      M: this.week.M,
                      X: this.week.X,
                      J: this.week.J,
                      V: this.week.V,
                      S: this.week.S,
                      D: this.week.D
                  },
                  enable: this.credit.enable,
                  payment_date_type: this.credit.payment_date_type
                },
                id: this.dataMaestra.companyClient.id,
                profile: this.companyC.profile,
                tradeName: this.dataMaestra.companyClient.tradeName,
                uuid: this.dataMaestra.companyClient.uuid,
  
              }],
              document: this.client.document,
              documentType: {
                id: this.documentType.id
              },
              gender: {
                id: this.gender.id,
              },
              email: this.client.email,
              enable: this.client.enable,
              password: this.client.password
            }
          }
          da = await this.productService.SaveClientCompany(req).then(data => this.response = data);
          //this.clients = [...this.clients];
          this.clientDialog = false;
          //this.client = {};
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Client Created', life: 3000});
          await this.getClientsCompanyList();
        }
      }
      // this.clients = [...this.clients];
      // this.clientDialog = false;
      // this.client = {};
      // await this.getClientsCompanyList();
    } 
  }
}
