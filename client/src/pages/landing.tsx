import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
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
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-gradient-to-r from-primary to-secondary text-white"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Log In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Generate <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI-Powered</span> Social Media Content
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Upload your images, videos, or text and let our AI analyze them to create professional captions, hashtags, and descriptions optimized for any platform in any language.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/api/login'}
              className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-8 py-4"
            >
              <i className="fas fa-rocket mr-2"></i>
              Get Started Free
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4"
            >
              <i className="fas fa-play mr-2"></i>
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-file-upload text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Upload Any File</h3>
            <p className="text-gray-600 text-center">
              Support for images (PNG, JPEG, GIF), videos up to 20GB, and text files. Our AI analyzes your content automatically.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-globe text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Multi-Language Support</h3>
            <p className="text-gray-600 text-center">
              Generate content in 15+ languages including English, Spanish, French, German, Chinese, Japanese, and more.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-magic text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Smart AI Analysis</h3>
            <p className="text-gray-600 text-center">
              Advanced AI analyzes tone, category, and audience to create optimized content for each platform.
            </p>
          </div>
        </div>

        {/* Platform Support */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Optimize for Every Platform</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { name: "Instagram", icon: "fab fa-instagram", color: "text-pink-500" },
              { name: "LinkedIn", icon: "fab fa-linkedin", color: "text-blue-600" },
              { name: "YouTube", icon: "fab fa-youtube", color: "text-red-500" },
              { name: "Twitter", icon: "fab fa-twitter", color: "text-blue-400" },
              { name: "TikTok", icon: "fab fa-tiktok", color: "text-black" },
              { name: "Facebook", icon: "fab fa-facebook", color: "text-blue-700" },
            ].map((platform) => (
              <div key={platform.name} className="text-center">
                <i className={`${platform.icon} ${platform.color} text-3xl mb-2`}></i>
                <p className="text-sm font-medium text-gray-700">{platform.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Boost Your Social Media?</h3>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of creators who trust our AI to optimize their content
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-white text-primary hover:bg-gray-50 text-lg px-8 py-4"
          >
            <i className="fas fa-arrow-right mr-2"></i>
            Start Creating Now
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
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