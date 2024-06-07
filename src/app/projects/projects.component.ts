import { Component } from '@angular/core';
import { ProjectService } from '../services/project/project.service';
import { IProject } from './project.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Modal, initModals } from 'flowbite';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: IProject[] = [];

  constructor(private projectService : ProjectService) {

  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() 
  {
    this.projectService.get().subscribe(datas => {
      this.projects = datas

      initModals()
    });
  }

  viewProject(project : IProject)
  {

  }
}
