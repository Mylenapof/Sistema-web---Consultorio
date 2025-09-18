import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Paciente {
  id?: number; 
  nome: string;
  //idade: number; 
  email?: string;
  telefone: string;
  dataNascimento?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private apiUrl = 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient) { }

  
  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  
  cadastrar(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  
  atualizar(paciente: Paciente): Observable<Paciente> {
    const url = this.apiUrl + '/' + paciente.id;
    return this.http.put<Paciente>(url, paciente);
  }

  
  deletar(id: number): Observable<any> {
    const url = this.apiUrl + '/' + id;
    return this.http.delete(url);
  }
}