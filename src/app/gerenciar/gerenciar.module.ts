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
import { RelatorioDiarioVtrComponent } from './pages/relatorio-diario-vtr/relatorio-diario-vtr.component';
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { GraficoVeiculoComponent } from './pages/grafico-veiculo/grafico-veiculo.component';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



@NgModule({
  declarations: [
    RelatorioGeralHorasComponent,
    RelatorioDiarioVtrComponent,
    GraficoVeiculoComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatCardModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule

  ]
})

export class GerenciarModule {}
