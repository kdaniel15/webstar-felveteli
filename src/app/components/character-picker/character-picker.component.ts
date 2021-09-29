import { Component, OnInit } from '@angular/core';
import {CharacterService} from "../../services/character.service";
import {CharacterListItemModel} from "../../models/characterListItem.model";
import {Router} from "@angular/router";
import {SwiperOptions} from "swiper";

@Component({
  selector: 'app-character-picker',
  templateUrl: './character-picker.component.html',
  styleUrls: ['./character-picker.component.scss']
})
export class CharacterPickerComponent implements OnInit {

  characters: Array<CharacterListItemModel>;
  currentUserName: string = localStorage.getItem('name');

  constructor(private characterService: CharacterService,
              private router: Router) {
      this.fetchAllCharacters();
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
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

  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  startSimulation() {
    this.router.navigate(['/simulation']);
  }

}
