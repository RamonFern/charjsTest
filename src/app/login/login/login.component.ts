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
          console.log(res.token);
          console.log(this.username);
          console.log(this.password);
          this.authService.salvarToken(res.token);

          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Usuário ou senha inválidos');
        }
      });
  }
}

//     loginForm = new FormGroup({
//         login: new FormControl('', [Validators.required]),
//         password: new FormControl('', [Validators.required]),
//     });

//     loading = true;
//     username!: string;
//     password!: string;


//     constructor(
//         private authService: AuthService,
//         private router: Router
//     ) {}

//     ngOnInit(): void {
//     }

//     login(){
//       this.username = this.loginForm.controls['login'].value;
//       this.password = this.loginForm.controls['password'].value;
//       console.log("username=" + this.username + "- password=" + this.password);
//       this.authService
//           .login(this.username, this.password)
//           .pipe(take(1))
//           .subscribe(res => {

//           this.authService.salvarToken(res.token);
//           console.log(res.token);
//           this.router.navigate(['/dashboard']);

//       });
//     }



// }
