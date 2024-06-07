import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../login/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticated : boolean = false

  constructor(private http: HttpClient) { }

  login(email: string, password: string) : Observable<any> {
    console.log("login")
    return this.http.post("http://localhost:5237/api/auth/login?useCookies=true", 
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

  getIsAuthenticated() : Observable<IUser> {
    return this.http.get<IUser>('/api/auth/manage/info', {withCredentials: true})
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }
}
