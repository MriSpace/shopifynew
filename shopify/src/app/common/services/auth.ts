import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private loginUrl = 'https://dummyjson.com/auth/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) { //takes the credentials written by user
    return this.http.post<any>(this.loginUrl+'login', { //makes a post request to the mentioned url
      username,
      password,
      expiresInMins: 30
    }
    )
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
  getUser(){
    const header={'Authorization': 'Bearer '+localStorage.getItem('accessToken')}
    return this.http.get(this.loginUrl+'me',{headers:header})
  }
}


