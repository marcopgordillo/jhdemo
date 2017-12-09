import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EnlaceComponent } from './enlace.component';
import { EnlaceDetailComponent } from './enlace-detail.component';
import { EnlacePopupComponent } from './enlace-dialog.component';
import { EnlaceDeletePopupComponent } from './enlace-delete-dialog.component';

export const enlaceRoute: Routes = [
    {
        path: 'enlace',
        component: EnlaceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.enlace.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'enlace/:id',
        component: EnlaceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.enlace.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enlacePopupRoute: Routes = [
    {
        path: 'enlace-new',
        component: EnlacePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.enlace.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enlace/:id/edit',
        component: EnlacePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.enlace.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enlace/:id/delete',
        component: EnlaceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.enlace.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
