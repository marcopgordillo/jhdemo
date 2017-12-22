import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhdemoContratoModule } from './contrato/contrato.module';
import { JhdemoGarantiaModule } from './garantia/garantia.module';
import { JhdemoEnlaceModule } from './enlace/enlace.module';
import { JhdemoTipoContratoModule } from './tipo-contrato/tipo-contrato.module';
import { JhdemoAdministradorModule } from './administrador/administrador.module';
import { JhdemoContratistaModule } from './contratista/contratista.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhdemoContratoModule,
        JhdemoGarantiaModule,
        JhdemoEnlaceModule,
        JhdemoTipoContratoModule,
        JhdemoAdministradorModule,
        JhdemoContratistaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhdemoEntityModule {}
