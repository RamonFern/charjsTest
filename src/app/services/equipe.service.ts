import { EquipeRequest, EquipeResponse } from 'src/app/models/EquipeRequest';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private http: HttpClient) { }


  criarEquipe(equipe: EquipeRequest) {
    return this.http.post<EquipeResponse>('http://localhost:8080/api/v2/equipe', equipe);
  }
  listar() {
    return this.http.get<EquipeResponse[]>('http://localhost:8080/api/v2/equipe');
  }

  buscarPorId(id: number) {
    return this.http.get<EquipeResponse>(`http://localhost:8080/api/v2/equipe/${id}`);
  }

  editarNomeEquipe(equipe: EquipeRequest, id: number) {
    return this.http.put<EquipeResponse>(`http://localhost:8080/api/v2/equipe/${id}`, equipe);
  }

  excluirEquipe(equipeId: number) {
    return this.http.delete(`http://localhost:8080/api/v2/equipe/${equipeId}`);
  }


}
