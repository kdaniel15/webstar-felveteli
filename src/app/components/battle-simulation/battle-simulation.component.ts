import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SimulationService} from "../../services/simulation.service";
import {CharacterService} from "../../services/character.service";
import {CharacterListItemModel} from "../../models/characterListItem.model";
import {SelectedCharactersModel} from "../../models/selectedCharacters.model";

@Component({
  selector: 'app-battle-simulation',
  templateUrl: './battle-simulation.component.html',
  styleUrls: ['./battle-simulation.component.scss']
})
export class BattleSimulationComponent implements OnInit {

  selectedCharacters: Array<CharacterListItemModel> = new Array<CharacterListItemModel>();
  fighterSideAndId: SelectedCharactersModel = {};
  simulationId: string;

  constructor(private simulationService: SimulationService,
              private characterService: CharacterService,
              private router: Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    } else {
      this.setFighterSideAndId();
      console.log(this.selectedCharacters);
      this.startSimulation();
    }
  }

  setFighterSideAndId() {
    this.selectedCharacters = this.characterService.passSelectedCharacters();
    this.fighterSideAndId.dark = this.selectedCharacters[0].id;
    this.fighterSideAndId.light = this.selectedCharacters[1].id;
  }

  startSimulation() {
    this.simulationService.enableSimulation(this.fighterSideAndId).subscribe(
      response => {
        this.simulationId = response;
        console.log(this.simulationId);
        console.log('next ág');
      },
      error => {
        console.log('error ág');
        console.warn(error);
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
