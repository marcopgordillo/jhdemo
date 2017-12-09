import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhdemoSharedModule } from '../../shared';
import {
    ProveedorService,
    ProveedorPopupService,
    ProveedorComponent,
    ProveedorDetailComponent,
    ProveedorDialogComponent,
    ProveedorPopupComponent,
    ProveedorDeletePopupComponent,
    ProveedorDeleteDialogComponent,
    proveedorRoute,
    proveedorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...proveedorRoute,
    ...proveedorPopupRoute,
];

@NgModule({
    imports: [
        JhdemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProveedorComponent,
        ProveedorDetailComponent,
        ProveedorDialogComponent,
        ProveedorDeleteDialogComponent,
        ProveedorPopupComponent,
        ProveedorDeletePopupComponent,
    ],
    entryComponents: [
        ProveedorComponent,
        ProveedorDialogComponent,
        ProveedorPopupComponent,
        ProveedorDeleteDialogComponent,
        ProveedorDeletePopupComponent,
    ],
    providers: [
        ProveedorService,
        ProveedorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhdemoProveedorModule {}
