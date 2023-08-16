import { NgModule } from "@angular/core";
import { NotificarComponent } from "./notificar/notificar.component";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { PesquisarComponent } from "./pesquisar/pesquisar.component";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [
    NotificarComponent,
    PesquisarComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatInputModule,
    MatIconModule
  ]
})

export class NotificacoesModule {}
