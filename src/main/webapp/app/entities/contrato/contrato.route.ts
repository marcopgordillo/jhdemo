import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ContratoComponent } from './contrato.component';
import { ContratoDetailComponent } from './contrato-detail.component';
import { ContratoPopupComponent } from './contrato-dialog.component';
import { ContratoDeletePopupComponent } from './contrato-delete-dialog.component';

export const contratoRoute: Routes = [
    {
        path: 'contrato',
        component: ContratoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.contrato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contrato/:id',
        component: ContratoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.contrato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contratoPopupRoute: Routes = [
    {
        path: 'contrato-new',
        component: ContratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.contrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contrato/:id/edit',
        component: ContratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.contrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contrato/:id/delete',
        component: ContratoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.contrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
