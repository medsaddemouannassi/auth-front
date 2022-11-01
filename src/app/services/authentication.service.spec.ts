
import { AuthenticationService } from './authentication.service';
import {of} from "rxjs";

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpClientSpy: any
  let user: any;
  let res: any;
  const spyGetItem = jest.spyOn(Storage.prototype, 'getItem');
  const spySetItem = jest.spyOn(Storage.prototype, 'setItem');
  const spyRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');

  beforeEach(() => {
    user = {
      email: "user@talan.com",
      firstName: "user",
      id: 17,
      lastName: "user",
      password: null,
      phone: "22222222",
      role: {id: 2, name: "USER"}
    }
    res = {
      body: {
        access_token: 'ca',
        refresh_token: 'ca',
        user: user
      }
    }
    httpClientSpy={
      get : jest.fn(() => of(res)),
      post:jest.fn(() => of(res))
     }
    service = new AuthenticationService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('Test: login', () => {
    it('should login', () => {
      service.login(user).subscribe({
        next: () => expect(httpClientSpy.post).toBeCalledWith(`${service.host}/api/users/login`, user, {observe: 'response'})
      })
    });
  });

  describe('Test: signup', () => {
    it('should signup', () => {
      service.signup(user)
      expect(httpClientSpy.post).toBeCalledWith(`${service.host}/api/users/signup`, user)
    });
  });

  describe('Test: logOut', () => {
    it('should remove tokens', () => {
      service.logOut()
      expect(spyRemoveItem).toBeCalledWith('user')
      expect(spyRemoveItem).toBeCalledWith('access_token')
      expect(spyRemoveItem).toBeCalledWith('refresh_token')
    });
  });

  describe('Test: saveTokens', () => {
    it('should save tokens', () => {
      service.saveTokens(res.body.access_token, res.body.refresh_token)
      expect(spySetItem).toBeCalledWith('access_token', res.body.access_token)
      expect(spySetItem).toBeCalledWith('refresh_token', res.body.refresh_token)
    });
  });

  describe('Test: addUserToLocalCache', () => {
    it('should add user to local cache', () => {
      service.addUserToLocalCache(user)
      expect(spySetItem).toBeCalledWith('user', JSON.stringify(user))
    });
  });

  describe('Test: addUserToLocalCache', () => {
    it('should add user to local cache', () => {
      service.getUserFromLocalCache()
      expect(spyGetItem).toBeCalledWith('user')
    });
  });

  describe('Test: loadAccessToken', () => {
    it('should load access token', () => {
      service.loadAccessToken()
      expect(spyGetItem).toBeCalledWith('access_token')
    });
  });

  describe('Test: loadRefreshToken', () => {
    it('should load refresh token', () => {
      service.loadRefreshToken()
      expect(spyGetItem).toBeCalledWith('refresh_token')
    });
  });

  describe('Test: getAccessToken', () => {
    it('should get access token', () => {
      service.getAccessToken()
    });
  });

  describe('Test: getRefreshToken', () => {
    it('should get refresh token', () => {
      service.getRefreshToken()
    });
  });

  describe('Test: getUser', () => {
    it('should get user', () => {
      service.getUser()
    });
  });

  describe('Test: getRoles', () => {
    it('should get roles', () => {
      service.getRoles()
    });
  });

  describe('Test: refreshTokens', () => {
    it('should refresh tokens', () => {
      let spyInstance = jest.spyOn(service, 'loadRefreshToken');
      service.refreshTokens().subscribe({
        next: () => expect(spyInstance).toBeCalled()
      })
    });
  });

  describe('Test: isUserLoggedIn', () => {
    it('should verify that user is logged in', () => {
      localStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxMjJ9.lNmIG88a-zGVRUZBncsJssh8uDcJNiN1jr0zTp0Sz3Q')
      let spyInstance = jest.spyOn(service, 'loadRefreshToken');
      service.isUserLoggedIn()
      expect(spyInstance).toBeCalled()
    });
    it('should verify that user is not logged in', () => {
      localStorage.setItem('access_token', '')
      let spyInstance = jest.spyOn(service, 'logOut');
      service.isUserLoggedIn()
      expect(spyInstance).toBeCalled()
    });
  });
});

