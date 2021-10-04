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
      //this.selectedCharacters = new Array<CharacterListItemModel>();
      this.fighterDarkSide = this.characterService.darkSideFighter;
      this.fighterLightSide = this.characterService.lightSideFighter;
      //console.log(this.selectedCharacters);
      console.log(this.isBattleOver);
      this.setFighterSideAndId();
      //console.log(this.selectedCharacters);
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
    let damage = 20;

    let i = 0;
    while (i < 10) {
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
      i++;
    }
    if (this.fighterLightHealth > 0) {
      this.winnerFighter = this.fighterLightSide;
    } else {
      this.winnerFighter = this.fighterDarkSide;
    }
    console.log("Battle ended!")
    this.isBattleOver = true;
  }

  navigateToChoosing() {
    this.router.navigate(['/characters']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
