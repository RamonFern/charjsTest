import { AgenteService } from 'src/app/services/agente.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HorarioService, ResumoHoras } from 'src/app/services/horario.sevice';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { take } from 'rxjs';

@Component({
  selector: 'app-resumo-horas',
  templateUrl: './resumo-horas.component.html',
  styleUrls: ['./resumo-horas.component.css']
})
export class ResumoHorasComponent implements OnInit {
  @Input() agenteId!: number; // O ID do agente vem da tela anterior
  dataInicio!: Date;
  dataFim!: Date;
  resumoHoras: ResumoHoras | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  agente!: AgenteUser;
  constructor(
              @Inject(MAT_DIALOG_DATA) public data: number,
              private resumoHorasService: HorarioService,
              private agenteService: AgenteService) { }

  ngOnInit(): void {
    this.agenteId = this.data;
    this.buscarHoras();
    this.buscarAgentePeloId();
  }

  buscarAgentePeloId() {
    this.agenteService
        .buscarPorId(this.agenteId)
        .pipe(take(1))
        .subscribe((a) => {
          this.agente = a;
        })
  }

  buscarHoras(): void {
    if (!this.dataInicio || !this.dataFim) {
      this.error = 'Por favor, selecione ambas as datas!';
      return;
    }

    this.isLoading = true;
    this.error = null;

    // Convertendo para o formato ISO correto
    const inicioFormatado = this.dataInicio.toISOString();
    const fimFormatado = this.dataFim.toISOString();

    console.log(this.agenteId)
    this.resumoHorasService
        .calcularHoras(this.agenteId, inicioFormatado, fimFormatado)
        .pipe(take(1))
        .subscribe((data) => {
          this.resumoHoras = data;
          this.isLoading = false;
        })
    // this.resumoHorasService.calcularHoras(this.agenteId, inicioFormatado, fimFormatado).subscribe({
    //   next: (data) => {
    //     this.resumoHoras = data;
    //     this.isLoading = false;
    //   },
    //   error: () => {
    //     this.error = 'Erro ao buscar os dados.';
    //     this.isLoading = false;
    //   }
    // });
  }

}
