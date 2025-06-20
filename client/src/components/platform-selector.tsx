import { Platform } from "@shared/schema";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "instagram" as Platform, name: "Instagram", icon: "fab fa-instagram", color: "hover:text-pink-500" },
  { id: "linkedin" as Platform, name: "LinkedIn", icon: "fab fa-linkedin", color: "hover:text-blue-600" },
  { id: "youtube" as Platform, name: "YouTube", icon: "fab fa-youtube", color: "hover:text-red-500" },
  { id: "twitter" as Platform, name: "Twitter", icon: "fab fa-twitter", color: "hover:text-blue-400" },
  { id: "tiktok" as Platform, name: "TikTok", icon: "fab fa-tiktok", color: "hover:text-black" },
  { id: "facebook" as Platform, name: "Facebook", icon: "fab fa-facebook", color: "hover:text-blue-700" },
];

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

export function PlatformSelector({ selectedPlatform, onPlatformChange }: PlatformSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fas fa-share-alt text-primary mr-2"></i>
        Select Platform
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onPlatformChange(platform.id)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-200 text-center group",
              selectedPlatform === platform.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary hover:bg-primary/5"
            )}
          >
            <i
              className={cn(
                "text-2xl mb-2 block",
                platform.icon,
                selectedPlatform === platform.id
                  ? "text-primary"
                  : "text-gray-400 group-hover:text-primary"
              )}
            ></i>
            <span
              className={cn(
                "text-sm font-medium",
                selectedPlatform === platform.id
                  ? "text-primary"
                  : "text-gray-700 group-hover:text-primary"
              )}
            >
              {platform.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
