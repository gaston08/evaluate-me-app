// Imports
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import {
  MemoryRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
// To Test
import App from '../app/app';
import { arrRoutes } from '../app/routes';
import ThemeWrapper from '../app/components/ThemeWrapper';
import { axiosPost } from 'app/utils/axios';

import { ClipboardEventMock, DragEventMock } from './richTextTestUtils';

(global as any).ClipboardEvent = ClipboardEventMock;
(global as any).DragEvent = DragEventMock;

vi.mock('app/utils/axios');

const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk4ODczNjM5YTI2NTAxNGExNjQwNzUiLCJlbWFpbCI6Imdhc3RpQGdtYWlsLmNvbSIsInRva2VucyI6W10sImNyZWF0ZWRBdCI6IjIwMjQtMDEtMDVUMjI6NDg6MjIuNjA4WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDEtMDVUMjI6NDg6MjIuNjA4WiIsIl9fdiI6MCwiaWF0IjoxNzA0NDk0OTEwLCJleHAiOjE3MDQ3MTA5MTB9.otU8ll9U55MRwcCd_ghuw1VjQBQK__vlFK-5iJ6V4UI';

beforeEach(() => {});

afterEach(() => {});

const setupAuthPages = (initialRoute) => {
  const router = createMemoryRouter(arrRoutes, {
    initialEntries: [initialRoute],
    initialIndex: 0,
  });

  const { unmount } = render(
    <ThemeWrapper>
      <RouterProvider router={router} />
    </ThemeWrapper>
  );

  return { router, unmount };
};

// Tests
describe('App render', async () => {
  /*
  describe('/auth/login', async () => {
    it('should render SignIn page withtout after creation message', async () => {
      const { unmount } = render(
        <MemoryRouter
          initialEntries={[
            { pathname: '/auth/login', state: { signup: false } },
          ]}
        >
          <App />
        </MemoryRouter>
      );

      const loginText = await screen.queryByText(/Inicio de sesión/);
      const afterCreationMessage = await screen.queryByText(
        /Usuario creado con éxito/
      );

      unmount();

      expect(loginText).not.toBeNull();
      expect(afterCreationMessage).toBeNull();
    });

    it('should render SignIn page with after creation message', async () => {
      const { unmount } = render(
        <MemoryRouter
          initialEntries={[
            { pathname: '/auth/login', state: { signup: true } },
          ]}
        >
          <App />
        </MemoryRouter>
      );

      const loginText = await screen.queryByText(/Inicio de sesión/);
      const afterCreationMessage = await screen.queryByText(
        /Usuario creado con éxito/
      );

      unmount();

      expect(loginText).not.toBeNull();
      expect(afterCreationMessage).not.toBeNull();
    });
  });*/

  describe('testing redirect auth protection', async () => {
    it('should redirect to /auth/login when trying to access /admin/exam/create as a not logged in user', async () => {
      const { router, unmount } = setupAuthPages('/admin/exam/create');

      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/auth/login');
      });

      act(() => {
        localStorage.setItem('access_token', access_token);
        axiosPost.mockResolvedValue({
          data: { ok: false },
        });
        router.navigate('/admin/exam/create');
      });

      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/auth/login');
      });
    });

    it('should redirect to /blog/exam when trying to access /auth/login and /auth/signup as a logged in user', async () => {
      axios.post.mockResolvedValue({
        data: { ok: true },
      });
      localStorage.setItem('access_token', access_token);
      const { router, unmount } = setupAuthPages('/auth/login');

      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/blog/exam');
      });

      act(() => {
        router.navigate('/auth/signup');
      });

      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/blog/exam');
      });
      unmount();
      localStorage.removeItem('access_token', access_token);
    });
  });
});
