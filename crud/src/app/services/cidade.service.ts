import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { ResponseModel } from '../models/response.model';
import { CidadeModel } from '../models/cidade.model';
import { MatSnackBar } from '@angular/material/snack-bar';



const apiUrl = "http://localhost:8084/api";

@Injectable({
  providedIn: 'root',
})
export class CidadeService {
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  httpMethodsUrls = {
    getAll: `${apiUrl}/cidade/listarTodos`,
    listarCidadesAtivas: `${apiUrl}/cidade/listarAtivas`,
    cadastrar: `${apiUrl}/cidade/cadastrar`,
    atualizar: `${apiUrl}/cidade/atualizar`,
    remover: `${apiUrl}/cidade/remover/`,
  };
  getAll(): Observable<any> {  
    return this.http
      .get<any>(`${this.httpMethodsUrls.getAll}`,)
      .pipe(catchError(this.errorHandler));
  }

  listarCidadesAtivas(): Observable<any> {  
    return this.http
      .get<any>(`${this.httpMethodsUrls.listarCidadesAtivas}`,)
      .pipe(catchError(this.errorHandler));
  }

  cadastrar(cidade: CidadeModel): Observable<CidadeModel>{
    return this.http.post<CidadeModel>(this.httpMethodsUrls.cadastrar, cidade);
  }

  remover(cod: number): Observable<void>{
    return this.http.get<void>(`${this.httpMethodsUrls.remover}`+`${cod}`);
  }

  atualizar(cidade: CidadeModel): Observable<CidadeModel>{
    return this.http.post<CidadeModel>(this.httpMethodsUrls.atualizar, cidade);
  }


  
  errorHandler(e:any) {
    let errorMessage = '';
    if (e.error instanceof ErrorEvent) {
      errorMessage = e.error.message;
    } else {
      errorMessage = `Error Code: ${e.status}\nMessage: ${e.message}`;
    }
    console.log(`Error Code: ${e.status} - Message: ${e.message}`);
    return throwError(errorMessage);
  }
}
