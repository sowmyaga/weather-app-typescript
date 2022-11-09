import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const componentRenderByMemoryRouter = (
    routingPath: string | '',
    componentName: ReactElement
) => {
    render(
        <MemoryRouter initialEntries={[routingPath]}>
            {componentName}
        </MemoryRouter>
    );
};

export const toBeExpectByTestId = (testId: string) => {
    return expect(screen.getByTestId(`${testId}`)).toBeInTheDocument();
};

export const toBeExpectByText = (text: string) => {
    return expect(screen.getByText(`${text}`)).toBeInTheDocument();
};