import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService, Paciente } from '../../services/paciente.service';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  pacientes: Paciente[] = [];
  // ✅ ATUALIZADO: Usando os campos 'email' e 'dataNascimento' para corresponder ao back-end
  novoPaciente: Paciente = { nome: '', email: '', telefone: '', dataNascimento: '' };
  editando: boolean = false;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.listarPacientes();
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(p => this.pacientes = p);
  }

  salvarPaciente() {
    if (this.editando) {
      this.pacienteService.atualizar(this.novoPaciente).subscribe(() => {
        this.listarPacientes();
        this.cancelar();
      });
    } else {
      this.pacienteService.cadastrar(this.novoPaciente).subscribe(() => {
        this.listarPacientes();
        this.novoPaciente = { nome: '', email: '', telefone: '', dataNascimento: '' };
      });
    }
  }

  editarPaciente(p: Paciente) {
    this.novoPaciente = { ...p };
    this.editando = true;
  }

  deletarPaciente(id?: number) {
    if (id) this.pacienteService.deletar(id).subscribe(() => this.listarPacientes());
  }

  cancelar() {
    this.editando = false;
    this.novoPaciente = { nome: '', email: '', telefone: '', dataNascimento: '' };
  }

  // ✅ NOVO: Função para calcular a idade a partir da data de nascimento
 calcularIdade(dataNascimento: string | undefined): number {
    // Se a data de nascimento for undefined, nula ou vazia, retorne 0
    if (!dataNascimento) {
      return 0;
    }
    
    const hoje = new Date();
    const dataNasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const m = hoje.getMonth() - dataNasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }
    return idade;
  }
}