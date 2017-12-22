import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AdministradorComponent } from './administrador.component';
import { AdministradorDetailComponent } from './administrador-detail.component';
import { AdministradorPopupComponent } from './administrador-dialog.component';
import { AdministradorDeletePopupComponent } from './administrador-delete-dialog.component';

export const administradorRoute: Routes = [
    {
        path: 'administrador',
        component: AdministradorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.administrador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'administrador/:id',
        component: AdministradorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.administrador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const administradorPopupRoute: Routes = [
    {
        path: 'administrador-new',
        component: AdministradorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.administrador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'administrador/:id/edit',
        component: AdministradorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.administrador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'administrador/:id/delete',
        component: AdministradorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.administrador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
