// Imports
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';

// To Test
import SignIn from '../app/pages/auth/signin';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// Tests
describe('SignIn render', async () => {
  it('should render SignIn page', async () => {
    render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <SignIn />
      </MemoryRouter>
    );

    const text = await screen.queryByText('Inicio de sesión');

    expect(text).not.toBeNull();
  });
});
