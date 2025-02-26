export interface HorarioAgenteResponse {
  id: number
  usuario: Usuario
  data: string
  horaEntrada: string
  horaSaida: string
  falta: boolean
	justificativaFalta: string
}

export interface Usuario {
  id: number
  nome: string
  funcao: string
  codigo: number
}


