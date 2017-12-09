/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhdemoTestModule } from '../../../test.module';
import { SupervisorComponent } from '../../../../../../main/webapp/app/entities/supervisor/supervisor.component';
import { SupervisorService } from '../../../../../../main/webapp/app/entities/supervisor/supervisor.service';
import { Supervisor } from '../../../../../../main/webapp/app/entities/supervisor/supervisor.model';

describe('Component Tests', () => {

    describe('Supervisor Management Component', () => {
        let comp: SupervisorComponent;
        let fixture: ComponentFixture<SupervisorComponent>;
        let service: SupervisorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [SupervisorComponent],
                providers: [
                    SupervisorService
                ]
            })
            .overrideTemplate(SupervisorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupervisorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupervisorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Supervisor(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.supervisors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
