import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentBookComponent } from './appointment-book/appointment-book.component';
const routes: Routes = [
  {
    path:  'appointment',
    component: AppointmentBookComponent
  },
  {
    path: '',
    redirectTo: 'appointment',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
