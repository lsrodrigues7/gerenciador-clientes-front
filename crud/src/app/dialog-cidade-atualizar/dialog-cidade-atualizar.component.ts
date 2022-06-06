import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCidadeComponent } from '../dialog-cidade/dialog-cidade.component';
import { CidadeModel } from '../models/cidade.model';
import { CidadeService } from '../services/cidade.service';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-dialog-cidade-atualizar',
  templateUrl: './dialog-cidade-atualizar.component.html',
  styleUrls: ['./dialog-cidade-atualizar.component.css']
})
export class DialogCidadeAtualizarComponent implements OnInit {

  model: CidadeModel = {
    codigoCidade: 0,
    descricaoCidade: '',
    ufCidade: ''
  };

  constructor(public dialogRef: MatDialogRef<DialogCidadeComponent>,   
    private serviceCli: ClienteService,
    private service: CidadeService,
    @Inject(MAT_DIALOG_DATA) public data: { codigoCidade: number,descricaoCidade: string, ufCidade},) { }

    codigoCidade: number = this.data.codigoCidade;
    txtDescricaoCidade: string = this.data.descricaoCidade ;
    txtUfCidade: string = this.data.ufCidade;
  

  ngOnInit(): void {

  }


  atualizar() {
    if(this.txtDescricaoCidade){
      if (this.txtUfCidade){
        this.model.codigoCidade = this.codigoCidade;
          this.model.descricaoCidade = this.txtDescricaoCidade.toUpperCase();
          this.model.ufCidade = this.txtUfCidade.toUpperCase();
          this.service.atualizar(this.model).subscribe(
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
