/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhdemoTestModule } from '../../../test.module';
import { GarantiaDetailComponent } from '../../../../../../main/webapp/app/entities/garantia/garantia-detail.component';
import { GarantiaService } from '../../../../../../main/webapp/app/entities/garantia/garantia.service';
import { Garantia } from '../../../../../../main/webapp/app/entities/garantia/garantia.model';

describe('Component Tests', () => {

    describe('Garantia Management Detail Component', () => {
        let comp: GarantiaDetailComponent;
        let fixture: ComponentFixture<GarantiaDetailComponent>;
        let service: GarantiaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [GarantiaDetailComponent],
                providers: [
                    GarantiaService
                ]
            })
            .overrideTemplate(GarantiaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GarantiaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GarantiaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Garantia(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.garantia).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
