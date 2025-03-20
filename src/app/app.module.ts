import { LayoutComponent } from './layout/components/layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from "./layout/components/menu/menu.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { DadosModule } from './dados/dados.module';
import { DadosRoutingModule } from './dados/dados-routing.module';
import { MatButtonModule } from '@angular/material/button';
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
import { DetalhesTamplateComponent } from './layout/components/detalhes-tamplate/detalhes-tamplate.component';
import { CardHorarioComponent } from './layout/components/card-horario/card-horario.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        MenuComponent,
        NoResultsComponent,
        DetalhesTamplateComponent,
        // CardHorarioComponent
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
      MatCardModule,
      MatDividerModule,
      MatListModule,
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
