import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStorage {

  saveUsername(username: string){
    let users = JSON.parse(localStorage.getItem('users')||'[]');
    users.push(username);
    localStorage.setItem('users',JSON.stringify(users));
  }

  getUsernames(){
    return JSON.parse(localStorage.getItem('users')||'[]');
  }
  
}
