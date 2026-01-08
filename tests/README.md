# Tests

This directory contains the test suite for the SIAR Client library.

## Structure

```
tests/
  ├── mocks/
  │   ├── mock-responses.ts   # Mock API responses
  │   └── sample-params.ts    # Sample request parameters
  └── unit/
      └── DataPetitionService.tests.ts  # Unit tests for DataPetitionService
```

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
- **Error Handling**: Network errors, HTTP errors (401, 404, 500), JSON parsing errors
- **Response Parsing**: Successful responses, empty data, messages
- **Generic Method**: Type-safe generic data retrieval

## Writing New Tests

When adding new tests:

1. Add mock data to [`mock-responses.ts`](mocks/mock-responses.ts) if needed
2. Add test parameters to [`sample-params.ts`](mocks/sample-params.ts) if needed
3. Follow the existing test structure with `describe` and `it` blocks
4. Mock `global.fetch` for all API calls
5. Test both success and error scenarios
