import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get('http://localhost:8080/api/v2/agenteUser');
  }
}
