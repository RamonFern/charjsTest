import { AgenteUser } from './../../../models/AgenteUser';
import { AgenteService } from './../../../services/agente.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { pipe, take } from 'rxjs';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class EnderecoComponent implements OnInit {

  agentes: AgenteUser[] = [];
  agentesSelecionados: AgenteUser[] = [];
  agentesPermulta: AgenteUser[] = [];
  agentesDeFolga: AgenteUser[] = [];
  agentesSubstituto: AgenteUser[] = [];
  escolha!: string;

  permulta: string[] = ['sim', 'nao'];

  // range = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });

  constructor(private agenteService: AgenteService) { }

  ngOnInit() {
    this.listarAgentes();
  }

  listarAgentes() {
    this.agenteService.listar()
    .pipe(take(1))
    .subscribe((ag) => {
      this.agentes = ag;
      this.agentesDeFolga = ag;
     // console.log(this.agentes);
    })
  }

  selecionar(agente: AgenteUser) {
    this.agentesSelecionados.push(agente);
    // this.agentesDeFolga.slice(, 1);
    console.log(this.agentesDeFolga)
    console.log(this.agentesSelecionados);
  }

  selecionarPermulta(agente: AgenteUser) {
    this.agentesDeFolga.push(agente);
  }

  verificar(){
    console.log(this.escolha);
  }

}
