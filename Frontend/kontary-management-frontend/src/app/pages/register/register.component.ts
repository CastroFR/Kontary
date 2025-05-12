import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  registerError = false;
  registerErrorMessage = '';

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.registerError = false;
    this.registerErrorMessage = ''; // Resetear el mensaje de error

    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.apiService.registerUser(formData).subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['/']);
          } else {
            this.registerError = true;
            this.registerErrorMessage = 'Error al registrar el usuario. Por favor, inténtelo de nuevo.';
          }
        },
        (error) => {
          console.error('Registration failed', error);
          this.registerError = true;
          this.registerErrorMessage = error?.error?.message || 'Error al registrar. Intenta nuevamente.';
        }
      );
    }
  }

}
