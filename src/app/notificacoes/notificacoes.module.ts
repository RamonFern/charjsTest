import { NgModule } from "@angular/core";
import { NotificarComponent } from "./notificar/notificar.component";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    NotificarComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})

export class NotificacoesModule {}
