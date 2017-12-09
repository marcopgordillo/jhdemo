/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhdemoTestModule } from '../../../test.module';
import { EnlaceDialogComponent } from '../../../../../../main/webapp/app/entities/enlace/enlace-dialog.component';
import { EnlaceService } from '../../../../../../main/webapp/app/entities/enlace/enlace.service';
import { Enlace } from '../../../../../../main/webapp/app/entities/enlace/enlace.model';
import { ContratoService } from '../../../../../../main/webapp/app/entities/contrato';

describe('Component Tests', () => {

    describe('Enlace Management Dialog Component', () => {
        let comp: EnlaceDialogComponent;
        let fixture: ComponentFixture<EnlaceDialogComponent>;
        let service: EnlaceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [EnlaceDialogComponent],
                providers: [
                    ContratoService,
                    EnlaceService
                ]
            })
            .overrideTemplate(EnlaceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnlaceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnlaceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enlace(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.enlace = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enlaceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enlace();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.enlace = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enlaceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
