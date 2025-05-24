export interface HorarioAgenteRequest {
  agente_id: number
  dataHoraInicio: string
  dataHoraFim: string
  atraso: number
  falta: boolean
	justificativaFalta: string
}


