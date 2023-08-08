import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotificarComponent } from "./notificar/notificar.component";


const routes: Routes = [
  {
      path: 'notificacoes/notificar',
      component: NotificarComponent,
      // canActivate: [AuthGuard],
      // data: {
      //     permissao: PermissaoType.ACESSO_PAGINA_FATURAMENTO,
      // },
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacoesRoutingModule { }
