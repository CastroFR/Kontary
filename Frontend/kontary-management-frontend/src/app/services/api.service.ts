import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  // --- Token headers ---
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Guardar el token en el login
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  //Obtener usuario actual (requiere token)
  getCurrentUser(headers: HttpHeaders): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`, { headers });
  }

  //Registro de usuario
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register`, data);
  }

  //Login de usuario
  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, data);
  }

  //Obtener productos
  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product`);
  }

  //Obtener producto por id
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/${id}`);
  }

  //Crear producto (requiere token)
  createProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product`, data, { headers: this.getHeaders() });
  }

  //Actualizar producto (requiere token)
  updateProduct(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/product/${id}`, data, { headers: this.getHeaders() });
  }

  //Eliminar producto (requiere token)
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/${id}`, {
      headers: this.getHeaders()
    });
  }

  //Obtener categorias
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  //Obtener categoria por id
  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}`);
  }

  //Crear categoria (requiere token)
  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, data, { headers: this.getHeaders() });
  }

  //Actualizar categoria (requiere token)
  updateCategory(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/product/categories/${id}`, data, { headers: this.getHeaders() });
  }

  //Eliminar categoria (requiere token)
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/categories/${id}`, { headers: this.getHeaders() });
  }


}
