# Simple Artificial Website Clics

This is a simple Node.js script that launches a Puppeteer browser window, navigates to Google, performs a search for a random query from a given array of keywords, clicks on a given URL link in the search results, waits for the page to load, and logs a success message to the console.

## Installation

- Clone the repository: `git clone https://github.com/tetuaoro/artificial-website-clics.git`
- Navigate to the project directory: `cd artificial-website-clics`
- Install dependencies: `pnpm install`

## Usage

```bash
node index.mjs <keywords> <url>
```

- keywords: An array of search keywords to randomly choose from.
- url: The URL link to click on in the search results.

## Warning

This tool is designed for testing search engine results only, and should not be used for artificial clicks on websites.

This script is designed to automate testing of search results, and is not intended for generating artificial clicks. The purpose of this script is to navigate to a Google search page, enter a search query, and click on a specified link within the search results. This script is intended for use as a testing tool and should not be used to artificially inflate website traffic or manipulate search rankings. Use at your own risk and discretion.
