import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CoreObservableService } from 'src/app/core/service/core-observable.service';
import { CourrentUser } from 'src/app/class/masterdowload';
import { StructService, RouteService } from 'src/app/util/serviceService/serviceStruct';
import { AccessUser, User } from 'src/app/class/user';
import { ServiceStructService } from '../util/serviceService/service-struct.service';
import { ErrorResponse } from '../class/errorResponse';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent implements OnInit, AfterViewInit {
  dark?: boolean;
  checked?: boolean;
  public loginForm: FormGroup;
  url: string = 'assets/empresas/' + environment.NAME_COMPANY + '/logo/logo-empresa-login.png';
  urlBgSigIn: string = 'assets/empresas/' + environment.NAME_COMPANY + '/img/background/bg_signIn.jpg';
  visiblePassword: boolean = false;
  typeInputPassword: string = 'password';
  formDisabled: boolean = false;
  validateLoginUser: string = environment.LOGIN

  user?: string
  password?: string
  imgLogo: string = environment.LOGO

  // FOR MESSAGE ERROR INPUT
  showErrorService: ErrorResponse;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coreObservable: CoreObservableService,
    private serviceComponent: ServiceStructService,
    private ref: ChangeDetectorRef,
    private rutaActiva: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      anexo: [null]
    });
  }


  ngOnInit() {
    this.loginForm.get("anexo")?.setValue(this.rutaActiva.snapshot.queryParamMap.get('id'));
  }

  ngAfterViewInit() {
  }
  onSubmit() {
    // this.router.navigate(['/']);
    //this.formDisabled = true;
  }

  async loginUser() {
    this.formDisabled = true;
    let loginUser: any
    var accestUser: AccessUser = {}
    let routeService: RouteService = RouteService.userLoginPost
    switch (environment.LOGIN) {
      case "NEXUS_BO":
        routeService = RouteService.userLoginPost
        accestUser = {
          name: this.user,
          password: this.password,
        }
        localStorage.setItem('valorAnexo', this.loginForm.get('anexo')?.value)
        loginUser = await this.serviceComponent.requestService(StructService.CODE, routeService, accestUser)
        break;
      case "NEXUS_CORPORATIVO":
        routeService = RouteService.userLoginPostCorporative
        accestUser = {
          deviceId: null!,
          email: this.user,
          password: this.password,
          isEncrypted: false
        }
        loginUser = await this.serviceComponent.requestService(StructService.CODE, routeService, accestUser)
        break;
      default:
        break;
    }
    if (loginUser.error) {
      this.resolverError( new ErrorResponse(loginUser.error));
        this.formDisabled = false;
    } else if ((loginUser && loginUser.uuid) || (loginUser.client && loginUser.client.id)) {
      this.registerUser(loginUser);
    } else {
      this.resolverError(loginUser.error);
        this.formDisabled = false;
    }

  }
  registerUser(loginUser: any) {
    let currentUser: CourrentUser = new CourrentUser();
    switch (environment.LOGIN) {
      case "NEXUS_BO":
        currentUser.user = loginUser.name;
        currentUser.user_uuid = loginUser.uuid;
        currentUser.anexo = this.loginForm.get('anexo')?.value
        break;
      case "NEXUS_CORPORATIVO":
        currentUser.companyId = loginUser.client.companies[0].companyId,
          currentUser.user = loginUser.client.email;
        currentUser.user_uuid = loginUser.client.id;
        currentUser.phone = loginUser.client.cellPhone
        localStorage.setItem('celular', loginUser.client.cellPhone);
        localStorage.setItem('company_id', loginUser.client.companies[0].companyId);
        break;
      default:
        break;
    }

    this.coreObservable.loginSesion(currentUser);
    this.loginForm.clearValidators();
    if (environment.LOGIN == "NEXUS_BO")
      this.router.navigate(['./core']);
    else
      this.router.navigate(['./core']);
  }
  resolverError(error : ErrorResponse  ) {
    this.showErrorService = error;
  }
    
}
