import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProjectTask } from '../task.model';
import { FormsModule } from '@angular/forms';
import { Modal, initModals } from 'flowbite';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  @Input() task: IProjectTask
  @Output() taskAdded = new EventEmitter <IProjectTask>()
  @Output() taskUpdated = new EventEmitter <IProjectTask>()
  @Output() closeModal = new EventEmitter <IProjectTask>()

  constructor(
    private taskService: TaskService
  ) 
  {
    this.task = {
      id: "",
      title: "",
      projectId: "",
      status: 0,
      description: "",
      dueDate: new Date(),
      priority: 0
    }
  }

  close() {
    this.closeModal.emit()
  }

  addTask() {
    this.taskService.add(this.task).subscribe({
      next: task => {
        this.taskAdded.emit(task.data)
      },
      error: err => {
        console.log(err)
      }
    })
    
  }

  updateTask() {
    this.taskService.update(this.task).subscribe({
      next: () => {
        this.taskUpdated.emit(this.task)
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
