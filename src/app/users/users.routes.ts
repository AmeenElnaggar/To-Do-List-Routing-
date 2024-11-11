import { Routes } from '@angular/router';

import {
  NewTaskComponent,
  wantToLeave,
} from '../tasks/new-task/new-task.component';
import { TasksComponent } from '../tasks/tasks.component';
import { resolveTitle, resolveUserTasks } from '../tasks/tasks.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
    title: resolveTitle,
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [wantToLeave],
  },
];
