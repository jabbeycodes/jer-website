// Generate JER images via Fal.ai (with queue polling)
const FAL_KEY = "476e0e67-9197-4f1a-a114-6204fc415e38:cd35eee6d04889e01b1f39728cb12a79";
const fs = require("fs");
const path = require("path");

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function generateImage(prompt, filename) {
  console.log(`Submitting: ${path.basename(filename)}...`);
  
  const submitRes = await fetch("https://queue.fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      "Authorization": `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      image_size: "landscape_16_9",
      num_inference_steps: 4,
    }),
  });

  const submitData = await submitRes.json();
  const requestId = submitData.request_id;
  const statusUrl = submitData.status_url;
  const responseUrl = submitData.response_url;

  if (!requestId) {
    console.error("Submit failed:", JSON.stringify(submitData));
    return null;
  }

  // Poll for completion
  for (let i = 0; i < 60; i++) {
    await sleep(3000);
    
    const statusRes = await fetch(statusUrl, {
      headers: { "Authorization": `Key ${FAL_KEY}` },
    });
    const statusData = await statusRes.json();
    
    if (statusData.status === "COMPLETED") {
      // Get the result
      const resultRes = await fetch(responseUrl, {
        headers: { "Authorization": `Key ${FAL_KEY}` },
      });
      const resultData = await resultRes.json();
      
      if (resultData.images && resultData.images[0]) {
        const imgUrl = resultData.images[0].url;
        console.log(`  Downloading ${path.basename(filename)}...`);
        const imgRes = await fetch(imgUrl);
        const buf = Buffer.from(await imgRes.arrayBuffer());
        fs.writeFileSync(filename, buf);
        console.log(`  ✅ Saved: ${path.basename(filename)} (${(buf.length/1024).toFixed(0)}KB)`);
        return imgUrl;
      } else {
        console.error("  No image in result:", JSON.stringify(resultData).substring(0, 200));
        return null;
      }
    } else if (statusData.status === "FAILED") {
      console.error("  Generation failed:", JSON.stringify(statusData));
      return null;
    }
    // Still in progress
    process.stdout.write(`  Waiting... (${statusData.status || "processing"})\r`);
  }
  
  console.error("  Timeout waiting for generation");
  return null;
}

async function main() {
  const outDir = "C:\\Users\\jaane\\.openclaw\\workspace\\jer-website\\public";
  
  console.log("=== Generating JER Website Images via Fal.ai ===\n");

  // Hero image - luxury executive residence at dusk
  await generateImage(
    "A luxurious modern executive mansion villa in West Africa at golden hour dusk. Grand two-story building with warm exterior lighting, palm trees, gated compound with perimeter wall, electric fencing visible. Contemporary African luxury architecture - clean lines, large windows with warm golden light. Dramatic purple-blue twilight sky. Private driveway with security gate. High-end real estate photography, ultra wide angle, cinematic lighting, photorealistic, 8k",
    path.join(outDir, "hero-mansion.jpg")
  );

  // Interior - elegant living room
  await generateImage(
    "Luxurious executive residence living room interior in West Africa. Warm ambient lighting, elegant contemporary furniture, hardwood floors, African art on walls, large windows with sheer curtains. Premium hotel-quality furnishings, clean and sophisticated. Wide angle, real estate photography, warm tones, 8k photorealistic",
    path.join(outDir, "interior-living.jpg")
  );

  // Exterior daytime
  await generateImage(
    "Luxury executive residence exterior in West Africa during daytime. Grand villa with contemporary architecture, manicured garden, palm trees, security cameras visible on walls, private compound. Bright sunny day, blue sky. High-end real estate photography, 8k photorealistic",
    path.join(outDir, "exterior-day.jpg")
  );

  // Workspace area
  await generateImage(
    "Modern executive workspace and meeting area in a luxury African residence. High-speed internet setup visible, Starlink satellite dish visible through window, clean desk setup, professional environment. Warm lighting, contemporary design. Real estate photography, 8k",
    path.join(outDir, "workspace.jpg")
  );

  // Outdoor area
  await generateImage(
    "Private outdoor entertainment area of a luxury executive residence in West Africa. Outdoor seating, balcony overlooking compound, warm evening lighting, tropical plants. Exclusive and private atmosphere. Real estate photography, golden hour, 8k photorealistic",
    path.join(outDir, "outdoor-area.jpg")
  );

  // Bedroom
  await generateImage(
    "Luxury master bedroom in an executive African residence. King bed with premium linens, warm ambient lighting, large windows, contemporary African decor. Hotel-quality furnishings, clean and private. Real estate photography, warm tones, 8k",
    path.join(outDir, "bedroom.jpg")
  );

  console.log("\n=== All images generated! ===");
}

main().catch(console.error);