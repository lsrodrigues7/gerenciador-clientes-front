import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogClienteAtualizarComponent } from '../dialog-cliente-atualizar/dialog-cliente-atualizar.component';
import { DialogClienteComponent } from '../dialog-cliente/dialog-cliente.component';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers:[ClienteService]
})
export class ClienteComponent implements OnInit {

  inputNomeCliente!: string;
  inputTelefoneCliente!: string;
  inputCpfCnpjCliente!: string;
  inputDescricaoCidade!: string;

  displayedColumns: string[] = [
    'codigoCliente',
    'nomeCliente',
    'cpfCnpjCliente',
    'telefoneCliente',
    'emailCliente',
    'enderecoCliente',
    'bairroCliente',
    'numeroCliente',
    'descricaoCidade',
    'cepCliente',
    'select',
   ];

   
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(  
     private clienteService: ClienteService,
     private _dialog: MatDialog,
    
    ) { }

  ngOnInit(): void {
    this.listarAtivos();
  }

  pesquisar() {
    var params = new HttpParams();
    // console.log(this.inputNomeCliente)
  
      if(this.inputNomeCliente){
        params = params.set(
          'nomeCliente',
          this.inputNomeCliente
        );
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.clienteService.listarNomeCliente(params).subscribe((data) => {
          // console.log(data);
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
        },
          (error) => {
            this.clienteService.mensagem("Erro na pesquisa!");
          });
            
      
      } else {
          this.listarAtivos();
        }
    

  }

  clientes!: Cliente[];

   model: Cliente = {
    codigoCliente: 0,
    codigoCidade: 0,
    nomeCliente: '',
    enderecoCliente: '',
    bairroCliente: '',
    emailCliente: '',
    descricaoCidade: '',
    numeroCliente: '',
    cepCliente: '',
    cpfCnpjCliente: '',
    telefoneCliente: '',
   };


  listarAtivos(){
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
   this.clienteService.listarAtivos().subscribe((data) => {
      // console.log(data);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      // this.loading = false;
    });
  }


  cadastrarCliente(): void {
    const dialogRef = this._dialog.open(DialogClienteComponent, {
      height: '740px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if(data){
      if (data.codigo === 1) {
        this.clienteService.mensagem(data.mensagem);
        this.listarAtivos();
      } else {
        if(data.codigo === 99){
        this.clienteService.mensagem(data.mensagem);
        this.listarAtivos();
        }else{
        this.clienteService.mensagem(data.mensagem);
        this.listarAtivos();
        }
      }
    }
    });
  }

  remover(element) {
    // console.log(element);
    this.clienteService.removerCliente(element.codigoCliente).subscribe(
      (data:any) => {
        // console.log(data);
        if (data) {
          if (data.codigo === 1) {
            this.clienteService.mensagem(data.mensagem);
            this.listarAtivos();
          } else {
            if(data.codigo === 99){
            this.clienteService.mensagem(data.mensagem);
            this.listarAtivos();
            }else{
            this.clienteService.mensagem(data.mensagem);
            this.listarAtivos();
            }
          }
        }
      },
    );
  }

  atualizar(element) {
    const dialogRef = this._dialog.open(DialogClienteAtualizarComponent, {
      height: '740px',
      width: '450px',
      data: {codigoCliente: element.codigoCliente,  
        nomeCliente: element.nomeCliente, enderecoCliente: element.enderecoCliente, bairroCliente: element.bairroCliente, 
        codigoCidade: element.codigoCidade, descricaoCidade: element.descricaoCidade, emailCliente: element.emailCliente, 
        cpfCnpjCliente: element.cpfCnpjCliente, numeroCliente: element.numeroCliente, cepCliente: element.cepCliente, 
        telefoneCliente: element.telefoneCliente, situacaoCliente: element.situacaoCliente, },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if(data){
      if (data.codigo === 1) {
        this.clienteService.mensagem(data.mensagem);
        this.listarAtivos();
      } else {
        if(data.codigo === 99){
        this.clienteService.mensagem(data.mensagem);
        this.listarAtivos();
        }else{
        this.clienteService.mensagem(data.mensagem);
        this.listarAtivos();
        }
      }
    }
    });
}
}
