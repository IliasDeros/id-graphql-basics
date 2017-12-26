# A GraphQL Experiment
Playing around with graphql following the tutorial at https://www.youtube.com/watch?v=lAJWHHUz8_8

## Prerequisites
* An API key from https://www.goodreads.com/
* NodeJS >= v8.1.5
* `yarn` [optional]

## Getting started
1- Checkout this repository
2- run `yarn` or `npm install`
3- execute server using `APIKEY=<goodreads api key> node serve.js`
4- Play around with API on `localhost:4000`

## Examples
Query an author's name

    query {
      author(id: 4432) {
        name
      }
    }
