const express = require("express");
const axios = require("axios");
const OpenAI = require("openai");
const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Summarize content from multiple URLs
router.post("/", async (req, res) => {
  try {
    const { urls, topic } = req.body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ error: "URLs array is required and cannot be empty" });
    }

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    // First, scrape content from all URLs
    const cheerio = require("cheerio");
    const scrapePromises = urls.map(async (url) => {
      try {
        const response = await axios.get(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
          timeout: 10000,
        });

        const $ = cheerio.load(response.data);

        // Remove unwanted elements
        $(
          "script, style, nav, footer, header, aside, .advertisement, .ads, .sidebar, .social-share, .comments, iframe, noscript"
        ).remove();

        // Extract title
        const title =
          $('meta[property="og:title"]').attr("content") ||
          $("title").text() ||
          $("h1").first().text() ||
          "No title";

        // Intelligent content extraction
        let content = "";
        let contentElements = [];

        // Try to find the main content container
        const selectors = [
          "article",
          "main",
          '[role="main"]',
          ".article-content",
          ".post-content",
          ".entry-content",
          ".content",
          "#content",
          ".main-content",
          ".article-body",
          ".post-body",
        ];

        let mainContainer = null;
        for (const selector of selectors) {
          const found = $(selector).first();
          if (found.length > 0) {
            mainContainer = found;
            break;
          }
        }

        if (mainContainer && mainContainer.length > 0) {
          // Extract structured content
          mainContainer
            .find("p, h1, h2, h3, h4, h5, h6, li, blockquote")
            .each((i, elem) => {
              const text = $(elem).text().trim();
              if (text.length > 20) {
                contentElements.push(text);
              }
            });
          content = contentElements.join("\n\n");
        } else {
          // Fallback: extract paragraphs and headings
          $("body p, body h1, body h2, body h3, body h4, body h5, body h6")
            .not("nav p, footer p, header p")
            .each((i, elem) => {
              const text = $(elem).text().trim();
              if (text.length > 20) {
                contentElements.push(text);
              }
            });
          content = contentElements.join("\n\n");
        }

        // Clean up
        content = content.replace(/\s+/g, " ").trim();

        // Ensure meaningful content
        if (content.length < 50) {
          const body = $("body");
          body.find("script, style, nav, footer, header").remove();
          content = body.text().replace(/\s+/g, " ").trim();
        }

        // Limit content per page but keep it substantial
        if (content.length > 15000) {
          content = content.substring(0, 15000) + "...";
        }

        return {
          url,
          title,
          content: content || "No content available",
        };
      } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
        return {
          url,
          title: "Error",
          content: `Failed to scrape content from this URL: ${error.message}`,
        };
      }
    });

    const scrapedContents = await Promise.all(scrapePromises);

    // Combine all content
    const combinedContent = scrapedContents
      .map((item, index) => {
        return `Source ${index + 1} - ${item.title} (${item.url}):\n${
          item.content
        }\n\n`;
      })
      .join("\n---\n\n");

    // If no OpenAI API key, return combined content without AI summarization
    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        success: true,
        topic: topic,
        summary: combinedContent,
        sources: scrapedContents.map((item) => ({
          url: item.url,
          title: item.title,
        })),
        note: "OpenAI API key not configured. Showing combined content instead of AI summary.",
      });
    }

    // Use OpenAI to summarize
    try {
      const prompt = `You are an expert researcher and technical writer. Based on the following content from multiple sources about "${topic}", create a comprehensive, well-organized single-page summary document that:

1. Starts with an executive summary/introduction (2-3 sentences)
2. Organizes information into clear sections with headings
3. Extracts and presents the most important facts, insights, and key points
4. Combines information from different sources into a coherent narrative
5. Highlights statistics, quotes, and notable findings
6. Maintains accuracy and cites key information
7. Is comprehensive yet concise (1500-3000 words total)
8. Ends with a conclusion that synthesizes the main takeaways

Structure the summary as a professional document that could stand alone. Use clear headings and subheadings. Make it informative and easy to read.

Content from sources:
${combinedContent.substring(0, 120000)}

Create a comprehensive, single-page summary document about "${topic}":`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert researcher and technical writer who creates comprehensive, accurate summaries from multiple sources.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 4000,
        temperature: 0.5,
      });

      const summary =
        completion.choices[0]?.message?.content || combinedContent;

      return res.json({
        success: true,
        topic: topic,
        summary: summary,
        sources: scrapedContents.map((item) => ({
          url: item.url,
          title: item.title,
        })),
      });
    } catch (openaiError) {
      console.error("OpenAI error:", openaiError.message);
      // Fallback to combined content
      return res.json({
        success: true,
        topic: topic,
        summary: combinedContent,
        sources: scrapedContents.map((item) => ({
          url: item.url,
          title: item.title,
        })),
        note: "AI summarization failed. Showing combined content instead.",
      });
    }
  } catch (error) {
    console.error("Error in summarize route:", error);
    res.status(500).json({
      error: "Failed to summarize content",
      message: error.message,
    });
  }
});

module.exports = router;
