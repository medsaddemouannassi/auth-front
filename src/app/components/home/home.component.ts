import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUserLogged!: boolean;
  loggedUser!: string | null;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isUserLogged = this.authenticationService.isUserLoggedIn();
    this.loggedUser = this.isUserLogged ? this.authenticationService.getUserFromLocalCache().firstName + " " + this.authenticationService.getUserFromLocalCache().lastName : null;
  }

  carouselMenus = {
    title: "Menu",
    page: "/menu",
    images: [
      'assets/images/big/carousel-menu-1.png',
      'assets/images/big/carousel-menu-2.png',
      'assets/images/big/carousel-menu-3.jpeg',
      'assets/images/big/carousel-menu-4.png'
    ]
  }

  carouselProducts = {
    title: "Produits",
    page: "/products",
    images: [
      'assets/images/big/carousel-products-1.png',
      'assets/images/big/carousel-products-2.png',
      'assets/images/big/carousel-products-3.png',
      'assets/images/big/carousel-products-4.png',
      'assets/images/big/carousel-products-5.jpeg'
    ]
  }
}
