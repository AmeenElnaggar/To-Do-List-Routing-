import { Component, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { RouterLink } from '@angular/router';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  order = input<string>();
  userTasks = input.required<Task[]>();
}
