import { Component, OnInit } from '@angular/core';
import {CharacterService} from "../../services/character.service";
import {CharacterListItemModel} from "../../models/characterListItem.model";
import {Router} from "@angular/router";

import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper";

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

@Component({
  selector: 'app-character-picker',
  templateUrl: './character-picker.component.html',
  styleUrls: ['./character-picker.component.scss']
})
export class CharacterPickerComponent implements OnInit {

  characters: Array<CharacterListItemModel>;
  selectedCharacters: Array<CharacterListItemModel> = new Array<CharacterListItemModel>();
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

  validationBeforeSimulation() {
    this.canSimulationBegin = true;
  }

  //TODO
  addCharacter() {
    console.log(this.characters[this.characterDisplayIndex]);
    if (this.selectedCharacters.length == 0) {
      this.selectedCharacters.push(this.characters[this.characterDisplayIndex]);
    } else if (this.selectedCharacters.length < 3) {
      if (this.selectedCharacters[0].side != this.characters[this.characterDisplayIndex].side) {
        this.selectedCharacters.push(this.characters[this.characterDisplayIndex]);
      } else {
        console.log("You can't pick a second character from the same side of the force!")
      }
    }

    if (this.selectedCharacters.length == 2) {
      this.validationBeforeSimulation();
    }
    console.log(this.selectedCharacters);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  startSimulation() {
    console.log(this.selectedCharacters);
    this.characterService.getSelectedCharacters(this.selectedCharacters);
    this.router.navigate(['/simulation']);
  }

  nextCharacter() {
    console.log('next');
    if (this.characterDisplayIndex < this.characters.length-1) {
      this.characterDisplayIndex++;
    }
  }

  previousCharacter() {
    console.log('previous');
    if (this.characterDisplayIndex > 0) {
      this.characterDisplayIndex--;
    }
  }

}
