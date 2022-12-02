# Advent of Code 2022

A problem-solving repo for my 2022 swipe at puzzles from https://adventofcode.com/

My goal here is to try to be as reactive as possible, so I'm going to allow
myself to use RxJS and play with some operators. I'm also going to try to
elevate my use of generic and reusable types, especially for testing.

Since I'm sharing items from the lib layer, I'm going to run all exercises
together and make sure I brake nothing as I evolve things.

## Usage

`npm run solution <filepath>`

Runs a single solution file. (Ex: `npx ts-node ./src/day-1/solution-1.ts`)

`npm run start:dev`

Starts the application in development using nodemon and ts-node for hot reload.

`npm run test`

Runs the tests in jest for everything.

`npm run lint`

Runs eslint.

`npm run prettier-format`

If you don't have format-on-save working in your editor, this runs it.
