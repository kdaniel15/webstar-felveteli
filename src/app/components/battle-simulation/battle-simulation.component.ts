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

  selectedCharacters: Array<CharacterListItemModel>;
  fighterSideAndId: SelectedCharactersModel = {};
  simulationId: string;
  fighterDarkHealth: number = 100;
  fighterLightHealth: number = 100;
  isBattleOver: boolean = false;

  constructor(private simulationService: SimulationService,
              private characterService: CharacterService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    } else {
      this.selectedCharacters = new Array<CharacterListItemModel>();
      console.log(this.selectedCharacters);
      console.log(this.isBattleOver);
      this.setFighterSideAndId();
      console.log(this.selectedCharacters);
      this.startSimulation();
    }
  }

  setFighterSideAndId() {
    this.selectedCharacters = this.characterService.passSelectedCharacters();
    console.log(this.selectedCharacters);
    this.fighterSideAndId.dark = this.selectedCharacters[0].id;
    this.fighterSideAndId.light = this.selectedCharacters[1].id;
  }

  startSimulation() {
    this.simulationService.enableSimulation(this.fighterSideAndId).subscribe(
      response => {
        this.simulationId = response;
        console.log(this.simulationId);
        console.log('next ág');
        this.startBattle();
      },
      error => {
        console.log('error ág');
        console.warn(error);
      }
    );

  }

  startBattle() {
    console.log("Battle started!");
    let rand = Math.floor(Math.random() * (1 + 1));
    let damage = 20;
    while (this.fighterDarkHealth > 0 || this.fighterLightHealth > 0) {
        if (rand == 0) {
          this.fighterLightHealth = this.fighterLightHealth - damage;
          this.fighterDarkHealth = this.fighterDarkHealth - damage;
        } else {
          this.fighterDarkHealth = this.fighterDarkHealth - damage;
          this.fighterLightHealth = this.fighterLightHealth - damage;
        }
    }
    console.log("Battle ended!");
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
