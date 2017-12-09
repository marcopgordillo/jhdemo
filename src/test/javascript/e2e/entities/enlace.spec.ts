import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Enlace e2e test', () => {

    let navBarPage: NavBarPage;
    let enlaceDialogPage: EnlaceDialogPage;
    let enlaceComponentsPage: EnlaceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Enlaces', () => {
        navBarPage.goToEntity('enlace');
        enlaceComponentsPage = new EnlaceComponentsPage();
        expect(enlaceComponentsPage.getTitle()).toMatch(/jhdemoApp.enlace.home.title/);

    });

    it('should load create Enlace dialog', () => {
        enlaceComponentsPage.clickOnCreateButton();
        enlaceDialogPage = new EnlaceDialogPage();
        expect(enlaceDialogPage.getModalTitle()).toMatch(/jhdemoApp.enlace.home.createOrEditLabel/);
        enlaceDialogPage.close();
    });

    it('should create and save Enlaces', () => {
        enlaceComponentsPage.clickOnCreateButton();
        enlaceDialogPage.setEnlaceInput('enlace');
        expect(enlaceDialogPage.getEnlaceInput()).toMatch('enlace');
        enlaceDialogPage.setYearInput('5');
        expect(enlaceDialogPage.getYearInput()).toMatch('5');
        enlaceDialogPage.contratoSelectLastOption();
        enlaceDialogPage.save();
        expect(enlaceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EnlaceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-enlace div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EnlaceDialogPage {
    modalTitle = element(by.css('h4#myEnlaceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    enlaceInput = element(by.css('input#field_enlace'));
    yearInput = element(by.css('input#field_year'));
    contratoSelect = element(by.css('select#field_contrato'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEnlaceInput = function(enlace) {
        this.enlaceInput.sendKeys(enlace);
    }

    getEnlaceInput = function() {
        return this.enlaceInput.getAttribute('value');
    }

    setYearInput = function(year) {
        this.yearInput.sendKeys(year);
    }

    getYearInput = function() {
        return this.yearInput.getAttribute('value');
    }

    contratoSelectLastOption = function() {
        this.contratoSelect.all(by.tagName('option')).last().click();
    }

    contratoSelectOption = function(option) {
        this.contratoSelect.sendKeys(option);
    }

    getContratoSelect = function() {
        return this.contratoSelect;
    }

    getContratoSelectedOption = function() {
        return this.contratoSelect.element(by.css('option:checked')).getText();
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
