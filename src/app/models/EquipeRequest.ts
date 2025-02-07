import { AgenteUser } from "./AgenteUser"

export interface EquipeRequest {
  nome: string
}

export interface EquipeResponse {
  id: number
  nome: string
  membros: AgenteUser[]
}
