import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { nospaceValidator } from '../validators/nospace.validator';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { Auth } from '../common/services/auth';
import { inject } from '@angular/core';

@Component({
  selector: 'ms-login-component',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class LoginComponent {

  myForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  });

  private router = inject(Router);
  private auth = inject(Auth);  //different way of using a constructor


  submitForm() {
  if (this.myForm.invalid) return;

  const username = this.myForm.value.username!;  //non-null assertion operator - tells angular that a value will definitely be returned
  const password = this.myForm.value.password!;

  this.auth.login(username, password).subscribe({
    next: (res) => {
      console.log('Login success', res);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.log('Login failed', err);
      alert('Invalid username or password');
    }
  });
}
}
  


