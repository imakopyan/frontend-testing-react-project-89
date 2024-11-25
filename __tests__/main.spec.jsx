import { screen, cleanup } from '@testing-library/react';
import { expect, test, beforeEach, vi, describe, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { WidgetPage } from './pages/WidgetPage';
import { AppPage } from './pages/AppPage';

const mockScrollIntoView = vi.fn();

// Перед каждым тестом устанавливаем мок для scrollIntoView и очищаем все моки
beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
    vi.clearAllMocks();
});

// После каждого теста очищаем рендер
afterEach(() => {
    cleanup();
});

// Группа тестов для виджета
describe('Тест виджета', () => {
    test('Открывает диалог и проверяет его содержимое', async () => {
        WidgetPage.render();
        const user = userEvent.setup();
        const widget = new WidgetPage(screen, user);

        await widget.openDialog();
        await widget.verifyDialogIsOpen();
    });

    test('Закрывает диалог после открытия', async () => {
        WidgetPage.render();
        const user = userEvent.setup();
        const widget = new WidgetPage(screen, user);

        await widget.openDialog();
        await widget.closeDialog();

       
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('Открывает разговор и проверяет содержимое первого экрана', async () => {
        WidgetPage.render();
        const user = userEvent.setup();
        const widget = new WidgetPage(screen, user);

        await widget.openDialog();
        await widget.startDialog();
        await widget.verifyConversationStarted();
        await widget.changeProfessionOrGetAjob();
    });

    test('При новом сообщении scrollIntoView', async () => {
        WidgetPage.render();
        const user = userEvent.setup();
        const widget = new WidgetPage(screen, user);
        await widget.openDialog();
        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
        await widget.startDialog();
        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(2);
    });
});

// Группа тестов для приложения
describe('Тест приложения', () => {
    test('Форма отображается и отправляется', async () => {
        const user = userEvent.setup();
        AppPage.render();
        const app = new AppPage(screen, user);
        app.verifyFormFieldsDisplayed();
        await app.fillFormFiedl();
        await app.submitForm();
        app.expectedSubmitResult();
    });

    test('Виджет не влияет на функциональность приложения', async () => {
        const user = userEvent.setup();
        AppPage.render();
        const app = new AppPage(screen, user);
        const widget = new WidgetPage(screen, user);

        await widget.openDialog();
        await widget.verifyDialogIsOpen();
        app.verifyFormFieldsDisplayed();
    });
});

  