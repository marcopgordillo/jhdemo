import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhdemoContratoModule } from './contrato/contrato.module';
import { JhdemoGarantiaModule } from './garantia/garantia.module';
import { JhdemoEnlaceModule } from './enlace/enlace.module';
import { JhdemoTipoContratoModule } from './tipo-contrato/tipo-contrato.module';
import { JhdemoSupervisorModule } from './supervisor/supervisor.module';
import { JhdemoProveedorModule } from './proveedor/proveedor.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhdemoContratoModule,
        JhdemoGarantiaModule,
        JhdemoEnlaceModule,
        JhdemoTipoContratoModule,
        JhdemoSupervisorModule,
        JhdemoProveedorModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhdemoEntityModule {}
