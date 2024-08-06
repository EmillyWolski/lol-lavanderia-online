import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaFuncionario } from '../../shared/models/pessoa-funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaFuncionarioService {
  private apiUrl = 'http://localhost:8080/funcionarios'; 

  constructor(private http: HttpClient) {}

  listarFuncionarios(): Observable<PessoaFuncionario[]> {
    return this.http.get<PessoaFuncionario[]>(this.apiUrl);
  }

  cadastrarFuncionario(funcionario: PessoaFuncionario): Observable<any> {
    return this.http.post(this.apiUrl, funcionario);
  }

  buscarPorId(id: number): Observable<PessoaFuncionario> {
    return this.http.get<PessoaFuncionario>(`${this.apiUrl}/${id}`);
  }

  editarFuncionario(funcionario: PessoaFuncionario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${funcionario.id}`, funcionario);
  }

  removerFuncionario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
