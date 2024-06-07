import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from '../../projects/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  add() {}

  get() : Observable<IProject[]> {
    return this.http.get<IProject[]>("/api/projects")
  }
}
