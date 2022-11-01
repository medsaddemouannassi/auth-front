import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLoading: any;
  loginForm!: FormGroup;
  loginErrorMsg!: string;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // Log In
  login(): void {
    this.showLoading = true;
    this.authenticationService.login(this.loginForm.value).subscribe((data) => {
        this.authenticationService.isUserLoggedIn();
        this.authenticationService.getUser();
        if (this.authenticationService.getRoles()[0] == "ADMIN") {
          this.router.navigateByUrl("/admin/allreservation")
        } else if (this.authenticationService.getRoles()[0] == "USER") {
          this.router.navigateByUrl('')
        }
      },
      error => {
        if (error != null) this.loginErrorMsg = "Vérifiez votre e-mail/mot de passe"
      });
  }

}
