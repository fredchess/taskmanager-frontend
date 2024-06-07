import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'projects', component: ProjectsComponent, title: 'Projects', canActivate: [authGuard]},
    {path: 'projects/:id', component: TasksComponent, title: 'Tasks', canActivate: [authGuard]},
    {path: '**', redirectTo: 'login'},
];
