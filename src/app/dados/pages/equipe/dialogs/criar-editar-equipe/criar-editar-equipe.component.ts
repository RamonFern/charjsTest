import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { EquipeResponse } from 'src/app/models/EquipeRequest';

@Component({
  selector: 'app-criar-editar-equipe',
  templateUrl: './criar-editar-equipe.component.html',
  styleUrls: ['./criar-editar-equipe.component.css']
})
export class CriarEditarEquipeComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: { equipe: EquipeResponse, agentes: AgenteUser[] },) { }

  ngOnInit() {
    console.log(this.data);
  }

}
