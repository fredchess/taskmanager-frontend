import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ""
  password: string = ""
  constructor(private loginsvc: LoginService, private router: Router) {

  }

  login() {
    this.loginsvc.login(this.email, this.password).subscribe(
      {
        next: (data) => {
          this.router.navigate(['projects'])
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }
}
