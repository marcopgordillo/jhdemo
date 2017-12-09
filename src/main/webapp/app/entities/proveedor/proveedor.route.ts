import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProveedorComponent } from './proveedor.component';
import { ProveedorDetailComponent } from './proveedor-detail.component';
import { ProveedorPopupComponent } from './proveedor-dialog.component';
import { ProveedorDeletePopupComponent } from './proveedor-delete-dialog.component';

export const proveedorRoute: Routes = [
    {
        path: 'proveedor',
        component: ProveedorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.proveedor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'proveedor/:id',
        component: ProveedorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.proveedor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const proveedorPopupRoute: Routes = [
    {
        path: 'proveedor-new',
        component: ProveedorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.proveedor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proveedor/:id/edit',
        component: ProveedorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.proveedor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proveedor/:id/delete',
        component: ProveedorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.proveedor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
