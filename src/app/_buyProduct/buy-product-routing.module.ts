import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { AuthGuard } from '../_auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: BuyProductComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
        data: {roles: ['User']},
        resolve: { productDetails: BuyProductResolverService } 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BuyProductRoutingModule { }