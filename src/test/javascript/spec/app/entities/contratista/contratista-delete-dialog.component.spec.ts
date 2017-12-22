/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhdemoTestModule } from '../../../test.module';
import { ContratistaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/contratista/contratista-delete-dialog.component';
import { ContratistaService } from '../../../../../../main/webapp/app/entities/contratista/contratista.service';

describe('Component Tests', () => {

    describe('Contratista Management Delete Component', () => {
        let comp: ContratistaDeleteDialogComponent;
        let fixture: ComponentFixture<ContratistaDeleteDialogComponent>;
        let service: ContratistaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [ContratistaDeleteDialogComponent],
                providers: [
                    ContratistaService
                ]
            })
            .overrideTemplate(ContratistaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContratistaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContratistaService);
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
