const puppeteer = require("puppeteer");
async function Scrapper() {
  let browser = await puppeteer.launch({ headless: false });
  async function daraz_scrapper() {
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto("https://www.daraz.pk/", { timeout: 0 });
    await page.type("#q", " puffer jacket \n");
    try {
      await page.waitForSelector(".gridItem--Yd0sa");
      const allProducts = await page.evaluate(() => {
        const prods = document.querySelectorAll(".gridItem--Yd0sa");

        return Array.from(prods).map((prod) => {
          const link = prod.querySelector("a").href;
          const title = prod.querySelector(".title--wFj93").textContent;
          const price = prod.querySelector(".price--NVB62").textContent;
          const img = prod.querySelector("#id-img").src;
          return { title, price, link, img };
        });
      });
      allProducts.sort(
        (a, b) =>
          Number(
            a.price.substring(a.price.indexOf(" "), a.price.indexOf(",")) +
              a.price.substring(a.price.indexOf(",") + 1)
          ) -
          Number(
            b.price.substring(b.price.indexOf(" "), b.price.indexOf(",")) +
              b.price.substring(b.price.indexOf(",") + 1)
          )
      );

      page.close();
      return allProducts.slice(0, 3);
    } catch {
      page.close();
      return "No products";
    }
  }

  async function ideas_scrapper() {
    let page = await browser.newPage();
    await page.goto("https://www.gulahmedshop.com/", { timeout: 0 });
    page.waitForSelector("#search ");
    page.click("#search ");
    await page.waitForSelector("#search");
    await page.type("#search", "nose \n");
    try {
      await page.waitForSelector("#category-products-grid > ol > li");
      const allProducts = await page.evaluate(() => {
        const cards = document.querySelectorAll(
          "#category-products-grid > ol > li"
        );
        return Array.from(cards).map((card) => {
          const price = card.querySelector(".price").textContent;
          const title = card.querySelector(
            "#category-products-grid > ol > li > div > div.product.details.product-item-details > a > strong > span"
          ).textContent;
          const link = card.querySelector("a").href;
          const img = card.querySelector("a").firstChild.src;

          return { title, price, link, img };
        });
      });
      allProducts.sort(
        (a, b) =>
          Number(
            a.price.substring(a.price.indexOf(" "), a.price.indexOf(",")) +
              a.price.substring(a.price.indexOf(",") + 1)
          ) -
          Number(
            b.price.substring(b.price.indexOf(" "), b.price.indexOf(",")) +
              b.price.substring(b.price.indexOf(",") + 1)
          )
      );
      page.close();
      return allProducts.slice(0, 3);
    } catch {
      page.close();
      return "No products";
    }
  }

  async function chaseValue_scrapper() {
    let page = await browser.newPage();
    await page.goto("https://chasevalue.pk/", { timeout: 0 });

    await page.waitForSelector("#pageheader > div > div > form > input");
    await page.type("#pageheader > div > div > form > input", "jacket \n");
    try {
      await page.waitForSelector("div.grid-uniform > li");
      const allProducts = await page.evaluate(() => {
        const prods = document.querySelectorAll("div.grid-uniform > li");
        console.log(prods);

        return Array.from(prods).map((prod) => {
          const link = prod.querySelector("div > div.product-detail > a").href;
          const title = prod.querySelector(
            "div > div.product-detail > a"
          ).textContent;
          const price = prod.querySelector(
            " div > div.product-detail > div.grid-link__meta > div > div > span"
          ).textContent;
          const img = prod.querySelector("img.featured-image").src;

          return { title, price, link, img };
        });
      });

      allProducts.sort(
        (a, b) =>
          Number(
            a.price.substring(a.price.indexOf(" "), a.price.indexOf(",")) +
              a.price.substring(a.price.indexOf(",") + 1)
          ) -
          Number(
            b.price.substring(b.price.indexOf(" "), b.price.indexOf(",")) +
              b.price.substring(b.price.indexOf(",") + 1)
          )
      );

      return allProducts.slice(0, 3);
    } catch {
      page.close();
      return "No products";
    }
  }
  async function sapphire_scrapper() {
    let page = await browser.newPage();
    await page.goto("https://pk.sapphireonline.pk/", {
      timeout: 0,
      waitUntil: "load",
    });
    await page.waitForSelector("form > div > input");
    await page.click("form  div input ");
    await page.type("form > div > input", " lawn \n");

    await page.waitForSelector("#snize-search-results-grid-mode > ul");
    const allProducts = await page.evaluate(() => {
      const prods = document.querySelectorAll(
        "#snize-search-results-grid-mode > ul> li"
      );

      return Array.from(prods).map((prod) => {
        const link = prod.querySelector("a").href;
        const title = prod.querySelector("span.snize-title").textContent;
        const price = prod.querySelector(
          "div.snize-price-list  span"
        ).textContent;
        const img = prod.querySelector(
          "span > img.snize-item-image.snize-flip-image"
        ).src;
        return { title, price, link, img };
      });
    });
    allProducts.sort(
      (a, b) =>
        Number(
          a.price.substring(a.price.indexOf(" "), a.price.indexOf(",")) +
            a.price.substring(a.price.indexOf(",") + 1)
        ) -
        Number(
          b.price.substring(b.price.indexOf(" "), b.price.indexOf(",")) +
            b.price.substring(b.price.indexOf(",") + 1)
        )
    );

    page.close();
    return allProducts.slice(0, 3);
  }
  sapphire_scrapper();
}

Scrapper();
