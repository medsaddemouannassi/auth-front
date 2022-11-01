import {NavigationComponent} from './navigation.component';
import {of} from "rxjs";

describe('NavigationComponent', () => {
  let fixture: NavigationComponent;
  let locationMock: any;
  let routerMock: any;
  let authenticationServiceMock: any;

  beforeEach(() => {
    authenticationServiceMock = {
      isUserLoggedIn: jest.fn(() => true),
      getRoles: jest.fn(() => ["ADMIN"])
    }
    routerMock = {
      events: {
        subscribe: jest.fn()
      }
    }
    fixture = new NavigationComponent(
      locationMock,
      routerMock,
      authenticationServiceMock
    )
    fixture.ngOnInit();
  });

  describe('Test: ngOnInit', () => {
    it('should initialize role with ADMIN', () => {
      expect(fixture.role).toEqual("ADMIN");
    });
  });

  describe('Test: toggleLoveIcon', () => {
    it('should change love icon', () => {
      fixture.toggleIcon = false
      fixture.toggleLoveIcon()
      expect(fixture.toggleIcon).toEqual(true);
    });
  });
});
