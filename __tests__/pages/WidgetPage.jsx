import { expect } from 'vitest';
import { render } from '@testing-library/react';
import Widget from '@hexlet/chatbot-v2';
import steps from '../../__fixtures__/step';

export class WidgetPage {
    static render() {
        render(Widget(steps));
    }
    constructor(screen, user) {
        this.screen = screen;
        this.user = user;
    }

    async openDialog() {
        const button = this.screen.getByText('Открыть Чат');
        await this.user.click(button);
    }
    
    async verifyDialogIsOpen() {
        const dialog = await this.screen.findByRole('dialog');
        const closeButton = this.screen.getByLabelText('Close');
        const startDialogButton = this.screen.getByText('Начать разговор');
        const dialogTitle = 'Виртуальный помощник';

        expect(dialog).toHaveTextContent(dialogTitle);
        expect(startDialogButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
    }

    async closeDialog() {
        const closeButton = this.screen.getByLabelText('Close');
        await this.user.click(closeButton);
    }

    async startDialog() {
        const startDialogButton = await this.screen.findByText('Начать разговор');
        await this.user.click(startDialogButton);
    }

    async verifyConversationStarted() {
        const nextStepMessage = await this.screen.findByText(/Помогу вам выбрать подходящий курс/i);
        const switchButton = await this.screen.findByText('Сменить профессию или трудоустроиться');
        const tryButton = await this.screen.findByText('Попробовать себя в IT');
        const advancedButton = await this.screen.findByText('Я разработчик, хочу углубить свои знания');

        expect(nextStepMessage).toBeInTheDocument();
        expect(switchButton).toBeInTheDocument();
        expect(tryButton).toBeInTheDocument();
        expect(advancedButton).toBeInTheDocument();
    }
    
    async changeProfessionOrGetAjob() {
        const switchButton = await this.screen.findByText('Сменить профессию или трудоустроиться');
        await this.user.click(switchButton);

        const nextStepMessage = await this.screen.findByText(/У нас есть программы обучения новой профессии/i);
        const detailsButton = await this.screen.findByText('Расскажи подробнее');
        const otherTryButton = await this.screen.findByText('А есть что-нибудь попроще');
        const starButton = await this.screen.findByText('Вернуться в начало');

        expect(nextStepMessage).toBeInTheDocument();
        expect(detailsButton).toBeInTheDocument();
        expect(otherTryButton).toBeInTheDocument();
        expect(starButton).toBeInTheDocument();

        await this.user.click(detailsButton);

        const programMessage = await this.screen.findByText(/У нас есть программы обучения новой профессии./i);
        const writeCourseButton = await this.screen.findByText('Останусь здесь, запишусь на курс');

        expect(programMessage).toBeInTheDocument();
        expect(writeCourseButton).toBeInTheDocument();

        await this.user.click(writeCourseButton);
    }
}