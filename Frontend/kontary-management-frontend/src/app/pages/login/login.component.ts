import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm: FormGroup;
  submitted = false;
  loginError = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.loginError = false; // Resetear el estado del error

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.apiService.loginUser(formData).subscribe(
        (response) => {
          if (response && response.token) {
            
            this.router.navigate(['/dashboard']);
            localStorage.setItem('token', response.token);

          } else {
            this.loginError = true;
          }
        },
        (error) => {
          console.error('Login failed', error);
          this.loginError = true;
        }
      );
    }
  }


}
