import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  )
  {

  }

  register() {
    this.authService.register(this.email, this.password).subscribe({
      next: (data) => {
        localStorage.setItem("token", data)
        this.router.navigate(['/projects'])
      },
      error: err => {
        console.log('error register')
      }
    })
  }
}
