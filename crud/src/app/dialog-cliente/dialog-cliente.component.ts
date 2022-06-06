import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConnectableObservable } from 'rxjs';
import { ClienteComponent } from '../cliente/cliente.component';
import { Cliente } from '../models/cliente.model';
import { CidadeModel } from '../models/cidade.model';
import { ClienteService } from '../services/cliente.service';
import { CidadeService } from '../services/cidade.service';


@Component({
  selector: 'app-dialog-cliente',
  templateUrl: './dialog-cliente.component.html',
  styleUrls: ['./dialog-cliente.component.css'],
  providers: [FormBuilder]
})

export class DialogClienteComponent implements OnInit {

  cidade!: CidadeModel;
  cidades!: CidadeModel[];
  cidadeStr!: string[];
  nome!: string;

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

   formCliente: any;

  

  constructor(public dialogRef: MatDialogRef<DialogClienteComponent>,   
    private service: ClienteService,
    private serviceCidade: CidadeService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.selectCidade();
    this.consultaClientes();
  }


  consultaClientes(){
    this.service.getAllClientes().subscribe((data) => {
      // console.log(data);
      if(data){
      this.clientes = data;
      }
    })
  }





  validaCadastro(){
    var nomeMinDez = this.model.nomeCliente.length;

    if(this.model){
      if(this.model.nomeCliente){
        if(this.model.cpfCnpjCliente){
          this.cadastrar();
        } else {
          this.service.mensagem("Insira o CPF ou CNPJ do cliente!");
        }
      } else{
           this.service.mensagem("Insira o nome do cliente!");
      }
    } else {
      this.service.mensagem("Verifique os campos informados!")
    }
  }

  cadastrar() {
    this.service.cadastrar(this.model).subscribe(
      (data:any) => {
        // console.log(data);
        if (data) {
            this.dialogRef.close(data);
        }
      },
    );
  }

  voltar(){
    this.dialogRef.close();
  }

  selectCidade() {
        this.serviceCidade
  .listarCidadesAtivas().subscribe((data) => {
            data ? (this.cidades = data) : null;
            if (this.cidades) {
              // console.log(data);
              this.cidadeStr = [];
              this.cidade = this.cidades[0];
              this.model.codigoCidade = this.cidade.codigoCidade;
              this.nome = this.cidade.descricaoCidade;
            }
          });
      
    }

  setCidade(event){
    this.cidade = event.value;
    if(this.cidade){
      this.model.codigoCidade = this.cidade.codigoCidade;
      this.model.descricaoCidade = this.cidade.descricaoCidade + " - " + this.cidade.ufCidade;
      this.nome = this.cidade.descricaoCidade;
      // console.log(this.model.codigo);
    }
  }

}
