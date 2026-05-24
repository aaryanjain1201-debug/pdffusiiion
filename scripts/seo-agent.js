/**
 * PDFFusion - Automated SEO & Marketing AI Agent
 * 
 * This agent runs locally on your machine. It connects to the Gemini API to:
 * 1. Perform keyword research for PDF and productivity search queries.
 * 2. Write a highly detailed, SEO-optimized educational blog article.
 * 3. Inject the article directly into the blog-data.ts file.
 * 4. Run a production build to verify the sitemap and project compile cleanly.
 * 5. Provide git/Vercel push instructions to publish instantly.
 * 
 * Run it using:
 *   export GEMINI_API_KEY="your-api-key"
 *   node scripts/seo-agent.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color formatting for console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

console.log(`${colors.bright}${colors.cyan}====================================================`);
console.log(`🤖 PDFFusion AI SEO & Marketing Agent Initiated`);
console.log(`====================================================${colors.reset}\n`);

// 1. Check for API Key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.log(`${colors.red}❌ Error: GEMINI_API_KEY environment variable is not set.${colors.reset}`);
  console.log(`\nTo get your free API key:`);
  console.log(`1. Visit: https://aistudio.google.com/`);
  console.log(`2. Create an API key.`);
  console.log(`3. Run the agent like this in your terminal:`);
  console.log(`   export GEMINI_API_KEY="your_api_key_here"`);
  console.log(`   node scripts/seo-agent.js\n`);
  process.exit(1);
}

const blogDataPath = path.join(__dirname, '../src/lib/blog-data.ts');

// 2. Read existing posts to prevent duplicates
let blogFileContent = fs.readFileSync(blogDataPath, 'utf8');
const existingSlugs = [];
const slugRegex = /slug:\s*'([^']+)'/g;
let match;
while ((match = slugRegex.exec(blogFileContent)) !== null) {
  existingSlugs.push(match[1]);
}

console.log(`🔍 Found existing blog slugs: ${colors.yellow}${existingSlugs.join(', ')}${colors.reset}`);
console.log(`🤖 Consulting Gemini for high-ranking keyword research and fresh topic ideation...\n`);

// 3. Prompt Gemini to write a new SEO article
const prompt = `
You are the Lead SEO & Inbound Marketing AI Agent for PDFFusion (https://pdffusiiion.vercel.app). 
PDFFusion is a 100% free client-side PDF utility site (Merge PDF, Compress PDF, JPG to PDF, PDF to Image, Image to PDF).
All processing is done inside the browser, offering extreme privacy and speed.

Your goal is to write a highly detailed, educational blog post that will rank #1 on Google searches, capturing high search volume keywords (e.g. PDF conversion, secure PDF edits, local browser tools, offline image merging, etc.).

Existing blog slugs that you MUST NOT repeat: [${existingSlugs.join(', ')}].

Provide the output strictly as a JSON object matching the following structure:
{
  "slug": "url-friendly-slug-with-dashes",
  "title": "Compelling Title Targetting Keywords",
  "excerpt": "A short 2-line summary to show on blog list pages",
  "date": "${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}",
  "readTime": "3 min read",
  "category": "Guides|Tutorials|Privacy",
  "content": "A long, comprehensive, educational article (at least 600 words) written in Markdown. Use header level 1 for the main title, and header level 2 and 3 for sections. Highlight PDFFusion (https://pdffusiiion.vercel.app) as the recommended tool. Include a step-by-step tutorial, bullet points, and code/technical explanations where appropriate."
}

Do not return any markdown code block formatting around the JSON, just return the raw JSON object.
`;

async function runAgent() {
  try {
    // API endpoint for Gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const requestData = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    console.log(`📡 Sending request to Gemini API...`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API returned status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const responseText = data.candidates[0].content.parts[0].text;
    
    // Parse generated blog object
    const newPost = JSON.parse(responseText.trim());
    console.log(`${colors.green}✔ Article generated successfully!${colors.reset}`);
    console.log(`${colors.bright}Title:${colors.reset} "${newPost.title}"`);
    console.log(`${colors.bright}Slug:${colors.reset} /blog/${newPost.slug}`);
    console.log(`${colors.bright}Category:${colors.reset} ${newPost.category}\n`);

    // 4. Inject new post into blog-data.ts
    console.log(`✍ Injecting article into src/lib/blog-data.ts...`);
    
    // Find the end of the array `export const blogPosts: BlogPost[] = [ ... ];`
    // We can insert the new object right at the end of the array, before the closing bracket.
    const arrayEndIndex = blogFileContent.lastIndexOf('];');
    if (arrayEndIndex === -1) {
      throw new Error('Could not find the end of the blogPosts array in blog-data.ts');
    }

    // Format content string with template literal backticks safely escaped
    const escapedContent = newPost.content.replace(/`/g, '\\`').replace(/\$/g, '\\$');

    const newPostCode = `  {
    slug: '${newPost.slug}',
    title: '${newPost.title.replace(/'/g, "\\'")}',
    excerpt: '${newPost.excerpt.replace(/'/g, "\\'")}',
    date: '${newPost.date}',
    readTime: '${newPost.readTime}',
    category: '${newPost.category}',
    content: \`${escapedContent}\`,
  },
`;

    const updatedFileContent = 
      blogFileContent.substring(0, arrayEndIndex) + 
      newPostCode + 
      blogFileContent.substring(arrayEndIndex);

    fs.writeFileSync(blogDataPath, updatedFileContent, 'utf8');
    console.log(`${colors.green}✔ blog-data.ts updated!${colors.reset}\n`);

    // 5. Run next build to verify everything is compilation-clean
    if (process.env.SKIP_BUILD === 'true') {
      console.log(`${colors.green}✔ Skipped npm run build (SKIP_BUILD is set to true).${colors.reset}\n`);
      return;
    }

    console.log(`🛠 Running 'npm run build' to verify compilation and update dynamic sitemaps...`);
    try {
      execSync('npm run build', { stdio: 'inherit' });
      console.log(`\n${colors.green}✔ Project successfully compiled! The sitemap.xml will automatically include the new page.${colors.reset}\n`);
      
      console.log(`${colors.bright}${colors.green}====================================================`);
      console.log(`🎉 Success! SEO Blog Post is ready to deploy!`);
      console.log(`====================================================${colors.reset}`);
      console.log(`To publish this live, run these commands:`);
      console.log(`  1. git commit -am "seo-agent: added new blog about ${newPost.slug}"`);
      console.log(`  2. git push`);
      console.log(`  3. npx vercel --prod`);
      console.log(`\nVercel will rebuild and your article will go live immediately on:`);
      console.log(`👉 https://pdffusiiion.vercel.app/blog/${newPost.slug}\n`);
    } catch (buildErr) {
      console.error(`${colors.red}❌ Build failed after adding the article. Restoring original blog-data.ts...${colors.reset}`);
      fs.writeFileSync(blogDataPath, blogFileContent, 'utf8');
      process.exit(1);
    }

  } catch (error) {
    console.error(`${colors.red}❌ Error during agent execution:${colors.reset}`, error);
    process.exit(1);
  }
}

runAgent();
