export interface RelatorioViatura {
  id?: number;
  data: string;
  placa: string;
  modelo: string;
  motorista: string;
  kmInicial: number;
  kmFinal: number;
  kmRodada?: number;
  horaRetorno: string;
  horaSaida: string;
  abastecimentoLitros?: number;
  destino: string;
  finalidade: string;
  observacoes?: string;
}
  