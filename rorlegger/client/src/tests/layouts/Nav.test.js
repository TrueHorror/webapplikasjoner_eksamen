import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { compWrapper } from '../testUtils/compWrapper';
import Nav from '../../layouts/Nav';
import Auth from '../../utils/authentication';

describe('Rendering of menu', () => {
  test('Renders the usual items', () => {
    render(compWrapper(<Nav />));
    expect(screen.getByText('Hjem')).toBeInTheDocument();
    expect(screen.getByText('Kontorer')).toBeInTheDocument();
    expect(screen.getByText('Fagartikler')).toBeInTheDocument();
    expect(screen.getByText('Kontakt')).toBeInTheDocument();
    expect(screen.getByText('Logg inn')).toBeInTheDocument();
    expect(screen.queryByText('User Tracking')).not.toBeInTheDocument();
  });

  test('Renders user info if user is logged in', () => {
    jest.mock('../../utils/authentication', () => jest.fn());
    Auth.userIsLoggedIn = jest.fn(() => true);
    render(
      compWrapper(<Nav />, {
        loggedInUser: {
          email: 'admin@admin.no',
          givenName: 'jon',
        },
      })
    );
    expect(screen.queryByText(/Logget inn som:/)).toBeInTheDocument();
  });

  test('Renders user tracking also if admin is logged in', () => {
    jest.mock('../../utils/authentication', () => jest.fn());
    Auth.userIsLoggedInAsAdmin = jest.fn(() => true);
    render(compWrapper(<Nav />));
    expect(screen.getByText('User Tracking')).toBeInTheDocument();
  });
});
