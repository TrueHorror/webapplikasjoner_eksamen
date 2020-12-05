import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Articles from '../../pages/Articles';
import { compWrapper } from '../testUtils/compWrapper';
import { articles } from '../mockData/articles';

const server = setupServer(
  rest.get('http://localhost:3001/articles', (req, res, ctx) =>
    res(ctx.json(articles))
  )
);
server.listen();

jest.mock('web-vitals/dist/lib/generateUniqueID', () => ({
  generateUniqueID: jest.fn(() => Math.random() * 10000),
}));

test('articles are rendered correctly', async () => {
  render(compWrapper(<Articles />));
  const header = screen.getByText(/Fagartikler/i);
  expect(header).toBeInTheDocument();
  await waitFor(() => screen.getAllByText(/Teknologi/i));
  expect(screen.getByText(/Hvordan ri på hest\?/)).toBeInTheDocument();
});
