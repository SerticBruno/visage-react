import Image from 'next/image';
import { motion } from 'framer-motion';
import { BsQuote } from 'react-icons/bs';

export interface TeamMember {
  name: string;
  image: string;
  title: string;
  credentials: string[];
  favoriteTreatments: string;
  hasImage?: boolean; // New property to control image display
  quote?: string; // Optional quote for placeholder
}

interface TeamMemberCardProps {
  member: TeamMember;
  className?: string;
  delay?: number;
}

export default function TeamMemberCard({ member, className = '', delay = 0 }: TeamMemberCardProps) {
  const showQuote = !member.hasImage || !member.image;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="relative h-72 w-full mx-auto mb-6 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
        {showQuote ? (
          // Quote placeholder
          <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 text-center">
            <BsQuote className="w-12 h-12 text-gray-600 mb-4" />
            <blockquote className="text-gray-800 italic text-lg leading-relaxed">
              {member.quote || `"Naš tim je posvećen pružanju najkvalitetnijih estetskih usluga s fokusom na sigurnost i rezultate."`}
            </blockquote>
          </div>
        ) : (
          // Actual image
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </div>
      <h3 className="text-center text-xl font-semibold mb-2">{member.name}</h3>
      <div className="space-y-2 text-center">
        {member.credentials.map((credential, index) => (
          <p key={index} className="text-gray-600">{credential}</p>
        ))}
        <p className="text-gray-600 italic mt-4">Omiljeni tretmani: {member.favoriteTreatments}</p>
      </div>
    </motion.div>
  );
} 