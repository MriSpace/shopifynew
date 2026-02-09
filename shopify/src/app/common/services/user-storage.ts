import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStorage {

  saveUsername(username: string): void {
    let users = JSON.parse(localStorage.getItem('users')||'[]');
    users.push(username);
    localStorage.setItem('users',JSON.stringify(users));
  }

  getUsernames(): any[] {
    return JSON.parse(localStorage.getItem('users')||'[]');
  }
  
}
