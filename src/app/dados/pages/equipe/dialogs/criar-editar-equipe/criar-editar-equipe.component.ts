import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { EquipeRequest, EquipeResponse } from 'src/app/models/EquipeRequest';
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
  equipeCarregada!: EquipeResponse

  constructor(@Inject(MAT_DIALOG_DATA) public data: { equipe: EquipeResponse, agentes: AgenteUser[] },
              private equipeService: EquipeService) { }

  ngOnInit() {
    this.equipeCarregada = this.data.equipe
    console.log(this.data);
  }

  editarEquipe() {
    this.equipeForm.controls['nome'].setValue(this.data.equipe.nomeequipe);
    this.loadEquipe = !this.loadEquipe;
  }

  salvarEquipe() {
    const request: EquipeRequest = {
      nomeequipe: this.equipeForm.controls['nome'].value,
    }

    this.loadEquipe = !this.loadEquipe;
    this.equipeService.editarNomeEquipe(request, this.data.equipe.id)
                      .pipe(take(1))
                      .subscribe((equipe) => {
                        console.log(equipe)
                        this.equipeCarregada = equipe;
                      })
    // console.log(this.equipeCarregada);
  }

}
