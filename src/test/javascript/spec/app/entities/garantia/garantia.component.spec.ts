/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhdemoTestModule } from '../../../test.module';
import { GarantiaComponent } from '../../../../../../main/webapp/app/entities/garantia/garantia.component';
import { GarantiaService } from '../../../../../../main/webapp/app/entities/garantia/garantia.service';
import { Garantia } from '../../../../../../main/webapp/app/entities/garantia/garantia.model';

describe('Component Tests', () => {

    describe('Garantia Management Component', () => {
        let comp: GarantiaComponent;
        let fixture: ComponentFixture<GarantiaComponent>;
        let service: GarantiaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [GarantiaComponent],
                providers: [
                    GarantiaService
                ]
            })
            .overrideTemplate(GarantiaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GarantiaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GarantiaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Garantia(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.garantias[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
