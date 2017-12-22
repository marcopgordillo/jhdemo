/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhdemoTestModule } from '../../../test.module';
import { AdministradorDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/administrador/administrador-delete-dialog.component';
import { AdministradorService } from '../../../../../../main/webapp/app/entities/administrador/administrador.service';

describe('Component Tests', () => {

    describe('Administrador Management Delete Component', () => {
        let comp: AdministradorDeleteDialogComponent;
        let fixture: ComponentFixture<AdministradorDeleteDialogComponent>;
        let service: AdministradorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [AdministradorDeleteDialogComponent],
                providers: [
                    AdministradorService
                ]
            })
            .overrideTemplate(AdministradorDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdministradorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdministradorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
