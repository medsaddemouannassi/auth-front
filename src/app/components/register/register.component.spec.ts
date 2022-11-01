import {RegisterComponent} from './register.component';
import {FormBuilder} from "@angular/forms";
import {Observable, of} from "rxjs";

describe('RegisterComponent', () => {
  let fixture: RegisterComponent;
  let authenticationServiceMock: any;
  let formBuilderMock: any;
  let routerMock: any;
  let anonymous:Observable<any>;

  beforeEach(() => {
    formBuilderMock = new FormBuilder();
    authenticationServiceMock = {
      signup: jest.fn(() => of())
    }
    fixture = new RegisterComponent(
      authenticationServiceMock,
      formBuilderMock,
      routerMock
    )
    fixture.ngOnInit();
  });

  describe('Test: ngOnInit', () => {
    it('should initialize signupForm', () => {
      const signupForm = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      };
      expect(fixture.signupForm.value).toEqual(signupForm);
    });
  });

  describe('Test: Signup Form', () => {
    it('should invalidate the form', () => {
      fixture.signupForm.controls.firstName.setValue('');
      fixture.signupForm.controls.lastName.setValue('');
      fixture.signupForm.controls.email.setValue('');
      fixture.signupForm.controls.password.setValue('');
      fixture.signupForm.controls.confirmPassword.setValue('');
      fixture.signupForm.controls.phone.setValue('');
      expect(fixture.signupForm.valid).toBeFalsy();
    });

    it('should validate the form', () => {
      fixture.signupForm.controls.firstName.setValue('foulen');
      fixture.signupForm.controls.lastName.setValue('ben falten');
      fixture.signupForm.controls.email.setValue('foulen@gmail.com');
      fixture.signupForm.controls.password.setValue('aaaaaaa');
      fixture.signupForm.controls.confirmPassword.setValue('aaaaaaa');
      fixture.signupForm.controls.phone.setValue('22222222');
      expect(fixture.signupForm.valid).toBeTruthy();
    });
  });

  describe('Test: Form valid', () => {
    it('should call signup', () => {
      const formData = {
        firstName: 'foulen',
        lastName: 'ben falten',
        email: 'foulen@gmail.com',
        password: 'aaaaaaa',
        confirmPassword: 'aaaaaaa',
        phone: '22222222',
      };
      fixture.signup()
      const spySignupUser = jest.spyOn(authenticationServiceMock, 'signup').mockReturnValue(true);
      expect(authenticationServiceMock.signup(formData)).toBe(true);
      expect(spySignupUser).toHaveBeenCalledWith(formData);
    });
  });
});
