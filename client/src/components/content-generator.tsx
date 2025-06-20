import { ContentType, Tone, Category, Language } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contentTypes = [
  { id: "video" as ContentType, name: "Video Post", icon: "fas fa-video" },
  { id: "image" as ContentType, name: "Image Post", icon: "fas fa-image" },
  { id: "text" as ContentType, name: "Text Post", icon: "fas fa-align-left" },
];

const tones = [
  { id: "professional", name: "Professional", icon: "fas fa-briefcase" },
  { id: "casual", name: "Casual", icon: "fas fa-smile" },
  { id: "funny", name: "Funny", icon: "fas fa-laugh" },
  { id: "motivational", name: "Motivational", icon: "fas fa-fire" },
  { id: "educational", name: "Educational", icon: "fas fa-graduation-cap" },
  { id: "emotional", name: "Emotional", icon: "fas fa-heart" },
  { id: "inspiring", name: "Inspiring", icon: "fas fa-star" },
  { id: "promotional", name: "Promotional", icon: "fas fa-bullhorn" },
  { id: "storytelling", name: "Storytelling", icon: "fas fa-book" },
  { id: "controversial", name: "Controversial", icon: "fas fa-exclamation-triangle" },
];

const categories = [
  { id: "business", name: "Business" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "technology", name: "Technology" },
  { id: "health", name: "Health" },
  { id: "fitness", name: "Fitness" },
  { id: "food", name: "Food" },
  { id: "travel", name: "Travel" },
  { id: "fashion", name: "Fashion" },
  { id: "education", name: "Education" },
  { id: "entertainment", name: "Entertainment" },
  { id: "news", name: "News" },
  { id: "sports", name: "Sports" },
  { id: "art", name: "Art" },
  { id: "music", name: "Music" },
  { id: "gaming", name: "Gaming" },
  { id: "personal", name: "Personal" },
];

const languages = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese", 
  "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Hindi", 
  "Dutch", "Swedish", "Norwegian"
];

interface ContentGeneratorProps {
  selectedContentType: ContentType;
  onContentTypeChange: (type: ContentType) => void;
  selectedTone: Tone;
  onToneChange: (tone: Tone) => void;
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  content: string;
  onContentChange: (content: string) => void;
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function ContentGenerator({
  selectedContentType,
  onContentTypeChange,
  selectedTone,
  onToneChange,
  selectedCategory,
  onCategoryChange,
  selectedLanguage,
  onLanguageChange,
  content,
  onContentChange,
  selectedFile,
  onFileChange,
  onGenerate,
  isGenerating,
}: ContentGeneratorProps) {
  const characterCount = content.length;
  const maxCharacters = 2000;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onFileChange(file || null);
  };

  return (
    <div className="space-y-6">
      {/* Content Type Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-file-alt text-primary mr-2"></i>
          Content Type
        </h3>
        <div className="flex flex-wrap gap-3">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onContentTypeChange(type.id)}
              className={cn(
                "px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200",
                selectedContentType === type.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
              )}
            >
              <i className={`${type.icon} mr-2`}></i>
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-theater-masks text-primary mr-2"></i>
          Tone & Style
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tones.map((tone) => (
            <button
              key={tone.id}
              onClick={() => onToneChange(tone.id as Tone)}
              className={cn(
                "p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 text-center",
                selectedTone === tone.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
              )}
            >
              <i className={`${tone.icon} mb-1 block`}></i>
              {tone.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category and Language Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-cog text-primary mr-2"></i>
          Options
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={(value) => onCategoryChange(value as Category)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={selectedLanguage} onValueChange={(value) => onLanguageChange(value as Language)}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-upload text-primary mr-2"></i>
          Upload File (Optional)
        </h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*,video/*,.txt,.pdf"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  Images, videos (up to 20GB), text files supported
                </p>
              </div>
            </label>
          </div>
          {selectedFile && (
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <i className={`fas ${selectedFile.type.startsWith('image/') ? 'fa-image' : selectedFile.type.startsWith('video/') ? 'fa-video' : 'fa-file'} text-primary`}></i>
                <div>
                  <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFileChange(null)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content Input */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-pen text-primary mr-2"></i>
          Your Content {selectedFile ? "(Optional)" : ""}
        </h3>
        <div className="relative">
          <Textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder={selectedFile ? "Add context or description for your uploaded file..." : "Paste your post content here... Describe your video, image, or share your thoughts. The AI will analyze the tone and generate optimized content for your selected platform."}
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            maxLength={maxCharacters}
          />
          <div
            className={cn(
              "absolute bottom-3 right-3 text-sm",
              characterCount > maxCharacters * 0.9
                ? "text-red-500"
                : characterCount > maxCharacters * 0.75
                ? "text-yellow-500"
                : "text-gray-400"
            )}
          >
            {characterCount}/{maxCharacters} characters
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={onGenerate}
          disabled={isGenerating || (!content.trim() && !selectedFile)}
          className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          {isGenerating ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Analyzing...
            </>
          ) : (
            <>
              <i className="fas fa-magic mr-2"></i>
              Generate AI Content
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
