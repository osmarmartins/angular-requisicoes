import { NgModule } from '@angular/core';

import { ComumModule } from 'src/app/modules/comum/comum.module';

import { DepartamentoComponent } from './departamento.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DepartamentoComponent],
  imports: [
    ComumModule,
    ReactiveFormsModule,
  ]
})
export class DepartamentoModule { }
