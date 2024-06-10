import { Component, Input } from '@angular/core';
import { TaskService } from '../services/task/task.service';
import { IProjectTask, ISorter } from './task.model';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { initModals } from 'flowbite';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgIf],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  tasks : IProjectTask[] = [];
  newTask : IProjectTask;
  projectId : number;
  selectedStatuses: number[] = []
  selectedPriority: number | undefined;
  @Input() sorter: ISorter

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

    this.sorter = {field: null, direction: 'asc'}
  }

  ngOnInit() {
    this.getTasks();
  }

  getStatus(status: number) : string {
    switch (status) {
      case 0:
        return "Pending"
      case 1:
        return "In progress"
      case 2:
        return "Completed"
      default:
        return "Undefined"
    }
  }

  canCompleted(task: IProjectTask) {
    if (task.status == 2 || new Date(task.dueDate) < new Date()) {
      return false
    }   

    return true
  }

  getTasks()
  {
    this.taskService.getByProjectId(this.projectId, {
      statuses: this.selectedStatuses,
      priorities: this.selectedPriority == undefined ? [] : [this.selectedPriority],
      sortby: this.sorter.field,
      sortorder: this.sorter.direction
    }).subscribe(datas => {
      this.tasks = datas

      initModals()
    })
  }

  addTask(task: IProjectTask){
    this.taskService.add(task).subscribe({
      next: data => {
        this.tasks.push(data)
  
        document.getElementById("closeModal")?.click()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  deleteTask(task: IProjectTask){
    this.taskService.delete(task).subscribe(data => {
      this.tasks = this.tasks.filter(t => t.id != task.id)
    })
  }

  completeTask(task: IProjectTask){
    this.taskService.complete(task).subscribe(data => {
      this.getTasks()
    })
  }

  toggleStatus(status: number) {
    if (this.selectedStatuses.includes(status)) {
      this.selectedStatuses = this.selectedStatuses.filter(s => s != status)
    } else {
      this.selectedStatuses.push(status)
    }
  }

  changeSort(field: string) {
    if (this.sorter.field == field) {
      if (this.sorter.direction == 'asc') {
        this.sorter.direction = 'desc'
      } else {
        this.sorter.direction = 'asc'
        this.sorter.field = null
      }
    } else {
      this.sorter.field = field
      this.sorter.direction = 'asc'
    }

    this.getTasks();
  }
}
