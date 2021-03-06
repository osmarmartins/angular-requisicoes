import { Model } from './models';
import { Funcionario } from './funcionario.model';
import { Departamento } from './departamento.model';

export class Requisicao extends Model {
  solicitante: Funcionario;
  dataAbertura: any;
  ultimaAtualizacao: any;
  descricao: string;
  status; string;
  destino: Departamento;
  movimentacoes: Movimentacao[];
}

export class Movimentacao extends Model {
  funcionario: Funcionario;
  dataHora: Date;
  status: string;
  descricao: string;
}
