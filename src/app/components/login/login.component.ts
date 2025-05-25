import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../core/services/login.service';
import { ILogin } from '../../core/interfaces/ilogin';
import { Router } from '@angular/router';
import { jwtDecode } from  'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginSuccess = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
  if (this.loginForm.valid) {
    this.errorMessage = '';
    this.loginSuccess = false;

    const formData: ILogin = this.loginForm.value;
    this.loginService.login(formData).subscribe({
      next: (response) => {
        console.log('Login response:', response);
   
        this.errorMessage = '';
        
        if (response && response.token) {
          localStorage.setItem('token', response.token);

          const decodedToken : any = jwtDecode(response.token);
          const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          if(userRole === 'Seller')
          {
            this.router.navigate(['/Seller/dashboard']);
          }
          else{
            this.router.navigate(['/home']);
          }
          
        } else{
          this.errorMessage = 'Login succeeded but token missing.';
        }
          
        
      },
      error: (error) => {
        console.error('Login error:', error);

        if (error.error && error.error[""] && Array.isArray(error.error[""])) {
          this.errorMessage = error.error[""][0];
        } else if (typeof error.error === 'string') {
          this.errorMessage = error.error;
        } else if (error.status === 401) {
          this.errorMessage = 'Invalid account. Please check your credentials.';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }

        this.loginSuccess = false;
      }
    });
  } else {
    this.loginForm.markAllAsTouched();
  }
}}