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

  characters: Array<CharacterListItemModel> = [];

  constructor(private characterService: CharacterService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchAllCharacters();
  }

  fetchAllCharacters() {
    this.characterService.fetchAllCharacters().subscribe(
      (data) => {
        //console.log('next ág');
        this.characters = data;
        //console.log(this.characters);
      },
      error => {
        //console.log('error ág');
        //console.warn(error);
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/characters']);
  }

  startSimulation() {
    this.router.navigate(['/simulation']);
  }

}
