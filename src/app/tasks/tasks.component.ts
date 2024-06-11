import { Component, Input } from '@angular/core';
import { TaskService } from '../services/task/task.service';
import { IProjectTask, ISorter } from './task.model';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Modal, initModals } from 'flowbite';
import { FormsModule } from '@angular/forms';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ISimplePaginated } from '../pagination/paginated.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgIf, TaskModalComponent, PaginationComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  tasks : IProjectTask[] = [];
  newTask : IProjectTask;
  selectedTask : IProjectTask;
  projectId : number;
  selectedStatuses: number[] = []
  selectedPriority: number | undefined;
  sorter: ISorter
  modal!: Modal
  pagination!: ISimplePaginated

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

    this.selectedTask = {
      id: 0,
      title: "",
      projectId: this.projectId,
      status: 0,
      description: "",
      dueDate: new Date(),
      priority: 0
    }

    this.pagination = {
      page: 1,
      limit: 2,
      totaldata: 0
    }

    this.sorter = {field: null, direction: 'asc'}
  }

  ngOnInit() {
    this.getTasks();

    this.modal = new Modal(document.getElementById("task-modal"))
  }

  closeModal() {
    this.modal.hide()
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
      sortorder: this.sorter.direction,
      limit: this.pagination.limit,
      page: this.pagination.page
    }).subscribe(datas => {
      this.tasks = datas.datas

      this.pagination = {
        page: datas.page,
        limit: datas.limit,
        totaldata: datas.totalData
      }
    })
  }

  addTask(task: IProjectTask){
    this.tasks.push(task)
    this.modal.hide()
  }

  deleteTask(task: IProjectTask){
    this.taskService.delete(task).subscribe(data => {
      this.tasks = this.tasks.filter(t => t.id != task.id)
    })
  }

  changeTask(task: IProjectTask) {
    this.selectedTask = task
    this.modal.show()
  }

  completeTask(task: IProjectTask){
    this.taskService.complete(task).subscribe(data => {
      this.tasks.map(t => {
        if (t.id == task.id) {
          t.status = 2
        }
      })
      // this.getTasks()
    })
  }

  updateTask(task: IProjectTask) {
    this.tasks.map(t => {
      if (t.id == task.id) {
        t = task
      }
    })
    this.modal.hide()
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
