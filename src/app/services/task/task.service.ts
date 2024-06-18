import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProjectTask } from '../../tasks/task.model';
import { Observable } from 'rxjs';
import { IPaginated } from '../../pagination/paginated.model';
import { IBaseResponse } from '../../app.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getByProjectId(projectId: string, params: any = {}) : Observable<IBaseResponse<IPaginated<IProjectTask>>> {
    return this.http.get<IBaseResponse<IPaginated<IProjectTask>>>("/api/projects/" + projectId + "/tasks", {
      params: params,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }

  add(task: IProjectTask) : Observable<IBaseResponse<IProjectTask>> {
    return this.http.post<IBaseResponse<IProjectTask>>("/api/tasks/", task, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      withCredentials: true
    })
  }

  delete(task: IProjectTask) : Observable<IProjectTask> {
    return this.http.delete<IProjectTask>("/api/tasks/" + task.id + "/", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      withCredentials: true
    })
  }

  complete(task: IProjectTask) : Observable<IProjectTask> {
    return this.http.put<IProjectTask>("/api/tasks/" + task.id, {
      ...task,
      status: 2
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      withCredentials: true
    })
  }

  update(task: IProjectTask) : Observable<any> {
    return this.http.put("/api/tasks/" + task.id + "/", task, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      withCredentials: true
    })
  }
}
