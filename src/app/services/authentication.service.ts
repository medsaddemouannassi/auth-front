import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.apiUrl;
  private accessToken!: string;
  private refreshToken!: string;
  private loggedInUsername!: string;
  private roles: any;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  public login(user: User): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.host}/api/users/login`, user, {observe: 'response'}).pipe(tap(res => {
      this.saveTokens(res.body.access_token, res.body.refresh_token);
      this.addUserToLocalCache(res.body.user);
      this.isUserLoggedIn();
    }));
  }

  public signup(user: User): Observable<any> {
    return this.http.post<User>(`${this.host}/api/users/signup`, user);
  }

  public logOut(): void {
    this.accessToken = "";
    this.refreshToken = "";
    this.loggedInUsername = "";
    this.roles = null;
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  public saveTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('user'));
  }

  public loadAccessToken(): void {
    // @ts-ignore
    this.accessToken = localStorage.getItem('access_token');
  }

  public loadRefreshToken(): void {
    // @ts-ignore
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  getUser(): string {
    return this.loggedInUsername;
  }

  getRoles(): any {
    return this.roles;
  }

  public refreshTokens(): any {
    this.loadRefreshToken();
    return this.http.get<any>(`${environment.apiUrl}/api/users/refreshToken`).pipe(tap((tokens) => {
      this.saveTokens(tokens.access_token, tokens.refresh_token);
    }));
  }

  // @ts-ignore
  public isUserLoggedIn(): boolean {
    this.loadAccessToken();
    this.loadRefreshToken();
    if (this.accessToken != null && this.accessToken !== '' && this.refreshToken != null && this.refreshToken !== '') {
      if (this.jwtHelper.decodeToken(this.accessToken).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.accessToken)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.accessToken).sub;
          this.roles = this.jwtHelper.decodeToken(this.accessToken).roles;
          return true;
        } else {
          this.refreshTokens().subscribe(() => {
            this.loadAccessToken();
          }, (error: any) => {
            throwError(error)
            this.logOut()
            return false;
          });
          if (this.accessToken != null && this.accessToken !== '' && this.refreshToken != null && this.refreshToken !== '') {
            this.loggedInUsername = this.jwtHelper.decodeToken(this.accessToken).sub;
            this.roles = this.jwtHelper.decodeToken(this.accessToken).roles;
          }
          return this.accessToken != null
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }
}
