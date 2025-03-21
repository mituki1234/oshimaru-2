import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";
import Info from "@/app/components/Info";
import PopularShops from "./components/Popular-shops";
import AnnouncementsList from "./components/Announcements-list";
import "@/app/globals.css";
import "@/app/page.css";

export default function Home() {
  return (
    <>
        <Hero />
        <Features />
        <Info />
        <PopularShops />
        <AnnouncementsList />
    </>
  );
}
