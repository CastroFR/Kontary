import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  productos: any[] = [];
  categories: any[] = [];
  token: string | null = null;
  isAdmin: boolean = false;
  selectedProduct: any = null;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.apiService.getCurrentUser(headers).subscribe({
        next: (res) => {
          this.isAdmin = res.role === 'administrador';
          this.cargarProductos();
        },
        error: (err) => {
          console.error('Error al verificar usuario', err);
          this.cargarProductos();
        }
      });
    } else {
      this.cargarProductos();
    }
  }

  cargarProductos() {
    this.apiService.getAllProducts().subscribe({
      next: (data) => {
        this.productos = data;
        console.log('Productos cargados:', this.productos);
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
  }

  confirmarEliminacion(id: string) {
    if (!this.isAdmin || !this.token) {
      Swal.fire('Acceso denegado', 'Debes ser administrador para eliminar productos.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        this.apiService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
            this.cargarProductos(); // Recargar productos
          },
          error: (err) => {
            console.error('Error al eliminar producto:', err);
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          }
        });
      }
    });
  }

  editar(producto: any) {
    this.router.navigate(['product/edit/', producto._id]);
  }


}
