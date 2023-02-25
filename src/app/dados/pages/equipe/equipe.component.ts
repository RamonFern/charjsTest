import { EquipeService } from './../../../services/equipe.service';
import { Component, OnInit } from '@angular/core';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquipeRequest, EquipeResponse } from 'src/app/models/EquipeRequest';
import { take } from 'rxjs';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  add = false;
  equipes: EquipeResponse[] = [];

  equipeForm = new FormGroup({
    nomeEquipe: new FormControl('', Validators.required),
    id_agentes: new FormControl('', Validators.required)
  })
  constructor(private equipeService: EquipeService) { }

  ngOnInit() {
    this.buscarTodos();
  }

  salvarEquipe() {
    const request: EquipeRequest = {
      nomeEquipe: this.equipeForm.controls['nomeEquipe'].value,
      id_agentes: this.equipeForm.controls['id_agentes'].value,
    };

    console.log(request);
    this.equipeService.criarEquipe(request)
        .pipe(take(1))
        .subscribe((equipe) => {
          console.log(equipe);
          this.limparCampos();
          this.add = false;
          this.buscarTodos();
        })
  }

  buscarTodos() {
    this.equipeService.listar()
        .pipe(take(1))
        .subscribe((data) => {
          this.equipes = data
        })
  }

  addAgente() {
    this.add = true;
  }

  limparCampos() {
    this.equipeForm.reset();
    this.add = false;
  }

}
