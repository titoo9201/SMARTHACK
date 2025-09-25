import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompanyData {
  name: string;
  count: number;
  growth: number;
}

interface LocationData {
  city: string;
  country: string;
  count: number;
}

export const CareerHeatmap = () => {
  const topCompanies: CompanyData[] = [
    { name: "Google", count: 127, growth: 12 },
    { name: "Microsoft", count: 98, growth: 8 },
    { name: "Meta", count: 76, growth: 15 },
    { name: "Amazon", count: 65, growth: 5 },
    { name: "Apple", count: 54, growth: 18 },
  ];

  const topLocations: LocationData[] = [
    { city: "San Francisco", country: "USA", count: 234 },
    { city: "New York", country: "USA", count: 187 },
    { city: "London", country: "UK", count: 156 },
    { city: "Toronto", country: "Canada", count: 123 },
    { city: "Berlin", country: "Germany", count: 98 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Top Hiring Companies</h3>
        <div className="space-y-3">
          {topCompanies.map((company, index) => (
            <div key={company.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-blue to-primary-purple flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{company.name}</p>
                  <p className="text-sm text-muted-foreground">{company.count} alumni</p>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`${
                  company.growth > 10 
                    ? 'bg-success-green/10 text-success-green border-success-green/20' 
                    : 'bg-warning-orange/10 text-warning-orange border-warning-orange/20'
                }`}
              >
                +{company.growth}%
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Global Presence</h3>
        <div className="space-y-3">
          {topLocations.map((location, index) => (
            <div key={`${location.city}-${location.country}`} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-purple to-accent flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{location.city}</p>
                  <p className="text-sm text-muted-foreground">{location.country}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{location.count}</p>
                <p className="text-xs text-muted-foreground">alumni</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};