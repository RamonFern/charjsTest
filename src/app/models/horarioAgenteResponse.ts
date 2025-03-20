export interface HorarioAgenteResponse {
  id: number
  agente: Usuario
  dataHoraInicio: string
  dataHoraFim: string
  atraso: number
  falta: boolean
	justificativaFalta: string
}

export interface Usuario {
  id: number
  nome: string
  funcao: string
  codigo: number
}



