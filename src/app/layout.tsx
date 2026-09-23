import type { Metadata } from "next";
import { Suspense } from "react";
import { League_Spartan, Montserrat, Patrick_Hand } from "next/font/google";
import localFont from "next/font/local";
import { SplashScreen } from "@/components/SplashScreen";
import { RouteProgressBar } from "@/components/RouteProgressBar";
import "./globals.css";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const milkTea = localFont({
  src: "../../public/fonts/hazelnut-milk-tea.ttf",
  variable: "--font-milk-tea",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mountain House Diamond Drills",
    template: "%s · Diamond Drills",
  },
  description:
    "Diamond Drills: diagnose, practice, and track growth for DECA Roleplay and Written events.",
  icons: {
    icon: "/brand/mhhs-deca.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${leagueSpartan.variable} ${montserrat.variable} ${patrickHand.variable} ${milkTea.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
