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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { CriarEditarEquipeComponent } from './pages/equipe/dialogs/criar-editar-equipe/criar-editar-equipe.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { NovoRelatorioComponent } from './pages/endereco/dialogs/NovoRelatorio/NovoRelatorio.component';

@NgModule({
  declarations: [
    ContatoComponent,
    EnderecoComponent,
    EquipeComponent,
    NovoRelatorioComponent,
    CardEquipeComponent,
    CriarEditarEquipeComponent

  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
    ScrollingModule,
    HttpClientModule,
    DragDropModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    MatDatepickerModule,
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
