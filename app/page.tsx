import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import StatsCounter from "@/components/StatsCounter";
import SocialShareMenu from "@/components/SocialShareMenu";
import FlippedCardStack from "@/components/FlippedCardStack";
import ExploreOurWork from "@/components/ExploreOurWork";
import LogoShowcase from "@/components/LogoShowcase";
import OurImpactStories from "@/components/OurImpactStories";
import InstagramFeed from "@/components/InstagramFeed";

export default function Home() {
  return (
    <>
      <Header logo="/image/logo.png" logoText="KFastest" />
      <SocialShareMenu />
      <main>
        <Hero
          title={
            <>
              {/* <span className="text-white animate-title-left inline-block">
                Timeless Legacy
              </span>
              <br />
              <span className="text-white animate-title-right inline-block">
                Innovative Future
              </span> */}
              {/* <span className="text-[white] animate-title-left inline-block">
                Timeless Legacy
              </span>
              <br />
              <span className="text-[white] animate-title-right inline-block">
                Innovative Future
              </span> */}
            </>
          }
          //   subtitle="Modern Web Solutions"
          //   description="A fast, modern website built with Next.js, TypeScript, and Tailwind CSS. Converted from WordPress to a static, high-performance site."
          //   ctaText="Get Started"
          //   ctaLink="/contact"
          video="/Videos/hero-background.mp4" // Add your video path here
          videoPoster="/images/video-poster.jpg" // Optional: poster image
        />

        <FlippedCardStack />

        <WhoWeAre />
        <StatsCounter />

        <ExploreOurWork />

        {/* <LogoShowcase /> */}

        <OurImpactStories />
        <LogoShowcase />
        {/* <StatsCounter /> */}

        <InstagramFeed />
      </main>
      <Footer logo="/image/logo.png" logoText="KFAS" />
    </>
  );
}
