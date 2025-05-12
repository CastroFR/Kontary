import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  product: any = {};
  categories: any[] = [];
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.apiService.getProductById(this.id).subscribe({
      next: (res) => {
        this.product = res;
        this.cargarCategorias();
      },
      error: (err) => console.error('Error al cargar producto', err)
    });
  }

  cargarCategorias() {
    this.apiService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categorías cargadas:', this.categories);
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      }
    });
  }

  guardarCambios() {
    this.apiService.updateProduct(this.id, this.product).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Producto actualizado!',
          text: 'El producto fue actualizado correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (err) => {
        console.error('Error al actualizar producto', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el producto. Intenta de nuevo.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  cancelar() {
    this.router.navigate(['/dashboard']);
  }



}
