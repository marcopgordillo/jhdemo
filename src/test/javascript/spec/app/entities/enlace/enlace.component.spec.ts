/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhdemoTestModule } from '../../../test.module';
import { EnlaceComponent } from '../../../../../../main/webapp/app/entities/enlace/enlace.component';
import { EnlaceService } from '../../../../../../main/webapp/app/entities/enlace/enlace.service';
import { Enlace } from '../../../../../../main/webapp/app/entities/enlace/enlace.model';

describe('Component Tests', () => {

    describe('Enlace Management Component', () => {
        let comp: EnlaceComponent;
        let fixture: ComponentFixture<EnlaceComponent>;
        let service: EnlaceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [EnlaceComponent],
                providers: [
                    EnlaceService
                ]
            })
            .overrideTemplate(EnlaceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnlaceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnlaceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Enlace(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.enlaces[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
