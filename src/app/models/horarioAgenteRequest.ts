export interface HorarioAgenteRequest {
  agente_id: number
  // data: string
  dataHoraInicio: string
  dataHoraFim: string
  atraso: number
  falta: boolean
	justificativaFalta: string
}


