import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Platform, ContentType, GeneratedContent, Tone, Category, Language } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

interface GenerateContentRequest {
  content?: string;
  platform: Platform;
  contentType: ContentType;
  tone?: Tone;
  category?: Category;
  language?: Language;
  file?: File;
}

interface GenerateContentResponse {
  success: boolean;
  data: {
    id: number;
    generatedContent: GeneratedContent;
  };
  error?: string;
  message?: string;
}

export function useContentGenerator() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram");
  const [selectedContentType, setSelectedContentType] = useState<ContentType>("image");
  const [selectedTone, setSelectedTone] = useState<Tone>("casual");
  const [selectedCategory, setSelectedCategory] = useState<Category>("lifestyle");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("English");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const generateContentMutation = useMutation({
    mutationFn: async (request: GenerateContentRequest): Promise<GeneratedContent> => {
      const formData = new FormData();
      formData.append("platform", request.platform);
      formData.append("contentType", request.contentType);
      
      if (request.content) formData.append("content", request.content);
      if (request.tone) formData.append("tone", request.tone);
      if (request.category) formData.append("category", request.category);
      if (request.language) formData.append("language", request.language);
      if (request.file) formData.append("file", request.file);

      const response = await fetch("/api/generate-content", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
      }

      const data: GenerateContentResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || data.message || "Failed to generate content");
      }
      
      return data.data.generatedContent;
    },
    onSuccess: () => {
      toast({
        title: "Content Generated Successfully",
        description: "Your AI-optimized content is ready!",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const generateContent = () => {
    if (!content.trim() && !selectedFile) {
      toast({
        title: "Content Required",
        description: "Please enter some content or upload a file to analyze and optimize.",
        variant: "destructive",
      });
      return;
    }

    generateContentMutation.mutate({
      content: content.trim(),
      platform: selectedPlatform,
      contentType: selectedContentType,
      tone: selectedTone,
      category: selectedCategory,
      language: selectedLanguage,
      file: selectedFile || undefined,
    });
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return {
    selectedPlatform,
    setSelectedPlatform,
    selectedContentType,
    setSelectedContentType,
    selectedTone,
    setSelectedTone,
    selectedCategory,
    setSelectedCategory,
    selectedLanguage,
    setSelectedLanguage,
    content,
    setContent,
    selectedFile,
    setSelectedFile,
    generateContent,
    copyToClipboard,
    isGenerating: generateContentMutation.isPending,
    generatedContent: generateContentMutation.data,
    error: generateContentMutation.error,
  };
}
