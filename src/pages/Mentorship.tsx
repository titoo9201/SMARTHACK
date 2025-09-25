import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Calendar, 
  Clock, 
  Star, 
  Users,
  Video,
  CheckCircle,
  ArrowRight,
  Award,
  Heart
} from "lucide-react";

const Mentorship = () => {
  const activeMentorships = [
    {
      mentorName: "Sarah Chen",
      mentorRole: "Senior Software Engineer at Google",
      mentorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
      nextSession: "Tomorrow, 2:00 PM",
      totalSessions: 8,
      progress: 75,
      focusAreas: ["Career Growth", "Technical Skills"],
      lastMessage: "Looking forward to discussing your API design project!"
    },
    {
      mentorName: "Marcus Rodriguez", 
      mentorRole: "Product Manager at Microsoft",
      mentorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      nextSession: "Friday, 4:00 PM",
      totalSessions: 5,
      progress: 45,
      focusAreas: ["Product Strategy", "Leadership"],
      lastMessage: "Great progress on the roadmap exercise!"
    }
  ];

  const availableMentors = [
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist at Meta",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      sessions: 127,
      specialties: ["AI/ML", "Research", "PhD Guidance"],
      nextAvailable: "Next week",
      price: "Free",
      matchScore: 92
    },
    {
      name: "David Kim",
      role: "Startup Founder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      sessions: 89,
      specialties: ["Entrepreneurship", "Fundraising", "Product Development"],
      nextAvailable: "This week",
      price: "Free",
      matchScore: 88
    },
    {
      name: "Lisa Thompson",
      role: "UX Design Director at Airbnb",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      sessions: 156,
      specialties: ["UX Design", "Design Leadership", "Portfolio Reviews"],
      nextAvailable: "Next week",
      price: "Free",
      matchScore: 95
    }
  ];

  const mentorshipPrograms = [
    {
      title: "Career Transition Bootcamp",
      description: "3-month intensive program for career switchers",
      duration: "12 weeks",
      mentors: 5,
      participants: 24,
      startDate: "January 15, 2025",
      status: "Open"
    },
    {
      title: "Tech Leadership Circle",
      description: "For aspiring engineering managers and tech leads",
      duration: "6 weeks",
      mentors: 8,
      participants: 16,
      startDate: "February 1, 2025", 
      status: "Open"
    },
    {
      title: "Startup Founders Cohort",
      description: "From idea to launch with experienced entrepreneurs",
      duration: "16 weeks",
      mentors: 12,
      participants: 20,
      startDate: "March 1, 2025",
      status: "Waitlist"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-8 h-8 text-primary-blue" />
            <h1 className="text-4xl font-bold">Mentorship Hub</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Connect with experienced alumni for personalized career guidance and growth
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple mx-auto mb-3 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">247</p>
            <p className="text-sm text-muted-foreground">Active Mentors</p>
          </Card>
          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-success-green to-success-green/80 mx-auto mb-3 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">1,834</p>
            <p className="text-sm text-muted-foreground">Sessions Completed</p>
          </Card>
          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-warning-orange to-warning-orange/80 mx-auto mb-3 flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">4.8</p>
            <p className="text-sm text-muted-foreground">Avg. Rating</p>
          </Card>
          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-purple to-accent mx-auto mb-3 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">94%</p>
            <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Mentorships */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Your Active Mentorships</h2>
              <div className="space-y-4">
                {activeMentorships.map((mentorship, index) => (
                  <Card key={index} className="p-6 border-0 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <img
                        src={mentorship.mentorAvatar}
                        alt={mentorship.mentorName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{mentorship.mentorName}</h3>
                            <p className="text-muted-foreground">{mentorship.mentorRole}</p>
                          </div>
                          <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20">
                            Active
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-primary-blue" />
                            <span>Next: {mentorship.nextSession}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Video className="w-4 h-4 text-primary-blue" />
                            <span>{mentorship.totalSessions} sessions completed</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{mentorship.progress}%</span>
                          </div>
                          <div className="bg-secondary/50 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary-blue to-primary-purple h-2 rounded-full transition-all"
                              style={{ width: `${mentorship.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {mentorship.focusAreas.map((area, areaIndex) => (
                            <Badge key={areaIndex} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground italic">
                            "{mentorship.lastMessage}"
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" variant="hero">
                              <Video className="w-4 h-4 mr-1" />
                              Join Session
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Available Mentors */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recommended Mentors</h2>
                <Button variant="outline">
                  View All Mentors
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableMentors.map((mentor, index) => (
                  <Card key={index} className="p-6 border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold">{mentor.name}</h3>
                          <Badge variant="outline" className="bg-primary-blue/10 text-primary-blue border-primary-blue/20">
                            {mentor.matchScore}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{mentor.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {mentor.rating}
                      </div>
                      <div>{mentor.sessions} sessions</div>
                      <div className="text-success-green">{mentor.price}</div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {mentor.specialties.map((specialty, specIndex) => (
                        <Badge key={specIndex} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Available: {mentor.nextAvailable}
                      </p>
                      <Button size="sm" variant="hero">
                        Request Mentorship
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="hero" size="sm" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Find a Mentor
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Become a Mentor
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Join Group Program
                </Button>
              </div>
            </Card>

            {/* Mentorship Programs */}
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Group Programs</h3>
              <div className="space-y-4">
                {mentorshipPrograms.map((program, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{program.title}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          program.status === "Open" 
                            ? "bg-success-green/10 text-success-green border-success-green/20"
                            : "bg-warning-orange/10 text-warning-orange border-warning-orange/20"
                        }`}
                      >
                        {program.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{program.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{program.duration}</span>
                      <span>{program.mentors} mentors</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Starts: {program.startDate}</p>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Learn More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Success Stories */}
            <Card className="p-6 border-0 bg-gradient-to-br from-primary-blue/10 to-primary-purple/10">
              <h3 className="text-lg font-semibold mb-4">Success Story</h3>
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Success story"
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                />
                <p className="text-sm text-muted-foreground mb-3">
                  "Thanks to my mentor Sarah, I successfully transitioned from finance to tech and landed my dream job at Google!"
                </p>
                <p className="text-xs font-medium">- Alex Thompson, Class of 2020</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;