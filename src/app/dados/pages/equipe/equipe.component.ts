import { AgenteService } from './../../../services/agente.service';
import { EquipeService } from './../../../services/equipe.service';
import { Component, OnInit } from '@angular/core';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquipeRequest, EquipeResponse } from 'src/app/models/EquipeRequest';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  add = false;
  equipes: EquipeResponse[] = [];
  equipeCriada!: EquipeResponse;
  agentes: AgenteUser[] = [];
  agentesSemEquipe: AgenteUser[] = [];
  agentesDaEquipe: AgenteUser[] = [];
  agentesDaEquipeRetornado: AgenteUser[] = [];

  equipeForm = new FormGroup({
    nomeequipe: new FormControl('', Validators.required),
    id_agentes: new FormControl('', Validators.required)
  })
  items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

  basket = ['Oranges', 'Bananas', 'Cucumbers'];

  constructor(private equipeService: EquipeService,
              private agenteService: AgenteService,
              private notification: MatSnackBar) { }

  ngOnInit() {
    this.buscarEquipes();
    this.listarAgentes();


  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // console.log(event.container.data)
      // console.log(event.previousContainer.data)
      // this.separarAgentesPorEquipe();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // this.separarAgentesPorEquipe();
    //   console.log(event.container.data)
    //   console.log(event.previousContainer.data)
    }
  }

  salvarEquipe() {
    const request: EquipeRequest = {
      nomeequipe: this.equipeForm.controls['nomeequipe'].value,
    };

    this.equipeService.criarEquipe(request)
        .pipe(take(1))
        .subscribe((equipe) => {
          this.equipeCriada = equipe;
          this.adicionarAgenteEmEquipe(this.equipeCriada);
        })
  }

  adicionarAgenteEmEquipe(equipe: EquipeResponse) {
    this.agentesDaEquipe.forEach((ag) => {
      if(ag.equipe_id === 0) {
        ag.equipe_id = equipe.id;
        this.atualizarAgente(ag, ag.id);
      } else {
        this.notification.open(`Agente já possui uma equipe!`, 'Erro', { duration: 3000 });
        // console.log("Agente já possui uma equipe!");
      }
    })
    this.limparCampos();
    this.add = false;
    this.agentesDaEquipe = [];
    this.buscarEquipes();
  }


  atualizarAgente(agente: AgenteUser, id: number) {
    this.agenteService.atualizarAgente(agente, id)
        .pipe(take(1))
        .subscribe((ag) => {
          ag = agente;
        })
  }

  listarAgentes() {
    this.agenteService.listar()
    .pipe(take(1))
    .subscribe((ag) => {
      this.agentes = ag;
      this.agentesSemEquipe = ag.filter((a) => a.equipe_id === 0);
    })
  }

  // listarAgentesDaEquipe(equipe: EquipeResponse) {
  //   this.agentes.filter((a) => {
  //     a.equipe_id === equipe.id ? this.agentesDaEquipeRetornado.push(a) : null
  //   })
  // }

  separarAgentesPorEquipe(equipe: EquipeResponse) {
    const ag = this.agentes.filter((a) => a.equipe_id === equipe.id)
    const nomesDosAgentes: string[] = ag.map(agente => agente.nome);
    return nomesDosAgentes;
    // console.log(nomesDosAgentes);
  }

  selecionarAgenteParaEquipe(agente: AgenteUser) {
    this.agentesDaEquipe.push(agente);
  }

  buscarEquipes() {
    this.equipeService.listar()
        .pipe(take(1))
        .subscribe((data) => {
          this.equipes = data
        })
  }

  addAgente() {
    this.add = true;
    this.agentesSemEquipe = this.agentes.filter((a) => a.equipe_id === 0);
  }

  limparCampos() {
    this.equipeForm.reset();
    this.add = false;
  }

}
