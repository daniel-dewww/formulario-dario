import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Product } from '../domain/product';
import { map } from 'rxjs/operators';

@Injectable()
export class ReporteService {

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }
    //ClientCompany

    getClientsCompany(searchJson? : any) {
        return this.http.get<any>(environment.SERVICES_URL + '/maintenance/client/corporate' + '?page=' + searchJson.page + '&page_size=' + searchJson.page_size + '&key_word='+searchJson.key_word + '&company_id=' + searchJson.company_id)
        .toPromise()
        .then(res => res as any[])
        .then(data => data as any);
    
    }

    SaveClientCompany(jsonPost?: any){
        debugger
        var response = this.http.post<any>(environment.SERVICES_URL + '/maintenance/client/corporate', jsonPost.area_body)
        .toPromise()
        .then(res => res as any)
        .then(data => data);
        return response;
    }

    EditClientCompany(jsonPatch?: any){
        //https://apocalipsis.nexusvirtual.net/backoffice/api/v1/maintenance/client/corporate
        return this.http.patch<any>(environment.SERVICES_URL + 'maintenance/client/corporate', jsonPatch.area_body)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }

    SaveNewPassword(jsonPatch?: any){
        return this.http.post<any>(environment.SERVICES_URL + 'maintenance/client/corporate/' + jsonPatch.client_id + '/password', jsonPatch)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }

    EnableClientCompany(jsonPatch?: any){
        return this.http.patch<any>(environment.SERVICES_URL + 'maintenance/client/corporate', jsonPatch)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }

    //CostCenter
    getCostCenter(searchJson? : any ) {
        return this.http.get<any>(environment.SERVICES_URL + 'maintenance/costcenter?company_id=' + searchJson.company_id)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }

    SaveCostCenter(jsonPost? : any ) {
        return this.http.post<any>(environment.SERVICES_URL + 'maintenance/costcenter', jsonPost)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }
    
    getCompanyTypeControls(companyId: number){
        return this.http.get<any>(environment.SERVICES_URL + 'maintenance/companies/' + companyId + '/dynamicfields_types')
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }
    
    getCompanyDynamicFields(companyId: number){
        return this.http.get<any>(environment.SERVICES_URL + 'maintenance/companies/' + companyId + '/dynamicfields')
        .toPromise()
        .then(res => res as any[])
        .then(data => data);  
    }

    postCompanySaveDynamicField(jsonPost: any){
        return this.http.post<any>(environment.SERVICES_URL + 'maintenance/companies/' + jsonPost.company_id + '/dynamicfields', jsonPost.dynamic)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);  
    }

    deleteCompanyDynamicField(json: any){
        return this.http.delete<any>(environment.SERVICES_URL + 'maintenance/companies/' + json.company_id + '/dynamicfields/' + json.dynamicfield_id)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);    
    }

    getCompanyTypeControlsDynamic(json: any){
        return this.http.get<any>(environment.SERVICES_URL_CLIENT + 'profile/' + json.client_id  + '/companies/' + json.company_id   + '/dynamicfields')
    }
    //End CostCenter

    //Company
    getCompany(company_id ? : any ) {
        console.log(company_id)
        return this.http.get<any>(environment.SERVICES_URL +  'maintenance/company' + '?id=' + company_id )
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }

    SaveCompany(jsonPost? : any ) {
        return this.http.post<any>(environment.SERVICES_URL + 'maintenance/costcenter', jsonPost)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }
    //End CostCenter

    exportAsXLSX(searchJson){
        debugger
        let response = this.http.get(environment.SERVICES_URL + 'reports/services/excel'
        + '?page=' + searchJson.page
        + '&page_size=' + searchJson.page_size
        + '&company_id=' + searchJson.company_id
        + '&client_id=' + searchJson.client_id
        + '&driver_id=' + searchJson.driver_id
        + '&date_start=' + searchJson.date_start
        + '&date_finish=' + searchJson.date_finish, { responseType: 'blob' }).pipe(
            map(((res: Blob) => new Blob(([res]),
            { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'})))
        );
        this.exportData(response);
    }
    exportData(data: any){
        let FileSaver = require('file-saver');
        let blob: Blob = new Blob([data]);
        let date: Date = new Date();
        FileSaver.saveAs(blob, "REPORTE_" + date.getTime() + ".xlsx");
      }
    GetService(searchJson? : any ) {
        return this.http.get<any>(environment.SERVICES_URL + 'reports/services'
        + '?page=' + searchJson.page
        + '&page_size=' + searchJson.page_size
        + '&company_id=' + searchJson.company_id
        + '&client_id=' + searchJson.client_id
        + '&driver_id=' + searchJson.driver_id
        + '&date_start=' + searchJson.date_start
        + '&date_finish=' + searchJson.date_finish)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }
    
    GetServiceCard(searchJson? : any ) {
        return this.http.get<any>(environment.SERVICES_URL_CLIENT
        + 'profile/'
        + searchJson.client_id
        + '/companies/'
        + searchJson.company_id
        +'/types/payments/cards' )
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }


    getListClient(company_id? : any ) {
        return this.http.get<any>(environment.SERVICES_URL + 'maintenance/companies/' + company_id + '/users')
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }
    saveArea(jsonPost? : any ) {
        return this.http.post<any>(environment.SERVICES_URL + 'maintenance/companies/' + jsonPost.company_id + '/area', jsonPost.area)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }
}
