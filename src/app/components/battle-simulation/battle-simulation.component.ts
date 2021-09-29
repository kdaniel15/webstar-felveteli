import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-battle-simulation',
  templateUrl: './battle-simulation.component.html',
  styleUrls: ['./battle-simulation.component.scss']
})
export class BattleSimulationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/characters']);
  }

}
