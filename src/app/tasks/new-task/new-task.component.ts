import { Component, inject, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private tasksService = inject(TasksService);
  private router = inject(Router);
  isSubmitted = false;
  userId = input.required<string>();

  form = new FormGroup({
    enteredTitle: new FormControl(),
    enteredSummary: new FormControl(),
    enteredDate: new FormControl(),
  });

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.form.controls.enteredTitle.value,
        summary: this.form.controls.enteredSummary.value,
        date: this.form.controls.enteredDate.value,
      },
      this.userId()
    );
    this.router.navigate(['users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });

    this.isSubmitted = true;
  }
}

export const wantToLeave: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.isSubmitted) return true;

  if (
    component.form.controls.enteredDate.value ||
    component.form.controls.enteredSummary.value ||
    component.form.controls.enteredTitle.value
  )
    return window.confirm(
      'Do You Want To Leave - You Will Lose Your Enterd Data'
    );

  return true;
};
