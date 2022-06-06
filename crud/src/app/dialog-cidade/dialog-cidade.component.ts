import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CidadeModel, } from '../models/cidade.model';
import { CidadeService, } from '../services/cidade.service';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-dialog-cidade',
  templateUrl: './dialog-cidade.component.html',
  styleUrls: ['./dialog-cidade.component.css']
})
export class DialogCidadeComponent implements OnInit {

  txtDescricaoCidade!:string;
  txtUfCidade!:string;
  model: CidadeModel = {
    codigoCidade: 0,
    descricaoCidade: '',
    ufCidade: ''
  };

   formCliente: any;

  

  constructor(public dialogRef: MatDialogRef<DialogCidadeComponent>,   
    private serviceCli: ClienteService,
    private service: CidadeService) { }

  ngOnInit(): void {

  }


  cadastrar() {
    if(this.txtDescricaoCidade){
      if (this.txtUfCidade){
          this.model.descricaoCidade = this.txtDescricaoCidade.toUpperCase();
          this.model.ufCidade = this.txtUfCidade.toUpperCase();
          this.service.cadastrar(this.model).subscribe(
            (data:any) => {
              // console.log(data);
              if (data) {
                  this.dialogRef.close(data);
              }
            },
          );
      } else {
        this.serviceCli.mensagem("Digite a UF da cidade!")
      }
    } else {
      this.serviceCli.mensagem("Digite o nome da cidade!")
    }
  }

  voltar(){
    this.dialogRef.close();
  }


}
