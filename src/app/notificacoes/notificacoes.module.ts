import { NgModule } from "@angular/core";
import { NotificarComponent } from "./notificar/notificar.component";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { PesquisarComponent } from "./pesquisar/pesquisar.component";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from "@angular/material/divider";


@NgModule({
  declarations: [
    NotificarComponent,
    PesquisarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ]
})

export class NotificacoesModule {}
