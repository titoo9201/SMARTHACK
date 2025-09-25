import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Star, MapPin, Briefcase } from "lucide-react";

interface AlumniCardProps {
  name: string;
  role: string;
  company: string;
  location: string;
  graduationYear: string;
  skills: string[];
  matchScore: number;
  avatar: string;
  verified?: boolean;
}

export const AlumniCard = ({
  name,
  role,
  company,
  location,
  graduationYear,
  skills,
  matchScore,
  avatar,
  verified = false
}: AlumniCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {verified && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-success-green rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-white fill-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">{name}</h3>
              <p className="text-sm text-muted-foreground">{role} at {company}</p>
            </div>
            <Badge variant="secondary" className="ml-2 bg-primary-blue/10 text-primary-blue border-primary-blue/20">
              {matchScore}% match
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              Class of {graduationYear}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skills.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="hero" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-1" />
              Connect
            </Button>
            <Button size="sm" variant="outline">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};