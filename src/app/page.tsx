import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Products } from "@/components/sections/products";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Journal } from "@/components/sections/journal";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Products />
      <Process />
      <Testimonials />
      <FAQ />
      <Journal />
      <Contact />
    </>
  );
}
