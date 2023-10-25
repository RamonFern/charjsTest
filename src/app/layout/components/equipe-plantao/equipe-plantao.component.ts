import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AgenteUser } from 'src/app/models/AgenteUser';
import { EscalaServicoResponse } from 'src/app/models/escala-servico';
import { AgenteService } from 'src/app/services/agente.service';


@Component({
  selector: 'app-equipe-plantao',
  templateUrl: './equipe-plantao.component.html',
  styleUrls: ['./equipe-plantao.component.css']
})
export class EquipePlantaoComponent implements OnInit {

  @Input() escalaResponse!: EscalaServicoResponse;

  agentes: AgenteUser[] = [];
  agentesDePlantao: AgenteUser[] = [];

  constructor(private agenteService: AgenteService) { }

  ngOnInit(): void {
    // console.log(this.escalaResponse);
    this.listarAgenteDaEscala();
  }

  listarAgenteDaEscala() {
    this.agenteService.listar()
        .pipe(take(1))
        .subscribe((a) => {
          this.agentes = a;
          this.agentes.filter((ag) => {
            ag.equipe_id === this.escalaResponse.equipeid ? this.agentesDePlantao.push(ag) : null
          })
        })
  }

}
