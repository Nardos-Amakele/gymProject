// src/data/membersData.ts
export interface Member {
  dueDate: string;
  id: number;
  name: string;
  phoneNumber: string;
  due: string;
  memberType: string;
  email?: string;
  address?: string;
  dob?: string;
  emergencyContact?: string;
  attendance?: number;
  weight?: number;
  height?: number;
  bmi?: number;
  healthInfo?: {
    conditions?: string[];
    allergies?: string[];
    injuries?: string[];
    medications?: string[];
  };
  status?: {
    level?: string;
    goal?: string;
  };
  memberSince?: string;
  gender?: string;
}

export const members: Member[] = [
  {
    id: 1,
    name: "Abebe Tadesse",
    phoneNumber: "0987465326",
    due: "2 days",
    memberType: "Normal",
    email: "abebetadesse2@gmail.com",
    address: "Dume Kebele",
    dob: "03/07/1992",
    emergencyContact: "0911214578",
    attendance: 76,
    weight: 81,
    height: 176,
    bmi: 22.4,
    healthInfo: {
      conditions: ["Asthma", "Blood pressure"],
      allergies: ["Asthma", "Blood pressure"],
      injuries: ["Asthma", "Blood pressure"],
      medications: ["Asthma", "Blood pressure"],
    },
    status: {
      level: "Intermediate",
      goal: "Weight loss",
    },
    memberSince: "June 20/2017",
    gender: "M",
    dueDate: ""
  },
  {
    id: 2,
    name: "Sisay Worku",
    phoneNumber: "0987465326",
    due: "21 days",
    memberType: "Premium",
    email: "sisayworku@gmail.com",
    address: "Addis Ababa",
    dob: "05/12/1990",
    emergencyContact: "0912233445",
    attendance: 50,
    weight: 75,
    height: 172,
    bmi: 25.3,
    healthInfo: {
      conditions: ["Diabetes"],
      allergies: ["Pollen"],
      injuries: ["None"],
      medications: ["Insulin"],
    },
    status: {
      level: "Advanced",
      goal: "Muscle gain",
    },
    memberSince: "March 15/2018",
    gender: "M",
    dueDate: ""
  },
];
