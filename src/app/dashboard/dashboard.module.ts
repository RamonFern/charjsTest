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
import { MatCardModule } from '@angular/material/card';
import { EditarEscalaComponent } from './dialogs/editar-escala/editar-escala.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [
        DashboardComponent,
        CriarEscalaComponent,
        DiaComponent,
        EquipePlantaoComponent,
        EditarEscalaComponent
    ],
    providers: [],
    imports: [
        BrowserModule,
        MatDividerModule,
        MatIconModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatCardModule,
        MatTooltipModule,
        MatInputModule,
        MatSelectModule,
        ScrollingModule,
        MatDatepickerModule,
        MatOptionModule,
        MatButtonModule,
        // AppModule
    ]
})

export class DashboardModule {}
