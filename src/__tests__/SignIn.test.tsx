// Imports
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';
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
      <StaticRouter
        location={{ pathname: '/auth/login', state: { signup: false } }}
      >
        <SignIn />
      </StaticRouter>
    );

    const text = await screen.queryByText('Inicio de sesión');

    expect(text).not.toBeNull();
  });
});
