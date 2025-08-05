import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { HorarioService, ResumoHoras } from 'src/app/services/horario.sevice';

@Component({
  selector: 'app-relatorio-geral-horas',
  templateUrl: './relatorio-geral-horas.component.html',
  styleUrls: ['./relatorio-geral-horas.component.css']
})
export class RelatorioGeralHorasComponent implements OnInit {

  dataInicio: Date | null = null;
  dataFim: Date | null = null;
  resumoTodos: ResumoHoras[] = [];
  displayedColumns: string[] = ['nome', 'cargo', 'horas', 'faltas', 'solicitadas', 'realizadas'];
  isLoading = false;
  error: string | null = null;

  constructor(private horariosSevice: HorarioService) { }

  ngOnInit(): void {
  }

  buscarResumoTodos() {
    if (!this.dataInicio || !this.dataFim) {
      this.error = 'Por favor, selecione ambas as datas!';
      return;
    }

    this.isLoading = true;
    this.error = null;

    const dataInicioStr = this.dataInicio.toISOString().split('T')[0]; // yyyy-MM-dd
    const dataFimStr = this.dataFim.toISOString().split('T')[0];

    this.horariosSevice.calcularHorasTodos(dataInicioStr, dataFimStr)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.resumoTodos = res;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Erro ao buscar dados.';
          this.isLoading = false;
        }
      });
  }

}
