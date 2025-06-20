import { GeneratedContent, Platform } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OutputDisplayProps {
  generatedContent: GeneratedContent | null;
  selectedPlatform: Platform;
  onCopy: (text: string, label: string) => void;
}

export function OutputDisplay({ generatedContent, selectedPlatform, onCopy }: OutputDisplayProps) {
  if (!generatedContent) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="text-center text-gray-500 py-12">
            <i className="fas fa-magic text-4xl text-gray-300 mb-4"></i>
            <p className="text-lg font-medium mb-2">Ready to Generate Content</p>
            <p className="text-sm">Enter your content and click generate to see AI-powered optimization</p>
          </div>
        </div>
      </div>
    );
  }

  const platformContent = generatedContent[selectedPlatform];

  return (
    <div className="space-y-6">
      {/* AI Analysis */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-brain text-primary mr-2"></i>
          AI Analysis
        </h3>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Tone Detection</h4>
            <div className="flex flex-wrap gap-2">
              {generatedContent.analysis.tone.map((tone, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tone}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Target Audience</h4>
            <p className="text-green-800 text-sm">{generatedContent.analysis.audience}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Content Strategy</h4>
            <p className="text-purple-800 text-sm">{generatedContent.analysis.strategy}</p>
          </div>
        </div>
      </div>

      {/* Platform-Specific Content */}
      {platformContent && <PlatformContent 
        platform={selectedPlatform} 
        content={platformContent} 
        onCopy={onCopy} 
      />}
    </div>
  );
}

function PlatformContent({ platform, content, onCopy }: { 
  platform: Platform; 
  content: any; 
  onCopy: (text: string, label: string) => void; 
}) {
  const getPlatformIcon = (platform: Platform) => {
    const icons = {
      instagram: "fab fa-instagram text-pink-500",
      linkedin: "fab fa-linkedin text-blue-600",
      youtube: "fab fa-youtube text-red-500",
      twitter: "fab fa-twitter text-blue-400",
      tiktok: "fab fa-tiktok text-black",
      facebook: "fab fa-facebook text-blue-700",
    };
    return icons[platform];
  };

  const getPlatformName = (platform: Platform) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <i className={`${getPlatformIcon(platform)} mr-2`}></i>
        {getPlatformName(platform)} Optimization
      </h3>

      <div className="space-y-6">
        {/* Render content based on platform */}
        {platform === "youtube" && (
          <>
            <ContentBlock
              title="SEO-Optimized Title"
              content={content.title}
              onCopy={() => onCopy(content.title, "YouTube Title")}
              subtitle={`${content.title.length} characters • Great for SEO and engagement`}
            />
            <ContentBlock
              title="Video Description"
              content={content.description}
              onCopy={() => onCopy(content.description, "YouTube Description")}
              isLongContent
            />
            <ContentBlock
              title="Tags"
              content={content.tags.join(", ")}
              onCopy={() => onCopy(content.tags.join(", "), "YouTube Tags")}
            />
          </>
        )}

        {platform === "instagram" && (
          <>
            <ContentBlock
              title="Caption"
              content={content.caption}
              onCopy={() => onCopy(content.caption, "Instagram Caption")}
              isLongContent
            />
            <HashtagBlock
              hashtags={content.hashtags}
              onCopy={() => onCopy(content.hashtags.map((h: string) => `#${h}`).join(" "), "Instagram Hashtags")}
            />
            <ContentBlock
              title="Bio/Description"
              content={content.description}
              onCopy={() => onCopy(content.description, "Instagram Description")}
            />
          </>
        )}

        {platform === "linkedin" && (
          <>
            <ContentBlock
              title="Professional Title"
              content={content.title}
              onCopy={() => onCopy(content.title, "LinkedIn Title")}
            />
            <ContentBlock
              title="SEO Description"
              content={content.description}
              onCopy={() => onCopy(content.description, "LinkedIn Description")}
              isLongContent
            />
            <HashtagBlock
              hashtags={content.hashtags}
              onCopy={() => onCopy(content.hashtags.map((h: string) => `#${h}`).join(" "), "LinkedIn Hashtags")}
            />
          </>
        )}

        {platform === "twitter" && (
          <>
            <ContentBlock
              title="Optimized Tweet"
              content={content.tweet}
              onCopy={() => onCopy(content.tweet, "Twitter Tweet")}
              subtitle={`${content.tweet.length}/280 characters`}
            />
            <HashtagBlock
              hashtags={content.hashtags}
              onCopy={() => onCopy(content.hashtags.map((h: string) => `#${h}`).join(" "), "Twitter Hashtags")}
            />
          </>
        )}

        {platform === "tiktok" && (
          <>
            <ContentBlock
              title="Trending Caption"
              content={content.caption}
              onCopy={() => onCopy(content.caption, "TikTok Caption")}
              isLongContent
            />
            <HashtagBlock
              hashtags={content.hashtags}
              onCopy={() => onCopy(content.hashtags.map((h: string) => `#${h}`).join(" "), "TikTok Hashtags")}
            />
          </>
        )}

        {platform === "facebook" && (
          <>
            <ContentBlock
              title="Facebook Post"
              content={content.post}
              onCopy={() => onCopy(content.post, "Facebook Post")}
              isLongContent
            />
            <HashtagBlock
              hashtags={content.hashtags}
              onCopy={() => onCopy(content.hashtags.map((h: string) => `#${h}`).join(" "), "Facebook Hashtags")}
            />
          </>
        )}
      </div>
    </div>
  );
}

function ContentBlock({ 
  title, 
  content, 
  onCopy, 
  subtitle, 
  isLongContent = false 
}: {
  title: string;
  content: string;
  onCopy: () => void;
  subtitle?: string;
  isLongContent?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="text-primary hover:text-secondary transition-colors"
        >
          <i className="fas fa-copy"></i>
        </Button>
      </div>
      <div className={cn(
        "bg-gray-50 rounded-lg p-4 border",
        isLongContent && "max-h-48 overflow-y-auto"
      )}>
        <p className="text-gray-800 text-sm whitespace-pre-wrap">{content}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
      </div>
    </div>
  );
}

function HashtagBlock({ 
  hashtags, 
  onCopy 
}: {
  hashtags: string[];
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">Hashtags</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="text-primary hover:text-secondary transition-colors"
        >
          <i className="fas fa-copy"></i>
        </Button>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 border">
        <div className="flex flex-wrap gap-2">
          {hashtags.map((hashtag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              #{hashtag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
