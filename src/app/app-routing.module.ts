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
    component: AppComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
        canLoad: [AuthGuard],
        data: {
          permissoes: ['ADMIN' , 'DIRETOR' , 'INSPETOR']
        }
      },
      {
        path: 'dados', loadChildren: () => import('./dados/dados.module').then(m => m.DadosModule),
        canLoad: [AuthGuard],
        data: {
          permissoes: ['ADMIN', 'DIRETOR' , 'INSPETOR']
        }
      },
      {
        path: 'notificacoes', loadChildren: () => import('./notificacoes/notificacoes.module').then(m => m.NotificacoesModule),
        canLoad: [AuthGuard],
        data: {
          permissoes: ['ADMIN']
        }
      },
      {
        path: 'gerenciar', loadChildren: () => import('./gerenciar/gerenciar.module').then(m => m.GerenciarModule),
        canLoad: [AuthGuard],
        data: {
          permissoes: ['ADMIN' , 'DIRETOR']
        }
      }
    ]
  },
  // { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]

})
export class AppRoutingModule { }
