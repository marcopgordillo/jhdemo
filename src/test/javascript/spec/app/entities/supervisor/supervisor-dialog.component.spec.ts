/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhdemoTestModule } from '../../../test.module';
import { SupervisorDialogComponent } from '../../../../../../main/webapp/app/entities/supervisor/supervisor-dialog.component';
import { SupervisorService } from '../../../../../../main/webapp/app/entities/supervisor/supervisor.service';
import { Supervisor } from '../../../../../../main/webapp/app/entities/supervisor/supervisor.model';

describe('Component Tests', () => {

    describe('Supervisor Management Dialog Component', () => {
        let comp: SupervisorDialogComponent;
        let fixture: ComponentFixture<SupervisorDialogComponent>;
        let service: SupervisorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [SupervisorDialogComponent],
                providers: [
                    SupervisorService
                ]
            })
            .overrideTemplate(SupervisorDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupervisorDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupervisorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Supervisor(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.supervisor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supervisorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Supervisor();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.supervisor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supervisorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
