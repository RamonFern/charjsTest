import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import pdfjsLib from 'pdfjs-dist'

export interface TabCodigos {
  cod: string;
  descricao: string;
  amparo: string;
  gravidade: string;
  valor: number;
  competencia: string;
}

@Component({
  selector: 'app-notificar',
  templateUrl: './notificar.component.html',
  styleUrls: ['./notificar.component.css']
})
export class NotificarComponent implements OnInit {
  stateCtrl = new FormControl('');
  filteredStates: Observable<TabCodigos[]>;

  codigos: TabCodigos[] = [
    {
      cod: '7480-1',
      descricao: 'Aprovar proj edificação pólo atrativo trânsito s/ anuência órgão/entid trânsito',
      amparo: '93 c/c 95, § 4º',
      gravidade: '---',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      cod: '7480-2',
      descricao: 'Aprovar proj edificação pólo atrativo trâns s/ estacion/indicação vias de acesso',
      amparo: '93 c/c 95, § 4º',
      gravidade: '',
      valor: 1,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      cod: '7528-1',
      descricao: 'Não sinalizar a execução ou manutenção da obra',
      amparo: '95, § 1º',
      gravidade: '',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    },
    {
      cod: '7528-2',
      descricao: 'Não sinalizar a execução ou manutenção do evento',
      amparo: '95, § 1º',
      gravidade: '',
      valor: 0,
      competencia: 'MUNICIPAL/RODOV',
    }
  ];

  //"/assets/images/avatarNull.png"
  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this.filterStates(state) : this.codigos.slice())),
    );
  }

  ngOnInit() {
  }

  private filterStates(value: string): TabCodigos[] {
    const filterValue = value.toLowerCase();

    return this.codigos.filter(state => state.descricao.toLowerCase().includes(filterValue));
  }

}

