/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhdemoTestModule } from '../../../test.module';
import { AdministradorDialogComponent } from '../../../../../../main/webapp/app/entities/administrador/administrador-dialog.component';
import { AdministradorService } from '../../../../../../main/webapp/app/entities/administrador/administrador.service';
import { Administrador } from '../../../../../../main/webapp/app/entities/administrador/administrador.model';

describe('Component Tests', () => {

    describe('Administrador Management Dialog Component', () => {
        let comp: AdministradorDialogComponent;
        let fixture: ComponentFixture<AdministradorDialogComponent>;
        let service: AdministradorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [AdministradorDialogComponent],
                providers: [
                    AdministradorService
                ]
            })
            .overrideTemplate(AdministradorDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdministradorDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdministradorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Administrador(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.administrador = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'administradorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Administrador();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.administrador = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'administradorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
