import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RelatorioGeralHorasComponent } from "./pages/relatorio-geral-horas/relatorio-geral-horas.component";
import { RelatorioDiarioVtrComponent } from "./pages/relatorio-diario-vtr/relatorio-diario-vtr.component";
import { GraficoVeiculoComponent } from "./pages/grafico-veiculo/grafico-veiculo.component";


const routes: Routes = [
  {
      path: 'gerenciar/relatorio-geral-horas',
      component: RelatorioGeralHorasComponent,
      // canActivate: [AuthGuard],
      // data: {
      //     permissao: PermissaoType.ACESSO_PAGINA_FATURAMENTO,
      // },
  },
  {
    path: 'gerenciar/relatorio-veiculo',
    component: RelatorioDiarioVtrComponent,
    // canActivate: [AuthGuard],
    // data: {
    //     permissao: PermissaoType.ACESSO_PAGINA_FATURAMENTO,
    },
    {
    path: 'gerenciar/grafico-veiculo',
    component: GraficoVeiculoComponent,
    // canActivate: [AuthGuard],
    // data: {
    //     permissao: PermissaoType.ACESSO_PAGINA_FATURAMENTO,
    },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciarRoutingModule { }
