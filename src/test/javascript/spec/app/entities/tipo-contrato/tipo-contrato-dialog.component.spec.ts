/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhdemoTestModule } from '../../../test.module';
import { TipoContratoDialogComponent } from '../../../../../../main/webapp/app/entities/tipo-contrato/tipo-contrato-dialog.component';
import { TipoContratoService } from '../../../../../../main/webapp/app/entities/tipo-contrato/tipo-contrato.service';
import { TipoContrato } from '../../../../../../main/webapp/app/entities/tipo-contrato/tipo-contrato.model';

describe('Component Tests', () => {

    describe('TipoContrato Management Dialog Component', () => {
        let comp: TipoContratoDialogComponent;
        let fixture: ComponentFixture<TipoContratoDialogComponent>;
        let service: TipoContratoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [TipoContratoDialogComponent],
                providers: [
                    TipoContratoService
                ]
            })
            .overrideTemplate(TipoContratoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoContratoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoContratoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TipoContrato(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tipoContrato = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tipoContratoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TipoContrato();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tipoContrato = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tipoContratoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
