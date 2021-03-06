/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhdemoTestModule } from '../../../test.module';
import { ContratoDialogComponent } from '../../../../../../main/webapp/app/entities/contrato/contrato-dialog.component';
import { ContratoService } from '../../../../../../main/webapp/app/entities/contrato/contrato.service';
import { Contrato } from '../../../../../../main/webapp/app/entities/contrato/contrato.model';
import { GarantiaService } from '../../../../../../main/webapp/app/entities/garantia';
import { TipoContratoService } from '../../../../../../main/webapp/app/entities/tipo-contrato';
import { SupervisorService } from '../../../../../../main/webapp/app/entities/supervisor';
import { ProveedorService } from '../../../../../../main/webapp/app/entities/proveedor';

describe('Component Tests', () => {

    describe('Contrato Management Dialog Component', () => {
        let comp: ContratoDialogComponent;
        let fixture: ComponentFixture<ContratoDialogComponent>;
        let service: ContratoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [ContratoDialogComponent],
                providers: [
                    GarantiaService,
                    TipoContratoService,
                    SupervisorService,
                    ProveedorService,
                    ContratoService
                ]
            })
            .overrideTemplate(ContratoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContratoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContratoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Contrato(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.contrato = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'contratoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Contrato();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.contrato = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'contratoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
