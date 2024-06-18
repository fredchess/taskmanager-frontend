import { Component } from '@angular/core';
import { ProjectService } from '../services/project/project.service';
import { IProject } from './project.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Modal, initModals } from 'flowbite';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: IProject[] = [];
  newProject: IProject;

  constructor(private projectService : ProjectService) {
    this.newProject = {
      title: "",
      description: "",
      totalTasks: 0
    }
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() 
  {
    this.projectService.get().subscribe(datas => {
      this.projects = datas.data

      initModals()
    });
  }

  addProject() {
    this.projectService.add(this.newProject).subscribe({
      next: project => {
        this.projects.push(project.data)
        document.getElementById("close-modal")?.click()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  deleteProject(project: IProject) {
    this.projectService.delete(project).subscribe({
      next: () => {
        this.projects = this.projects.filter(p => p.id != project.id)
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
