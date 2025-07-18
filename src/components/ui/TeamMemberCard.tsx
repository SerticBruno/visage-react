import Image from 'next/image';
import { motion } from 'framer-motion';

export interface TeamMember {
  name: string;
  image: string;
  title: string;
  credentials: string[];
  favoriteTreatments: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  className?: string;
  delay?: number;
}

export default function TeamMemberCard({ member, className = '', delay = 0 }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="relative h-72 w-full mx-auto mb-6 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
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