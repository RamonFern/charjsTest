import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { EquipeResponse } from 'src/app/models/EquipeRequest';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-criar-editar-equipe',
  templateUrl: './criar-editar-equipe.component.html',
  styleUrls: ['./criar-editar-equipe.component.css']
})
export class CriarEditarEquipeComponent implements OnInit {
  equipeForm = new FormGroup({
    nome: new FormControl('', Validators.required),
  })
  loadEquipe = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { equipe: EquipeResponse, agentes: AgenteUser[] },
              private equipeService: EquipeService) { }

  ngOnInit() {
    console.log(this.data);
  }

  editarEquipe() {
    //CONTINUAR AQUI EM EDITAR EQUIPE
    this.equipeForm.controls['nome'].setValue(this.data.equipe.nomeequipe);
    this.loadEquipe = !this.loadEquipe;
    console.log(this.equipeForm);
  }

}
