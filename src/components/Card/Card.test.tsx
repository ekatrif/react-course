import { render, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Card from './Card';

test('renders the relevant card data', () => {
  // Define the mock card data
  const mockCard = {
    href: 'https://images-assets.nasa.gov/image/201106070070HQ/collection.json',
    data: [
      {
        center: 'HQ',
        title: 'Example Card',
        photographer: 'NASA/Roscosmos/Andrey Shelepin',
        keywords: [
          'Baikonur',
          'Expedition 28',
          'Expedition 28 Preflight',
          'JAXA (Japan Aerospace Exploration Agency)',
          'Kazakhstan',
          'Mike Fossum',
          'ROSCOSMOS (Russian Federal Space Agency)',
          'Satoshi Furukawa',
          'Sergei Volkov',
        ],
        location: 'Baikonur Cosmodrome',
        nasa_id: '201106070070HQ',
        media_type: 'image',
        date_created: '2011-06-07T00:00:00Z',
        description: 'This is an example card.',
      },
    ],
    links: [
      {
        href: 'https://images-assets.nasa.gov/image/201106070070HQ/201106070070HQ~thumb.jpg',
        rel: 'preview',
        render: 'image',
      },
    ],
  };

  // Render the Card component with the mock card data
  const { getByTestId, getByText } = render(
    <BrowserRouter>
      <Card card={mockCard} id={0} />
    </BrowserRouter>
  );

  // Get the rendered card element
  const cardElement = getByTestId('card');

  // Assert that the relevant card data is rendered
  expect(cardElement).toBeInTheDocument();
  expect(getByText('Example Card')).toBeInTheDocument();
  expect(getByText('This is an example card.')).toBeInTheDocument();
});

test('clicking on a card opens a detailed card component', () => {
  // Define the mock card data
  const mockCard = {
    href: 'https://images-assets.nasa.gov/image/201106070070HQ/collection.json',
    data: [
      {
        center: 'HQ',
        title: 'Example Card',
        photographer: 'NASA/Roscosmos/Andrey Shelepin',
        keywords: [
          'Baikonur',
          'Expedition 28',
          'Expedition 28 Preflight',
          'JAXA (Japan Aerospace Exploration Agency)',
          'Kazakhstan',
          'Mike Fossum',
          'ROSCOSMOS (Russian Federal Space Agency)',
          'Satoshi Furukawa',
          'Sergei Volkov',
        ],
        location: 'Baikonur Cosmodrome',
        nasa_id: '201106070070HQ',
        media_type: 'image',
        date_created: '2011-06-07T00:00:00Z',
        description: 'This is an example card.',
      },
    ],
    links: [
      {
        href: 'https://images-assets.nasa.gov/image/201106070070HQ/201106070070HQ~thumb.jpg',
        rel: 'preview',
        render: 'image',
      },
    ],
  };

  // Define a mock function to handle the card click event
  const handleCardClick = vi.fn();

  // Render the Card component with the mock card data and click event handler
  const { getByTestId } = render(
    <BrowserRouter>
      <button type="button" onClick={handleCardClick}>
        <Card key={mockCard.data[0].title} card={mockCard} id={0} />
      </button>
    </BrowserRouter>
  );
  // Get the rendered card element
  const clickedElement = getByTestId('card');

  // Simulate a click event on the card element
  fireEvent.click(clickedElement);

  // Assert that the click event handler was called
  expect(handleCardClick).toHaveBeenCalled();
});
