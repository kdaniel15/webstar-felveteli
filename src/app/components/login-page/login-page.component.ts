import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              public router: Router) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  login() {
    const data = {...this.loginForm.value};
    this.userService.login(data).subscribe(
      response => {
        console.log("next ág");
        //const token = response.token;
        //console.log("mentés előtt" + localStorage.getItem('token'));
        localStorage.setItem('token', response.token);
        //console.log("mentés után" + localStorage.getItem('token'));
        if (localStorage.getItem('token') != null) {
          this.router.navigate(['/characters']);
        }
      },
      () => console.log('error ág'),
      () => console.log('complete ág')
    )
  }

}
