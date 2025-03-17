
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TravelCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
}

const TravelCard = ({
  image,
  title,
  description,
  price,
  originalPrice,
  rating
}: TravelCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {originalPrice && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm ml-1">{rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-lg">${price}</span>
            {originalPrice && (
              <span className="text-gray-500 text-sm line-through ml-2">
                ${originalPrice}
              </span>
            )}
          </div>
          <Button>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelCard;
