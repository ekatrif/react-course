// import matchers from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

// expect.extend(matchers);

const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();
