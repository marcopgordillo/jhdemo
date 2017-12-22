/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhdemoTestModule } from '../../../test.module';
import { ContratistaComponent } from '../../../../../../main/webapp/app/entities/contratista/contratista.component';
import { ContratistaService } from '../../../../../../main/webapp/app/entities/contratista/contratista.service';
import { Contratista } from '../../../../../../main/webapp/app/entities/contratista/contratista.model';

describe('Component Tests', () => {

    describe('Contratista Management Component', () => {
        let comp: ContratistaComponent;
        let fixture: ComponentFixture<ContratistaComponent>;
        let service: ContratistaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [ContratistaComponent],
                providers: [
                    ContratistaService
                ]
            })
            .overrideTemplate(ContratistaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContratistaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContratistaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Contratista(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.contratistas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
