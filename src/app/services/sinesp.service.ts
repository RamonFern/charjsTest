import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SinespService {

  private baseUrl = 'https://cidadao.sinesp.gov.br/sinesp-cidadao/mobile';

  constructor() { }

  consultarPlaca(placa: string): Promise<any> {
    const data = `{"placa":"${placa}"}`;
    return axios.post(`${this.baseUrl}/consulta-placa`, data, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });
  }
}
