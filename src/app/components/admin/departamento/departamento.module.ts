import { NgModule } from '@angular/core';

import { ComumModule } from 'src/app/modules/comum/comum.module';

import { DepartamentoComponent } from './departamento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartamentoRoutingModule } from './departamento-routing.module';

@NgModule({
  declarations: [DepartamentoComponent],
  imports: [
    ComumModule,
    ReactiveFormsModule,
    DepartamentoRoutingModule
  ]
})
export class DepartamentoModule { }
