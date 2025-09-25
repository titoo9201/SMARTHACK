import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { 
  Trophy, 
  Star, 
  Users, 
  MessageCircle, 
  Award, 
  TrendingUp,
  Crown,
  Medal,
  Target,
  Flame,
  Calendar,
  Gift
} from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  badges: string[];
  contributions: {
    mentoringSessions: number;
    connectionsHelped: number;
    eventsAttended: number;
    articlesShared: number;
  };
  streak: number;
  level: string;
  university: string;
  graduationYear: string;
}

const Leaderboard = () => {
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
      points: 15840,
      badges: ["Mentor Master", "Network Builder", "Event Champion"],
      contributions: {
        mentoringSessions: 47,
        connectionsHelped: 124,
        eventsAttended: 23,
        articlesShared: 18
      },
      streak: 45,
      level: "Alumni Legend",
      university: "Stanford University",
      graduationYear: "2018"
    },
    {
      rank: 2,
      name: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      points: 14230,
      badges: ["Career Guide", "Innovation Leader"],
      contributions: {
        mentoringSessions: 38,
        connectionsHelped: 95,
        eventsAttended: 19,
        articlesShared: 25
      },
      streak: 32,
      level: "Alumni Champion",
      university: "MIT",
      graduationYear: "2017"
    },
    {
      rank: 3,
      name: "Dr. Emily Watson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      points: 13650,
      badges: ["Research Pioneer", "Knowledge Sharer"],
      contributions: {
        mentoringSessions: 41,
        connectionsHelped: 87,
        eventsAttended: 16,
        articlesShared: 31
      },
      streak: 28,
      level: "Alumni Champion",
      university: "Harvard University",
      graduationYear: "2015"
    },
    {
      rank: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      points: 12180,
      badges: ["Startup Guru", "Mentor Master"],
      contributions: {
        mentoringSessions: 33,
        connectionsHelped: 72,
        eventsAttended: 21,
        articlesShared: 14
      },
      streak: 21,
      level: "Alumni Expert",
      university: "UC Berkeley",
      graduationYear: "2019"
    },
    {
      rank: 5,
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      points: 11750,
      badges: ["Community Builder", "Event Champion"],
      contributions: {
        mentoringSessions: 29,
        connectionsHelped: 68,
        eventsAttended: 27,
        articlesShared: 12
      },
      streak: 19,
      level: "Alumni Expert",
      university: "Yale University",
      graduationYear: "2016"
    }
  ];

  const achievements = [
    { name: "Mentor Master", description: "Completed 25+ mentoring sessions", icon: Users, color: "from-primary-blue to-primary-purple" },
    { name: "Network Builder", description: "Helped 100+ connections", icon: Target, color: "from-success-green to-success-green/80" },
    { name: "Event Champion", description: "Attended 20+ events", icon: Calendar, color: "from-warning-orange to-warning-orange/80" },
    { name: "Knowledge Sharer", description: "Shared 30+ articles", icon: Award, color: "from-primary-purple to-accent" },
    { name: "Career Guide", description: "Guided 50+ career transitions", icon: TrendingUp, color: "from-accent to-primary-purple" },
    { name: "Innovation Leader", description: "Led breakthrough initiatives", icon: Star, color: "from-primary-blue to-accent" }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-primary-blue" />
            <h1 className="text-4xl font-bold">Alumni Leaderboard</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Celebrating our most engaged alumni who are making a difference in the community
          </p>
        </div>

        {/* Current Season Info */}
        <Card className="p-6 mb-8 border-0 bg-gradient-to-r from-primary-blue/10 to-primary-purple/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Q4 2024 Engagement Challenge</h3>
              <p className="text-muted-foreground">Season ends in 23 days</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">2,847</p>
                <p className="text-sm text-muted-foreground">Total Participants</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">$50,000</p>
                <p className="text-sm text-muted-foreground">Scholarship Pool</p>
              </div>
              <Button variant="hero">
                <Gift className="w-4 h-4 mr-2" />
                View Rewards
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Top Alumni</h2>
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Weekly View
                </Button>
              </div>
              
              <div className="space-y-4">
                {leaderboardData.map((entry) => (
                  <Card key={entry.rank} className="p-4 border-0 bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(entry.rank)}`}>
                          {getRankIcon(entry.rank)}
                        </div>
                      </div>

                      {/* Avatar and Basic Info */}
                      <div className="flex-shrink-0">
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{entry.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {entry.university} • Class of {entry.graduationYear}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary-blue">{entry.points.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">points</p>
                          </div>
                        </div>

                        {/* Level and Streak */}
                        <div className="flex items-center gap-4 mb-3">
                          <Badge variant="outline" className="bg-primary-purple/10 text-primary-purple border-primary-purple/20">
                            {entry.level}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Flame className="w-4 h-4 text-warning-orange" />
                            {entry.streak} day streak
                          </div>
                        </div>

                        {/* Contributions */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="text-center">
                            <p className="font-semibold text-foreground">{entry.contributions.mentoringSessions}</p>
                            <p className="text-xs text-muted-foreground">Mentoring</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-foreground">{entry.contributions.connectionsHelped}</p>
                            <p className="text-xs text-muted-foreground">Connections</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-foreground">{entry.contributions.eventsAttended}</p>
                            <p className="text-xs text-muted-foreground">Events</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-foreground">{entry.contributions.articlesShared}</p>
                            <p className="text-xs text-muted-foreground">Articles</p>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-1">
                          {entry.badges.map((badge, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-6">
                <Button variant="outline">
                  View Full Leaderboard
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Rank */}
            <Card className="p-6 border-0 bg-gradient-to-br from-primary-blue/10 to-primary-purple/10">
              <h3 className="text-lg font-semibold mb-4">Your Current Rank</h3>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-blue to-primary-purple mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">#42</span>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">3,240 points</p>
                <p className="text-sm text-muted-foreground mb-4">Alumni Contributor</p>
                <div className="bg-secondary/50 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-primary-blue to-primary-purple h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">760 points to Alumni Expert</p>
              </div>
            </Card>

            {/* Achievement Gallery */}
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Achievement Gallery</h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${achievement.color} mx-auto mb-2 flex items-center justify-center`}>
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-medium text-foreground mb-1">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Earn More Points</h3>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Mentoring (+50 pts)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Make Connection (+25 pts)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Attend Event (+30 pts)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Share Knowledge (+15 pts)
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;