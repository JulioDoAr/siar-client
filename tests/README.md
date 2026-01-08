# Tests

This directory contains the test suite for the SIAR Client library.

## Structure

```
tests/
  ├── mocks/
  │   ├── mock-responses.ts            # Mock API responses used across suites
  │   └── sample-params.ts             # Sample request parameters for data calls
  ├── unit/
  │   ├── InformationService.test.js   # Unit tests for information endpoints
  │   └── PetitionService.test.js       # Unit tests for data petition endpoints
  ├── integration/
  │   ├── DataService.integration.test.js        # Service-level mapping for data endpoints
  │   └── InformationService.integration.test.js # Service-level mapping for info endpoints
  └── e2e/
      └── SIARClient.test.ts           # End-to-end test hitting live SIAR API
```

## Environment requirements

- End-to-end tests require a valid `SIAR_API_KEY` environment variable. Set it before running `tests/e2e/SIARClient.test.ts` so live requests authenticate correctly.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

The test suite covers:

- **Constructor**: Service initialization
- **URL Construction**: Proper URL building with all parameters
- **HTTP Methods**: All data retrieval methods (hourly, daily, weekly, monthly, encoded)
- **Parameter Handling**: Single/multiple IDs, optional parameters, special characters
- **Response Parsing**: Successful responses, empty data, messages
- **Generic Method**: Type-safe generic data retrieval

## Writing New Tests

When adding new tests:

1. Add mock data to [`mock-responses.ts`](mocks/mock-responses.ts) if needed
2. Add test parameters to [`sample-params.ts`](mocks/sample-params.ts) if needed
3. Follow the existing test structure with `describe` and `it` blocks
4. Mock `global.fetch` for all API calls
5. Test both success and error scenarios
