import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { routes as userRoutes } from './users/users.routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { resolveUserName } from './users/users.service';
import { inject } from '@angular/core';

export const authorizedFn: CanMatchFn = (route, segements) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 1) return true;
  return new RedirectCommand(router.parseUrl('/unAutorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    resolve: { userName: resolveUserName },
    canMatch: [authorizedFn],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
