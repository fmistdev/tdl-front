import { Routes } from '@angular/router';
import { TodoListComponent } from './features/todo-list/todo-list.component';
import { SetListComponent } from './features/set-list/set-list.component';
import { HomeComponent } from './features/home/home.component';
import { HarmonyComponent } from './features/harmony/harmony.component';
import { BlocNoteComponent } from './features/bloc-note/bloc-note.component';
import { NfcComponent } from './features/nfc/nfc.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'set-list', component: SetListComponent },
  { path: 'harmony', component: HarmonyComponent },
  { path: 'bloc-note', component: BlocNoteComponent },
  { path: 'nfc', component: NfcComponent },
];
