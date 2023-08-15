import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CriarEscalaComponent } from "./dialogs/criar-escala/criar-escala.component";
import { BrowserModule } from "@angular/platform-browser";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { DiaComponent } from "../layout/components/dia/dia.component";
import { EquipePlantaoComponent } from "../layout/components/equipe-plantao/equipe-plantao.component";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NoResultsComponent } from "../layout/components/no-results/no-results.component";
import { EstacionamentoComponent } from './dialogs/estacionamento/estacionamento.component';
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  declarations: [
    DashboardComponent,
    CriarEscalaComponent,
    DiaComponent,
    EquipePlantaoComponent,
    NoResultsComponent,
    EstacionamentoComponent
  ],
  providers: [],
  imports: [
    BrowserModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    ScrollingModule,
    MatDatepickerModule,
    MatOptionModule,
    MatButtonModule,
  ]
})

export class DashboardModule {}
