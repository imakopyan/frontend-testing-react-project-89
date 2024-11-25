import { render } from '@testing-library/react';
import { expect } from 'vitest';
import App from '../../src/App';

export class AppPage {
    static render() {
        render(<App />);
    }
    constructor(screen, user) {
        this.screen = screen;
        this.user = user;
        this.form = {
            email: { label: 'Email', node: null },
            password: { label: 'Пароль', node: null},
            address: { label: 'Адрес', node: null },
            city: { label: 'Город', node: null },
        };
    }

    verifyFormFieldsDisplayed() {
        Object.keys(this.form).forEach((key) => {
            this.form[key].node = this.screen.getByLabelText(this.form[key].label);
        });
    }

    async fillFormFiedl() {
        const { email, password, address, city } = this.form;

        await this.user.type(email.node, 'example@mail.ru');
        await this.user.type(password.node, 'Qwerty11');
        await this.user.type(address.node, 'Москва');
        await this.user.type(city.node, 'Москва');
        
        const countrySelect = this.screen.getByLabelText(/страна/i);
        await this.user.selectOptions(countrySelect, 'Россия');

        const checkbox = this.screen.getByRole('checkbox', { name: /принять правила/i });
        expect(checkbox).not.toBeChecked();
        await this.user.click(checkbox);
        expect(checkbox).toBeChecked();
    }

    async submitForm() {
        await this.user.click(this.screen.getByText('Зарегистрироваться'));
    }

    expectedSubmitResult() {
        expect(this.screen.getByText('Принять правила').nextSibling).toHaveTextContent('true');
        expect(this.screen.getByText('Адрес').nextSibling).toHaveTextContent('Москва');
        expect(this.screen.getByText('Город').nextSibling).toHaveTextContent('Москва');
        expect(this.screen.getByText('Страна').nextSibling).toHaveTextContent('Россия');
        expect(this.screen.getByText('Email').nextSibling).toHaveTextContent('example@mail.ru');
    }
    
}