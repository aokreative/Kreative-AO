import { Hero, WorkList, AmsNote, JournalList, Closing } from "@/components/home/home-sections";
import { Statement } from "@/components/home/statement";
import { ServiceIndex } from "@/components/home/service-index";
import { DukaStory } from "@/components/home/duka-story";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <ServiceIndex />
      <DukaStory />
      <AmsNote />
      <WorkList />
      <JournalList />
      <Closing />
    </>
  );
}
