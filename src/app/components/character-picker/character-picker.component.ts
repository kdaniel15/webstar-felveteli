import {Component, OnInit} from '@angular/core';
import {CharacterService} from "../../services/character.service";
import {CharacterListItemModel} from "../../models/characterListItem.model";
import {Router} from "@angular/router";

import SwiperCore, {
  Navigation,
  Pagination
} from "swiper";

SwiperCore.use([Navigation, Pagination]);

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
        this.characters = data.characters;
      },
      error => {
        console.warn(error);
      }
    );
  }

  validationBeforeSimulation() {
    this.canSimulationBegin = true;
  }

  addCharacter() {
    if (this.selectedCharacters.length == 0) {
      this.selectedCharacters.push(this.characters[this.characterDisplayIndex]);
      this.characters[this.characterDisplayIndex].isSelected = true;
    } else if (this.selectedCharacters.length < 3) {
      if (this.selectedCharacters[0].side != this.characters[this.characterDisplayIndex].side) {
        this.selectedCharacters.push(this.characters[this.characterDisplayIndex]);
        this.characters[this.characterDisplayIndex].isSelected = true;
      } else {
        console.warn("You can't pick a second character from the same side of the force!");
      }
    }

    if (this.selectedCharacters.length == 2) {
      this.validationBeforeSimulation();
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  startSimulation() {
    this.characterService.getSelectedCharacters(this.selectedCharacters);
    this.router.navigate(['/simulation']);
  }

  nextCharacter() {
    if (this.characterDisplayIndex < this.characters.length - 1) {
      this.characterDisplayIndex++;
    }
  }

  previousCharacter() {
    if (this.characterDisplayIndex > 0) {
      this.characterDisplayIndex--;
    }
  }

}
