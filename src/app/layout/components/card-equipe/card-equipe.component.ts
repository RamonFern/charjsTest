import { EquipeService } from 'src/app/services/equipe.service';
import { take } from 'rxjs';
import { AgenteUser } from './../../../models/AgenteUser';
import { AgenteService } from './../../../services/agente.service';
import { EquipeResponse } from './../../../models/EquipeRequest';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CriarEditarEquipeComponent } from 'src/app/dados/pages/equipe/dialogs/criar-editar-equipe/criar-editar-equipe.component';
import { DialogReturn } from 'src/app/models/dialog-return';


@Component({
  selector: 'app-card-equipe',
  templateUrl: './card-equipe.component.html',
  styleUrls: ['./card-equipe.component.css']
})
export class CardEquipeComponent implements OnInit {

  @Input() equipe!: EquipeResponse;

  agentesDaEquipe: AgenteUser[] = [];

  constructor(private agenteservice: AgenteService, private equipeService: EquipeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.buscarAgentesDaEquipe(this.equipe);
  }

  editarEquipe() {
      const dialogRef = this.dialog.open(CriarEditarEquipeComponent, {
        width: '950px',
        data: { equipe: this.equipe, agentes: this.agentesDaEquipe }
      });

      dialogRef.afterClosed().subscribe((result: DialogReturn) => {
        if (result?.hasDataChanged) {
          // this.buscarTodasEscalasServicos();
        }
    });
  }

  buscarAgentesDaEquipe(equipe: EquipeResponse) {
    equipe.membros.forEach((a) => {
      this.agentesDaEquipe.push(a);
    })
  }

  excluirEquipe(id: number) {
    this.equipeService
        .excluirEquipe(id)
        .pipe(take(1))
        .subscribe((a) => {  })
  }

}
