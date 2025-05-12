import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from '../../components/products-list/products-list.component';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ProductsListComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  productForm!: FormGroup;
  categoryForm!: FormGroup;
  categories: any[] = [];
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    if (!this.token) {
      this.router.navigate(['/']);
      return;
    }

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });


    this.initForm();
    this.loadCategories();
  }



  initForm() {
    this.productForm = this.fb.group({
      codigo: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      status: ['disponible', Validators.required]
    });
  }

  loadCategories() {
    this.apiService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid || !this.token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.apiService.createProduct(this.productForm.value).subscribe({
      next: () => {
        this.productForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Producto creado',
          text: 'El producto se ha agregado correctamente.'
        }).then(() => {
          location.reload(); // Recargar después de cerrar la alerta
        });

      },
      error: (err) => {
        console.error('Error al agregar producto', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar el producto. Inténtalo de nuevo.'
        });
      }
    });
  }

  onCategorySubmit() {
    if (this.categoryForm.invalid || !this.token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.apiService.createCategory(this.categoryForm.value).subscribe({
      next: () => {
        this.categoryForm.reset();
        this.loadCategories(); // recargar categorías disponibles
        Swal.fire({
          icon: 'success',
          title: 'Categoría creada',
          text: 'La categoría ha sido agregada correctamente.'
        }).then(() => {
          location.reload(); // Recargar después de cerrar la alerta
        });
      },
      error: (err) => {
        console.error('Error al agregar categoría', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar la categoría. Inténtalo de nuevo.'
        });
      }
    });
  }




}
