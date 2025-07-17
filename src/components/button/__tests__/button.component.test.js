import { render, screen } from '@testing-library/react';
import Button, { BUTTON_TYPE_CLASSES } from '../button.component';

describe("Button testing", () => {

    test("Render Intial", () => {
        render(<Button />);

        const element = screen.getByRole('button');
        expect(element).toHaveStyle('background-color: black;')

    });

    test("Render Google Sigin", () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);

        const element = screen.getByRole('button');
        expect(element).toHaveStyle('background-color:#4285f4;')

    });

    test("Render Inverted", () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);

        const element = screen.getByRole('button');
        expect(element).toHaveStyle('background-color:white;')

    });

    test("Disable when isLoading true", () => {
        render(<Button isLoading={true} />);

        const element = screen.getByRole('button');
        //expect(element).toHaveStyle('background-color:white;')
        expect(element).toBeDisabled(true);

    });

})