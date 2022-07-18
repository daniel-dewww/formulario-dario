import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Product } from '../domain/product';

@Injectable()
export class ProductService {

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

    UneableClientCompany(jsonPatch?: any){
        return this.http.patch<any>(environment.SERVICES_URL + 'maintenance/client/corporate', jsonPatch)
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


    getProducts(searchJson? : any ) {
        return this.http.get<any>(environment.SERVICES_URL + 'maintenance/companies/' + searchJson.company_id + '/area')
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
    updateArea(jsonPost? : any ) {
        return this.http.patch<any>(environment.SERVICES_URL + 'maintenance/companies/' + jsonPost.company_id + '/area/' + jsonPost.area_id, jsonPost.area)
        .toPromise()
        .then(res => res as any[])
        .then(data => data);
    }
    deleteArea(jsonPost? : any ) {
        return this.http.delete<any>(environment.SERVICES_URL + 'maintenance/companies/' + jsonPost.company_id + '/area/' + jsonPost.area_id)
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
