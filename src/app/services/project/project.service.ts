import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject, IProjectResponse } from '../../projects/project.model';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../../app.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  add(project: IProject) : Observable<IBaseResponse<IProject>> {
    return this.http.post<IBaseResponse<IProject>>("/api/projects", project, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
  }

  get() : Observable<IProjectResponse> {
    return this.http.get<IProjectResponse>("/api/projects", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
  }

  delete(project: IProject) : Observable<IBaseResponse<string>> {
    return this.http.delete<IBaseResponse<string>>("/api/projects/" + project.id, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
  }
}
