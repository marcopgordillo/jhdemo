import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhdemoSharedModule } from '../../shared';
import {
    TipoContratoService,
    TipoContratoPopupService,
    TipoContratoComponent,
    TipoContratoDetailComponent,
    TipoContratoDialogComponent,
    TipoContratoPopupComponent,
    TipoContratoDeletePopupComponent,
    TipoContratoDeleteDialogComponent,
    tipoContratoRoute,
    tipoContratoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoContratoRoute,
    ...tipoContratoPopupRoute,
];

@NgModule({
    imports: [
        JhdemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipoContratoComponent,
        TipoContratoDetailComponent,
        TipoContratoDialogComponent,
        TipoContratoDeleteDialogComponent,
        TipoContratoPopupComponent,
        TipoContratoDeletePopupComponent,
    ],
    entryComponents: [
        TipoContratoComponent,
        TipoContratoDialogComponent,
        TipoContratoPopupComponent,
        TipoContratoDeleteDialogComponent,
        TipoContratoDeletePopupComponent,
    ],
    providers: [
        TipoContratoService,
        TipoContratoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhdemoTipoContratoModule {}
