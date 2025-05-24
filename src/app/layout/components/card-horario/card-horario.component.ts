import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { HorarioAgenteRequest } from 'src/app/models/horarioAgenteRequest';
import { HorarioAgenteResponse } from 'src/app/models/horarioAgenteResponse';
import { HorarioService } from 'src/app/services/horario.sevice';

@Component({
  selector: 'app-card-horario',
  templateUrl: './card-horario.component.html',
  styleUrls: ['./card-horario.component.css']
})
export class CardHorarioComponent implements OnInit {
  @Input() horariosResponse!: HorarioAgenteResponse;
  horariosAgentesForm!: FormGroup;
  editar = false;
  constructor(private horarioService: HorarioService,
              private notification: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.horariosAgentesForm = new FormGroup({
          chegada: new FormControl(this.horariosResponse.dataHoraInicio, Validators.required),
          saida: new FormControl(this.horariosResponse.dataHoraFim, Validators.required),
          atraso: new FormControl(this.horariosResponse.atraso, Validators.required),
    })
    // console.log(this.horariosResponse);
  }

  editarHora() {
    this.editar = !this.editar;
  }

  salvarEditarHorario() {
    const request: HorarioAgenteRequest = {
      agente_id: this.horariosResponse.agente.id,
      dataHoraInicio: this.horariosAgentesForm.controls['chegada'].value,
      dataHoraFim: this.horariosAgentesForm.controls['saida'].value,
      atraso: this.horariosAgentesForm.controls['atraso'].value,
      falta:  this.horariosResponse.falta,
      justificativaFalta: this.horariosResponse.justificativaFalta
    }

    this.horarioService.atualizar(request)
      .pipe(take(1))
      .subscribe((a) => {
        this.horariosResponse = a;
        this.editar = !this.editar;
        this.notification.open(`Hora atualizada com sucesso!`, 'Sucesso', { duration: 3000 });

      })
  }

  cancelar() {
    this.editar = !this.editar;
  }


}
