import nextId from "react-id-generator";
import steve from "@/assets/users/user-2.jpg";
import eliana from "@/assets/users/user-8.jpg";
import john from "@/assets/users/user-7.jpg";
import izabela from "@/assets/users/user-6.jpg";

export type MissionItemType = {
  id: string;
  title: string;
  text: string;
};

export const missionItems = [
  {
    id: nextId(),
    title: "Judgement Free",
    text: "GanjaWebshop is your home for judgement-free cannabis shopping. A place where all are welcome to explore, discover and purchase a wide array of high-quality products. No matter where you are on your cannabis journey, we're here to guide, educate, and support  your shopping experience.",
  },
  {
    id: nextId(),
    title: "Passion as Welcoming",
    text: "We do this by translating our passion into welcoming, positive,and judgement-free spaces for anyone at any point in their cannabis journey. Place your order online from our menu updated in real-time and it'll be ready when you arrive.",
  },
  {
    id: nextId(),
    title: "Planting a SEED",
    text: "We believe the future of cannabis looks brighter than ever. Purchases from Sunnyside* help support the SEED initiative, which is designed to ensure that all members of our society have the skills, knowledge and opportunity to work in and own businesses in this industry.",
  },
  {
    id: nextId(),
    title: "Values",
    text: "At our core is a commitment to product quality and world-class customer experiences. Our company culture fosters open communication and open doors: everybody here has a voice, and we believe that by investing in both our people and our customers, we all will rise.",
  },
];

export type AboutUsTeamType = {
  id: string;
  name: string;
  photo: string;
  role: string;
  email: string;
};

export const aboutUsTeam: AboutUsTeamType[] = [
  {
    id: nextId(),
    name: "Steve Myles",
    photo: steve,
    role: "architect & engineer",
    email: "steve@gmail.com",
  },
  {
    id: nextId(),
    name: "Eliana Stout",
    photo: eliana,
    role: "sales manager",
    email: "eliana@gmail.com",
  },
  {
    id: nextId(),
    name: "John Riley",
    photo: john,
    role: "sales manager",
    email: "john@gmail.com",
  },
  {
    id: nextId(),
    name: "Isabel Kirkland",
    photo: izabela,
    role: "sales manager",
    email: "izabela@gmail.com",
  },
];
