import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Competitor {
  id: string;
  name: string;
  distance: number;
  type: string;
  rating: number;
}

interface CompetitorListProps {
  competitors?: Competitor[];
}

const CompetitorList = ({
  competitors = [
    {
      id: "1",
      name: "Restaurant A",
      distance: 0.5,
      type: "Italian",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Restaurant B",
      distance: 0.8,
      type: "Mexican",
      rating: 4.2,
    },
    {
      id: "3",
      name: "Restaurant C",
      distance: 1.2,
      type: "Japanese",
      rating: 4.7,
    },
  ],
}: CompetitorListProps) => {
  return (
    <Card className="w-full bg-zinc-900/90 backdrop-blur-sm border-zinc-800 text-white">
      <CardHeader>
        <CardTitle>Nearby Competitors</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {competitors.map((competitor) => (
              <div
                key={competitor.id}
                className="p-4 rounded-lg border bg-card"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{competitor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {competitor.distance}km away
                    </p>
                  </div>
                  <Badge variant="secondary">{competitor.type}</Badge>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full"
                      style={{ width: `${(competitor.rating / 5) * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {competitor.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CompetitorList;
