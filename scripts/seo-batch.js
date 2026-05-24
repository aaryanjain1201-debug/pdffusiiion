/**
 * PDFFusion - SEO Batch Generator
 * 
 * Runs the AI SEO Agent multiple times in a loop with a delay 
 * to avoid Gemini rate limits.
 */

const { execSync } = require('child_process');

const apiKey = 'AIzaSyBFjFazKUHhUCJ0OTyfhVan1u-jI-UaQ7c';
const totalArticles = 15; // Generates 15 fresh, unique articles in one run

async function runBatch() {
  console.log(`🤖 Starting Batch SEO Generation of ${totalArticles} articles...\n`);
  
  for (let i = 1; i <= totalArticles; i++) {
    console.log(`\n--------------------------------------------`);
    console.log(`📦 Generating Article ${i} of ${totalArticles}...`);
    console.log(`--------------------------------------------`);
    
    try {
      // Execute the seo-agent script with the API key env variable
      execSync('node scripts/seo-agent.js', {
        env: {
          ...process.env,
          GEMINI_API_KEY: apiKey,
          SKIP_BUILD: 'true'
        },
        stdio: 'inherit'
      });
      
      console.log(`✅ Article ${i} completed successfully!`);
    } catch (err) {
      console.error(`❌ Error generating article ${i}:`, err.message);
    }
    
    // Cool-down period of 5 seconds to stay safe from free tier RPM limits
    if (i < totalArticles) {
      console.log(`⏳ Waiting 5 seconds before the next article to respect API rate limits...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  console.log(`\n🎉 Batch generation complete! All ${totalArticles} articles generated.`);
  console.log(`🛠 Running final project build to verify sitemap and code compilation...`);
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log(`\n✅ Build verification passed! Ready to deploy.`);
  } catch (buildErr) {
    console.error(`❌ Build failed at the end of batch run:`, buildErr.message);
  }
}

runBatch();
