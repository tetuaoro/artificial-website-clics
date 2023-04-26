/** First, make sure you have installed Node.js and its package manager (npm)
 * Clone the project or create a new project folder and navigate to it
 * Then, in the terminal, run "npm init -y" to initialize a new Node.js project
 * Install the required dependencies for this script: "npm install puppeteer node-cron"
 * This script takes three command line arguments: query keywords, URL, and scheduler (in CRON format)
 * To run the script, open a terminal window and navigate to the project directory
 * Run the script with this command: "node index.js <query keywords> <URL>"
 * The query keywords and URL must be surrounded by quotes if they contain spaces
 * This will run the script every 10 seconds with the specified query keywords and URL
 * To stop the script, press Ctrl + C in the terminal window
*/
import puppeteer from "puppeteer"
import cron from "node-cron"

const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"

/**
 * Opens a new Puppeteer browser window and navigates to Google.
 * Performs a search for a random query from the given array of keywords,
 * clicks on the given URL link in the search results, waits for the page to load,
 * and logs a success message to the console.
 *
 * @param {string[]} keywords - An array of search keywords to randomly choose from.
 * @param {string} url - The URL link to click on in the search results.
 * @returns {Promise<void>}
 */
const app = async (keywords = [""], url = "") => {
  try {
    console.log("Launch an instance with parameters :", keywords, url)

    // Launch a new Puppeteer browser instance
    const browser = await puppeteer.launch()
    // Open a new page in the browser
    const page = await browser.newPage()

    // Set user agent
    await page.setUserAgent(userAgent)

    // Navigate to Google homepage
    await page.goto("https://www.google.com/")

    // Click on the 'Allow All' cookies button
    const allowCookiesBtn = 'button[id="L2AGLb"]'
    await page.waitForSelector(allowCookiesBtn)
    await page.click(allowCookiesBtn)

    // Type in search query and press Enter
    const query = keywords[Math.floor(Math.random() * keywords.length)]
    await page.type('[name="q"]', query, { delay: 300 })
    await page.keyboard.press("Enter")

    // Wait for the link to appear and click on it
    const link = await page.waitForSelector(`a[href="${url}"] h3.LC20lb`)
    if (link) {
      // Scroll the link into view and click on it
      await link.scrollIntoView()
      await link.click()

      // Wait for the page to load after clicking on the link
      let response = await page.waitForNavigation()
      if (response) {
        // Take a screenshot of the page
        // await page.screenshot({ path: "file.png" })

        // Wait for 10 seconds and log a success message to the console
        await new Promise((r) =>
          setTimeout(() => {
            console.log(`Succesfully called the ${url} with the query "${query}"`)
            r()
          }, 10_000)
        )
      } else {
        throw new Error("Failed to load the link page !")
      }
    } else {
      throw new Error("Failed to load results !")
    }

    // Close the browser
    await browser.close()
  } catch (error) {
    throw error
  }
}

// Get command line arguments
const args = process.argv
const keywords = args.slice(2, args.length - 1)
const url = args[args.length - 1]

// Run a scheduler that calls the app and handles errors
const task = cron.schedule("0 0 */1 * * *", async () => {
  try {
    console.log("Simple Artificial Website Clics")

    if (args.length < 4) task.stop()

    // Call the app with the extracted arguments
    await app(keywords, url)
  } catch (error) {
    console.error("Throw AWC\n", error)
  }
})

task.start()
