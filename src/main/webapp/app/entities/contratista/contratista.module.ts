import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhdemoSharedModule } from '../../shared';
import {
    ContratistaService,
    ContratistaPopupService,
    ContratistaComponent,
    ContratistaDetailComponent,
    ContratistaDialogComponent,
    ContratistaPopupComponent,
    ContratistaDeletePopupComponent,
    ContratistaDeleteDialogComponent,
    contratistaRoute,
    contratistaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...contratistaRoute,
    ...contratistaPopupRoute,
];

@NgModule({
    imports: [
        JhdemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContratistaComponent,
        ContratistaDetailComponent,
        ContratistaDialogComponent,
        ContratistaDeleteDialogComponent,
        ContratistaPopupComponent,
        ContratistaDeletePopupComponent,
    ],
    entryComponents: [
        ContratistaComponent,
        ContratistaDialogComponent,
        ContratistaPopupComponent,
        ContratistaDeleteDialogComponent,
        ContratistaDeletePopupComponent,
    ],
    providers: [
        ContratistaService,
        ContratistaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhdemoContratistaModule {}
