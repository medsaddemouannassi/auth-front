import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
  let fixture: HeaderComponent;
  let authServiceMock: any;
  let routerMock: any;
  beforeEach(async () => {
    let user = {
      email: "user@talan.com",
      firstName: "user",
      id: 17,
      lastName: "user",
      password: null,
      phone: "22222222",
      role: {id: 2, name: "USER"}
    }
    authServiceMock = {
      isUserLoggedIn: jest.fn(() => true),
      getUserFromLocalCache: jest.fn(() => user),
      getRoles: jest.fn(() => ["USER"]),
      logOut: jest.fn()
    }
    fixture = new HeaderComponent(
      authServiceMock,
      routerMock
    )
    fixture.ngOnInit();
  });

  describe('Test: ngOnInit', () => {
    it('should initialize attributes', () => {
      expect(fixture.isUserLogged).toEqual(true);
      expect(fixture.loggedUser).toEqual("user user");
      expect(fixture.role).toEqual("USER");
    });
  });

  describe('Test: logout', () => {
    it('should logout', () => {
      fixture.logout()
      const spyLogout = jest.spyOn(authServiceMock, 'logOut');
      expect(authServiceMock.logOut());
      expect(spyLogout).toBeCalled();
    });
  });
});
