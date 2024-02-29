import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_auth/auth.guard';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
    {
        path: '',
        component: CartComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
        data: {roles: ['User']}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule { }