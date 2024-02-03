import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolver } from './_services/product-resolve.service';
import { ProductViewDetailComponent } from './product-view-detail/product-view-detail.component';

export const routes: Routes = [
    { path:'', component: HomeComponent },
    { path:'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: ['Admin']} },
    { path:'user', component: UserComponent, canActivate: [AuthGuard], data: {roles: ['User']} },
    { path:'login', component: LoginComponent },
    { path:'forbidden', component: ForbiddenComponent },
    { path:'addNewProduct', component: AddNewProductComponent, canActivate: [AuthGuard], data: {roles: ['Admin']},
        resolve: {
            product: ProductResolver
        }
    },
    { path:'showProductDetails', component: ShowProductDetailsComponent, canActivate: [AuthGuard], data: {roles: ['Admin']} },
    { path:'productViewDetails', component: ProductViewDetailComponent, resolve: { product: ProductResolver } }
];