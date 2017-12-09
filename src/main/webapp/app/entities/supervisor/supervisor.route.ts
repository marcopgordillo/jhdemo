import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SupervisorComponent } from './supervisor.component';
import { SupervisorDetailComponent } from './supervisor-detail.component';
import { SupervisorPopupComponent } from './supervisor-dialog.component';
import { SupervisorDeletePopupComponent } from './supervisor-delete-dialog.component';

export const supervisorRoute: Routes = [
    {
        path: 'supervisor',
        component: SupervisorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.supervisor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'supervisor/:id',
        component: SupervisorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.supervisor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supervisorPopupRoute: Routes = [
    {
        path: 'supervisor-new',
        component: SupervisorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.supervisor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supervisor/:id/edit',
        component: SupervisorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.supervisor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supervisor/:id/delete',
        component: SupervisorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.supervisor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
