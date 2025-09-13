import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CometCard } from '@/components/ui/comet-card';
import { Camera, Upload, Shuffle, Download, Share, RotateCcw, Heart, X, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Reaction {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

interface DonkeyExpression {
  id: string;
  image: string;
  expression: string;
  feeling: string;
  description: string;
  mood: 'happy' | 'surprised' | 'judgmental' | 'confused' | 'excited' | 'skeptical' | 'amused' | 'shocked' | 'curious' | 'disappointed';
}

const PhotoReactionSection = () => {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reactionIntensity, setReactionIntensity] = useState(3);
  const [selectedDonkey, setSelectedDonkey] = useState<DonkeyExpression | null>(null);
  const [showExpressionBanner, setShowExpressionBanner] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Donkey expressions database
  const donkeyExpressions: DonkeyExpression[] = [
    {
      id: '1',
      image: '/1000094808.jpg',
      expression: 'Judgmental Stare',
      feeling: 'Unimpressed',
      description: 'Donkey is giving you the classic "Really?" look. He\'s seen better photos.',
      mood: 'judgmental'
    },
    {
      id: '2',
      image: '/1000094963.jpg',
      expression: 'Surprised Gasp',
      feeling: 'Shocked',
      description: 'Donkey is absolutely shocked by what he\'s seeing! This photo is something else!',
      mood: 'shocked'
    },
    {
      id: '3',
      image: '/1000108581.jpg',
      expression: 'Skeptical Glance',
      feeling: 'Doubtful',
      description: 'Donkey is not buying whatever you\'re trying to sell him with this photo.',
      mood: 'skeptical'
    },
    {
      id: '4',
      image: '/1000108582.jpg',
      expression: 'Confused Head Tilt',
      feeling: 'Bewildered',
      description: 'Donkey is genuinely confused about what he\'s looking at. He needs more context.',
      mood: 'confused'
    },
    {
      id: '5',
      image: '/1000108583.jpg',
      expression: 'Amused Smirk',
      feeling: 'Entertained',
      description: 'Donkey finds this photo quite amusing. He\'s having a good laugh!',
      mood: 'amused'
    },
    {
      id: '6',
      image: '/1000108584.jpg',
      expression: 'Excited Bray',
      feeling: 'Thrilled',
      description: 'Donkey is absolutely thrilled by this photo! He can\'t contain his excitement!',
      mood: 'excited'
    },
    {
      id: '7',
      image: '/1000108585.jpg',
      expression: 'Curious Investigation',
      feeling: 'Intrigued',
      description: 'Donkey is very curious about this photo. He wants to know more!',
      mood: 'curious'
    },
    {
      id: '8',
      image: '/1000108586.jpg',
      expression: 'Disappointed Sigh',
      feeling: 'Let Down',
      description: 'Donkey had higher expectations. This photo is a bit disappointing.',
      mood: 'disappointed'
    },
    {
      id: '9',
      image: '/1000108587.jpg',
      expression: 'Happy Grin',
      feeling: 'Delighted',
      description: 'Donkey absolutely loves this photo! It made his day!',
      mood: 'happy'
    },
    {
      id: '10',
      image: '/1000108588.jpg',
      expression: 'Wide-Eyed Wonder',
      feeling: 'Astonished',
      description: 'Donkey is in complete awe of this photo. He\'s never seen anything like it!',
      mood: 'surprised'
    },
    {
      id: '11',
      image: '/1000108589.jpg',
      expression: 'Suspicious Squint',
      feeling: 'Suspicious',
      description: 'Donkey is giving you the side-eye. Something about this photo seems fishy.',
      mood: 'skeptical'
    },
    {
      id: '12',
      image: '/1000108590.jpg',
      expression: 'Bewildered Stare',
      feeling: 'Perplexed',
      description: 'Donkey is completely bewildered by this photo. He needs a moment to process.',
      mood: 'confused'
    },
    {
      id: '13',
      image: '/1000108591.jpg',
      expression: 'Joyful Laugh',
      feeling: 'Ecstatic',
      description: 'Donkey is laughing his head off! This photo is absolutely hilarious!',
      mood: 'happy'
    },
    {
      id: '14',
      image: '/1000108609.jpg',
      expression: 'Shocked Gasp',
      feeling: 'Astonished',
      description: 'Donkey can\'t believe what he\'s seeing! This photo is mind-blowing!',
      mood: 'shocked'
    },
    {
      id: '15',
      image: '/1000108610.jpg',
      expression: 'Thoughtful Contemplation',
      feeling: 'Pensive',
      description: 'Donkey is deep in thought about this photo. It\'s making him think.',
      mood: 'curious'
    }
  ];

  const donkeyReactions = [
    '🤯', '😱', '🤩', '😂', '🙄', '🤔', '😍', '🤢', 
    '😳', '🤯', '😵', '🥳', '😎', '🤪', '😏', '🫨'
  ];

  const generateRandomReactions = useCallback(() => {
    if (!uploadedImage) return;
    
    const newReactions: Reaction[] = [];
    const numReactions = Math.min(reactionIntensity, 5);
    
    for (let i = 0; i < numReactions; i++) {
      newReactions.push({
        id: Math.random().toString(36),
        emoji: donkeyReactions[Math.floor(Math.random() * donkeyReactions.length)],
        x: Math.random() * 80 + 10, // 10-90% from left
        y: Math.random() * 80 + 10, // 10-90% from top  
        size: Math.random() * 40 + 40, // 40-80px
        rotation: Math.random() * 60 - 30 // -30 to 30 degrees
      });
    }
    
    setReactions(newReactions);
  }, [uploadedImage, reactionIntensity]);

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Wrong file type!",
        description: "Donkey only understands JPG, PNG, and WebP. Try a different format!",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too big!",
        description: "Whoa there! That file's too big for Donkey to handle. Try something under 10MB!",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setIsProcessing(false);
      
      // Select a random donkey expression
      const randomDonkey = donkeyExpressions[Math.floor(Math.random() * donkeyExpressions.length)];
      setSelectedDonkey(randomDonkey);
      setShowExpressionBanner(true);
      
      setTimeout(() => {
        generateRandomReactions();
        toast({
          title: "Donkey has reacted!",
          description: `He's feeling ${randomDonkey.feeling.toLowerCase()}!`
        });
      }, 500);
    };
    
    reader.readAsDataURL(file);
  }, [generateRandomReactions, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const downloadImage = useCallback(() => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    // Draw the image
    ctx.drawImage(img, 0, 0);
    
    // Draw reactions
    reactions.forEach(reaction => {
      ctx.save();
      const x = (reaction.x / 100) * canvas.width;
      const y = (reaction.y / 100) * canvas.height;
      
      ctx.translate(x, y);
      ctx.rotate((reaction.rotation * Math.PI) / 180);
      ctx.font = `${reaction.size}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(reaction.emoji, 0, 0);
      ctx.restore();
    });
    
    // Download
    const link = document.createElement('a');
    link.download = 'donkey-reaction.png';
    link.href = canvas.toDataURL();
    link.click();
    
    toast({
      title: "Downloaded!",
      description: "Your Donkey reaction is ready to go!"
    });
  }, [reactions, toast]);

  const shareImage = useCallback(() => {
    const text = "Check out how @DonkeyCoin reacted to my photo! 🫏💚 #DonkeyReaction #MemeCoin";
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Donkey Reaction',
        text: text,
        url: url
      });
    } else {
      // Fallback to Twitter
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    }
    
    toast({
      title: "Shared!",
      description: "Donkey's reaction is now spreading across the internet!"
    });
  }, [toast]);

  return (
    <section id="photo-reaction" className="py-20 relative bg-card/30 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/energy.mp4" type="video/mp4" />
      </video>
      
      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient">
              DONKEY Reaction Feature
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your photo and watch Donkey react! Share the hilarious results with the world.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <div className="space-y-6">
              {!uploadedImage ? (
                <div
                  className={`
                    card-premium border-2 border-dashed p-8 text-center cursor-pointer
                    transition-all duration-300 hover:card-glow
                    ${isDragging ? 'border-primary bg-primary/10 scale-102' : 'border-border'}
                  `}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isProcessing ? (
                    <div className="space-y-4">
                      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-lg font-medium">Donkey is getting ready to react...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-16 h-16 text-primary mx-auto animate-bounce" />
                      <div>
                        <p className="text-lg font-medium mb-2">
                          {isDragging ? "Drop it like it's hot! 🔥" : "Drop your photo here or click to browse"}
                        </p>
                        <p className="text-muted-foreground">JPG, PNG, WebP up to 10MB</p>
                      </div>
                      <Button className="btn-secondary">
                        <Camera className="mr-2 w-5 h-5" />
                        Choose Photo
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Donkey Expression Display with Wooden Frame */}
                  {selectedDonkey && (
                    <div className="relative">
                      <div className="wooden-frame p-4 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-lg shadow-2xl border-4 border-amber-600">
                        <div className="bg-amber-50 p-2 rounded border-2 border-amber-400">
                          <img
                            src={selectedDonkey.image}
                            alt={`Donkey ${selectedDonkey.expression}`}
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                        </div>
                        <div className="mt-3 text-center">
                          <h3 className="text-lg font-bold text-amber-100 mb-1">
                            {selectedDonkey.expression}
                          </h3>
                          <p className="text-amber-200 text-sm">
                            Feeling: <span className="font-semibold">{selectedDonkey.feeling}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* User's Uploaded Photo */}
                  <div className="relative card-premium p-4">
                    <img
                      ref={imageRef}
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-auto rounded-lg"
                      style={{ position: 'relative' }}
                    />
                    {reactions.map((reaction) => (
                      <div
                        key={reaction.id}
                        className="absolute pointer-events-none animate-bounce-slow"
                        style={{
                          left: `${reaction.x}%`,
                          top: `${reaction.y}%`,
                          fontSize: `${reaction.size}px`,
                          transform: `translate(-50%, -50%) rotate(${reaction.rotation}deg)`,
                          textShadow: '0 0 10px rgba(0,0,0,0.5)'
                        }}
                      >
                        {reaction.emoji}
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={() => {
                      setUploadedImage(null);
                      setReactions([]);
                      setSelectedDonkey(null);
                      setShowExpressionBanner(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <X className="mr-2 w-4 h-4" />
                    Try Another Photo
                  </Button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <div className="card-premium p-6">
                <h3 className="text-xl font-bold mb-4 text-gradient">Reaction Controls</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Reaction Intensity: {reactionIntensity}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={reactionIntensity}
                      onChange={(e) => {
                        const newIntensity = Number(e.target.value);
                        setReactionIntensity(newIntensity);
                        // Regenerate reactions with new intensity if image is uploaded
                        if (uploadedImage) {
                          setTimeout(() => {
                            generateRandomReactions();
                          }, 100);
                        }
                      }}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      disabled={!uploadedImage}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => {
                        if (uploadedImage) {
                          generateRandomReactions();
                          // Also get a new donkey reaction
                          const newDonkey = donkeyExpressions[Math.floor(Math.random() * donkeyExpressions.length)];
                          setSelectedDonkey(newDonkey);
                          toast({
                            title: "New reaction generated!",
                            description: `Donkey is now feeling ${newDonkey.feeling.toLowerCase()}!`
                          });
                        }
                      }}
                      disabled={!uploadedImage}
                      className="btn-secondary"
                    >
                      <Shuffle className="mr-2 w-4 h-4" />
                      Shuffle All
                    </Button>
                    
                    <Button
                      onClick={() => {
                        setReactions([]);
                        if (uploadedImage) {
                          // Get a new donkey reaction when clearing
                          const newDonkey = donkeyExpressions[Math.floor(Math.random() * donkeyExpressions.length)];
                          setSelectedDonkey(newDonkey);
                          toast({
                            title: "Reactions cleared!",
                            description: `Donkey has a new ${newDonkey.feeling.toLowerCase()} reaction!`
                          });
                        }
                      }}
                      disabled={!uploadedImage}
                      variant="outline"
                    >
                      <RotateCcw className="mr-2 w-4 h-4" />
                      New Reaction
                    </Button>
                  </div>
                </div>
              </div>

              {uploadedImage && reactions.length > 0 && (
                <div className="card-glow p-6">
                  <h3 className="text-xl font-bold mb-4 text-gradient">Share & Download</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={downloadImage} className="btn-hero">
                      <Download className="mr-2 w-4 h-4" />
                      Download
                    </Button>
                    
                    <Button onClick={shareImage} className="btn-secondary">
                      <Share className="mr-2 w-4 h-4" />
                      Share
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Share your Donkey reaction and spread the meme!
                  </p>
                </div>
              )}

              {/* Fun Stats */}
              <div className="card-premium p-6">
                <h3 className="text-lg font-bold mb-3">🫏 Donkey Says:</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• "I see everything, judge everything!"</p>
                  <p>• "Your photo deserves a royal reaction!"</p>
                  <p>• "Don't blame me, I'm just being honest!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* Expression Banner Popup */}
      {showExpressionBanner && selectedDonkey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <CometCard>
             <div className="bg-gradient-to-br from-[#1F2121] to-[#0F0F0F] rounded-xl shadow-2xl border border-gray-700 max-w-md w-full p-6 relative scale-100">
              <button
                onClick={() => setShowExpressionBanner(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
              
               <div className="text-center mb-6">
                 <div className="text-4xl mb-3">🫏</div>
                 <h2 className="text-2xl font-bold text-white mb-2">
                   Donkey's Reaction
                 </h2>
                 <h3 className="text-xl font-semibold text-gray-300 mb-2">
                   {selectedDonkey.expression}
                 </h3>
                 <p className="text-gray-400 font-medium">
                   Feeling: <span className="text-white">{selectedDonkey.feeling}</span>
                 </p>
               </div>
              
               {/* Donkey Image in CometCard */}
               <div className="mb-6">
                 <div className="relative aspect-[3/4] w-full max-w-64 mx-auto">
                  <img
                    src={selectedDonkey.image}
                    alt={`Donkey ${selectedDonkey.expression}`}
                    className="absolute inset-0 h-full w-full rounded-[16px] bg-black object-cover contrast-75"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.3) 0px 5px 6px 0px",
                      opacity: 1,
                    }}
                  />
                </div>
              </div>
              
               <div className="bg-gray-800 rounded-lg p-4 mb-6">
                 <p className="text-gray-200 text-center leading-relaxed">
                   "{selectedDonkey.description}"
                 </p>
               </div>
               
               <div className="flex gap-3">
                 <Button
                   onClick={() => setShowExpressionBanner(false)}
                   className="flex-1 bg-primary hover:bg-primary/90 text-white"
                 >
                   Got it!
                 </Button>
                 <Button
                   onClick={() => {
                     const newDonkey = donkeyExpressions[Math.floor(Math.random() * donkeyExpressions.length)];
                     setSelectedDonkey(newDonkey);
                   }}
                   variant="outline"
                   className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                 >
                   <Shuffle className="w-4 h-4 mr-2" />
                   New Reaction
                 </Button>
              </div>
            </div>
          </CometCard>
        </div>
      )}

      {/* Hidden canvas for downloading */}
      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
};

export default PhotoReactionSection;