export enum serviceType {
  carService,
  electrician,
  acService,
  laundryService,
}
export interface UserType {
  email: string;
  name: string;
  id: string;
  complaints: any[];
}
export interface CartType {
  totalAmount: number;
  Orders: OrderType[];
}
export interface OrderType {
  orderId: number;
  orderAmount: number;
  serviceType: serviceType;
  serviceName: string;
  dateOfBooking: Date;
  serviceDate: Date;
  serviceId: number;
}

export interface AddOrderType {
  orderAmount: number;
  serviceType: serviceType;
  serviceName: string;
  serviceId: number;
}
