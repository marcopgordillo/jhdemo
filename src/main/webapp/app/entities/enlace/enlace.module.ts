import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhdemoSharedModule } from '../../shared';
import {
    EnlaceService,
    EnlacePopupService,
    EnlaceComponent,
    EnlaceDetailComponent,
    EnlaceDialogComponent,
    EnlacePopupComponent,
    EnlaceDeletePopupComponent,
    EnlaceDeleteDialogComponent,
    enlaceRoute,
    enlacePopupRoute,
} from './';

const ENTITY_STATES = [
    ...enlaceRoute,
    ...enlacePopupRoute,
];

@NgModule({
    imports: [
        JhdemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EnlaceComponent,
        EnlaceDetailComponent,
        EnlaceDialogComponent,
        EnlaceDeleteDialogComponent,
        EnlacePopupComponent,
        EnlaceDeletePopupComponent,
    ],
    entryComponents: [
        EnlaceComponent,
        EnlaceDialogComponent,
        EnlacePopupComponent,
        EnlaceDeleteDialogComponent,
        EnlaceDeletePopupComponent,
    ],
    providers: [
        EnlaceService,
        EnlacePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhdemoEnlaceModule {}
