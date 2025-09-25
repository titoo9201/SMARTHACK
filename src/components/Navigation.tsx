import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Search, 
  Bell, 
  MessageCircle, 
  User, 
  Brain,
  Trophy,
  Users,
  BarChart3,
  LogOut,
  Shield
} from "lucide-react";

export const Navigation = () => {
  const { user, profile, signOut } = useAuth();

  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AlumniAI</h1>
              <p className="text-xs text-muted-foreground">Smart Networking Platform</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/alumni">
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="w-4 h-4" />
                Discover Alumni
              </Button>
            </Link>
            <Link to="/mentorship">
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Mentorship
              </Button>
            </Link>
            <Link to="/career-insights">
              <Button variant="ghost" size="sm" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Career Insights
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <Trophy className="w-4 h-4" />
                Achievements
                <Badge variant="outline" className="ml-1">
                  247
                </Badge>
              </Button>
            </Link>
            {profile?.role === 'alumni' && (
              <Link to="/alumni-dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Alumni Dashboard
                </Button>
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-blue text-white text-xs flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                
                {profile?.role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Shield className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                
                <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{profile?.full_name || user.email}</span>
                  {profile?.points !== undefined && (
                    <Badge variant="secondary" className="ml-2">
                      {profile.points} pts
                    </Badge>
                  )}
                </div>
                
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="hero" size="sm">
                  Join Platform
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};