import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { DadoResumido, Dados, DadosVeiculo } from 'src/app/models/veiculo-inf';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})

export class PesquisarComponent implements OnInit {


  dadosVeiculo!: DadosVeiculo | any;
  // dadoResumido!: DadoResumido;
  dados!: Dados;
  formPlaca = new FormGroup({
    placa: new FormControl('', Validators.required),
  })
  constructor(private veiculoService: VeiculoService) { }

  ngOnInit() {
  }

  buscarInformacao() {
    const placa = { placa: this.formPlaca.controls['placa'].value };
    this.veiculoService.solicitar(placa)
        .pipe(take(1))
        .subscribe((veiculo: DadosVeiculo) => {
          this.dadosVeiculo = veiculo;
          // this.resumirInformacoes();
          // console.log(veiculo)
          // this.formPlaca.reset();
        })
  }

  // resumirInformacoes() {
  //   this.dadoResumido.placa = this.dadosVeiculo.response.placa;
  //   this.dadoResumido.ano = this.dadosVeiculo.response.ano;
  //   this.dadoResumido.anoModelo = this.dadosVeiculo.response.anoModelo;
  //   this.dadoResumido.cor = this.dadosVeiculo.response.cor;
  //   this.dadoResumido.marca = this.dadosVeiculo.response.marca;
  //   this.dadoResumido.situacao = this.dadosVeiculo.response.situacao;
  //   this.dadoResumido.uf = this.dadosVeiculo.response.uf;
  //   this.dadoResumido.modelo = this.dadosVeiculo.response.modelo;
  // }

}
