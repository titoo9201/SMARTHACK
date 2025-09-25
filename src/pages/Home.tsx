import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlumniCard } from "@/components/AlumniCard";
import { StatsCard } from "@/components/StatsCard";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-alumni.jpg";
import { Link } from "react-router-dom";
import { 
  Brain,
  Users,
  Target,
  Trophy,
  MessageCircle,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Star,
  TrendingUp,
  Award
} from "lucide-react";

const Home = () => {
  const { user, profile } = useAuth();
  const sampleAlumni = [
    {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      graduationYear: "2018",
      skills: ["Machine Learning", "Python", "React", "Cloud Computing"],
      matchScore: 95,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
      verified: true
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      graduationYear: "2017",
      skills: ["Product Strategy", "Analytics", "Leadership", "AI/ML"],
      matchScore: 88,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      verified: true
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      company: "Meta",
      location: "Menlo Park, CA",
      graduationYear: "2015",
      skills: ["Computer Vision", "Deep Learning", "Research", "Publications"],
      matchScore: 92,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 via-background to-primary-purple/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-primary-blue/10 text-primary-blue border-primary-blue/20">
                  <Brain className="w-4 h-4 mr-1" />
                  AI-Powered Networking
                </Badge>
                <h1 className="text-5xl font-bold leading-tight">
                  Connect with{" "}
                  <span className="bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
                    Smart Alumni
                  </span>{" "}
                  Recommendations
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Our AI-driven platform matches you with the perfect alumni mentors, 
                  career opportunities, and networking connections based on your goals and profile.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/alumni">
                  <Button size="lg" variant="hero" className="text-lg px-8">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Smart Networking
                  </Button>
                </Link>
                <Link to="/career-insights">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    View Career Insights
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">15,000+</p>
                  <p className="text-sm text-muted-foreground">Active Alumni</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">98%</p>
                  <p className="text-sm text-muted-foreground">Match Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">Universities</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="AI-powered alumni networking"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Alumni Connections"
              value="15,247"
              subtitle="Across 50+ countries"
              icon={Users}
              trend={{ value: "12%", positive: true }}
            />
            <StatsCard
              title="Successful Matches"
              value="8,956"
              subtitle="This month"
              icon={Target}
              trend={{ value: "8%", positive: true }}
              gradient="from-success-green to-success-green/80"
            />
            <StatsCard
              title="Mentorship Sessions"
              value="3,402"
              subtitle="Active sessions"
              icon={MessageCircle}
              trend={{ value: "15%", positive: true }}
              gradient="from-primary-purple to-accent"
            />
            <StatsCard
              title="Career Advancement"
              value="89%"
              subtitle="Success rate"
              icon={TrendingUp}
              gradient="from-warning-orange to-warning-orange/80"
            />
          </div>
        </div>
      </section>

      {/* AI-Recommended Alumni */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-primary-blue/10 text-primary-blue border-primary-blue/20">
              <Brain className="w-4 h-4 mr-1" />
              AI-Powered Recommendations
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Perfect Alumni Matches for You</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI analyzes your profile, goals, and preferences to suggest 
              the most relevant alumni connections for mentorship and networking.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleAlumni.map((alumni, index) => (
              <AlumniCard key={index} {...alumni} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/alumni">
              <Button variant="hero" size="lg">
                <Users className="w-5 h-5 mr-2" />
                Discover More Alumni
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for smart alumni networking and career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple mb-4 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Matching Engine</h3>
              <p className="text-muted-foreground">
                Advanced algorithms analyze profiles to suggest perfect mentor and networking matches.
              </p>
            </Card>
            
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-success-green to-success-green/80 mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Credentials</h3>
              <p className="text-muted-foreground">
                Blockchain-based verification ensures authentic alumni profiles and credentials.
              </p>
            </Card>
            
            <Link to="/leaderboard">
              <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-purple to-accent mb-4 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gamified Engagement</h3>
                <p className="text-muted-foreground">
                  Earn points, badges, and recognition for active participation and mentoring.
                </p>
              </Card>
            </Link>
            
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-warning-orange to-warning-orange/80 mb-4 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Network</h3>
              <p className="text-muted-foreground">
                Connect with alumni across 500+ universities in 50+ countries worldwide.
              </p>
            </Card>
            
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple mb-4 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Chatbot</h3>
              <p className="text-muted-foreground">
                AI assistant helps you find alumni by industry, location, skills, and more.
              </p>
            </Card>
            
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-purple to-accent mb-4 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Virtual Events</h3>
              <p className="text-muted-foreground">
                Join virtual reunions, workshops, and networking events in immersive 3D spaces.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-blue to-primary-purple">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Alumni Network?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of alumni and students already leveraging AI-powered 
            networking for career growth and meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Star className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary-blue">
              <MessageCircle className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;