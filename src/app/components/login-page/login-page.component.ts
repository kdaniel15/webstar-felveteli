import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  showError: boolean = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              public router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/characters']);
    }
  }

  login() {
    const data = {...this.loginForm.value};
    this.userService.login(data).subscribe(
      response => {
        this.showError = false;
        localStorage.setItem('token', response.token);
        localStorage.setItem('name', response.user.lastName + " " + response.user.firstName);
        if (localStorage.getItem('token') != null) {
          this.router.navigate(['/characters']);
        }
      },
      errorResponse => {
        this.showError = true;
        this.errorMessage = errorResponse.error.error;
        console.log(this.errorMessage);
      }
    )
  }

}
