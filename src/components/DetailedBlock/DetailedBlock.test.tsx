import { test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetailedBlock from './DetailedBlock';
import { AppContext } from '../../context';
import { ICard } from '../Card/Card';
import '@testing-library/jest-dom';

test('displays the detailed card data correctly', () => {
  const mockCards: ICard[] = [
    {
      href: 'https://images-assets.nasa.gov/image/201106070070HQ/collection.json',
      data: [
        {
          center: 'HQ',
          title: 'Expedition 28 Preflight',
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
          description:
            'Expedition 28 NASA Flight Engineer Mike Fossum, left, Soyuz Commander Sergei Volkov of Russia, and JAXA (Japan Aerospace Exploration Agency) Flight Engineer Satoshi Furukawa, right, have their Russian Sokol suits prepared for launch by a technicians at the Baikonur Cosmodrome in Baikonur, Kazakhstan, Tueday, June 7, 2011.  Fossum, Volkov and Furukawa and launched in their Soyuz TMA-02M rocket from the Baikonur Cosmodrome in Kazakhstan the following morning on June 8th. Photo Credit: (NASA/Roscosmos/Andrey Shelepin)',
        },
      ],
      links: [
        {
          href: 'https://images-assets.nasa.gov/image/201106070070HQ/201106070070HQ~thumb.jpg',
          rel: 'preview',
          render: 'image',
        },
      ],
    },
    {
      href: 'https://images-assets.nasa.gov/image/201106070074HQ/collection.json',
      data: [
        {
          center: 'HQ',
          title: 'Expedition 28 Preflight',
          photographer: 'NASA/Roscosmos/Andrey Shelepin',
          keywords: [
            'Andre Kuipers',
            'Baikonur',
            'Don Pettit',
            'ESA (European Space Agency)',
            'Expedition 28',
            'Expedition 28 Preflight',
            'JAXA (Japan Aerospace Exploration Agency)',
            'Kazakhstan',
            'Mike Fossum',
            'Oleg Kononenko',
            'ROSCOSMOS (Russian Federal Space Agency)',
            'Satoshi Furukawa',
            'Sergei Volkov',
          ],
          location: 'Baikonur Cosmodrome',
          nasa_id: '201106070074HQ',
          media_type: 'image',
          date_created: '2011-06-07T00:00:00Z',
          description:
            'Expedition 28 NASA Flight Engineer Mike Fossum, front left, Expedition 28 Soyuz Commander Sergei Volkov, front center, and Expedition 28 JAXA (Japan Aerospace Exploration Agency)Flight Engineer Satoshi Furukawa pose with backup crewmembers NASA Flight Engineer Don Pettit of the U.S., back left, Flight Engineer Oleg Kononenko of Russia, back center, and ESA (European Space Agency) Flight Engineer Andre Kuipers of The Netherlands, prior to the crews’ launch onboard a Soyuz rocket to the International Space Station on Tuesday, June 7, 2011, in Baikonur, Kazakhstan.  Photo Credit: (NASA/Roscosmos/Andrey Shelepin)',
        },
      ],
      links: [
        {
          href: 'https://images-assets.nasa.gov/image/201106070074HQ/201106070074HQ~thumb.jpg',
          rel: 'preview',
          render: 'image',
        },
      ],
    },
    {
      href: 'https://images-assets.nasa.gov/image/201106080002HQ/collection.json',
      data: [
        {
          center: 'HQ',
          title: 'Expedition 28 Launch',
          photographer: 'NASA/Carla Cioffi',
          keywords: [
            'Expedition 28 Launch',
            'Expedition 28',
            'Baikonur',
            'Kazakhstan',
            'Baikonur Cosmodrome',
            'ROSCOSMOS (Russian Federal Space Agency)',
            'JAXA (Japan Aerospace Exploration Agency)',
            'Soyuz Rocket',
            'Soyuz Launch Pad',
            'Soyuz TMA-02M',
          ],
          location: 'Baikonur Cosmodrome',
          nasa_id: '201106080002HQ',
          media_type: 'image',
          date_created: '2011-06-07T00:00:00Z',
          description:
            'The Soyuz TMA-02M spacecraft launches from the Baikonur Cosmodrome in Kazakhstan early Wednesday, June 8, 2011 carrying Expedition 28 Soyuz Commander Sergei Volkov of Russia, NASA Flight Engineer Mike Fossum and JAXA (Japan Aerospace Exploration Agency) Flight Engineer Satoshi Furukawa to the International Space Station. They will arrive at the station Thursday to join the Expedition 28 crew. Photo Credit: (NASA/Carla Cioffi)  ',
        },
      ],
      links: [
        {
          href: 'https://images-assets.nasa.gov/image/201106080002HQ/201106080002HQ~thumb.jpg',
          rel: 'preview',
          render: 'image',
        },
      ],
    },
  ];
  const mockContext = {
    state: {
      cards: mockCards,
      searchText: '',
      pages: 1,
      cardsCount: 0,
      page: 1,
      cardsPerPage: 1,
      isLoading: true,
    },
    dispatch: () => {},
  };

  vi.mock('react-router-dom', async () => {
    const mod = (await vi.importActual('react-router-dom')) as object;
    return {
      ...mod,
      useParams: () => ({
        id: 1,
      }),
    };
  });

  const { getByTestId } = render(
    <BrowserRouter>
      <AppContext.Provider value={mockContext}>
        <DetailedBlock />
      </AppContext.Provider>
    </BrowserRouter>
  );

  const detailedElement = getByTestId('detailed-title');
  expect(detailedElement).toBeInTheDocument();
  expect(detailedElement).toHaveTextContent('Expedition 28 Preflight');
});

test('clicking the close button hides the component', () => {
  const mockCards: ICard[] = [
    {
      href: 'https://images-assets.nasa.gov/image/201106070070HQ/collection.json',
      data: [
        {
          center: 'HQ',
          title: 'Expedition 28 Preflight',
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
          description:
            'Expedition 28 NASA Flight Engineer Mike Fossum, left, Soyuz Commander Sergei Volkov of Russia, and JAXA (Japan Aerospace Exploration Agency) Flight Engineer Satoshi Furukawa, right, have their Russian Sokol suits prepared for launch by a technicians at the Baikonur Cosmodrome in Baikonur, Kazakhstan, Tueday, June 7, 2011.  Fossum, Volkov and Furukawa and launched in their Soyuz TMA-02M rocket from the Baikonur Cosmodrome in Kazakhstan the following morning on June 8th. Photo Credit: (NASA/Roscosmos/Andrey Shelepin)',
        },
      ],
      links: [
        {
          href: 'https://images-assets.nasa.gov/image/201106070070HQ/201106070070HQ~thumb.jpg',
          rel: 'preview',
          render: 'image',
        },
      ],
    },
    {
      href: 'https://images-assets.nasa.gov/image/201106070074HQ/collection.json',
      data: [
        {
          center: 'HQ',
          title: 'Expedition 28 Preflight',
          photographer: 'NASA/Roscosmos/Andrey Shelepin',
          keywords: [
            'Andre Kuipers',
            'Baikonur',
            'Don Pettit',
            'ESA (European Space Agency)',
            'Expedition 28',
            'Expedition 28 Preflight',
            'JAXA (Japan Aerospace Exploration Agency)',
            'Kazakhstan',
            'Mike Fossum',
            'Oleg Kononenko',
            'ROSCOSMOS (Russian Federal Space Agency)',
            'Satoshi Furukawa',
            'Sergei Volkov',
          ],
          location: 'Baikonur Cosmodrome',
          nasa_id: '201106070074HQ',
          media_type: 'image',
          date_created: '2011-06-07T00:00:00Z',
          description:
            'Expedition 28 NASA Flight Engineer Mike Fossum, front left, Expedition 28 Soyuz Commander Sergei Volkov, front center, and Expedition 28 JAXA (Japan Aerospace Exploration Agency)Flight Engineer Satoshi Furukawa pose with backup crewmembers NASA Flight Engineer Don Pettit of the U.S., back left, Flight Engineer Oleg Kononenko of Russia, back center, and ESA (European Space Agency) Flight Engineer Andre Kuipers of The Netherlands, prior to the crews’ launch onboard a Soyuz rocket to the International Space Station on Tuesday, June 7, 2011, in Baikonur, Kazakhstan.  Photo Credit: (NASA/Roscosmos/Andrey Shelepin)',
        },
      ],
      links: [
        {
          href: 'https://images-assets.nasa.gov/image/201106070074HQ/201106070074HQ~thumb.jpg',
          rel: 'preview',
          render: 'image',
        },
      ],
    },
    {
      href: 'https://images-assets.nasa.gov/image/201106080002HQ/collection.json',
      data: [
        {
          center: 'HQ',
          title: 'Expedition 28 Launch',
          photographer: 'NASA/Carla Cioffi',
          keywords: [
            'Expedition 28 Launch',
            'Expedition 28',
            'Baikonur',
            'Kazakhstan',
            'Baikonur Cosmodrome',
            'ROSCOSMOS (Russian Federal Space Agency)',
            'JAXA (Japan Aerospace Exploration Agency)',
            'Soyuz Rocket',
            'Soyuz Launch Pad',
            'Soyuz TMA-02M',
          ],
          location: 'Baikonur Cosmodrome',
          nasa_id: '201106080002HQ',
          media_type: 'image',
          date_created: '2011-06-07T00:00:00Z',
          description:
            'The Soyuz TMA-02M spacecraft launches from the Baikonur Cosmodrome in Kazakhstan early Wednesday, June 8, 2011 carrying Expedition 28 Soyuz Commander Sergei Volkov of Russia, NASA Flight Engineer Mike Fossum and JAXA (Japan Aerospace Exploration Agency) Flight Engineer Satoshi Furukawa to the International Space Station. They will arrive at the station Thursday to join the Expedition 28 crew. Photo Credit: (NASA/Carla Cioffi)  ',
        },
      ],
      links: [
        {
          href: 'https://images-assets.nasa.gov/image/201106080002HQ/201106080002HQ~thumb.jpg',
          rel: 'preview',
          render: 'image',
        },
      ],
    },
  ];
  const mockContext = {
    state: {
      cards: mockCards,
      searchText: '',
      pages: 1,
      cardsCount: 0,
      page: 1,
      cardsPerPage: 1,
      isLoading: true,
    },
    dispatch: () => {},
  };

  vi.mock('react-router-dom', async () => {
    const mod = (await vi.importActual('react-router-dom')) as object;
    return {
      ...mod,
      useParams: () => ({
        id: 1,
      }),
    };
  });
  const { queryByTestId } = render(
    <BrowserRouter>
      <AppContext.Provider value={mockContext}>
        <DetailedBlock />
      </AppContext.Provider>
    </BrowserRouter>
  );

  const closeButton = queryByTestId('close-button') as Element;
  fireEvent.click(closeButton);

  setTimeout(() => {
    const detailedElement = queryByTestId('detailed');
    expect(detailedElement).not.toBeInTheDocument();
  }, 0);
});
