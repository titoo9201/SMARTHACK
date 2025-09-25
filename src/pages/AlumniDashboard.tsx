import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  PlusCircle, 
  Users, 
  MessageCircle, 
  Briefcase, 
  Calendar, 
  User, 
  Trophy,
  Star,
  Target,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';

export default function AlumniDashboard() {
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not authenticated or not alumni
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user || !profile || profile.role !== 'alumni') {
    return <Navigate to="/auth" replace />;
  }

  const stats = {
    posts: 12,
    mentees: 8,
    jobsPosted: 5,
    eventsHosted: 3,
    points: 2400,
    badges: 7
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, {profile.full_name || 'Alumni'}
          </h1>
          <p className="text-muted-foreground">
            Your impact on the community: {stats.mentees} students mentored, {stats.jobsPosted} opportunities shared
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.posts}</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.mentees}</p>
                  <p className="text-xs text-muted-foreground">Mentees</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.jobsPosted}</p>
                  <p className="text-xs text-muted-foreground">Jobs Posted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.eventsHosted}</p>
                  <p className="text-xs text-muted-foreground">Events</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.points}</p>
                  <p className="text-xs text-muted-foreground">Points</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.badges}</p>
                  <p className="text-xs text-muted-foreground">Badges</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="jobs">Job Board</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest contributions to the community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Mentorship session completed</p>
                        <p className="text-sm text-muted-foreground">with Sarah Johnson - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <PlusCircle className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Posted new job opportunity</p>
                        <p className="text-sm text-muted-foreground">Software Engineer at TechCorp - 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Joined networking event</p>
                        <p className="text-sm text-muted-foreground">Annual Alumni Meetup - 2 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gamification Panel */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5" />
                      <span>Your Progress</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Level Progress</span>
                        <span>Level 4</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">600 points to next level</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Recent Badges</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Mentor
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Target className="h-3 w-3 mr-1" />
                          Job Poster
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          Community Builder
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Create & Share Posts</CardTitle>
                    <CardDescription>Share career tips, opportunities, and achievements</CardDescription>
                  </div>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Career Tips</h4>
                      <p className="text-sm text-muted-foreground">Share insights from your professional journey</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Job Opportunities</h4>
                      <p className="text-sm text-muted-foreground">Post available positions and internships</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Achievements</h4>
                      <p className="text-sm text-muted-foreground">Celebrate your professional milestones</p>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mentorship Tab */}
          <TabsContent value="mentorship" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                  <CardDescription>Students seeking mentorship</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Alex Chen</p>
                        <p className="text-sm text-muted-foreground">Computer Science • Seeking career guidance</p>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Accept</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Maria Rodriguez</p>
                        <p className="text-sm text-muted-foreground">Business • Internship advice</p>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Accept</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Mentorships</CardTitle>
                  <CardDescription>Current mentees and scheduled sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">Next session: Tomorrow 2:00 PM</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Clock className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">David Kim</p>
                        <p className="text-sm text-muted-foreground">Next session: Friday 10:00 AM</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Clock className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Messages</span>
                </CardTitle>
                <CardDescription>Secure communication with students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Chat system coming soon</p>
                  <p className="text-sm text-muted-foreground">Connect with your mentees securely</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Career & Internship Board</CardTitle>
                    <CardDescription>Post opportunities and refer students</CardDescription>
                  </div>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Post Job
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Full-time Positions</h4>
                    <p className="text-sm text-muted-foreground mb-3">Share permanent opportunities at your company</p>
                    <Button variant="outline" size="sm">Post Position</Button>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Internships</h4>
                    <p className="text-sm text-muted-foreground mb-3">Help students gain valuable experience</p>
                    <Button variant="outline" size="sm">Post Internship</Button>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Event Participation</CardTitle>
                    <CardDescription>Join or host webinars, reunions, and networking events</CardDescription>
                  </div>
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    Host Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Webinars</h4>
                      <p className="text-sm text-muted-foreground">Share your expertise with students</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Reunions</h4>
                      <p className="text-sm text-muted-foreground">Connect with fellow alumni</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Networking</h4>
                      <p className="text-sm text-muted-foreground">Build professional relationships</p>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile & Verification</span>
                </CardTitle>
                <CardDescription>Update your professional details and verify credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Professional Information</h4>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Name:</strong> {profile.full_name}</p>
                        <p className="text-sm"><strong>Email:</strong> {profile.email}</p>
                        <p className="text-sm"><strong>Points:</strong> {profile.points}</p>
                      </div>
                      <Button variant="outline" className="mt-4">Edit Profile</Button>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Verification Status</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Email Verified</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">LinkedIn Pending</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Degree Verification Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}