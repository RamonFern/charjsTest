import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RelatorioGeralHorasComponent } from './pages/relatorio-geral-horas/relatorio-geral-horas.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    RelatorioGeralHorasComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule

  ]
})

export class GerenciarModule {}
