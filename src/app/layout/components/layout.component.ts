import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  urlAvatar!: string;
  currentUser: any;

  searchTxt: any;
  buscasGerais!: any[];
  logado: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.estaLogado();
  }

  estaLogado(){// adicionar em todas as telas
    this.logado = this.authService.estaLogado();
  }

}
