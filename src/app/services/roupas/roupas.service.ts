import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Roupas } from '../../shared/models/roupas.model';

@Injectable({
  providedIn: 'root',
})
export class RoupasService {
  private readonly API = 'http://localhost:8080/roupas';
  private httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  listarTodas(): Observable<Roupas[]> {
    return this.http.get<Roupas[]>(this.API, this.httpOptions).pipe(
      map(response => response.body as Roupas[]),
      catchError(this.handleError)
    );
  }

  listarTodasComPrazos(): Observable<{ roupas: Roupas[], prazosMap: { [id: number]: number } }> {
    return this.http.get<Roupas[]>(this.API, this.httpOptions).pipe(
      map(response => {
        const roupas = response.body as Roupas[];
        const prazosMap: { [id: number]: number } = {};
        roupas.forEach(roupa => prazosMap[roupa.id] = roupa.prazo);
        return { roupas, prazosMap };
      }),
      catchError(this.handleError)
    );
  }

  inserir(roupa: Roupas): Observable<Roupas> {
    return this.http.post<Roupas>(this.API, roupa, this.httpOptions).pipe(
      map(response => response.body as Roupas),
      catchError(this.handleError)
    );
  }

  buscarPorId(id: number): Observable<Roupas> {
    return this.http.get<Roupas>(`${this.API}/${id}`, this.httpOptions).pipe(
      map(response => response.body as Roupas),
      catchError(this.handleError)
    );
  }

  atualizar(roupa: Roupas): Observable<Roupas> {
    return this.http.put<Roupas>(`${this.API}/${roupa.id}`, roupa, this.httpOptions).pipe(
      map(response => response.body as Roupas),
      catchError(this.handleError)
    );
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`, this.httpOptions).pipe(
      map(() => undefined),
      catchError(this.handleError)
    );
  }
}
