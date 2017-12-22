import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Contratista e2e test', () => {

    let navBarPage: NavBarPage;
    let contratistaDialogPage: ContratistaDialogPage;
    let contratistaComponentsPage: ContratistaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contratistas', () => {
        navBarPage.goToEntity('contratista');
        contratistaComponentsPage = new ContratistaComponentsPage();
        expect(contratistaComponentsPage.getTitle()).toMatch(/jhdemoApp.contratista.home.title/);

    });

    it('should load create Contratista dialog', () => {
        contratistaComponentsPage.clickOnCreateButton();
        contratistaDialogPage = new ContratistaDialogPage();
        expect(contratistaDialogPage.getModalTitle()).toMatch(/jhdemoApp.contratista.home.createOrEditLabel/);
        contratistaDialogPage.close();
    });

    it('should create and save Contratistas', () => {
        contratistaComponentsPage.clickOnCreateButton();
        contratistaDialogPage.setRazonSocialInput('razonSocial');
        expect(contratistaDialogPage.getRazonSocialInput()).toMatch('razonSocial');
        contratistaDialogPage.setRucInput('ruc');
        expect(contratistaDialogPage.getRucInput()).toMatch('ruc');
        contratistaDialogPage.setContactoNombreInput('contactoNombre');
        expect(contratistaDialogPage.getContactoNombreInput()).toMatch('contactoNombre');
        contratistaDialogPage.setDireccionInput('direccion');
        expect(contratistaDialogPage.getDireccionInput()).toMatch('direccion');
        contratistaDialogPage.setTelefonoInput('telefono');
        expect(contratistaDialogPage.getTelefonoInput()).toMatch('telefono');
        contratistaDialogPage.setEmailInput('email');
        expect(contratistaDialogPage.getEmailInput()).toMatch('email');
        contratistaDialogPage.save();
        expect(contratistaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContratistaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contratista div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContratistaDialogPage {
    modalTitle = element(by.css('h4#myContratistaLabel'));
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
