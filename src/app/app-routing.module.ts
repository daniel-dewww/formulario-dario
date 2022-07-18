import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {IconsComponent} from './utilities/icons.component';

import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import { AuthenticationResolve } from './pages/authentication.resolve';
import { MaestrosResolve } from './service/maestros-resolve.service';
import { Children } from 'preact/compat';
import { AuthCoreGuard } from './core/guard/authCore.guard';
import { AreaComponent } from './components/area/area.component';
import { CostCenterComponent } from './components/cost-center/cost-center.component';
import { NewServiceComponent } from './components/modulo-servicio/new-service/new-service.component';
import { ClientCompanyComponent } from './components/client-company/client-company.component';
import { ListComponent } from './components/modulo-servicio/list/list.component';
import { CompanyComponent } from './components/company/company.component';
import { ReportServiceComponent } from './components/report/report-service/report-service/report-service.component';
import { ReportServiceCardComponent } from './components/report/report-service-card/report-service-card.component';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('../app/components/form/form.module').then(m=> m.FormModule)
  },

      ]
     
    // {
    //   path: 'authentication',
    //   resolve: {
    //     default: AuthenticationResolve
    //   },
    //   loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    // }, 
    // {
    //   path: 'view',
    //   loadChildren: () => import('./free-view/free-view.module').then(m => m.FreeViewModule)
    // }, 
    // {
    //   path: 'web-view',
    //   loadChildren: () => import('./web-view/web-view-routing.module').then(m => m.WebViewRoutingModule)
    // }, 
    // {
    //   path: '**',
    //   loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
    // }

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule {
}
// imports: [
//   RouterModule.forRoot([
//       {
//           path: '', 
//           redirectTo: 'login',
//           pathMatch: 'full',
//           children: [
//               {path: '', component: DashboardDemoComponent},
//               {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
//               {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
//               {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
//               {path: 'uikit/input', component: InputDemoComponent},
//               {path: 'uikit/button', component: ButtonDemoComponent},
//               {path: 'uikit/table', component: TableDemoComponent},
//               {path: 'uikit/list', component: ListDemoComponent},
//               {path: 'uikit/tree', component: TreeDemoComponent},
//               {path: 'uikit/panel', component: PanelsDemoComponent},
//               {path: 'uikit/overlay', component: OverlaysDemoComponent},
//               {path: 'uikit/media', component: MediaDemoComponent},
//               {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
//               {path: 'uikit/message', component: MessagesDemoComponent},
//               {path: 'uikit/misc', component: MiscDemoComponent},
//               {path: 'uikit/charts', component: ChartsDemoComponent},
//               {path: 'uikit/file', component: FileDemoComponent},
//               {path: 'utilities/icons', component: IconsComponent},
//               {path: 'pages/empty', component: EmptyDemoComponent},
//               {path: 'pages/crud', component: AppCrudComponent},
//               {path: 'pages/calendar', component: AppCalendarComponent},
//               {path: 'pages/timeline', component: AppTimelineDemoComponent},
//               {path: 'components/charts', component: ChartsDemoComponent},
//               {path: 'components/file', component: FileDemoComponent},
//               {path: 'documentation', component: DocumentationComponent},
//               {path: 'blocks', component: BlocksComponent},
//           ]
//       },
//       {path: 'error', component: AppErrorComponent},
//       {path: 'accessdenied', component: AppAccessdeniedComponent},
//       {path: 'notfound', component: AppNotfoundComponent},
//       {path: 'login', 
//           resolve: {
//           default: AuthenticationResolve
//         },
//       component: AppLoginComponent},
//       {path: '**', redirectTo: '/notfound'},
//   ], {scrollPositionRestoration: 'enabled'})
// ],
// exports: [RouterModule]