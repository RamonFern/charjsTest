import { LayoutComponent } from './layout/components/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from "./guard/auth.guard";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dados', loadChildren: () => import('./dados/dados.module').then(m => m.DadosModule) },
      { path: 'notificacoes', loadChildren: () => import('./notificacoes/notificacoes.module').then(m => m.NotificacoesModule) },
      { path: 'gerenciar', loadChildren: () => import('./gerenciar/gerenciar.module').then(m => m.GerenciarModule) }
    ]
  }
  // { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]

})
export class AppRoutingModule { }
