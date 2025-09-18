import { Routes } from '@angular/router';
import { PacienteComponent } from './components/paciente/paciente.component';

export const routes: Routes = [
  { path: 'pacientes', component: PacienteComponent },
  { path: '', redirectTo: '/pacientes', pathMatch: 'full' }
];