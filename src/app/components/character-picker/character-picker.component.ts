import { Component, OnInit } from '@angular/core';
import {CharacterService} from "../../services/character.service";
import {CharacterListItemModel} from "../../models/characterListItem.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-character-picker',
  templateUrl: './character-picker.component.html',
  styleUrls: ['./character-picker.component.scss']
})
export class CharacterPickerComponent implements OnInit {

  characters: Array<CharacterListItemModel>;
  currentUserName: string = localStorage.getItem('name');
  canSimulationBegin: boolean = false;
  characterDisplayIndex: number = 0;

  constructor(private characterService: CharacterService,
              private router: Router) {
      this.fetchAllCharacters();
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    } else {
      this.canSimulationBegin = false;
    }
  }

  fetchAllCharacters() {
    this.characterService.fetchAllCharacters().subscribe(
      (data) => {
        //console.log('next ág');
        this.characters = data.characters;
        //console.log(this.characters);
      },
      error => {
        //console.log('error ág');
        //console.warn(error);
      },
      () => {

      }
    );
  }

  //TODO
  validationBeforeSimulation() {
    this.canSimulationBegin = true;
  }

  //TODO
  addCharacter() {

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  startSimulation() {
    this.router.navigate(['/simulation']);
  }

  nextCharacter() {
    if (this.characterDisplayIndex < this.characters.length-1) {
      this.characterDisplayIndex++;
    }
  }

  previousCharacter() {
    if (this.characterDisplayIndex > -1) {
      this.characterDisplayIndex--;
    }
  }

}
