export interface Expert {
  name: string
  title: string
  bio: string
  areas: string[]
  image: string
}

const expertsData: Expert[] = [
  {
    name: 'Maj. Gen. Arjun Sharma (Retd.)',
    title: 'Senior Fellow, Strategic Affairs',
    bio: "Former Deputy Chief of Army Staff with 35 years of service. Expert in military doctrine, force modernisation, and India's continental security challenges.",
    areas: ['Military Doctrine', 'Land Warfare', 'Pakistan Studies'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Priya Menon',
    title: 'Research Fellow, Nuclear Studies',
    bio: 'PhD in International Security from JNU. Specialises in nuclear deterrence theory, arms control, and South Asian strategic stability.',
    areas: ['Nuclear Deterrence', 'Arms Control', 'Strategic Stability'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  },
  {
    name: 'Amb. Rajan Krishnaswamy (Retd.)',
    title: 'Distinguished Fellow, Diplomacy & Foreign Policy',
    bio: 'Former Indian Ambassador to three countries. Brings four decades of diplomatic experience in multilateral forums, ASEAN, and Indo-Pacific strategy.',
    areas: ['Diplomacy', 'Indo-Pacific', 'Multilateralism'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Kavitha Rajesh',
    title: 'Fellow, Cyber Security & Emerging Technologies',
    bio: 'Former IIT faculty and cyber policy advisor. Researches the intersection of AI, cyberwarfare, and national security in the digital age.',
    areas: ['Cyber Security', 'Artificial Intelligence', 'Tech Policy'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
  {
    name: 'Cdr. Vikram Nair (Retd.)',
    title: 'Fellow, Maritime Security',
    bio: "Former Indian Navy officer and maritime strategist. Expert on Indian Ocean security, naval power projection, and China's maritime ambitions.",
    areas: ['Maritime Security', 'Indian Ocean', 'Naval Strategy'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Aisha Siddiqui',
    title: 'Fellow, Counter-Terrorism Studies',
    bio: "PhD in Terrorism and Political Violence from King's College London. Researches jihadist movements, radicalisation, and India's internal security architecture.",
    areas: ['Counter-Terrorism', 'Radicalisation', 'Internal Security'],
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
  },
]

export default expertsData
