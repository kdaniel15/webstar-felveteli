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

  currentUserName: string = localStorage.getItem('name');
  fighterDarkSide: CharacterListItemModel;
  fighterDarkHealth: number = 100;
  fighterLightSide: CharacterListItemModel;
  fighterLightHealth: number = 100;
  fighterSideAndId: SelectedCharactersModel = {};
  simulationId: string;
  winnerFighter: CharacterListItemModel;

  isBattleOver: boolean = false;

  constructor(private simulationService: SimulationService,
              private characterService: CharacterService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    } else {
      this.fighterDarkSide = this.characterService.darkSideFighter;
      this.fighterLightSide = this.characterService.lightSideFighter;
      this.setFighterSideAndId();
      this.startSimulation();
    }
  }

  setFighterSideAndId() {
    this.fighterSideAndId.dark = this.characterService.darkSideFighter.id;
    this.fighterSideAndId.light = this.characterService.lightSideFighter.id;
  }

  startSimulation() {
    this.simulationService.enableSimulation(this.fighterSideAndId).subscribe(
      response => {
        this.simulationId = response;
        this.startBattle();
      },
      error => {
        console.warn(error);
      }
    );

  }

  removeBrTag(name: string){
    let taglessName = name.replace("<br>", " ");
    return taglessName;
  }

  startBattle() {
    console.log("Battle started!");
    let damage = 20;

    for (let j = 0; j < 10; j++) {
        let rand = Math.floor(Math.random() * (1 + 1));
        if (this.fighterLightHealth > 0 && this.fighterDarkHealth > 0) {
          if (rand == 0) {
            this.fighterLightHealth -= damage;
            console.log('light health' + this.fighterLightHealth);
          } else {
            this.fighterDarkHealth -=damage;
            console.log('dark health' + this.fighterDarkHealth);
          }
        } else {
          //this.isBattleOver = true;
        }
    }

    if (this.fighterLightHealth > 0) {
      this.winnerFighter = this.fighterLightSide;

    } else {
      this.winnerFighter = this.fighterDarkSide;
    }
    console.log("Battle ended!")
    //this.isBattleOver = true;
  }

  navigateToChoosing() {
    this.router.navigate(['/characters']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
