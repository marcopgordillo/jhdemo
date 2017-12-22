/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhdemoTestModule } from '../../../test.module';
import { ContratistaDialogComponent } from '../../../../../../main/webapp/app/entities/contratista/contratista-dialog.component';
import { ContratistaService } from '../../../../../../main/webapp/app/entities/contratista/contratista.service';
import { Contratista } from '../../../../../../main/webapp/app/entities/contratista/contratista.model';

describe('Component Tests', () => {

    describe('Contratista Management Dialog Component', () => {
        let comp: ContratistaDialogComponent;
        let fixture: ComponentFixture<ContratistaDialogComponent>;
        let service: ContratistaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [ContratistaDialogComponent],
                providers: [
                    ContratistaService
                ]
            })
            .overrideTemplate(ContratistaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContratistaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContratistaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Contratista(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.contratista = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'contratistaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Contratista();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.contratista = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'contratistaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
