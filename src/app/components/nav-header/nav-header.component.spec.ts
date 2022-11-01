import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeaderComponent } from './nav-header.component';

describe('NavHeaderComponent', () => {
  let fixture: NavHeaderComponent;
  let sharedServiceMock: any;

  beforeEach(() => {
    sharedServiceMock = {
      toggleHamburgerClass: jest.fn()
    }
    fixture = new NavHeaderComponent(
      sharedServiceMock
    )
  });

  describe('Test: toggleHamburgerClass', () => {
    it('should initialize attributes', () => {
      fixture.toggleHamburgerClass()
      expect(fixture.hamburgerClass).toBeFalsy();
    });
  });

});
