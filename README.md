# A GraphQL Experiment ![Build Status](https://travis-ci.org/IliasDeros/id-graphql-basics.svg?branch=master)](https://travis-ci.org/IliasDeros/id-graphql-basics)
Query an external REST API that returns big, hard to manage XML files and format response into JSON

## Prerequisites
* An API key from https://www.goodreads.com/
* NodeJS >= v8.1.5
* `yarn` [optional]

## Getting started
1. Checkout this repository
2. run `yarn` or `npm install`
3. execute server using `APIKEY=<goodreads api key> node serve.js`
4. Play around with API on `localhost:4000/graphql`

## Examples
Query an author's *name*

    query {
      author(id: 4432) {
        name
      }
    }

Query an author's *books*

    query {
      author(id: 4432) {
        books { isbn, title }
      }
    }