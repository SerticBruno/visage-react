'use client';

import TeamMemberCard from '@/components/ui/TeamMemberCard';
import ContentSection from '@/components/ui/ContentSection';
import StorySection from '@/components/ui/StorySection';
import TeamDetailsSection from '@/components/ui/TeamDetailsSection';
import { teamMembers, teamDetailsSection } from '@/data/team';
import { storyContent } from '@/data/about';

const AboutContent = () => {
  return (
    <section className="pt-16" style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story Section - First Section */}
        <ContentSection className="mb-8">
          <StorySection {...storyContent} />
        </ContentSection>

        {/* Team Section - Second Section */}
        <ContentSection delay={0.2} className="mb-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Naš tim</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <TeamMemberCard 
                key={member.name} 
                member={member}
                delay={index * 0.1}
              />
            ))}
          </div>
        </ContentSection>

        {/* Team Members Details Section */}
        <ContentSection delay={0.3} className="mt-24">
          <TeamDetailsSection {...teamDetailsSection} />
        </ContentSection>
      </div>
    </section>
  );
};

export default AboutContent; 