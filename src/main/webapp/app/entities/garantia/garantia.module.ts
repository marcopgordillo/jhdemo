import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhdemoSharedModule } from '../../shared';
import {
    GarantiaService,
    GarantiaPopupService,
    GarantiaComponent,
    GarantiaDetailComponent,
    GarantiaDialogComponent,
    GarantiaPopupComponent,
    GarantiaDeletePopupComponent,
    GarantiaDeleteDialogComponent,
    garantiaRoute,
    garantiaPopupRoute,
    GarantiaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...garantiaRoute,
    ...garantiaPopupRoute,
];

@NgModule({
    imports: [
        JhdemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GarantiaComponent,
        GarantiaDetailComponent,
        GarantiaDialogComponent,
        GarantiaDeleteDialogComponent,
        GarantiaPopupComponent,
        GarantiaDeletePopupComponent,
    ],
    entryComponents: [
        GarantiaComponent,
        GarantiaDialogComponent,
        GarantiaPopupComponent,
        GarantiaDeleteDialogComponent,
        GarantiaDeletePopupComponent,
    ],
    providers: [
        GarantiaService,
        GarantiaPopupService,
        GarantiaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhdemoGarantiaModule {}
