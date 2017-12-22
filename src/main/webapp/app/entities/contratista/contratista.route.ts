import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ContratistaComponent } from './contratista.component';
import { ContratistaDetailComponent } from './contratista-detail.component';
import { ContratistaPopupComponent } from './contratista-dialog.component';
import { ContratistaDeletePopupComponent } from './contratista-delete-dialog.component';

export const contratistaRoute: Routes = [
    {
        path: 'contratista',
        component: ContratistaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.contratista.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contratista/:id',
        component: ContratistaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.contratista.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contratistaPopupRoute: Routes = [
    {
        path: 'contratista-new',
        component: ContratistaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.contratista.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contratista/:id/edit',
        component: ContratistaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.contratista.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contratista/:id/delete',
        component: ContratistaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.contratista.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
