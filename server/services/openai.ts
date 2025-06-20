import OpenAI from "openai";
import { Platform, ContentType, GeneratedContent, platformSchema, contentTypeSchema } from "@shared/schema";
import fs from "fs";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function generateSocialMediaContent(
  content: string,
  platform: Platform,
  contentType: ContentType,
  tone?: string,
  category?: string,
  language: string = "English",
  file?: Express.Multer.File
): Promise<GeneratedContent> {
  try {
    let analysisContent = content;
    let fileAnalysis = '';

    // Analyze uploaded file if present
    if (file) {
      if (file.mimetype.startsWith('image/')) {
        // Read and encode image for vision analysis
        const imageBuffer = fs.readFileSync(file.path);
        const base64Image = imageBuffer.toString('base64');
        
        const visionResponse = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Analyze this image for social media content creation. Describe what you see, the mood, visual elements, and suggest content ideas. Language: ${language}`
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${file.mimetype};base64,${base64Image}`
                  }
                }
              ],
            },
          ],
          max_tokens: 500,
        });
        
        fileAnalysis = visionResponse.choices[0].message.content || '';
        analysisContent = fileAnalysis + (content ? `\n\nUser Input: ${content}` : '');
      } else if (file.mimetype.startsWith('video/')) {
        // For video files, we'll use the filename and any provided description
        fileAnalysis = `Video file uploaded: ${file.originalname}. Content type: ${contentType}`;
        analysisContent = fileAnalysis + (content ? `\n\nUser Description: ${content}` : '');
      } else if (file.mimetype === 'text/plain') {
        // Read text file content
        const textContent = fs.readFileSync(file.path, 'utf-8');
        analysisContent = textContent + (content ? `\n\nAdditional Context: ${content}` : '');
      }
    }

    // First, analyze the content for tone, audience, and strategy
    const analysisPrompt = `
Analyze the following social media content and provide insights in JSON format:

Content: "${analysisContent}"
Content Type: ${contentType}
Target Platform: ${platform}
${tone ? `Desired Tone: ${tone}` : ''}
${category ? `Category: ${category}` : ''}
Language: ${language}

Provide analysis in this exact JSON format:
{
  "tone": ["tone1", "tone2", "tone3"],
  "audience": "target audience description",
  "strategy": "content strategy recommendation"
}

Focus on identifying emotional tone, target demographics, and engagement strategy. Respond in ${language}.
`;

    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a social media growth expert. Analyze content and provide insights in JSON format only."
        },
        {
          role: "user",
          content: analysisPrompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(analysisResponse.choices[0].message.content || "{}");

    // Generate platform-specific content
    const platformContent = await generatePlatformSpecificContent(
      analysisContent, 
      platform, 
      contentType, 
      analysis, 
      tone, 
      category, 
      language
    );

    return {
      analysis,
      [platform]: platformContent
    };

  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to generate content: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}

async function generatePlatformSpecificContent(
  content: string,
  platform: Platform,
  contentType: ContentType,
  analysis: any,
  tone?: string,
  category?: string,
  language: string = "English"
) {
  let prompt = "";
  let responseStructure = "";

  switch (platform) {
    case "instagram":
      prompt = `
Create Instagram-optimized content for this ${contentType} post:
Content: "${content}"
Tone: ${analysis.tone?.join(", ")}${tone ? ` (Preferred: ${tone})` : ''}
Audience: ${analysis.audience}
${category ? `Category: ${category}` : ''}
Language: ${language}

Generate engaging Instagram content that matches the desired tone and encourages interaction.
Include emojis naturally within the caption. Respond in ${language}.
`;
      responseStructure = `{
  "caption": "engaging Instagram caption with emojis",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"],
  "description": "brief bio-friendly description"
}`;
      break;

    case "linkedin":
      prompt = `
Create LinkedIn-optimized professional content for this ${contentType} post:
Content: "${content}"
Tone: ${analysis.tone?.join(", ")}${tone ? ` (Preferred: ${tone})` : ''}
Audience: ${analysis.audience}
${category ? `Category: ${category}` : ''}
Language: ${language}

Generate professional LinkedIn content with SEO optimization that drives engagement.
Focus on value, insights, and professional growth. Respond in ${language}.
`;
      responseStructure = `{
  "title": "compelling professional title",
  "description": "detailed LinkedIn post with professional insights",
  "hashtags": ["professional1", "professional2", "professional3", "professional4", "professional5"]
}`;
      break;

    case "youtube":
      prompt = `
Create YouTube-optimized content for this ${contentType}:
Content: "${content}"
Tone: ${analysis.tone?.join(", ")}${tone ? ` (Preferred: ${tone})` : ''}
Audience: ${analysis.audience}
${category ? `Category: ${category}` : ''}
Language: ${language}

Generate SEO-optimized YouTube title, description, and tags that will rank well and attract clicks.
Include timestamps if applicable and call-to-action elements. Respond in ${language}.
`;
      responseStructure = `{
  "title": "SEO-optimized YouTube title under 60 characters",
  "description": "detailed YouTube description with timestamps, CTAs, and engagement hooks",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10"]
}`;
      break;

    case "twitter":
      prompt = `
Create Twitter-optimized content for this ${contentType} post:
Content: "${content}"
Tone: ${analysis.tone?.join(", ")}${tone ? ` (Preferred: ${tone})` : ''}
Audience: ${analysis.audience}
${category ? `Category: ${category}` : ''}
Language: ${language}

Generate concise, engaging Twitter content that fits character limits and drives retweets.
Respond in ${language}.
`;
      responseStructure = `{
  "tweet": "engaging tweet under 280 characters",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"]
}`;
      break;

    case "tiktok":
      prompt = `
Create TikTok-optimized content for this ${contentType}:
Content: "${content}"
Tone: ${analysis.tone?.join(", ")}${tone ? ` (Preferred: ${tone})` : ''}
Audience: ${analysis.audience}
${category ? `Category: ${category}` : ''}
Language: ${language}

Generate trendy TikTok caption with trending hashtags that will boost discoverability.
Respond in ${language}.
`;
      responseStructure = `{
  "caption": "trendy TikTok caption with hooks",
  "hashtags": ["trending1", "trending2", "trending3", "trending4", "trending5"]
}`;
      break;

    case "facebook":
      prompt = `
Create Facebook-optimized content for this ${contentType} post:
Content: "${content}"
Tone: ${analysis.tone?.join(", ")}${tone ? ` (Preferred: ${tone})` : ''}
Audience: ${analysis.audience}
${category ? `Category: ${category}` : ''}
Language: ${language}

Generate Facebook content that encourages sharing and community engagement.
Respond in ${language}.
`;
      responseStructure = `{
  "post": "engaging Facebook post content",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"]
}`;
      break;
  }

  const fullPrompt = `${prompt}\n\nRespond with JSON in this exact format:\n${responseStructure}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a social media growth expert specializing in ${platform} optimization. Always respond with valid JSON only.`
      },
      {
        role: "user",
        content: fullPrompt
      }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}
