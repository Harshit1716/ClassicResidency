export interface FlatType {
  id: string;
  block: string;
  flatType: string;
  flatNumber: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  imageUrl: string;

  tenantName?: string;
  tenantEmail?: string;
  tenantPhoneNumber?: string;

  complaints: ComplaintType[];
  isTenantAdded: boolean;
  isAdmin: boolean;
  loading: boolean;
  isAOA: boolean;
  password: string;

  //   fcmTokens: string[];
  adminComplaints?: ComplaintType[];
  notice: Notice[];
  error: any;
  members: Members[];

  currentUser: string;
}

export interface AddedMember {
  id: string;
  block: string;
  flatType: string;
  flatNumber: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  imageUrl: string;

  isTenantAdded: boolean;
  tenantName?: string;
  tenantEmail?: string;
  tenantPhoneNumber?: string;

  complaints: ComplaintType[];

  isAdmin: boolean;
  isAOA: boolean;
  password: string;
  //   fcmTokens: string[];
  adminComplaints?: ComplaintType[];
  // imageUrl: string;
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
  id: string;
  imageUrl?: string;
  name: string;
  phoneNumber: string;
  type: string;
  assignedComplaints: ComplaintType[];
}

export interface ComplaintType {
  id: string;
  flatId: string;
  flatNo: string;
  title: string;
  description: string;
  type: string;
  slots: string[];
  imageUrl: string;
  createdOn: string;
  closedOn?: string;
  assignedTo: string;
  by: string;
  status: string;
  review?: string;
  hide: boolean;
}

export type ServiceType = 'PLUMBER' | 'ELECTRICIAN' | 'CARPENTER' | 'AOA';
export type MEMBERTYPE =
  | 'AOA'
  | 'Maid'
  | 'Guard'
  | 'Milk Man'
  | 'Car Cleaner'
  | 'Others';

export type COMPLAINTSTATUS = 'PENDING' | 'COMPLETED' | 'IN-PROGRESS';

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
