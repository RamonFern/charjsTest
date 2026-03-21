import { LayoutComponent } from './layout/components/layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from "./layout/components/menu/menu.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { NoResultsComponent } from './layout/components/no-results/no-results.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './login/login/login.component';
import { DadosModule } from './dados/dados.module';
import { DadosRoutingModule } from './dados/dados-routing.module';
import { GerenciarRoutingModule } from './gerenciar/gerenciar-routing.module';
import { NotificacoesRoutingModule } from './notificacoes/notificacoes-routing.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';


@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        LoginComponent,
        MenuComponent,
        NoResultsComponent,
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,

      // Angular Material (ok manter)
      MatSlideToggleModule,
      MatIconModule,
      MatDialogModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatTooltipModule,
      MatCardModule,
      MatDividerModule,
      MatListModule,
      MatInputModule,
      MatButtonModule,

      // 👇 SOMENTE módulos NÃO lazy
      DashboardModule,
      GerenciarRoutingModule,
      DadosRoutingModule,
      DadosModule,
      NotificacoesRoutingModule,
      NotificacoesModule,
      LoginModule
    ],
    exports: [ NoResultsComponent ]

})
export class AppModule { }
