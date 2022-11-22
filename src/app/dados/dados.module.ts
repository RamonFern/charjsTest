import { EnderecoComponent } from './pages/endereco/endereco.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ContatoComponent,
    EnderecoComponent,
  ],
  imports: [CommonModule]
})

export class DadosModule {}
