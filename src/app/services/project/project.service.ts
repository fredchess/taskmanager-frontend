import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from '../../projects/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  add(project: IProject) : Observable<IProject> {
    return this.http.post<IProject>("/api/projects", project)
  }

  get() : Observable<IProject[]> {
    return this.http.get<IProject[]>("/api/projects")
  }

  delete(project: IProject) {
    return this.http.delete("/api/projects/" + project.id)
  }
}
