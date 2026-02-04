import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from "@angular/forms";
import { nospaceValidator } from '../validators/nospace.validator';
import { CommonModule, Location } from '@angular/common';
import { UserStorage } from '../common/services/user-storage';
import { Router, RouterLink } from '@angular/router';
import { validate } from '@angular/forms/signals';


@Component({
  selector: 'ms-signup-component',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  standalone: true
})
export class SignupComponent {

  signUpForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, nospaceValidator]),
    secondname: new FormControl('', [Validators.required, nospaceValidator]),
    age: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
  })

  constructor(private userStorage: UserStorage, private router: Router) { }



  submitForm() {
    const firstname = this.signUpForm.get('firstname')?.value;
    const secondname = this.signUpForm.get('secondname')?.value;



    if (firstname) {
      console.log(firstname);
    }

    const fullname = `${firstname} ${secondname}`

    if (fullname) {
      this.userStorage.saveUsername(fullname);
      console.log('saved to local')
    }

    if (fullname) {
      let newusers = this.userStorage.getUsernames()
      console.log(newusers)
    }

    this.router.navigate(['/login']);
  }



}
