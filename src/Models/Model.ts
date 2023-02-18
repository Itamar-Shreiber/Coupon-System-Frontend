export interface CompanyModel {
  id: number;
  name: string;
  email: string;
  password: string;
}
export interface CompanyPayloadModel {
  name: string;
  email: string;
  password: string;
}

export interface CompanyUpdateModel {
 
  email: string;
  password: string;
}

export interface CouponModel {
  id: number;
  company: CompanyModel;
  category: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  amount: number;
  image: string;
}

export interface CouponPayloadModel {
  title: string;
  category: string;
  description: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  price: number;
  image: string;
}

export interface CustomerModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CustomerPayloadModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CustomerUpdateModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class updateCustomer {
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;

  public constructor(firstName?: string, lastName?: string,email?: string, password?: string) {
      this.firstName=firstName;
      this.lastName=lastName;
      this.email = email;
      this.password = password;
  }
}

export class UpdateCoupon {
  public category?: string;
  public title?: string;
  public description?: string;
  public startDate?: Date;
  public endDate?: Date;
  public amount?: number;
  public price?: number;
  public image?: string;

  public constructor(
    category?: string,
    title?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
    amount?: number,
    price?: number,
    image?: string
  ) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.amount = amount;
    this.price = price;
    this.image = image;
  }
}
    export class UpdateCompany {
    public email?: string;
    public password?: string;
  
    public constructor(
      email?: string,
       password?: string,
    ) {
      this.email = email;
      this.password = password;
    }
}

