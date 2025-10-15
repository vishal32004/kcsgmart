import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import Banner from "@/components/ContentPageBanner";

export default function ContactUs() {
  return (
    <>
      <Banner title="Contact Us" />
      <section>
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-black">Get in touch</h1>
                <p className="text-gray-600">
                  Have a question or want to work together? Fill out the form
                  below and we&apos;ll be in touch.
                </p>
              </div>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-black">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="border-gray-300 focus:ring-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-black">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="border-gray-300 focus:ring-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message" className="text-black">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    className="min-h-[150px] border-gray-300 focus:ring-black"
                  />
                </div>
                <Button
                  type="submit"
                  className="justify-self-start bg-black hover:bg-gray-800 text-white"
                >
                  Submit
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Contact Information
                </h2>
                <p className="text-gray-600">
                  Get in touch with us using the information below.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-black" />
                  <div>
                    <p className="font-medium text-black">Office Address</p>
                    <p className="text-gray-600">
                      123 Main St, Anytown USA 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-black" />
                  <div>
                    <p className="font-medium text-black">Phone</p>
                    <p className="text-gray-600">+1 (555) 555-5555</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-black" />
                  <div>
                    <p className="font-medium text-black">Email</p>
                    <p className="text-gray-600">info@acme.com</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.7289556392!2d-73.98512468428898!3d40.75373947932921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a3f7b1c6a3%3A0xb5efb3c1c7a57d5d!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620392201472!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
