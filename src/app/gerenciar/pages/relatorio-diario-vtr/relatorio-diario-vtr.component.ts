import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { take } from 'rxjs';
import { RelatorioViatura } from 'src/app/models/relatorio-viatura';
import { RelatorioViaturaService } from 'src/app/services/relatorio-viatura.service';

@Component({
  selector: 'app-relatorio-diario-vtr',
  templateUrl: './relatorio-diario-vtr.component.html',
  styleUrls: ['./relatorio-diario-vtr.component.css']
})
export class RelatorioDiarioVtrComponent implements OnInit {
  form: FormGroup;
  relatorios: RelatorioViatura[] = [];

  relatorios2: RelatorioViatura[] = [];
  displayedColumns: string[] = [
    'data', 'placa','modelo', 'motorista', 'kmInicial', 'kmFinal', 'kmRodado',
    'abastecimentoLitros', 'destino', 'finalidade', 'observacoes'
  ];

  constructor(private fb: FormBuilder, private service: RelatorioViaturaService) {
    this.form = this.fb.group({
      data: ['', Validators.required],
      horaSaida: ['', Validators.required],
      horaRetorno: ['', Validators.required],
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      motorista: ['', Validators.required],
      kmInicial: [0, Validators.required],
      kmFinal: [0, Validators.required],
      destino: ['', Validators.required],
      finalidade: ['', Validators.required],
      abastecimentoLitros: [''],
      observacoes: ['']
    });
  }

  ngOnInit() {
    this.carregarRelatorios();
  }

  carregarRelatorios() {
    this.service.listar()
    .pipe(take(1))
    .subscribe(res => this.relatorios = res);
  }



  exportarPdf() {
    this.service.exportarPdf()
    .pipe(take(1))
    .subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio-viaturas.pdf';
      a.click();
    });
  }

  salvarRelatorio() {
    if (this.form.invalid) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const rawValue = this.form.value;

    // Ajusta payload para o formato esperado no backend
    const payload = {
      ...rawValue,
      data: formatDate(rawValue.data, 'yyyy-MM-dd', 'en-US'),
      horaSaida: rawValue.horaSaida.length === 5 ? rawValue.horaSaida : rawValue.horaSaida + ':00',
      horaRetorno: rawValue.horaRetorno.length === 5 ? rawValue.horaRetorno : rawValue.horaRetorno + ':00',
    };

    this.service.salvar(payload)
    .pipe(take(1))
    .subscribe(() => {
      this.form.reset();
      this.carregarRelatorios();
    });
  }
}
