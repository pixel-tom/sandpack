import { FC } from "react";
import { HeaderMegaMenu } from "@/components/Header/Header";
import Link from "next/link";
import { HeroText } from "@/components/Hero/Hero";

const bannerStyle = {
  backgroundSize: "cover",
  backgroundPosition: "top",
  paddingTop: "1px",
  paddingBottom: "60px",
  backgroundImage:
    'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(21, 22, 30)), url("/alchemy-banner.png")',
};

const Home: FC = () => {
  return (
    <div className="min-h-screentext-white">
      <div style={bannerStyle} className="lg:px-20 py-10">
        <HeaderMegaMenu />
        <div className="h-20" />
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mt-12">
          <HeroText />
        </div>
      </div>
    </div>
  );
};

export default Home;
