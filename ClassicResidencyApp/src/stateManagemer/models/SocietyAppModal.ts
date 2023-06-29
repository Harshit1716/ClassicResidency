export interface FlatType {
  id: string;
  block: string;
  flatNumber: string;
  ownerName: string;
  tenantName?: string;
  flatType: string;
  phoneNumber: string;
  //   fcmTokens: string[];
  complaints: ComplaintType[];
  adminComplaints?: ComplaintType[];
  isAdmin: boolean;
  loading: boolean;
  isAOA: boolean;
  notice: Notice[];
  error: any;
  members: Members[];
}

export interface Notice {
  id: string; // Unique identifier for the notice
  title: string; // Title of the notice
  description: string; // Content of the notice
  createdAt: string; // Timestamp indicating when the notice was created
  createdBy: string; // Creator of the notice
  imageUrl?: string; // Optional image URL for the notice
  subject?: string;
}
export interface Members {
  createdAt: string; // Timestamp indicating when the notice was created
  imageUrl?: string; // Optional image URL for the notice
  name: string;
  phoneNumber: string;
  type: string;
}

export interface ComplaintType {
  id: string;
  flatId: string;
  title: string;
  description: string;
  status: string;
  assignedTo?: string;
  review?: string;
  createdOn: Date;
  closedOn?: Date;
  // type:string,
}

export type ServiceType = 'PLUMBER' | 'ELECTRICIAN' | 'CARPENTER' | 'AOA';
export type MEMBERTYPE =
  | 'AOA'
  | 'Maid'
  | 'Guard'
  | 'Milk Man'
  | 'Car Cleaner'
  | 'Others';

export type COMPLAINTSTATUS = 'PENDING' | 'COMPLETED';

export const ServiceTypeList: ServiceType[] = [
  'PLUMBER',
  'ELECTRICIAN',
  'CARPENTER',
  'AOA',
];
export const COMPLAINTSTATUSLIST: COMPLAINTSTATUS[] = ['PENDING', 'COMPLETED'];
export const MEMBERTYPELIST: MEMBERTYPE[] = [
  'AOA',
  'Maid',
  'Guard',
  'Milk Man',
  'Car Cleaner',
  'Others',
];
