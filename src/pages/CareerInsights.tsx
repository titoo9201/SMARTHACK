import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CareerHeatmap } from "@/components/CareerHeatmap";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  Briefcase,
  DollarSign,
  Target,
  Globe,
  Calendar,
  Star,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const CareerInsights = () => {
  const industryTrends = [
    { industry: "Technology", growth: "+18%", avgSalary: "$145K", openings: 2847, trend: "up" },
    { industry: "Finance", growth: "+12%", avgSalary: "$128K", openings: 1923, trend: "up" },
    { industry: "Healthcare", growth: "+15%", avgSalary: "$98K", openings: 1456, trend: "up" },
    { industry: "Consulting", growth: "+8%", avgSalary: "$135K", openings: 987, trend: "up" },
    { industry: "Media", growth: "-3%", avgSalary: "$76K", openings: 543, trend: "down" },
  ];

  const salaryInsights = [
    { role: "Software Engineer", entry: "$95K", mid: "$145K", senior: "$185K", location: "San Francisco" },
    { role: "Product Manager", entry: "$85K", mid: "$135K", senior: "$175K", location: "Seattle" },
    { role: "Data Scientist", entry: "$90K", mid: "$140K", senior: "$180K", location: "New York" },
    { role: "UX Designer", entry: "$75K", mid: "$115K", senior: "$155K", location: "Austin" },
  ];

  const upcomingEvents = [
    {
      title: "Tech Career Fair 2024",
      date: "Dec 15, 2024",
      companies: 45,
      type: "Virtual",
      industry: "Technology"
    },
    {
      title: "Finance Alumni Mixer",
      date: "Dec 20, 2024", 
      companies: 18,
      type: "In-Person",
      industry: "Finance"
    },
    {
      title: "Startup Showcase",
      date: "Jan 8, 2025",
      companies: 32,
      type: "Hybrid",
      industry: "Startup"
    }
  ];

  const skillsInDemand = [
    { skill: "Machine Learning", demand: 95, growth: "+25%" },
    { skill: "Cloud Computing", demand: 92, growth: "+22%" },
    { skill: "Product Management", demand: 88, growth: "+18%" },
    { skill: "Data Analysis", demand: 85, growth: "+15%" },
    { skill: "UI/UX Design", demand: 82, growth: "+12%" },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-8 h-8 text-primary-blue" />
            <h1 className="text-4xl font-bold">Career Insights</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Data-driven insights to guide your career decisions and opportunities
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20">
                +12%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-foreground">15,247</p>
            <p className="text-sm text-muted-foreground">Alumni Employed</p>
          </Card>

          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-success-green to-success-green/80 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20">
                +8%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-foreground">$127K</p>
            <p className="text-sm text-muted-foreground">Avg. Salary</p>
          </Card>

          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-warning-orange to-warning-orange/80 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20">
                +15%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-foreground">8,456</p>
            <p className="text-sm text-muted-foreground">Job Openings</p>
          </Card>

          <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-purple to-accent flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20">
                +18%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-foreground">94%</p>
            <p className="text-sm text-muted-foreground">Employment Rate</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Heatmap */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Global Alumni Career Map</h2>
                <Button variant="outline">
                  <Globe className="w-4 h-4 mr-2" />
                  Interactive Map
                </Button>
              </div>
              <CareerHeatmap />
            </section>

            {/* Industry Trends */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Industry Growth Trends</h2>
              <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
                <div className="space-y-4">
                  {industryTrends.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {item.trend === "up" ? (
                            <ArrowUp className="w-5 h-5 text-success-green" />
                          ) : (
                            <ArrowDown className="w-5 h-5 text-destructive" />
                          )}
                          <span className="font-medium">{item.industry}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className={`font-bold ${item.trend === "up" ? "text-success-green" : "text-destructive"}`}>
                            {item.growth}
                          </p>
                          <p className="text-muted-foreground">Growth</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-foreground">{item.avgSalary}</p>
                          <p className="text-muted-foreground">Avg. Salary</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-foreground">{item.openings.toLocaleString()}</p>
                          <p className="text-muted-foreground">Openings</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* Salary Insights */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Salary Progression by Role</h2>
              <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
                <div className="space-y-6">
                  {salaryInsights.map((role, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{role.role}</h3>
                        <Badge variant="outline" className="bg-primary-blue/10 text-primary-blue border-primary-blue/20">
                          {role.location}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-lg bg-secondary/30">
                          <p className="text-lg font-bold text-foreground">{role.entry}</p>
                          <p className="text-sm text-muted-foreground">Entry Level</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-primary-blue/10">
                          <p className="text-lg font-bold text-primary-blue">{role.mid}</p>
                          <p className="text-sm text-muted-foreground">Mid Level</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-primary-purple/10">
                          <p className="text-lg font-bold text-primary-purple">{role.senior}</p>
                          <p className="text-sm text-muted-foreground">Senior Level</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills in Demand */}
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Top Skills in Demand</h3>
              <div className="space-y-4">
                {skillsInDemand.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{skill.skill}</span>
                      <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20 text-xs">
                        {skill.growth}
                      </Badge>
                    </div>
                    <div className="bg-secondary/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-blue to-primary-purple h-2 rounded-full transition-all"
                        style={{ width: `${skill.demand}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{skill.demand}% demand score</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Career Events */}
            <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Upcoming Career Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {event.companies} companies
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {event.industry}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-3 text-xs">
                      Register Now
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Career Advice */}
            <Card className="p-6 border-0 bg-gradient-to-br from-primary-blue/10 to-primary-purple/10">
              <h3 className="text-lg font-semibold mb-4">AI Career Insight</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-primary-blue mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Recommended Action</p>
                    <p className="text-xs text-muted-foreground">
                      Based on your profile, consider upskilling in Machine Learning. 
                      This could increase your salary potential by 25%.
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="hero" className="w-full">
                  Get Personalized Insights
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerInsights;