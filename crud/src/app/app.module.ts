import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './util/material.module';
import { MatCardModule } from '@angular/material/card';
import { ClienteComponent } from './cliente/cliente.component';
import { CidadeComponent } from './cidade/cidade.component';
import { SobreComponent } from './sobre/sobre.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ClienteService } from './services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogClienteComponent } from './dialog-cliente/dialog-cliente.component'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogCidadeComponent } from './dialog-cidade/dialog-cidade.component';
import { NgxMaskModule } from 'ngx-mask';
import { DialogCidadeAtualizarComponent } from './dialog-cidade-atualizar/dialog-cidade-atualizar.component';
import { DialogClienteAtualizarComponent } from './dialog-cliente-atualizar/dialog-cliente-atualizar.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    CidadeComponent,
    SobreComponent,
    DialogClienteComponent,
    DialogCidadeComponent,
    DialogCidadeAtualizarComponent,
    DialogClienteAtualizarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MaterialModule,
    MatCardModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
