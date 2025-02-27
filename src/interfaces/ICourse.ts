export interface ICoupon {
  _id?: string;
  couponCode: string;
  discount: number;
  description: string;
  expDate: string;
  minPurAmt: number;
  maxPurAmt: number;
  status: boolean;
}


export interface IOffer {
    _id?: string
    title: string;
    description: string;
    discount: number;
    isActive: boolean;
  }