/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhdemoTestModule } from '../../../test.module';
import { SupervisorDetailComponent } from '../../../../../../main/webapp/app/entities/supervisor/supervisor-detail.component';
import { SupervisorService } from '../../../../../../main/webapp/app/entities/supervisor/supervisor.service';
import { Supervisor } from '../../../../../../main/webapp/app/entities/supervisor/supervisor.model';

describe('Component Tests', () => {

    describe('Supervisor Management Detail Component', () => {
        let comp: SupervisorDetailComponent;
        let fixture: ComponentFixture<SupervisorDetailComponent>;
        let service: SupervisorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [SupervisorDetailComponent],
                providers: [
                    SupervisorService
                ]
            })
            .overrideTemplate(SupervisorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupervisorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupervisorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Supervisor(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.supervisor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
