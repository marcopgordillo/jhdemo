/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhdemoTestModule } from '../../../test.module';
import { ProveedorComponent } from '../../../../../../main/webapp/app/entities/proveedor/proveedor.component';
import { ProveedorService } from '../../../../../../main/webapp/app/entities/proveedor/proveedor.service';
import { Proveedor } from '../../../../../../main/webapp/app/entities/proveedor/proveedor.model';

describe('Component Tests', () => {

    describe('Proveedor Management Component', () => {
        let comp: ProveedorComponent;
        let fixture: ComponentFixture<ProveedorComponent>;
        let service: ProveedorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhdemoTestModule],
                declarations: [ProveedorComponent],
                providers: [
                    ProveedorService
                ]
            })
            .overrideTemplate(ProveedorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProveedorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProveedorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Proveedor(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.proveedors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
