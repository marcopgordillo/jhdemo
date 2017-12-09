import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Proveedor e2e test', () => {

    let navBarPage: NavBarPage;
    let proveedorDialogPage: ProveedorDialogPage;
    let proveedorComponentsPage: ProveedorComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Proveedors', () => {
        navBarPage.goToEntity('proveedor');
        proveedorComponentsPage = new ProveedorComponentsPage();
        expect(proveedorComponentsPage.getTitle()).toMatch(/jhdemoApp.proveedor.home.title/);

    });

    it('should load create Proveedor dialog', () => {
        proveedorComponentsPage.clickOnCreateButton();
        proveedorDialogPage = new ProveedorDialogPage();
        expect(proveedorDialogPage.getModalTitle()).toMatch(/jhdemoApp.proveedor.home.createOrEditLabel/);
        proveedorDialogPage.close();
    });

    it('should create and save Proveedors', () => {
        proveedorComponentsPage.clickOnCreateButton();
        proveedorDialogPage.setRazonSocialInput('razonSocial');
        expect(proveedorDialogPage.getRazonSocialInput()).toMatch('razonSocial');
        proveedorDialogPage.setRucInput('ruc');
        expect(proveedorDialogPage.getRucInput()).toMatch('ruc');
        proveedorDialogPage.setContactoNombreInput('contactoNombre');
        expect(proveedorDialogPage.getContactoNombreInput()).toMatch('contactoNombre');
        proveedorDialogPage.setDireccionInput('direccion');
        expect(proveedorDialogPage.getDireccionInput()).toMatch('direccion');
        proveedorDialogPage.setTelefonoInput('telefono');
        expect(proveedorDialogPage.getTelefonoInput()).toMatch('telefono');
        proveedorDialogPage.setEmailInput('email');
        expect(proveedorDialogPage.getEmailInput()).toMatch('email');
        proveedorDialogPage.save();
        expect(proveedorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProveedorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-proveedor div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProveedorDialogPage {
    modalTitle = element(by.css('h4#myProveedorLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    razonSocialInput = element(by.css('input#field_razonSocial'));
    rucInput = element(by.css('input#field_ruc'));
    contactoNombreInput = element(by.css('input#field_contactoNombre'));
    direccionInput = element(by.css('input#field_direccion'));
    telefonoInput = element(by.css('input#field_telefono'));
    emailInput = element(by.css('input#field_email'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRazonSocialInput = function(razonSocial) {
        this.razonSocialInput.sendKeys(razonSocial);
    }

    getRazonSocialInput = function() {
        return this.razonSocialInput.getAttribute('value');
    }

    setRucInput = function(ruc) {
        this.rucInput.sendKeys(ruc);
    }

    getRucInput = function() {
        return this.rucInput.getAttribute('value');
    }

    setContactoNombreInput = function(contactoNombre) {
        this.contactoNombreInput.sendKeys(contactoNombre);
    }

    getContactoNombreInput = function() {
        return this.contactoNombreInput.getAttribute('value');
    }

    setDireccionInput = function(direccion) {
        this.direccionInput.sendKeys(direccion);
    }

    getDireccionInput = function() {
        return this.direccionInput.getAttribute('value');
    }

    setTelefonoInput = function(telefono) {
        this.telefonoInput.sendKeys(telefono);
    }

    getTelefonoInput = function() {
        return this.telefonoInput.getAttribute('value');
    }

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
