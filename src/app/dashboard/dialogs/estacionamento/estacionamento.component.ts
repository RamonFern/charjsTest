import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-estacionamento',
  templateUrl: './estacionamento.component.html',
  styleUrls: ['./estacionamento.component.css']
})
export class EstacionamentoComponent implements OnInit {

  constructor(private veiculoService: VeiculoService,) { }

  ngOnInit(): void {
    this.listarVeiculos();
  }

  listarVeiculos() {
    this.veiculoService.listar()
        .pipe(take(1))
        .subscribe((v) => {
          console.log(v);
        })
  }

}
