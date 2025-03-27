interface ILoginResponse {
  email: string;
  username: string;
  role: string;
  token: string;
}

interface IUser {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "client";
}

interface ISignupResponse {
  email: string;
  username: string;
  role: string;
  token: string;
}

interface IGetUserDetailsResponse {
  email: string;
  username: string;
  role: string;
}

interface IErrorResponse {
  status: number;
  message: string;
  originalError: { message: string };
}

interface IOrganization {
  _id: string; 
  name: string; 
  president: string;
  staffAdvisor: string;
  eventIds: string[];
}

interface ICrewMember {
  _id ?:string;
  name: string;
  email: string;
  phone: string;
}

interface ICrew {
  _id: string;
  description:string;
  name: string;
  phone: string;
  email: string;
  workType: string;
  leader: string;
  profilePic?: string;
  status: string; 
  crewMembers: ICrewMember[]; 
}


export type {
  ICrew,
  ICrewMember,
  IOrganization,
  ILoginResponse,
  IGetUserDetailsResponse,
  IErrorResponse,
  ISignupResponse,
  IUser,
};
