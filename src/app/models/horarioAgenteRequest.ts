export interface HorarioAgenteRequest {
  usuarioId: number
  data: string
  horaEntrada: string
  horaSaida: string
  falta: boolean
	justificativaFalta: string
}


