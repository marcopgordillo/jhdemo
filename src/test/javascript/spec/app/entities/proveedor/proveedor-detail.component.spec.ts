/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhdemoTestModule } from '../../../test.module';
import { ProveedorDetailComponent } from '../../../../../../main/webapp/app/entities/proveedor/proveedor-detail.component';
import { ProveedorService } from '../../../../../../main/webapp/app/entities/proveedor/proveedor.service';
import { Proveedor } from '../../../../../../main/webapp/app/entities/proveedor/proveedor.model';

describe('Component Tests', () => {

    describe('Proveedor Management Detail Component', () => {
        let comp: ProveedorDetailComponent;
        let fixture: ComponentFixture<ProveedorDetailComponent>;
        let service: ProveedorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [ProveedorDetailComponent],
                providers: [
                    ProveedorService
                ]
            })
            .overrideTemplate(ProveedorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProveedorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProveedorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Proveedor(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.proveedor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
