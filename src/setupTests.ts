// import matchers from '@testing-library/jest-dom/matchers';
// import { expect } from 'vitest';

// expect.extend(matchers);
import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';

const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();
