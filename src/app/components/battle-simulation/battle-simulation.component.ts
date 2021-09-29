import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SimulationService} from "../../services/simulation.service";

@Component({
  selector: 'app-battle-simulation',
  templateUrl: './battle-simulation.component.html',
  styleUrls: ['./battle-simulation.component.scss']
})
export class BattleSimulationComponent implements OnInit {

  constructor(private simulationService: SimulationService,
              private router: Router) { }

  ngOnInit(): void {
    this.startSimulation();
  }

  startSimulation() {
    this.simulationService.enableSimulation().subscribe(

    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/characters']);
  }

}
