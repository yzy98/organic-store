"use client";

import { CldImage } from "next-cloudinary";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const sizeMap: {
  sm: number;
  md: number;
  lg: number;
} = {
  sm: 150,
  md: 200,
  lg: 250,
};

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  size: "sm" | "md" | "lg";
}

const ProductCard = ({
  id,
  title,
  description,
  price,
  image,
  category,
  size,
}: ProductCardProps) => {
  const cardSize = sizeMap[size];

  return (
    <Card className="w-30 border-0 shadow-none">
      <CardContent className="flex flex-col items-center gap-2 p-0">
        <CldImage
          width={cardSize}
          height={cardSize}
          src={image}
          crop="fill"
          sizes="100vw"
          alt={`The image of ${title}`}
        />
        <p className="text-sm text-muted-foreground">{category}</p>
        <p className="text-lg font-bold text-black">{title}</p>
        <p className="text-sm font-semibold text-black flex items-center">
          <DollarSign size={14} />
          {price}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
