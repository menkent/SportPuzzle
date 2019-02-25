import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
  },
  {
    path: "exercise-edit",
    component: ExerciseEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
