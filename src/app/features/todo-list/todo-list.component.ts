import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Todo, isTodoNoIdList } from '../../core/model/todo.model';
import { TodoService } from '../../core/services/todo/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFileComponent } from '../../shared/input-file/input-file.component';
import { OverlayComponent } from '../../layouts/overlay/overlay.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  loadJson,
  saveAsJsonFile,
} from '../../core/services/save-file/save-file.utils';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FocusDirective } from '../../shared/focus-directive/focus.directive';
import { MenuButtonComponent } from '../../shared/menu-button/menu-button.component';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    InputFileComponent,
    OverlayComponent,
    LoaderComponent,
    FocusDirective,
    MenuButtonComponent,
    ModalComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  displayLoadFileLoader = false;

  // init form values
  editTodoId = 0;
  editTodoLabel = '';
  editTodoDueDate = '';
  editTodoIsDone = false;
  // display state
  isUpdate = false;
  displayCreateUpdate = false;
  // data
  todoList$: Observable<Todo[]>;

  displayMenu = false;

  constructor(private todoService: TodoService) {
    this.todoList$ = this.todoService.getAll();
  }

  loadJsonInputChange([firstFile]: File[]) {
    console.log(`loadJsonInputChange`);
    this.displayLoadFileLoader = true;

    if (!firstFile) return;

    loadJson(firstFile).subscribe({
      next: (jsonObject) => {
        if (isTodoNoIdList(jsonObject)) {
          this.todoService.createAll(jsonObject).subscribe();
        } else {
          console.error('Invalid JSON data');
        }
      },
      error(err) {
        // cannot parse into json
        console.error('JSON read error', err);
      },
      complete: () => {
        this.displayLoadFileLoader = false;
        console.log('JSON load complete');
      },
    });
    this.displayMenu = false;
  }

  saveJsonButton() {
    this.todoList$.pipe(take(1)).subscribe((todoList) => {
      // remove id
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const todos = todoList.map(({ id, ...rest }) => rest);

      saveAsJsonFile(todos, 'todo-list');
      this.displayMenu = false;
    });
  }

  deleteAllButton() {
    if (
      confirm('You are about to delete all the to-do items. Please confirm.')
    ) {
      this.todoService.deleteAll().subscribe();
      this.displayMenu = false;
    }
  }

  // ------------ todo list component

  addTodoButton() {
    this.resetEditValues();
    this.isUpdate = false;
    this.displayCreateUpdate = true;
  }

  toggleTodoButton(todo: Todo) {
    todo.isDone = !todo.isDone;
    this.updateTodo(todo);
  }

  editTodoButton(todo: Todo) {
    this.editTodoId = todo.id;
    this.editTodoLabel = todo.label;
    this.editTodoDueDate = todo.dueDate;
    this.editTodoIsDone = todo.isDone;

    this.isUpdate = true;
    this.displayCreateUpdate = true;
  }

  deleteTodoButton() {
    if (
      !confirm(
        `You are about to delete the to-do ${this.editTodoId}. Please confirm.`
      )
    ) {
      return;
    }

    this.todoService.delete(this.editTodoId).subscribe({
      next: () => {
        this.displayCreateUpdate = false;
      },
      error() {
        // display to the user cannot delete ...
      },
      complete() {
        console.log('deleteTodo complete');
      },
    });
  }

  // ------------ create / update component

  hideCreateUpdate() {
    this.displayCreateUpdate = false;
  }

  createUpdateTodoButton() {
    if (!this.editTodoLabel) {
      return;
    }

    const editTodo = {
      id: this.editTodoId,
      label: this.editTodoLabel,
      dueDate: this.editTodoDueDate,
      isDone: this.editTodoIsDone,
    };

    if (this.isUpdate) {
      this.updateTodo(editTodo);
    } else {
      this.createTodo(editTodo);
    }
  }

  // TODO refactor -> setEditValues
  private resetEditValues() {
    this.editTodoId = 0;
    this.editTodoLabel = '';
    this.editTodoDueDate = '';
    this.editTodoIsDone = false;
  }

  private updateTodo(todo: Todo): void {
    this.todoService.update(todo).subscribe({
      next: () => {
        this.displayCreateUpdate = false;
      },
    });
  }

  private createTodo(todo: Todo) {
    this.todoService.create(todo).subscribe({
      next: (id) => {
        console.log(`todo created - id: ${id}`);
        this.displayCreateUpdate = false;
      },
      error() {
        // display to the user cannot create ...
      },
      complete() {
        console.log('createTodo complete');
      },
    });
  }
}
