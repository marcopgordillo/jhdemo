import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('TipoContrato e2e test', () => {

    let navBarPage: NavBarPage;
    let tipoContratoDialogPage: TipoContratoDialogPage;
    let tipoContratoComponentsPage: TipoContratoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TipoContratoes', () => {
        navBarPage.goToEntity('tipo-contrato');
        tipoContratoComponentsPage = new TipoContratoComponentsPage();
        expect(tipoContratoComponentsPage.getTitle()).toMatch(/jhdemoApp.tipoContrato.home.title/);

    });

    it('should load create TipoContrato dialog', () => {
        tipoContratoComponentsPage.clickOnCreateButton();
        tipoContratoDialogPage = new TipoContratoDialogPage();
        expect(tipoContratoDialogPage.getModalTitle()).toMatch(/jhdemoApp.tipoContrato.home.createOrEditLabel/);
        tipoContratoDialogPage.close();
    });

    it('should create and save TipoContratoes', () => {
        tipoContratoComponentsPage.clickOnCreateButton();
        tipoContratoDialogPage.setTituloInput('titulo');
        expect(tipoContratoDialogPage.getTituloInput()).toMatch('titulo');
        tipoContratoDialogPage.setDescripcionInput('descripcion');
        expect(tipoContratoDialogPage.getDescripcionInput()).toMatch('descripcion');
        tipoContratoDialogPage.save();
        expect(tipoContratoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TipoContratoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tipo-contrato div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TipoContratoDialogPage {
    modalTitle = element(by.css('h4#myTipoContratoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    tituloInput = element(by.css('input#field_titulo'));
    descripcionInput = element(by.css('textarea#field_descripcion'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTituloInput = function(titulo) {
        this.tituloInput.sendKeys(titulo);
    }

    getTituloInput = function() {
        return this.tituloInput.getAttribute('value');
    }

    setDescripcionInput = function(descripcion) {
        this.descripcionInput.sendKeys(descripcion);
    }

    getDescripcionInput = function() {
        return this.descripcionInput.getAttribute('value');
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
