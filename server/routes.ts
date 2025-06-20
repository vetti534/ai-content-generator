import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import multer from "multer";
import { storage } from "./storage";
import { insertContentRequestSchema, platformSchema, contentTypeSchema, toneSchema, categorySchema, languageSchema } from "@shared/schema";
import { generateSocialMediaContent } from "./services/openai";
import { setupAuth, isAuthenticated } from "./replitAuth";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 20 * 1024 * 1024 * 1024, // 20GB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm',
      'text/plain', 'application/pdf'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Generate AI content endpoint with file upload support
  app.post("/api/generate-content", upload.single('file'), async (req, res) => {
    try {
      const userId = (req as any).user?.claims?.sub;
      const file = req.file;

      const requestSchema = insertContentRequestSchema.extend({
        content: z.string().optional(),
        platform: platformSchema,
        contentType: contentTypeSchema,
        tone: toneSchema.optional(),
        category: categorySchema.optional(),
        language: languageSchema.optional()
      });

      const validatedData = requestSchema.parse(req.body);

      // Handle file upload
      let fileInfo = {};
      if (file) {
        fileInfo = {
          fileUrl: file.path,
          fileName: file.originalname,
          fileType: file.mimetype
        };
      }

      // Create content request
      const contentRequest = await storage.createContentRequest({
        ...validatedData,
        ...fileInfo
      }, userId);

      // Generate AI content
      const generatedContent = await generateSocialMediaContent(
        validatedData.content || '',
        validatedData.platform,
        validatedData.contentType,
        validatedData.tone,
        validatedData.category,
        validatedData.language,
        file
      );

      // Update request with generated content
      const updatedRequest = await storage.updateContentRequest(
        contentRequest.id,
        generatedContent
      );

      res.json({
        success: true,
        data: {
          id: contentRequest.id,
          generatedContent
        }
      });

    } catch (error) {
      console.error("Content generation error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: "Validation error",
          details: error.errors
        });
      } else if (error instanceof Error && error.message.includes("OpenAI")) {
        res.status(503).json({
          success: false,
          error: "AI service temporarily unavailable",
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Failed to generate content",
          message: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  });

  // Get content request by ID
  app.get("/api/content-request/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "Invalid request ID"
        });
      }

      const contentRequest = await storage.getContentRequest(id);
      if (!contentRequest) {
        return res.status(404).json({
          success: false,
          error: "Content request not found"
        });
      }

      res.json({
        success: true,
        data: contentRequest
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch content request"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
