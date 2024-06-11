import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuthenticated: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    )
  {
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
