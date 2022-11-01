import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {
  isUserLogged!: boolean;
  role!: string;
  loggedUser!: string | null;
  toggleChat: boolean = true;
  toggleSingle: boolean = true;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.isUserLogged = this.authenticationService.isUserLoggedIn();
    this.loggedUser = this.isUserLogged ? this.authenticationService.getUserFromLocalCache().firstName + " " + this.authenticationService.getUserFromLocalCache().lastName : null;
    this.role = this.isUserLogged ? this.authenticationService.getRoles()[0] : null;
  }

  logout() {
    this.authenticationService.logOut();
    this.isUserLogged = false;
  }

  // orderProd() {
  //   this.router.navigateByUrl('/products')
  // }
  //
  // seeProd() {
  //   this.router.navigateByUrl('/admin/products')
  // }
  //
  // addMenu() {
  //   this.router.navigateByUrl('/admin/add-menu')
  // }
}
