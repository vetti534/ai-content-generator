import { PlatformSelector } from "@/components/platform-selector";
import { ContentGenerator } from "@/components/content-generator";
import { OutputDisplay } from "@/components/output-display";
import { useContentGenerator } from "@/hooks/use-content-generator";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user } = useAuth();
  const {
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
    isGenerating,
    generatedContent,
  } = useContentGenerator();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <i className="fas fa-robot text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Content Generator</h1>
                <p className="text-sm text-gray-500">Social Media Growth Expert</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {user.profileImageUrl && (
                      <img 
                        src={user.profileImageUrl} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {user.firstName || user.email}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = '/api/logout'}
                  >
                    <i className="fas fa-sign-out-alt mr-1"></i>
                    Logout
                  </Button>
                </div>
              )}
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                <i className="fas fa-circle text-green-500 text-xs mr-1"></i>
                AI Powered
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Generate <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI-Powered</span> Social Media Content
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analyze your content and generate professional captions, hashtags, and descriptions optimized for any platform
          </p>
        </div>

        {/* Content Generator */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <PlatformSelector
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
            />
            <ContentGenerator
              selectedContentType={selectedContentType}
              onContentTypeChange={setSelectedContentType}
              selectedTone={selectedTone}
              onToneChange={setSelectedTone}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              content={content}
              onContentChange={setContent}
              selectedFile={selectedFile}
              onFileChange={setSelectedFile}
              onGenerate={generateContent}
              isGenerating={isGenerating}
            />
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <OutputDisplay
              generatedContent={generatedContent}
              selectedPlatform={selectedPlatform}
              onCopy={copyToClipboard}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our AI Content Generator?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-brain text-white text-2xl"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart AI Analysis</h4>
              <p className="text-gray-600">Advanced AI analyzes your content's tone, audience, and engagement potential for maximum reach.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-white text-2xl"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Platform Optimization</h4>
              <p className="text-gray-600">Content optimized specifically for each platform's algorithm and best practices.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Growth Focused</h4>
              <p className="text-gray-600">Strategies and hashtags designed to increase your reach, engagement, and follower growth.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <i className="fas fa-robot text-white"></i>
              </div>
              <span className="text-gray-900 font-semibold">AI Content Generator</span>
            </div>
            <div className="text-sm text-gray-500">
              Powered by advanced AI • Built for social media growth
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
