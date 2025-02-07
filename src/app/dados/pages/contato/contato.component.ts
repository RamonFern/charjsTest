import { AgenteUser } from './../../../models/AgenteUser';
import { AgenteService } from './../../../services/agente.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  agenteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    funcao: new FormControl('', Validators.required),
    codigo: new FormControl(0, Validators.required),
    equipe_id : new FormControl(0, Validators.required),
  })

  salvar!: boolean;
  add = false;

  agentes: AgenteUser[] = [];
  agentesSelecionados: AgenteUser[] = [];

  constructor(private agenteService: AgenteService, private form: FormBuilder) { }

  ngOnInit() {
    this.listarTodos();

  }

  salvarAgente() {
    const request: AgenteUser = {
      nome: this.agenteForm.controls['nome'].value,
      funcao: this.agenteForm.controls['funcao'].value,
      codigo: this.agenteForm.controls['codigo'].value,
      id: '',
      equipe_id: 0,
    };
    this.agenteService.adicionar(request)
        .pipe(take(1))
        .subscribe((a) => {
          // console.log(a);
          this.limparCampos();
          this.add = false;
          this.listarTodos();
        })
  }

  listarTodos() {
    this.agenteService.listar()
        .pipe(take(1))
        .subscribe((a) => {
          this.agentes = a;
          console.log(this.agentes);
        })
  }

  adicionarParaAtualizarAgente(agente: AgenteUser) {
    this.add = true;
    this.salvar = false;
    this.agenteForm = this.form.group({
      id: agente.id,
      nome: agente.nome,
      funcao: agente.funcao,
      codigo: agente.codigo,
      equipe_id: agente.equipe_id
    })
    // console.log(agente);
  }

  atualizarAgente() {
    const request: AgenteUser = {
      nome: this.agenteForm.controls['nome'].value,
      funcao: this.agenteForm.controls['funcao'].value,
      codigo: this.agenteForm.controls['codigo'].value,
      id: this.agenteForm.controls['id'].value,
      equipe_id: this.agenteForm.controls['equipe_id'].value,
    };

    this.agenteService.atualizarAgente(request, request.id)
        .pipe(take(1))
        .subscribe((a) => {
          this.limparCampos();
          this.add = false;
          this.listarTodos();
          // console.log(a);
        })
  }

  addAgente() {
    this.add = true;
    this.salvar = true;
    // console.log(this.add);
  }

  limparCampos() {
    this.agenteForm.reset();
    this.add = false;
  }

  selecionar(agente: AgenteUser) {
    this.agentesSelecionados.push(agente);
    // console.log(this.agentesSelecionados);
  }


}
