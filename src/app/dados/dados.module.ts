import { CardEquipeComponent } from './../layout/components/card-equipe/card-equipe.component';
import { EquipeComponent } from './pages/equipe/equipe.component';
import { EnderecoComponent } from './pages/endereco/endereco.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NoResultsComponent } from '../layout/components/no-results/no-results.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { CriarEditarEquipeComponent } from './pages/equipe/dialogs/criar-editar-equipe/criar-editar-equipe.component';

@NgModule({
  declarations: [
    ContatoComponent,
    EnderecoComponent,
    EquipeComponent,
    CardEquipeComponent,
    CriarEditarEquipeComponent
    // NoResultsComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCardModule,
    MatRadioModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule
  ]
})

export class DadosModule {}
