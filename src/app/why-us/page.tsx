import Banner from "@/components/ContentPageBanner";
import { imagesWhyUsPage } from "@/constant/imports";
import Image from "next/image";

export default function WhyUs() {
  return (
    <main>
      <Banner title="Why Choose Us" />
      <section className="mt-10">
        <div className="container mx-auto px-4">
          <h2 className="font-extrabold text-5xl mb-6">Our Services</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 md:order-2">
              <p className="text-[1rem]">
                <strong> Automation:</strong> We employ advanced automation
                across every facet of our operations, from implementing
                innovative loyalty reward programs to optimizing our delivery
                systems and streamlining inventory management. This
                comprehensive automation ensures that our processes operate
                seamlessly, consistently delivering a remarkable experience that
                exceeds expectations for both our partners and associates. By
                integrating cutting-edge technology and meticulous attention to
                detail, we enhance efficiency, accuracy, and customer
                satisfaction.
              </p>
            </div>
            <div className="md:w-1/2 md:order-1 mb-8 md:mb-0">
              <Image
                src={imagesWhyUsPage.Automation}
                alt="Innovative Solutions"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[3rem]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 md:order-1 mb-8 md:mb-0">
              <Image
                src={imagesWhyUsPage.promptSales}
                alt="Innovative Solutions"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-[1rem]">
                <strong> Prompt After Sales Service: </strong> We act as a
                crucial link between brands and customers, ensuring timely
                resolution of product-related issues for our rural customers.
                Our team meticulously verifies complaints and communicates them
                to the respective brands, facilitating swift product servicing
                within 7-10 working days.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[3rem]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 md:order-2">
              <p className="text-[1rem]">
                <strong> Training Development:</strong> Our commitment extends
                beyond partners and customers to encompass comprehensive
                workforce development within our organization. We conduct
                regular training programs and provide growth opportunities to
                enhance employees&apos; skills and bridge any competency gaps.
                Examples of our upskilling initiatives include digital literacy,
                analytics proficiency, and organizational transformation skills.
              </p>
            </div>
            <div className="md:w-1/2 md:order-1 mb-8 md:mb-0">
              <Image
                src={imagesWhyUsPage.trainingDevelopment}
                alt="Innovative Solutions"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[3rem]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 md:order-1 mb-8 md:mb-0">
              <Image
                src={imagesWhyUsPage.LMDServices}
                alt="Innovative Solutions"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-[1rem]">
                <strong> LMD Services: </strong> We specializes in delivering
                products directly to customers&apos; doorsteps. Leveraging its robust
                IT platform, We efficiently manages all LMD operations, ensuring
                verified deliveries through Adhaar-based authentication. With a
                widespread network of warehouses, mini warehouses, hubs, and
                mini hubs nationwide, We excels in seamless logistics and
                transportation, consistently meeting expected turnaround times
                till tier 4 locations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
