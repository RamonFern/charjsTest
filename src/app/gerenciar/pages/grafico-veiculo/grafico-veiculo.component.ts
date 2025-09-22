import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { RelatorioViatura } from 'src/app/models/relatorio-viatura';
import { RelatorioViaturaService } from 'src/app/services/relatorio-viatura.service';
import { ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-grafico-veiculo',
  templateUrl: './grafico-veiculo.component.html',
  styleUrls: ['./grafico-veiculo.component.css']
})
export class GraficoVeiculoComponent implements OnInit {

  kmPorMes: ChartData<'bar'> = { labels: [], datasets: [{ label: 'KM Rodado', data: [] }] };
  abastecimentoPorMes: ChartData<'bar'> = { labels: [], datasets: [{ label: 'Litros Abastecidos', data: [] }] };
  relatorios: RelatorioViatura[] = [];
  constructor(private service: RelatorioViaturaService) { }

  ngOnInit(): void {
  }

  carregarRelatorios() {
    this.service.listar()
        .pipe(take(1))
        .subscribe(res => {
        this.relatorios = res;

      const kmMes: { [mes: string]: number } = {};
      const litrosMes: { [mes: string]: number } = {};

      res.forEach(r => {
        const mes = new Date(r.data).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

        kmMes[mes] = (kmMes[mes] || 0) + (r.kmRodada || 0);
        litrosMes[mes] = (litrosMes[mes] || 0) + (r.abastecimentoLitros || 0);
      });

      this.kmPorMes.labels = Object.keys(kmMes);
      this.kmPorMes.datasets[0].data = Object.values(kmMes);

      this.abastecimentoPorMes.labels = Object.keys(litrosMes);
      this.abastecimentoPorMes.datasets[0].data = Object.values(litrosMes);
    });
  }
}
