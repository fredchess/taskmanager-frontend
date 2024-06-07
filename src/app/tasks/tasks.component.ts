import { Component } from '@angular/core';
import { TaskService } from '../services/task/task.service';
import { IProjectTask } from './task.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { initModals } from 'flowbite';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  tasks : IProjectTask[] = [];
  newTask : IProjectTask;
  projectId : number;
  constructor(private taskService : TaskService, private route: ActivatedRoute) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.newTask = {
      id: 0,
      title: "",
      projectId: this.projectId,
      status: 0,
      description: "",
      dueDate: new Date(),
      priority: 0
    }
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks()
  {
    this.taskService.getByProjectId(this.projectId).subscribe(datas => {
      this.tasks = datas

      initModals()
    })
  }

  addTask(task: IProjectTask){
    this.taskService.add(task).subscribe(data => {
      this.tasks.push(data)

      document.getElementById("closeModal")?.click()
    })
  }

  deleteTask(task: IProjectTask){
    this.taskService.delete(task).subscribe(data => {
      this.getTasks()
    })
  }
}
