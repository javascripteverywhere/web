# Cypress Tests

This directory contains integration tests written with [Cypress](https://www.cypress.io/) against the `/final` code examples. These are not written about in the book, but may prove useful as an example.

To run the tests locally, you must first have an instance of the final example API and web application up and running, with at least 11 notes in the database. Then you can run the tests with the Cypress UI or in headless mode:

```bash
npm run cy:open # ui mode
npm run cy:run # headless mode
```

If you're interested in learning more about testing with Cypress and JavaScript testing in general, I highly recommend [Testing JavaScript](https://testingjavascript.com) with Kent C. Dodds.
