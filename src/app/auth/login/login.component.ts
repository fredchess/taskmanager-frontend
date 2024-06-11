import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ""
  password: string = ""
  constructor(private authService: AuthService, private router: Router) {

  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
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
