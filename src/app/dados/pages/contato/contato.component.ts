import { AgenteUser } from './../../../models/AgenteUser';
import { AgenteService } from './../../../services/agente.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  agenteForm = new FormGroup({
    nome: new FormControl(''),
    funcao: new FormControl(''),
    codigo: new FormControl(0)
  })

  agentes: AgenteUser[] = [];

  constructor(private agenteService: AgenteService) { }

  ngOnInit() {

  }

  salvarAgente() {
    const request: AgenteUser = {
      nome: this.agenteForm.controls['nome'].value,
      funcao: this.agenteForm.controls['funcao'].value,
      codigo: this.agenteForm.controls['codigo'].value,
      id: ''
    };
    this.agenteService.adicionar(request)
        .pipe(take(1))
        .subscribe((a) => {
          console.log(a);
          this.listarTodos();
        })
  }

  listarTodos() {
    this.agenteService.listar()
        .pipe(take(1))
        .subscribe((a) => {
          this.agentes = a;
        })
  }

}
