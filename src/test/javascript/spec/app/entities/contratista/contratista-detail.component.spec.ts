/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhdemoTestModule } from '../../../test.module';
import { ContratistaDetailComponent } from '../../../../../../main/webapp/app/entities/contratista/contratista-detail.component';
import { ContratistaService } from '../../../../../../main/webapp/app/entities/contratista/contratista.service';
import { Contratista } from '../../../../../../main/webapp/app/entities/contratista/contratista.model';

describe('Component Tests', () => {

    describe('Contratista Management Detail Component', () => {
        let comp: ContratistaDetailComponent;
        let fixture: ComponentFixture<ContratistaDetailComponent>;
        let service: ContratistaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [ContratistaDetailComponent],
                providers: [
                    ContratistaService
                ]
            })
            .overrideTemplate(ContratistaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContratistaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContratistaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Contratista(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.contratista).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
