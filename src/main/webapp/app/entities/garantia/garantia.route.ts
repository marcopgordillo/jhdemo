import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GarantiaComponent } from './garantia.component';
import { GarantiaDetailComponent } from './garantia-detail.component';
import { GarantiaPopupComponent } from './garantia-dialog.component';
import { GarantiaDeletePopupComponent } from './garantia-delete-dialog.component';

@Injectable()
export class GarantiaResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const garantiaRoute: Routes = [
    {
        path: 'garantia',
        component: GarantiaComponent,
        resolve: {
            'pagingParams': GarantiaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.garantia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'garantia/:id',
        component: GarantiaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.garantia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const garantiaPopupRoute: Routes = [
    {
        path: 'garantia-new',
        component: GarantiaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.garantia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'garantia/:id/edit',
        component: GarantiaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.garantia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'garantia/:id/delete',
        component: GarantiaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhdemoApp.garantia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
