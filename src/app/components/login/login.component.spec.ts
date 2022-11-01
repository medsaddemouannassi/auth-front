import {LoginComponent} from './login.component';
import {FormBuilder} from "@angular/forms";
import {of} from "rxjs";
import {HttpResponse} from "@angular/common/http";

describe('LoginComponent', () => {
  let fixture: LoginComponent;
  let authServiceMock: any;
  let formBuilderMock: FormBuilder;
  let routerMock: any;
  let response: HttpResponse<any>;
  let roles: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn(() => of(response)),
      isUserLoggedIn: jest.fn(),
      getUser: jest.fn(),
      getRoles: jest.fn(() => [roles])
    };
    formBuilderMock = new FormBuilder();
    routerMock = jest.fn();
    fixture = new LoginComponent(
      authServiceMock,
      formBuilderMock,
      routerMock
    );
    fixture.ngOnInit();
  });

  describe('Test: ngOnInit', () => {
    it('should initialize loginForm', () => {
      const loginForm = {
        email: '',
        password: ''
      };
      expect(fixture.loginForm.value).toEqual(loginForm);
    });
  });

  describe('Test: Login Form', () => {
    it('should invalidate the form', () => {
      fixture.loginForm.controls.email.setValue('');
      fixture.loginForm.controls.password.setValue('');
      expect(fixture.loginForm.valid).toBeFalsy();
    });

    it('should validate the form', () => {
      fixture.loginForm.controls.email.setValue('demo@gmail.com');
      fixture.loginForm.controls.password.setValue('P@$$W0rd');
      expect(fixture.loginForm.valid).toBeTruthy();
    });
  });

  describe('Test: Form valid', () => {
    it('should call login admin', () => {
      const formData = {
        email: 'demo@gmail.com',
        password: 'P@$$W0rd'
      };
      roles = "ADMIN"
      fixture.login()
      const spyLogin = jest.spyOn(authServiceMock, 'login').mockReturnValue(true);
      expect(authServiceMock.login(formData)).toBe(true);
      expect(spyLogin).toHaveBeenCalledWith(formData);
    });
    it('should call login user', () => {
      const formData = {
        email: 'demo@gmail.com',
        password: 'P@$$W0rd'
      };
      roles = "USER"
        fixture.login()
        const spyLogin = jest.spyOn(authServiceMock, 'login').mockReturnValue(true);
        expect(authServiceMock.login(formData)).toBe(true);
        expect(spyLogin).toHaveBeenCalledWith(formData);
    });
  });
});
