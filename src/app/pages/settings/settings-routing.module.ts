import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ProgramComplexEditComponent } from './program-complex-edit/program-complex-edit.component';

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
  },
  {
    path: "exercise-edit",
    component: ExerciseEditComponent,
  },
  {
    path: "program-complex-edit",
    component: ProgramComplexEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
