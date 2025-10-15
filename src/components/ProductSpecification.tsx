import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackendProduct } from "@/types/product";

const ProductSpecification = ({
  productData,
}: {
  productData: BackendProduct;
}) => {
  return (
    <div>
      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: productData.description,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="keyfeatures">
            <AccordionTrigger>Key Features</AccordionTrigger>
            <AccordionContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: productData.key_features,
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="specifications">
            <AccordionTrigger>Specifications</AccordionTrigger>
            <AccordionContent>
              {productData.ProductSpecification.map((spec, index) => (
                <div key={index}>
                  <h4 className="font-medium">{spec.specification_title}</h4>
                  <p>{spec.option1}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="warranty">
            <AccordionTrigger>Warranty</AccordionTrigger>
            <AccordionContent>
              <p>{productData.warranty}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="hidden md:block">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-start">
            <TabsTrigger
              value="description"
              className="flex-grow sm:flex-grow-0"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="keyfeatures"
              className="flex-grow sm:flex-grow-0"
            >
              Key Features
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="flex-grow sm:flex-grow-0"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger value="warranty" className="flex-grow sm:flex-grow-0">
              Warranty
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Product Description</h3>
            <div
              dangerouslySetInnerHTML={{ __html: productData.description }}
            />
          </TabsContent>
          <TabsContent value="keyfeatures" className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
            <div
              dangerouslySetInnerHTML={{ __html: productData.key_features }}
            />
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Product Specifications
            </h3>
            {productData.ProductSpecification.map((spec, index) => (
              <div key={index}>
                <h4 className="font-medium">{spec.specification_title}</h4>
                <p>{spec.option1}</p>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="warranty" className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Warranty Information</h3>
            <p>{productData.warranty}</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductSpecification;
