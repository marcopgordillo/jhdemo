import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhdemoSharedModule } from '../../shared';
import {
    AdministradorService,
    AdministradorPopupService,
    AdministradorComponent,
    AdministradorDetailComponent,
    AdministradorDialogComponent,
    AdministradorPopupComponent,
    AdministradorDeletePopupComponent,
    AdministradorDeleteDialogComponent,
    administradorRoute,
    administradorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...administradorRoute,
    ...administradorPopupRoute,
];

@NgModule({
    imports: [
        JhdemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AdministradorComponent,
        AdministradorDetailComponent,
        AdministradorDialogComponent,
        AdministradorDeleteDialogComponent,
        AdministradorPopupComponent,
        AdministradorDeletePopupComponent,
    ],
    entryComponents: [
        AdministradorComponent,
        AdministradorDialogComponent,
        AdministradorPopupComponent,
        AdministradorDeleteDialogComponent,
        AdministradorDeletePopupComponent,
    ],
    providers: [
        AdministradorService,
        AdministradorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhdemoAdministradorModule {}
