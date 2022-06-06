import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCidadeComponent } from '../dialog-cidade/dialog-cidade.component';
import { CidadeModel } from '../models/cidade.model';
import { ClienteService } from '../services/cliente.service';
import { CidadeService } from '../services/cidade.service';
import { DialogCidadeAtualizarComponent } from '../dialog-cidade-atualizar/dialog-cidade-atualizar.component';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css']
})
export class CidadeComponent implements OnInit {

  displayedColumns: string[] = [
    'codigoCidade',
    'descricaoCidade',
    'ufCidade',
    'select',
   ];

   
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(  
     private service: CidadeService,
     private clienteService: ClienteService,
     private _dialog: MatDialog,
    
    ) { }

  ngOnInit(): void {
    this.carregaTabela();
  }

  model: CidadeModel = {
    codigoCidade: 0,
    descricaoCidade: '',
    ufCidade: ''
  };

  carregaTabela(){
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
   this.service.listarCidadesAtivas().subscribe((data) => {
      // console.log(data);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      // this.loading = false;
    });
  }

  cadastrar(): void {
    const dialogRef = this._dialog.open(DialogCidadeComponent, {
      height: '310px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if(data){
      if (data.codigo === 1) {
        this.clienteService.mensagem(data.mensagem);
        this.carregaTabela();
      } else {
        if(data.codigo === 99){
        this.clienteService.mensagem(data.mensagem);
        this.carregaTabela();
        }else{
        this.clienteService.mensagem(data.mensagem);
        this.carregaTabela();
        }
      }
    }
    });
  }

  remover(element) {
    // console.log(element);
    this.service.remover(element.codigoCidade).subscribe(
      (data:any) => {
        // console.log(data);
        if (data) {
          if (data.codigo === 1) {
            this.clienteService.mensagem(data.mensagem);
            this.carregaTabela();
          } else {
            if(data.codigo === 99){
            this.clienteService.mensagem(data.mensagem);
            this.carregaTabela();
            }else{
            this.clienteService.mensagem(data.mensagem);
            this.carregaTabela();
            }
          }
        }
      },
    );
  }



  atualizar(element) {
      const dialogRef = this._dialog.open(DialogCidadeAtualizarComponent, {
        height: '310px',
        width: '450px',
        data: {codigoCidade: element.codigoCidade,  descricaoCidade: element.descricaoCidade, ufCidade: element.ufCidade },
      });
  
      dialogRef.afterClosed().subscribe((data) => {
        if(data){
        if (data.codigo === 1) {
          this.clienteService.mensagem(data.mensagem);
          this.carregaTabela();
        } else {
          if(data.codigo === 99){
          this.clienteService.mensagem(data.mensagem);
          this.carregaTabela();
          }else{
          this.clienteService.mensagem(data.mensagem);
          this.carregaTabela();
          }
        }
      }
      });
  }

}
