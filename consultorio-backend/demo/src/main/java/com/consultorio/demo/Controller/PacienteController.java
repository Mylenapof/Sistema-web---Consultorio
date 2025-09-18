package com.consultorio.demo.Controller;


import com.consultorio.demo.Model.Paciente;
import com.consultorio.demo.Repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "http://localhost:4200") // Permite requisições do Angular (que roda na porta 4200)
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    public List<Paciente> getAllPacientes() {
        return pacienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> getPacienteById(@PathVariable Long id) {
        return pacienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Paciente createPaciente(@RequestBody Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paciente> updatePaciente(@PathVariable Long id, @RequestBody Paciente pacienteDetails) {
        return pacienteRepository.findById(id)
                .map(paciente -> {
                    paciente.setNome(pacienteDetails.getNome());
                    paciente.setEmail(pacienteDetails.getEmail());
                    paciente.setTelefone(pacienteDetails.getTelefone());
                    paciente.setDataNascimento(pacienteDetails.getDataNascimento());
                    Paciente updatedPaciente = pacienteRepository.save(paciente);
                    return ResponseEntity.ok(updatedPaciente);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePaciente(@PathVariable Long id) {
        return pacienteRepository.findById(id)
                .map(paciente -> {
                    pacienteRepository.delete(paciente);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}