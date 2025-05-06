import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo, Priority } from '../../types/todo.types';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  @Input() set todo(value: Todo | null) {
    if (value) {
      this.editMode.set(true);
      this.todoForm.patchValue({
        title: value.title,
        description: value.description,
        dueDate: this.formatDate(value.dueDate),
        priority: value.priority,
      });
      this.editingTodoId = value.id;
    } else {
      this.resetForm();
    }
  }

  @Output() save = new EventEmitter<
    Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  >();
  @Output() update = new EventEmitter<{ id: string; updates: Partial<Todo> }>();
  @Output() cancel = new EventEmitter<void>();

  todoForm: FormGroup;
  editMode = signal(false);
  private editingTodoId: string | null = null;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['medium' as Priority],
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      const todoData = {
        ...formValue,
        dueDate: new Date(formValue.dueDate),
      };

      if (this.editMode()) {
        this.update.emit({ id: this.editingTodoId!, updates: todoData });
      } else {
        this.save.emit(todoData);
      }

      this.resetForm();
    }
  }

  onCancel(): void {
    this.resetForm();
    this.cancel.emit();
  }

  private resetForm(): void {
    this.editMode.set(false);
    this.editingTodoId = null;
    this.todoForm.reset({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
    });
  }

  private formatDate(date: Date): string {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  }
}
