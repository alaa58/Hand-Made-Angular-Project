
// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../core/services/register.service';
import { IRegister } from '../../core/interfaces/iregister';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationSuccess = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Customer', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData: IRegister = this.registerForm.value;

      this.registerService.register(formData).subscribe({
        next: (response) => {
          console.log('Registration response:', response);
          this.registrationSuccess = true;
          this.errorMessage = '';
          this.registerForm.reset();
          if (response === 'Account Created & Role Assigned') {
            alert('Registration successful!');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }

        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = error.error?.message || JSON.stringify(error.error) || 'Registration failed. Please try again.';
          this.registrationSuccess = false;
        }

      });
    }
    else {
      this.registerForm.markAllAsTouched()
    }
  }
}