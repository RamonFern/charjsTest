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

@NgModule({
  declarations: [
    ContatoComponent,
    EnderecoComponent,
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
    MatButtonModule,
    MatSelectModule
  ]
})

export class DadosModule {}
