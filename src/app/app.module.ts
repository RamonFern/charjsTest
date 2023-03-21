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

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        MenuComponent,
        DashboardComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatSlideToggleModule,
      MatIconModule,
      DadosRoutingModule,
      DadosModule
    ]
})
export class AppModule { }
