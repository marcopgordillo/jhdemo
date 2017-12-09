import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhdemoSharedModule } from '../../shared';
import {
    SupervisorService,
    SupervisorPopupService,
    SupervisorComponent,
    SupervisorDetailComponent,
    SupervisorDialogComponent,
    SupervisorPopupComponent,
    SupervisorDeletePopupComponent,
    SupervisorDeleteDialogComponent,
    supervisorRoute,
    supervisorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...supervisorRoute,
    ...supervisorPopupRoute,
];

@NgModule({
    imports: [
        JhdemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupervisorComponent,
        SupervisorDetailComponent,
        SupervisorDialogComponent,
        SupervisorDeleteDialogComponent,
        SupervisorPopupComponent,
        SupervisorDeletePopupComponent,
    ],
    entryComponents: [
        SupervisorComponent,
        SupervisorDialogComponent,
        SupervisorPopupComponent,
        SupervisorDeleteDialogComponent,
        SupervisorDeletePopupComponent,
    ],
    providers: [
        SupervisorService,
        SupervisorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhdemoSupervisorModule {}
