import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import React from 'react';
import Articles from '../../pages/Articles';
import { compWrapper } from '../testUtils/compWrapper';
import {
  nonSecretArticles,
  allArticles,
  categories,
} from '../mockData/articles';
import Auth from '../../utils/authentication';

const server = setupServer(
  rest.get('http://localhost:3001/articles/non-secret', (req, res, ctx) =>
    res(ctx.json(nonSecretArticles))
  ),
  rest.get('http://localhost:3001/articles/secret', (req, res, ctx) =>
    res(ctx.json(allArticles))
  ),
  rest.get('http://localhost:3001/category', (req, res, ctx) =>
    res(ctx.json(categories))
  )
);
server.listen();

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe('Rendering of articles', () => {
  test('articles are rendered correctly', async () => {
    render(compWrapper(<Articles />));
    const header = screen.getByText(/Fagartikler/i);
    expect(header).toBeInTheDocument();
    await waitFor(() => screen.getAllByText(/Teknologi/i));
    expect(screen.getByText(/Hvordan ri på hest\?/)).toBeInTheDocument();
  });

  test('A logged in user can see secret and open articles', async () => {
    render(
      compWrapper(<Articles />, {
        loggedInUser: {
          email: 'admin@admin.no',
        },
      })
    );
    expect(
      await waitFor(() => screen.findByText('Hvordan style weben'))
    ).toBeInTheDOM();
    expect(
      screen.getByText(/Hvordan kjøpe mat på butikken/i)
    ).toBeInTheDocument();
  });

  test('A user not logged in should not see secret articles', async () => {
    render(compWrapper(<Articles />));
    expect(
      await waitFor(() => screen.getByText(/Hvordan style weben/i))
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Hvordan kjøpe mat på butikken/i)
    ).not.toBeInTheDocument();
  });
});

describe('Pagination', () => {
  test('A user can move between pages with articles by arrow buttons', async () => {
    render(
      compWrapper(<Articles />, {
        loggedInUser: {
          email: 'admin@admin.no',
        },
      })
    );
    await waitFor(() => screen.getByText(/Hvordan style weben/i));
    fireEvent.click(screen.getByTestId('next-page-button'));
    expect(
      screen.getByText(/Hva er fredrik sitt favoritt spill/i)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('previous-page-button'));
    expect(screen.getByText(/Hvordan style weben/i)).toBeInTheDocument();
  });

  test('A user can move between pages with articles by using numbered buttons', async () => {
    render(
      compWrapper(<Articles />, {
        loggedInUser: {
          email: 'admin@admin.no',
        },
      })
    );
    await waitFor(() => screen.getByText(/Hvordan style weben/i));
    fireEvent.click(screen.getByTestId('pag-button-1'));
    expect(
      screen.getByText(/Hva er fredrik sitt favoritt spill/i)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('pag-button-0'));
    expect(screen.getByText(/Hvordan style weben/i)).toBeInTheDocument();
  });
});

describe('Filtering', () => {
  test('A user can filter by typing in letters', async () => {
    render(
      compWrapper(<Articles />, {
        loggedInUser: {
          email: 'admin@admin.no',
        },
      })
    );
    await waitFor(() => screen.getByText(/Hvordan style weben/i));
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'fredrik' },
    });
    await waitFor(() =>
      screen.getByText(/Hva er fredrik sitt favoritt spill/i)
    );
    expect(
      screen.getByText(/Hva er fredrik sitt favoritt spill/i)
    ).toBeInTheDocument();
  });

  test('A user can filter on category', async () => {
    render(
      compWrapper(<Articles />, {
        loggedInUser: {
          email: 'admin@admin.no',
        },
      })
    );
    await waitFor(() => screen.getByText(/Hvordan style weben/i));
    await waitFor(() =>
      userEvent.selectOptions(screen.getByTestId('category-select'), 'Baking')
    );
    userEvent.selectOptions(screen.getByTestId('category-select'), [
      '5fcbea70bbaf5968e41bab36',
    ]);
    await waitFor(() => screen.getByText(/adventskalenderen/i));
    expect(screen.queryByText(/adventskalenderen/i)).toBeInTheDocument();
    expect(screen.queryByText(/Hvordan style weben/i)).not.toBeInTheDocument();
  });

  test('A user can filter on both category and search', async () => {
    render(
      compWrapper(<Articles />, {
        loggedInUser: {
          email: 'admin@admin.no',
        },
      })
    );
    await waitFor(() => screen.getByText(/Hvordan style weben/i));

    await waitFor(() =>
      userEvent.selectOptions(screen.getByTestId('category-select'), 'Romfart')
    );
    userEvent.selectOptions(screen.getByTestId('category-select'), [
      '5fca6436b67bb6b7b0a4230d',
    ]);
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'hemmelig' },
    });
    await waitFor(() => {
      expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    });
    expect(screen.queryByText(/hemmelig/i)).toBeInTheDocument();
    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
  });
});

describe('Admin rights in articles page', () => {
  jest.mock('../../utils/authentication', () => jest.fn());

  test('Admin gets to see "create new article button"', () => {
    Auth.userIsLoggedInAsAdmin = jest.fn(() => true);
    render(
      compWrapper(<Articles />, {
        loggedInUser: {
          email: 'admin@admin.no',
        },
      })
    );
    expect(screen.queryByText('NY ARTIKKEL')).toBeInTheDocument();
  });

  test('Non-admin does not see "create new article button"', () => {
    Auth.userIsLoggedInAsAdmin = jest.fn(() => false);
    render(
      compWrapper(<Articles />, {
        loggedInUser: {
          email: 'admin@admin.no',
        },
      })
    );
    expect(screen.queryByText('NY ARTIKKEL')).not.toBeInTheDocument();
  });
});
