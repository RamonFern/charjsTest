import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {

  }

  login(){
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (res) => {
          this.authService.salvarToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Usuário ou senha inválidos');
        }
      });
  }
}
