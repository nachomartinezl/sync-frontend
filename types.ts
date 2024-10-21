// types.ts
export interface UserCredentials {
  email: string;
  password: string;
}

export interface PersonalData {
  name: string;
  surname: string;
  dob: string; // date of birth in YYYY-MM-DD format
  gender: string;
  preference: string;
  country: string;
  height: string;
  bio: string;
  profilePicture: string;
}

export interface PersonalityTestResponse {
  question: string;
  response: number; // Assuming the response is a number between 1 and 5
}

export interface AstrologicalProfile {
  timeOfBirth: Date;
  pob: string;
  sunSign?: string;
  moonSign?: string;
  ascendant?: string;
  venusPosition?: string;
  marsPosition?: string;
}

export interface Category {
  category: string;
  subcategories: string[];
}

export interface SelectedSubcategories {
  [category: string]: {
    [subcategory: string]: boolean;
  };
}

export interface Appointment {
  date: string; // ISO string format for the date
  place: string;
  status: string;
}

export interface Match {
  id: string;
  name: string;
  age: number;
  country: string;
  height: string;
  job: string;
  study: string;
  bio: string;
  picture: string; // You might want to use 'mainPicture' instead of 'picture'
  additionalPictures: string[];
  appointment?: Appointment;
}

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type TimeSlot = "Morning" | "Afternoon" | "Evening" | "Night";

export interface SelectedDays {
  [key: string]: boolean;
}

export interface SelectedTimes {
  [key: string]: boolean;
}

export interface Interests {
  [category: string]: string[];
}

export interface PersonalityProfile {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface ProfileData {
  name?: string;
  surname?: string;
  dob?: string; // date of birth in YYYY-MM-DD format
  gender?: string;
  preference?: string;
  country?: string;
  height?: string;
  job?: string;
  study?: string;
  bio?: string;
  mainPicture?: string;
  additionalPictures?: string[];
  interests?: {
    Sports?: string[];
    Arts?: string[];
    Music?: string[];
  };
  personalityProfile?: {
    openness?: number;
    conscientiousness?: number;
    extraversion?: number;
    agreeableness?: number;
    neuroticism?: number;
  };
  astrologicalProfile?: {
    sunSign?: string;
    moonSign?: string;
    ascendant?: string;
    venusPosition?: string;
    marsPosition?: string;
    birthTime?: string;
    latitude?: number;
    longitude?: number;
  };
}

export interface ValidationError {
  msg: string;
  param: string;
  location: string;
}

export interface APIErrorResponse {
  errors?: ValidationError[];
  msg?: string;
}

