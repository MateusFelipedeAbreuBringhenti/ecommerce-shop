import { useState } from "react";
import type { ProductDTO } from "../dtos/product.dto";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductDetailProps = {
  product: ProductDTO;
};
export function ProductDetail({ 
    product 
}: ProductDetailProps) {
    const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;
      const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

      const photos = product.photos || [];
      const mainPhoto = photos[selectedPhoto];
      const mainImagePhoto = mainPhoto 
        ? `${bucketBaseURL}${mainPhoto.path}`
        : "https://placehold.co/300x300?text=Sem+Imagem&font-roboto";



    return (
        <div className="flex flex-col gap-4">

        <div className="flex mt-8 gap-16">

            <div className="min-w-md">
                <div className="w-full">
                    <img src={mainImagePhoto}
                    className="max-h-fell max-w-full object-contain" />
                </div>
            </div>

            {photos && photos.length > 1 && (
                <ul className="mt-4 max-w-md w-full overflow-x-auto flex gap-2 pb-2">
                    {photos.map((photo, index)=>
                        <li key={photo.id}>
                            <Button 
                            variant="ghost"
                            className="w-20 h-20 rounded overflow-hidden border hover: border-green-600 hover:cursor-pointer">
                                <img src={`${bucketBaseURL}${photo.path}`}
                                className={
                                    cn(
                                        'w-full h-full rounded border object-contain',
                                        index === selectedPhoto ? 'border-green-600' : 'border-transparent'
                                    )
                                }
                                />
                            </Button>
                        </li>
                    )}
                </ul>
            )}

            <div className="w-fit">

            </div>

        </div>
        
        </div>
    );
}