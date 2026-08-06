import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private loginUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> { //takes the credentials written by user
    return this.http.post<any>(`${this.loginUrl}/login`, { //makes a post request to the mentioned url
      username,
      password,
      expiresInMins: 30
    }
    )
  }

  logout():void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  getUser(): Observable<any>{
    const header={'Authorization': 'Bearer '+localStorage.getItem('accessToken')}
    return this.http.get(`${this.loginUrl}/me`,{headers:header})
  }
}


