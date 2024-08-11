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
  job: string;
  study: string;
  bio: string;
  profilePicture: string;
  morePictures: string[];
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

export interface Match {
  name: string;
  age: number;
  height: string;
  picture: string;
}

export interface MatchDetails {
  name: string;
  age: number;
  height: string;
  job: string;
  study: string;
  personalDescription: string;
  mainPicture: string;
  additionalPictures: string[];
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

export type SuggestedDate = {
  date: string;  // Or Date if you are working with Date objects
  place: string;
  otherUser: { name: string };
};

export interface UpcomingDate {
  id: number;
  place: string;
  otherUser: { name: string };
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

