
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Twitter, Loader2, Copy, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const AnalogyGenerator = () => {
  const [thing1, setThing1] = useState('');
  const [thing2, setThing2] = useState('');
  const [generatedAnalogy, setGeneratedAnalogy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const handleGenerate = async () => {
    if (!thing1.trim() || !thing2.trim()) {
      toast.error('Please enter both concepts to compare!');
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-analogy', {
        body: { thing1: thing1.trim(), thing2: thing2.trim() }
      });

      console.log('Response from edge function:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data?.analogy) {
        console.log('Generated analogy:', data.analogy);
        setGeneratedAnalogy(data.analogy);
        
        // Generate shareable URL with the analogy
        const encodedAnalogy = encodeURIComponent(data.analogy);
        const url = `${window.location.origin}?analogy=${encodedAnalogy}`;
        setShareUrl(url);
        
        toast.success('Analogy generated!');
      } else {
        throw new Error('No analogy received');
      }
    } catch (error) {
      console.error('Error generating analogy:', error);
      toast.error('Failed to generate analogy. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareToTwitter = () => {
    const text = `${generatedAnalogy}\n\n${window.location.origin}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareToTikTok = () => {
    const text = `Check out this clever analogy: "${generatedAnalogy}"`;
    // TikTok doesn't have a direct share URL, so we'll copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Analogy copied to clipboard for TikTok!');
    });
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Share link copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-light text-foreground mb-6 tracking-tight">
            Analogy Generator
          </h1>
        </div>

        {/* Main Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
              What's the Analogy?
            </h2>
            <p className="text-muted-foreground">
              Get your analogy instantly.
            </p>
          </div>

          <Card className="border border-border bg-card p-8">
            <div className="space-y-6">
              
              {/* Input Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Thing 1
                  </label>
                  <Input
                    value={thing1}
                    onChange={(e) => setThing1(e.target.value)}
                    placeholder="e.g., Forrest Gump"
                    className="border-border bg-input h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Thing 2
                  </label>
                  <Input
                    value={thing2}
                    onChange={(e) => setThing2(e.target.value)}
                    placeholder="e.g., SpaceX"
                    className="border-border bg-input h-12"
                  />
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  'Get Analogy'
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Generated Analogy Display */}
        {generatedAnalogy && (
          <Card className="border border-border bg-card p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-medium text-foreground mb-4">
                Your Analogy
              </h3>
            </div>
            
            <div className="bg-muted p-6 rounded-md mb-6">
              <p className="text-foreground leading-relaxed text-center">
                {generatedAnalogy}
              </p>
            </div>
            
            {/* Share Options */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={shareToTwitter}
                variant="outline"
                size="sm"
                className="border-border"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                onClick={shareToTikTok}
                variant="outline"
                size="sm"
                className="border-border"
              >
                <span className="text-sm mr-2">🎵</span>
                TikTok
              </Button>
              <Button
                onClick={copyShareUrl}
                variant="outline"
                size="sm"
                className="border-border"
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center pt-16">
          <div className="w-16 h-px bg-border mx-auto mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default AnalogyGenerator;
