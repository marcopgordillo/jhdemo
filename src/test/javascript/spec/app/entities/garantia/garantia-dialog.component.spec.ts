/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhdemoTestModule } from '../../../test.module';
import { GarantiaDialogComponent } from '../../../../../../main/webapp/app/entities/garantia/garantia-dialog.component';
import { GarantiaService } from '../../../../../../main/webapp/app/entities/garantia/garantia.service';
import { Garantia } from '../../../../../../main/webapp/app/entities/garantia/garantia.model';

describe('Component Tests', () => {

    describe('Garantia Management Dialog Component', () => {
        let comp: GarantiaDialogComponent;
        let fixture: ComponentFixture<GarantiaDialogComponent>;
        let service: GarantiaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [GarantiaDialogComponent],
                providers: [
                    GarantiaService
                ]
            })
            .overrideTemplate(GarantiaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GarantiaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GarantiaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Garantia(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.garantia = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'garantiaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Garantia();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.garantia = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'garantiaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
