import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { ResponseModel } from '../models/response.model';
import { Cliente } from '../models/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';



const apiUrl = "http://localhost:8084/api";

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  httpMethodsUrls = {
    getAllClientes: `${apiUrl}/cliente/listarTodos`,
    listarNomeCliente: `${apiUrl}/cliente/listarNomeCliente`,

    listarAtivos: `${apiUrl}/cliente/listarAtivos`,
    cadastrarCliente: `${apiUrl}/cliente/cadastrar`,
    atualizarCliente: `${apiUrl}/cliente/atualizar`,
    removerCliente: `${apiUrl}/cliente/remover/`,
  };

  listarNomeCliente(params: HttpParams): Observable<Cliente[]> {
    // console.log("Parametros: " + params);
    return this.http
      .get<Cliente[]>(`${this.httpMethodsUrls.listarNomeCliente}`, { params })
      .pipe(catchError(this.errorHandler));
  }

  getAllClientes(): Observable<any> {
    return this.http
      .get<any>(`${this.httpMethodsUrls.getAllClientes}`,)
      .pipe(catchError(this.errorHandler));
  }

  listarAtivos(): Observable<any> {
    return this.http
      .get<any>(`${this.httpMethodsUrls.listarAtivos}`,)
      .pipe(catchError(this.errorHandler));
  }

  cadastrar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.httpMethodsUrls.cadastrarCliente, cliente);
  }

  removerCliente(cod: number): Observable<void>{
    return this.http.get<void>(`${this.httpMethodsUrls.removerCliente}`+`${cod}`);
  }

  atualizar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.httpMethodsUrls.atualizarCliente, cliente);
  }
  //, messageType: 'error' | 'success'
  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'styled',
    })
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
