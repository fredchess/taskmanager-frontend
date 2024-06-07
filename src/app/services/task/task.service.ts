import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProjectTask } from '../../tasks/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getByProjectId(projectId: number) : Observable<IProjectTask[]> {
    return this.http.get<IProjectTask[]>("/api/projects/" + projectId + "/tasks");
  }

  add(task: IProjectTask) : Observable<IProjectTask> {
    return this.http.post<IProjectTask>("/api/tasks/", task, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    })
  }

  delete(task: IProjectTask) : Observable<IProjectTask> {
    return this.http.delete<IProjectTask>("/api/tasks/" + task.id + "/", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    })
  }
}
