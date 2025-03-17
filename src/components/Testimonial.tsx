
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
}

const Testimonial = ({ name, location, image, rating, text }: TestimonialProps) => {
  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-700 flex-1">"{text}"</p>
    </Card>
  );
};

export default Testimonial;
