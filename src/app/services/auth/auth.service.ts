import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { IUser } from '../../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

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

  register(email: string, password: string) : Observable<string> {
    return this.http.post<string>("/api/auth/register", 
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

  logout() : Observable<boolean> {
    // delete cookies
    localStorage.removeItem('token')

    return of(true)
  }

  getIsAuthenticated() : Observable<IUser> {
    return this.http.get<IUser>('/api/auth/manage/info', {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }
}
