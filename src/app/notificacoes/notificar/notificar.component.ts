import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith, take } from 'rxjs';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { DadosVeiculo } from 'src/app/models/veiculo-inf';
import { CodigosInfraService, TabCodigos } from 'src/app/services/codigos-infra.service';

@Component({
  selector: 'app-notificar',
  templateUrl: './notificar.component.html',
  styleUrls: ['./notificar.component.css']
})
export class NotificarComponent implements OnInit {
  codCtrl = new FormControl('');
  formPlaca = new FormGroup({
    placa: new FormControl('', Validators.required),
  })
  formMarcaModeloEsp = new FormGroup({
    marcaModelo: new FormControl('', Validators.required),
    especie: new FormControl('', Validators.required)
  })
  filteredCods: Observable<TabCodigos[]>;
  dadosVeiculo!: DadosVeiculo | any;

  codigos: TabCodigos[] = []

  spinner = false;
  constructor(private veiculoService: VeiculoService, private cod: CodigosInfraService) {
    this.filteredCods = this.codCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this.filterStates(state) : this.codigos.slice())),
    );
  }

  ngOnInit() {
    this.buscarCodigos();
    console.log(this.codigos.length);
  }

  buscarCodigos() {
    this.codigos = this.cod.getAllCodigos();

  }

  buscarInformacao() {
    this.spinner = true;
    const placa = { placa: this.formPlaca.controls['placa'].value };
    this.veiculoService.solicitar(placa)
        .pipe(take(1))
        .subscribe((veiculo: DadosVeiculo) => {
          this.dadosVeiculo = veiculo;
          this.preencherValores();
          // console.log(this.dadosVeiculo);
          this.spinner = false;
        })
  }

  preencherValores() {
    const marcamodelo = `${this.dadosVeiculo.response.MARCA}, ${this.dadosVeiculo.response.MODELO}, ${this.dadosVeiculo.response.cor}`;
    this.formMarcaModeloEsp.controls['marcaModelo'].setValue(marcamodelo);
    this.formMarcaModeloEsp.controls['especie'].setValue('passageiro');
  }

  private filterStates(value: string): TabCodigos[] {
    const filterValue = value.toLowerCase();

    return this.codigos.filter(state => state.codDescricao.toLowerCase().includes(filterValue));
  }

}



