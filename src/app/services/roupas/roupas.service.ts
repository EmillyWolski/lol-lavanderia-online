import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Roupas } from '../../shared/models/roupas.model';

@Injectable({
  providedIn: 'root',
})
export class RoupasService {
  private readonly API = 'http://localhost:8080/roupas';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient) { }

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

  listarTodas(): Observable<Roupas[] | null> {
    return this.http.get<Roupas[]>(this.API, { headers: this.httpOptions.headers, observe: this.httpOptions.observe }).pipe(
      map((response: HttpResponse<Roupas[]>) => {
        if (response.status === 200) {
          return response.body || [];
        } else {
          return [];
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of([]);
        } else {
          return throwError(() => new Error(`Erro ao listar roupas: ${error.message}`));
        }
      })
    );
  }

  listarTodasComPrazos(): Observable<{ roupas: Roupas[], prazosMap: { [id: number]: number } } | null> {
    return this.http.get<Roupas[]>(this.API, { headers: this.httpOptions.headers, observe: this.httpOptions.observe }).pipe(
      map((response: HttpResponse<Roupas[]>) => {
        if (response.status === 200) {
          const roupas = response.body || [];
          const prazosMap: { [id: number]: number } = {};
          roupas.forEach(roupa => prazosMap[roupa.id] = roupa.prazo);
          return { roupas, prazosMap };
        } else {
          return { roupas: [], prazosMap: {} };
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of({ roupas: [], prazosMap: {} });
        } else {
          return throwError(() => new Error(`Erro ao listar roupas com prazos: ${error.message}`));
        }
      })
    );
  }

  inserir(roupa: Roupas): Observable<Roupas | null> {
    return this.http.post<Roupas>(this.API, roupa, { headers: this.httpOptions.headers, observe: this.httpOptions.observe }).pipe(
      map((response: HttpResponse<Roupas>) => {
        if (response.status === 201) {
          return response.body;
        } else {
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(`Erro ao inserir roupa: ${error.message}`));
      })
    );
  }

  buscarPorId(id: number): Observable<Roupas | null> {
    return this.http.get<Roupas>(`${this.API}/${id}`).pipe(
      map((response: Roupas) => response || null),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null);
        } else {
          return throwError(() => new Error(`Erro ao buscar roupa por ID: ${error.message}`));
        }
      })
    );
  }

  atualizar(roupa: Roupas): Observable<Roupas | null> {
    return this.http.put<Roupas>(`${this.API}/${roupa.id}`, roupa, { headers: this.httpOptions.headers, observe: this.httpOptions.observe }).pipe(
      map((response: HttpResponse<Roupas>) => {
        if (response.status === 200) {
          return response.body;
        } else {
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(`Erro ao atualizar roupa: ${error.message}`));
      })
    );
  }

  remover(id: number): Observable<void | null> {
    return this.http.delete<void>(`${this.API}/${id}`, { headers: this.httpOptions.headers, observe: this.httpOptions.observe }).pipe(
      map((response: HttpResponse<void>) => {
        if (response.status === 200) {
          return null;
        } else {
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(`Erro ao remover roupa: ${error.message}`));
      })
    );
  }
}
