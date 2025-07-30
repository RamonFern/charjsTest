import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RelatorioGeralHorasComponent } from "./pages/relatorio-geral-horas/relatorio-geral-horas.component";


const routes: Routes = [
  {
      path: 'gerenciar/relatorio-geral-horas',
      component: RelatorioGeralHorasComponent,
      // canActivate: [AuthGuard],
      // data: {
      //     permissao: PermissaoType.ACESSO_PAGINA_FATURAMENTO,
      // },
  },
  // {
  //   path: 'notificacoes/pesquisar',
  //   component: PesquisarComponent,
    // canActivate: [AuthGuard],
    // data: {
    //     permissao: PermissaoType.ACESSO_PAGINA_FATURAMENTO,
    // },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciarRoutingModule { }
