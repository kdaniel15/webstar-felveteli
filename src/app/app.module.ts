import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CharacterPickerComponent } from './components/character-picker/character-picker.component';
import { BattleSimulationComponent } from './components/battle-simulation/battle-simulation.component';
import {SwiperModule} from "swiper/angular";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CharacterPickerComponent,
    BattleSimulationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        SwiperModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
