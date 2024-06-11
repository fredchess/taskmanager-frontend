import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated : boolean = false

  constructor(private http: HttpClient) { }

  login(email: string, password: string) : Observable<any> {
    return this.http.post("/api/auth/login?useCookies=true", 
      {
        email: email,
        password: password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      }
    )
  }

  register(email: string, password: string) {
    return this.http.post("/api/auth/register", 
      {
        email: email,
        password: password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      }
    )
  }

  getIsAuthenticated() : Observable<IUser> {
    return this.http.get<IUser>('/api/auth/manage/info', {withCredentials: true})
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }
}
