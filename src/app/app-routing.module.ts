import { LayoutComponent } from './layout/components/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

    children: [
        // {
        //     path: 'dashboard',
        //     component: DashboardComponent,
        //     // canActivate: [AuthGuard],
        //     // canLoad: [AuthGuard],
        //     // data: {
        //     //     permissao: PermissaoType.ACESSO_PAGINA_DASHBOARD,
        //     // },
        // },
        { path: 'dados', loadChildren: () => import('./dados/dados.module').then((m) => m.DadosModule) }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
