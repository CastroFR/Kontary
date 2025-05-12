import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
    { path: 'register', component: RegisterComponent },
    {
        path: 'product/edit/:id',
        loadComponent: () => import('./pages/product-edit/product-edit.component').then(m => m.ProductEditComponent)
    }
    ,
    { path: '**', redirectTo: '' },
];


