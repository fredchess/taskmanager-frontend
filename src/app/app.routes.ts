import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent, title: 'Login', canActivate: [authGuard]},
    {path: 'register', component: RegisterComponent, title: 'Register', canActivate: [authGuard]},
    {path: 'projects', component: ProjectsComponent, title: 'Projects', canActivate: [authGuard]},
    {path: 'projects/:id', component: TasksComponent, title: 'Tasks', canActivate: [authGuard]},
    {path: '**', redirectTo: 'login'},
];
