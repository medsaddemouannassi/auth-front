import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MustMatch} from "../../validators/mustMatch";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup
  emailExistMsg!: string;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(27)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(27)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(27)]],
        confirmPassword: [''],
        phone: ['', [Validators.required, Validators.pattern('^[0-9_-]{8,8}$')]]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  // Sign Up
  signup(): void {
    this.signupForm.value.role = {id: '2'};
    this.authenticationService.signup(this.signupForm.value).subscribe(data => {
      if (data != null) this.router.navigateByUrl("/page-login");
    }, error => {
      this.emailExistMsg = error.error
    });
  }

}
