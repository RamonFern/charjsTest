import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContatoComponent } from "./pages/contato/contato.component";
import { EnderecoComponent } from "./pages/endereco/endereco.component";
import { EquipeComponent } from "./pages/equipe/equipe.component";


const routes: Routes = [
  {
      path: 'dados/endereco',
      component: EnderecoComponent,
      // canActivate: [AuthGuard],
      // data: {
      //     permissao: PermissaoType.ACESSO_PAGINA_FATURAMENTO,
      // },
  },
  {
      path: 'dados/contato',
      component: ContatoComponent,
      // canActivate: [AuthGuard],
      // data: {
      //     permissao: PermissaoType.ACESSO_PAGINA_REPASSE,
      // },
  },
  {
    path: 'dados/equipe',
    component: EquipeComponent,
    // canActivate: [AuthGuard],
    // data: {
    //     permissao: PermissaoType.ACESSO_PAGINA_REPASSE,
    // },
}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DadosRoutingModule { }
