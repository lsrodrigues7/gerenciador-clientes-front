import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogClienteComponent } from '../dialog-cliente/dialog-cliente.component';
import { CidadeModel } from '../models/cidade.model';
import { Cliente } from '../models/cliente.model';
import { CidadeService } from '../services/cidade.service';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-dialog-cliente-atualizar',
  templateUrl: './dialog-cliente-atualizar.component.html',
  styleUrls: ['./dialog-cliente-atualizar.component.css']
})
export class DialogClienteAtualizarComponent implements OnInit {

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
    @Inject(MAT_DIALOG_DATA) public data: { codigoCliente: number,  
      nomeCliente: string, enderecoCliente: string, bairroCliente: string, 
      codigoCidade: number, descricaoCidade: string, emailCliente:string, 
      cpfCnpjCliente: string, numeroCliente: string, cepCliente: string, 
      telefoneCliente: string, situacaoCliente: string,}) { }




  ngOnInit(): void {
    this.model.codigoCliente = this.data.codigoCliente;
    this.model.nomeCliente =  this.data.nomeCliente;
    this.model.enderecoCliente =  this.data.enderecoCliente;
    this.model.bairroCliente =  this.data.bairroCliente;
    this.model.codigoCidade =  this.data.codigoCidade;
    this.model.descricaoCidade =  this.data.descricaoCidade;
    this.model.emailCliente =  this.data.emailCliente;
    this.model.cpfCnpjCliente =  this.data.cpfCnpjCliente;
    this.model.numeroCliente =  this.data.numeroCliente;
    this.model.cepCliente =  this.data.cepCliente;
    this.model.telefoneCliente =  this.data.telefoneCliente;
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





  validaAtualizar(){

    if(this.model){
      if(this.model.nomeCliente){
        if(this.model.cpfCnpjCliente){
          this.atualizar();
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

  atualizar() {
    this.service.atualizar(this.model).subscribe(
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
              let find: any = data;
              find = data.find(item => item.codigoCidade == this.model.codigoCidade);
              if(find != undefined){
              this.cidade = find;
              this.model.codigoCidade = this.cidade.codigoCidade;
              this.nome = this.cidade.descricaoCidade;
              }
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

