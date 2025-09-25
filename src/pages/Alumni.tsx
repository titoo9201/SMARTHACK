import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlumniCard } from "@/components/AlumniCard";
import { 
  Search, 
  Filter, 
  Users, 
  MapPin, 
  Briefcase,
  GraduationCap,
  Brain,
  SlidersHorizontal
} from "lucide-react";

const Alumni = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const alumniData = [
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
    },
    {
      name: "David Kim",
      role: "Startup Founder",
      company: "TechFlow Inc",
      location: "Austin, TX",
      graduationYear: "2019",
      skills: ["Entrepreneurship", "Fintech", "Blockchain", "Team Building"],
      matchScore: 84,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      verified: true
    },
    {
      name: "Lisa Thompson",
      role: "UX Design Director", 
      company: "Airbnb",
      location: "San Francisco, CA",
      graduationYear: "2016",
      skills: ["UX Design", "Design Systems", "User Research", "Prototyping"],
      matchScore: 90,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      verified: true
    },
    {
      name: "Robert Johnson",
      role: "VP of Engineering",
      company: "Stripe",
      location: "New York, NY",
      graduationYear: "2014",
      skills: ["Engineering Leadership", "Scalability", "DevOps", "Fintech"],
      matchScore: 87,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      verified: true
    }
  ];

  const filterOptions = [
    { category: "Company", options: ["Google", "Microsoft", "Meta", "Airbnb", "Stripe"] },
    { category: "Location", options: ["San Francisco", "Seattle", "New York", "Austin"] },
    { category: "Graduation Year", options: ["2014-2016", "2017-2019", "2020-2024"] },
    { category: "Skills", options: ["Machine Learning", "Product Strategy", "UX Design", "Engineering Leadership"] }
  ];

  const quickFilters = ["Available for Mentoring", "Recent Alumni", "Local Area", "Same Industry"];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-8 h-8 text-primary-blue" />
            <h1 className="text-4xl font-bold">Discover Alumni</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Connect with alumni who can help accelerate your career journey
          </p>
        </div>

        {/* AI Recommendations Banner */}
        <Card className="p-6 mb-8 border-0 bg-gradient-to-r from-primary-blue/10 to-primary-purple/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">AI-Powered Recommendations</h3>
              <p className="text-muted-foreground">We've found 12 alumni that perfectly match your career goals and interests</p>
            </div>
            <Button variant="hero">
              View AI Matches
            </Button>
          </div>
        </Card>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, company, skills, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Advanced Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-muted-foreground mr-2">Quick filters:</span>
            {quickFilters.map((filter) => (
              <Badge 
                key={filter}
                variant="outline"
                className="cursor-pointer hover:bg-primary-blue/10 hover:text-primary-blue hover:border-primary-blue/20"
              >
                {filter}
              </Badge>
            ))}
          </div>

          {/* Filter Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterOptions.map((category) => (
              <Card key={category.category} className="p-4 border-0 bg-secondary/30">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  {category.category === "Company" && <Briefcase className="w-4 h-4" />}
                  {category.category === "Location" && <MapPin className="w-4 h-4" />}
                  {category.category === "Graduation Year" && <GraduationCap className="w-4 h-4" />}
                  {category.category === "Skills" && <Brain className="w-4 h-4" />}
                  {category.category}
                </h4>
                <div className="space-y-1">
                  {category.options.slice(0, 3).map((option) => (
                    <Badge
                      key={option}
                      variant="outline"
                      className="cursor-pointer text-xs mr-1 mb-1 hover:bg-primary-blue/10 hover:text-primary-blue hover:border-primary-blue/20"
                    >
                      {option}
                    </Badge>
                  ))}
                  {category.options.length > 3 && (
                    <p className="text-xs text-muted-foreground">+{category.options.length - 3} more</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Alumni Directory</h2>
            <p className="text-muted-foreground">Showing {alumniData.length} of 1,247 alumni</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Button variant="outline" size="sm">
              Match Score
            </Button>
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {alumniData.map((alumni, index) => (
            <AlumniCard key={index} {...alumni} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Alumni
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Alumni;