import { Logo, PaymentIcon } from "@/constant/imports";
import {
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Mail,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import { SubscribeToNewsLetterForm } from "./forms/SubsribeToNewsLetterForm";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 text-white">
      <div className="container mx-auto py-5 border-t-2">
        <div className="flex lg:flex-nowrap flex-wrap">
          <div className="lg:basis-[33%] lg:border-r-2">
            <div className="grid place-items-center ">
              <Image src={Logo} height={150} width={150} alt="KCS G-mart" />
              <p className="mt-5 ">Store of preeminence at marked down.</p>
              <div className="flex w-[75%] justify-between mt-[2rem]">
                <Image
                  src={PaymentIcon.visa}
                  width={30}
                  height={30}
                  alt="Payment-Icon"
                />
                <Image
                  src={PaymentIcon.Master}
                  width={30}
                  height={30}
                  alt="Payment-Icon"
                />
                <Image
                  src={PaymentIcon.Paypal}
                  width={30}
                  height={30}
                  alt="Payment-Icon"
                />
                <Image
                  src={PaymentIcon.Paypal2}
                  width={30}
                  height={30}
                  alt="Payment-Icon"
                />
                <Image
                  src={PaymentIcon.Paypal1}
                  width={30}
                  height={30}
                  alt="Payment-Icon"
                />
              </div>

              <div className="flex mt-9 flex-col gap-6">
                <h3 className="text-gray-600 text-center mt-9  font-bold text-2xl">
                  Follow Us
                </h3>

                <div className="flex gap-9 mt-5">
                  <a href="">
                    <Image
                      src="/images/SVGS/facebook.svg"
                      alt="facebook Icon"
                      width={50}
                      height={50}
                    />
                  </a>
                  <a href="">
                    <Image
                      src="/images/SVGS/instagram.svg"
                      alt="facebook Icon"
                      width={50}
                      height={50}
                    />
                  </a>
                  <a href="">
                    <Image
                      src="/images/SVGS/linkedin.svg"
                      alt="facebook Icon"
                      width={50}
                      height={50}
                    />
                  </a>
                  <a href="">
                    <Image
                      src="/images/SVGS/Whatsapp.svg"
                      alt="facebook Icon"
                      width={50}
                      height={50}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 py-5 md:p-7">
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col md:flex-row  gap-4 items-center">
                <h4 className="fw-bold text-2xl uppercase  flex-1">
                  subscribe to newsletter
                </h4>
                <div className="flex-1">
                  <SubscribeToNewsLetterForm />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-5 ">
                <div>
                  <h3 className="font-semibold text-lg mb-4 pb-2 border-b-2 border-gray-300 inline-block">
                    My Account
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/about-us" className="hover:text-gray-900">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact-us" className="hover:text-gray-900">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms-and-conditions"
                        className="hover:text-gray-900"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy-policy"
                        className="hover:text-gray-900"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/ally-return-policy"
                        className="hover:text-gray-900"
                      >
                        Ally Return Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/ally-cancellation-policy"
                        className="hover:text-gray-900"
                      >
                        Ally Cancellation Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/ally-exchange-policy"
                        className="hover:text-gray-900"
                      >
                        Ally Exchange Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shipping-policy"
                        className="hover:text-gray-900"
                      >
                        Shipping Policy
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 pb-2 border-b-2 border-gray-300 inline-block">
                    Help
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/become-a-member"
                        className="hover:text-gray-900"
                      >
                        Become A Member
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="hover:text-gray-900">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/customer-feedback"
                        className="hover:text-gray-900"
                      >
                        Customer Feedback
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/sell-on-ally"
                        className="hover:text-gray-900"
                      >
                        Sell on Ally
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms-of-use"
                        className="hover:text-gray-900"
                      >
                        Terms of Use
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-span-2 flex flex-col gap-y-4">
                  <h3 className="font-semibold text-lg mb-4 pb-2 border-b-2 border-gray-300 inline-block">
                    Contact Us
                  </h3>
                  <p className="flex gap-x-1">
                    <MapPin />
                    L2 A/4, Mohan Garden,Ubam Nagar, Delhi 110059
                  </p>
                  <p className="flex gap-x-1">
                    <Mail />
                    <a href="mailto:info@digitalfueled.com">
                      info@digitalfueled.com
                    </a>
                  </p>
                  <p className="flex gap-x-1">
                    <PhoneCall />
                    <a href="tel:7838152753">7838152753</a>
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <a
                      href="https://facebook.com"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Facebook size={20} />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="https://twitter.com"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Twitter size={20} />
                      <span className="sr-only">Twitter</span>
                    </a>
                    <a
                      href="https://instagram.com"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Instagram size={20} />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-center p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © Copyright 2025. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
