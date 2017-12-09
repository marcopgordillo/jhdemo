/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhdemoTestModule } from '../../../test.module';
import { EnlaceDetailComponent } from '../../../../../../main/webapp/app/entities/enlace/enlace-detail.component';
import { EnlaceService } from '../../../../../../main/webapp/app/entities/enlace/enlace.service';
import { Enlace } from '../../../../../../main/webapp/app/entities/enlace/enlace.model';

describe('Component Tests', () => {

    describe('Enlace Management Detail Component', () => {
        let comp: EnlaceDetailComponent;
        let fixture: ComponentFixture<EnlaceDetailComponent>;
        let service: EnlaceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [EnlaceDetailComponent],
                providers: [
                    EnlaceService
                ]
            })
            .overrideTemplate(EnlaceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnlaceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnlaceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Enlace(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.enlace).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
