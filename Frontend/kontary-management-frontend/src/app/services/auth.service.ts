import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem('token'); // Borra el token
    localStorage.removeItem('user');  // Borra datos del usuario si es necesario
    this.router.navigate(['/login']); // Redirige al login
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = localStorage.getItem('user');
    if (!user) return false;

    try {
      const parsedUser = JSON.parse(user);
      return parsedUser.role === 'administrador';
    } catch {
      return false;
    }
  }

}
