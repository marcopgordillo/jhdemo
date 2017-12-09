import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TipoContratoComponent } from './tipo-contrato.component';
import { TipoContratoDetailComponent } from './tipo-contrato-detail.component';
import { TipoContratoPopupComponent } from './tipo-contrato-dialog.component';
import { TipoContratoDeletePopupComponent } from './tipo-contrato-delete-dialog.component';

export const tipoContratoRoute: Routes = [
    {
        path: 'tipo-contrato',
        component: TipoContratoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.tipoContrato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-contrato/:id',
        component: TipoContratoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.tipoContrato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoContratoPopupRoute: Routes = [
    {
        path: 'tipo-contrato-new',
        component: TipoContratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.tipoContrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-contrato/:id/edit',
        component: TipoContratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.tipoContrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-contrato/:id/delete',
        component: TipoContratoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.tipoContrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
