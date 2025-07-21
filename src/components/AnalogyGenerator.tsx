import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Share2, Twitter, Linkedin, Sparkles, Heart, Mail } from 'lucide-react';
import { toast } from 'sonner';
import vintageHeader from '@/assets/vintage-header.jpg';

const AnalogyGenerator = () => {
  const [thing1, setThing1] = useState('');
  const [thing2, setThing2] = useState('');
  const [generatedAnalogy, setGeneratedAnalogy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [email, setEmail] = useState('');

  const handleGenerate = async () => {
    if (!thing1.trim() || !thing2.trim()) {
      toast.error('Please enter both concepts to compare!');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call - user will need Supabase integration for real OpenAI functionality
    setTimeout(() => {
      const analogies = [
        `Comparing ${thing1} to ${thing2} is like reading a well-worn novel versus discovering a handwritten letter in an antique book - both tell stories, but one feels familiar and comforting while the other holds the thrill of unexpected discovery.`,
        `${thing1} and ${thing2} are like two photographs from different decades in the same family album - they capture different moments in time, but when you look closely, you can see the same underlying essence threading through both.`,
        `The relationship between ${thing1} and ${thing2} is like comparing a vintage vinyl record to a modern playlist - one carries the warmth of analog memories and intentional listening, while the other offers endless possibilities at your fingertips.`,
        `${thing1} versus ${thing2} is like choosing between a handwritten journal and a digital notepad - both preserve your thoughts, but one bears the intimate traces of your hand and heart, while the other promises perfect clarity and infinite space.`
      ];
      
      const randomAnalogy = analogies[Math.floor(Math.random() * analogies.length)];
      setGeneratedAnalogy(randomAnalogy);
      setIsGenerating(false);
      toast.success('Analogy crafted! ✨');
    }, 2000);
  };

  const shareToTwitter = () => {
    const text = `"${generatedAnalogy}" - Created with the AI Analogy Generator ✨`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const sendEmail = () => {
    if (!email.trim()) {
      toast.error('Please enter your email address!');
      return;
    }
    
    if (!generatedAnalogy) {
      toast.error('Generate an analogy first!');
      return;
    }

    // Simulate email sending
    toast.success('Analogy sent to your inbox! 📧');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Vintage Background Pattern */}
      <div className="absolute inset-0 opacity-30 paper-texture"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <img 
              src={vintageHeader} 
              alt="Analogy Generator" 
              className="mx-auto rounded-lg magazine-border max-w-md"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold vintage-headline text-foreground mb-4">
            The Analogy
          </h1>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold vintage-headline text-vintage-brown mb-6">
            Generator
          </h2>
          
          <p className="text-lg md:text-xl font-sans text-muted-foreground vintage-subtext max-w-2xl mx-auto leading-relaxed">
            Discover unexpected connections between any two concepts with the gentle wisdom of artificial intelligence
          </p>
          
          <div className="flex items-center justify-center mt-6 space-x-2 text-vintage-rose">
            <Heart className="h-4 w-4 fill-current" />
            <span className="font-sans text-sm italic">Crafted with care</span>
            <Heart className="h-4 w-4 fill-current" />
          </div>
        </div>

        {/* Input Form */}
        <Card className="max-w-3xl mx-auto magazine-border bg-card/95 backdrop-blur-sm mb-12">
          <div className="p-8 md:p-12">
            <div className="space-y-8">
              
              {/* Thing 1 Input */}
              <div className="space-y-3">
                <label className="text-sm font-serif font-semibold text-vintage-brown uppercase tracking-wider">
                  First Concept
                </label>
                <Input
                  value={thing1}
                  onChange={(e) => setThing1(e.target.value)}
                  placeholder="Enter your first idea..."
                  className="magazine-border bg-input text-input-foreground placeholder:text-muted-foreground font-sans text-lg p-4 h-14"
                />
              </div>

              {/* Elegant Divider */}
              <div className="flex items-center justify-center py-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-vintage-brown to-transparent"></div>
                <div className="px-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-vintage-sage magazine-border">
                    <span className="font-serif font-bold text-vintage-brown">vs</span>
                  </div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-vintage-brown via-vintage-brown to-transparent"></div>
              </div>

              {/* Thing 2 Input */}
              <div className="space-y-3">
                <label className="text-sm font-serif font-semibold text-vintage-brown uppercase tracking-wider">
                  Second Concept
                </label>
                <Input
                  value={thing2}
                  onChange={(e) => setThing2(e.target.value)}
                  placeholder="Enter your second idea..."
                  className="magazine-border bg-input text-input-foreground placeholder:text-muted-foreground font-sans text-lg p-4 h-14"
                />
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full glass-button font-serif text-lg py-6 h-16"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent"></div>
                      <span>Crafting your analogy...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Analogy</span>
                      <Sparkles className="h-5 w-5" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Generated Analogy Display */}
        {generatedAnalogy && (
          <Card className="max-w-4xl mx-auto magazine-border bg-vintage-cream/50 backdrop-blur-sm mb-12">
            <div className="p-8 md:p-12">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl font-semibold text-vintage-brown mb-2">
                  ✨ Your Analogy ✨
                </h3>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-vintage-brown to-transparent mx-auto"></div>
              </div>
              
              <div className="bg-card magazine-border p-8 rounded-lg">
                <blockquote className="font-serif text-lg md:text-xl leading-relaxed text-center italic text-foreground">
                  "{generatedAnalogy}"
                </blockquote>
              </div>
              
              {/* Share Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button
                  onClick={shareToTwitter}
                  variant="outline"
                  className="magazine-border hover:bg-vintage-sage/20 transition-all font-sans"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Share on Twitter
                </Button>
                <Button
                  onClick={shareToLinkedIn}
                  variant="outline"
                  className="magazine-border hover:bg-vintage-lavender/20 transition-all font-sans"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  Share on LinkedIn
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Email Sharing */}
        {generatedAnalogy && (
          <Card className="max-w-lg mx-auto magazine-border bg-card/95 backdrop-blur-sm">
            <div className="p-6">
              <div className="text-center mb-4">
                <Mail className="h-6 w-6 mx-auto text-vintage-brown mb-2" />
                <h4 className="font-serif font-semibold text-vintage-brown">
                  Email This Analogy
                </h4>
              </div>
              <div className="flex space-x-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="magazine-border bg-input text-input-foreground font-sans"
                />
                <Button
                  onClick={sendEmail}
                  className="glass-button font-serif px-8"
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-12 mt-16">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-vintage-brown to-transparent mx-auto mb-4"></div>
        <p className="font-sans text-xs text-muted-foreground italic">
          Thoughtfully powered by artificial intelligence
        </p>
      </div>
    </div>
  );
};

export default AnalogyGenerator;