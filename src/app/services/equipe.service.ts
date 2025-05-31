import { EquipeRequest, EquipeResponse } from 'src/app/models/EquipeRequest';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  criarEquipe(equipe: EquipeRequest) {
    return this.http.post<EquipeResponse>(`${this.baseURL}/api/v2/equipe`, equipe);
  }
  listar() {
    return this.http.get<EquipeResponse[]>(`${this.baseURL}/api/v2/equipe`);
  }

  buscarPorId(id: number) {
    return this.http.get<EquipeResponse>(`${this.baseURL}/api/v2/equipe/${id}`);
  }

  editarNomeEquipe(equipe: EquipeRequest, id: number) {
    return this.http.put<EquipeResponse>(`${this.baseURL}/api/v2/equipe/${id}`, equipe);
  }

  excluirEquipe(equipeId: number) {
    return this.http.delete(`${this.baseURL}/api/v2/equipe/${equipeId}`);
  }


}
