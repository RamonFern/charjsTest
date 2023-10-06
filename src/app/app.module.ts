import { CardEquipeComponent } from './layout/components/card-equipe/card-equipe.component';
import { LayoutComponent } from './layout/components/layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from "./layout/components/menu/menu.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DadosModule } from './dados/dados.module';
import { DadosRoutingModule } from './dados/dados-routing.module';
import { DiaComponent } from './layout/components/dia/dia.component';
import { MatButtonModule } from '@angular/material/button';
import { EquipePlantaoComponent } from './layout/components/equipe-plantao/equipe-plantao.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';
import { NotificacoesRoutingModule } from './notificacoes/notificacoes-routing.module';
import { NoResultsComponent } from './layout/components/no-results/no-results.component';


@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        MenuComponent,
        NoResultsComponent
        // DashboardComponent,
        // DiaComponent,
        // EquipePlantaoComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatSlideToggleModule,
      MatIconModule,
      FormsModule,
      MatDialogModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatTooltipModule,
      MatInputModule,
      MatButtonModule,
      DadosRoutingModule,
      DashboardModule,
      DadosModule,
      NotificacoesModule,
      NotificacoesRoutingModule
    ],
    exports: [ NoResultsComponent ]

})
export class AppModule { }
