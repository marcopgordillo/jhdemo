/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhdemoTestModule } from '../../../test.module';
import { ProveedorDialogComponent } from '../../../../../../main/webapp/app/entities/proveedor/proveedor-dialog.component';
import { ProveedorService } from '../../../../../../main/webapp/app/entities/proveedor/proveedor.service';
import { Proveedor } from '../../../../../../main/webapp/app/entities/proveedor/proveedor.model';

describe('Component Tests', () => {

    describe('Proveedor Management Dialog Component', () => {
        let comp: ProveedorDialogComponent;
        let fixture: ComponentFixture<ProveedorDialogComponent>;
        let service: ProveedorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [ProveedorDialogComponent],
                providers: [
                    ProveedorService
                ]
            })
            .overrideTemplate(ProveedorDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProveedorDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProveedorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Proveedor(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.proveedor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'proveedorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Proveedor();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.proveedor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'proveedorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
