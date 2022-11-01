import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
  let fixture: HomeComponent;
  let authServiceMock: any;

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
    fixture = new HomeComponent(
      authServiceMock
    )
    fixture.ngOnInit();
  });

  describe('Test: ngOnInit', () => {
    it('should initialize attributes', () => {
      expect(fixture.isUserLogged).toEqual(true);
      expect(fixture.loggedUser).toEqual("user user");
    });
  });
});
