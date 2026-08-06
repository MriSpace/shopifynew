import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { ProductDetailsComponent } from './product-details/product-details';
import { ShoppingCartComponent } from './cart/cart.component';
import { loginGuard } from './guards/login-guard';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'login', loadComponent: () => import('./login/login').then(m=>m.LoginComponent), canActivate: [loginGuard] },
    { path: 'signup', component: SignupComponent },
    { path: 'product/:productId', component: ProductDetailsComponent, canActivate: [authGuard] },
    { path: 'cart', component: ShoppingCartComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
    
];
