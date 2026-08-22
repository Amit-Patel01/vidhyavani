import React from 'react';
import Hero from '@/components/home/Hero';
import DhoranSection from '@/components/home/DhoranSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TeacherBioSection from '@/components/home/TeacherBioSection';
import YoutubeSection from '@/components/home/YoutubeSection';
import StatsSection from '@/components/home/StatsSection';
import AnnouncementBanner from '@/components/home/AnnouncementBanner';
import { ANNOUNCEMENTS_LIST } from '@/lib/seed-data';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner announcements={ANNOUNCEMENTS_LIST} />
      <Hero />
      <StatsSection />
      <DhoranSection />
      <FeaturesSection />
      <YoutubeSection />
      <TeacherBioSection />
    </div>
  );
}
