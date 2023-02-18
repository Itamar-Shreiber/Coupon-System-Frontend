import { CompanyModel, CustomerModel } from "../Models/Model";

export class AdminAppState {
  // Step 1 - create the app state object
  public companies: CompanyModel[] = [];
  public customers: CustomerModel[] = [];
}

// Step 2 - define all required actions
export enum ActionType {
  GOT_ALL_COMPANIES = "GOT_ALL_COMPANIES",
  GOT_SINGLE_COMPANY = "GOT_SINGLE_COMPANY",
  ADDED_COMPANY = "ADDED_COMPANY",
  UPDATED_COMPANY = "UPDATED_COMPANY",
  DELETED_COMPANY = "DELETED_COMPANY",
  REMOVED_COMPANIES = "REMOVED_COMPANY",
  GOT_ALL_CUSTOMERS = "GOT_ALL_CUSTOMERS",
  GOT_SINGLE_CUSTOMER = "GOT_SINGLE_CUSTOMER",
  ADDED_CUSTOMER = "ADDED_CUSTOMER",
  UPDATED_CUSTOMER = "UPDATED_CUSTOMER",
  DELETED_CUSTOMER = "DELETED_CUSTOMER",
  REMOVED_CUSTOMERS = "REMOVED_CUSTOMERS",
}

// Step 3 - define what is action in terms of data
export interface AdminAction {
  type: ActionType;
  payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllCompaniesAction(companies: CompanyModel[]): AdminAction {
  return {
    type: ActionType.GOT_ALL_COMPANIES,
    payload: companies,
  };
}

export function gotSingleCompanyAction(company: CompanyModel): AdminAction {
  return {
    type: ActionType.GOT_SINGLE_COMPANY,
    payload: company,
  };
}

export function addedCompanyAction(task: CompanyModel): AdminAction {
  return {
    type: ActionType.ADDED_COMPANY,
    payload: task,
  };
}

export function updatedCompanyACtion(task: CompanyModel): AdminAction {
  return {
    type: ActionType.UPDATED_COMPANY,
    payload: task,
  };
}

export function deletedCompanyAction(id: number): AdminAction {
  return {
    type: ActionType.DELETED_COMPANY,
    payload: id,
  };
}

export function removeCompanies(): AdminAction {
  return {
    type: ActionType.REMOVED_COMPANIES,
    payload: {},
  };
}

export function gotAllCustomersAction(tasks: CustomerModel[]): AdminAction {
  return {
    type: ActionType.GOT_ALL_CUSTOMERS,
    payload: tasks,
  };
}

export function gotSingleCustomerAction(task: CustomerModel): AdminAction {
  return {
    type: ActionType.GOT_SINGLE_CUSTOMER,
    payload: task,
  };
}

export function addedCustomerAction(task: CustomerModel): AdminAction {
  return {
    type: ActionType.ADDED_CUSTOMER,
    payload: task,
  };
}

export function updatedCustomerACtion(task: CustomerModel): AdminAction {
  return {
    type: ActionType.UPDATED_CUSTOMER,
    payload: task,
  };
}

export function deletedCustomerAction(id: number): AdminAction {
  return {
    type: ActionType.DELETED_CUSTOMER,
    payload: id,
  };
}

export function removeCustomers(): AdminAction {
  return {
    type: ActionType.REMOVED_CUSTOMERS,
    payload: {},
  };
}

// Step 5 - Reducer function perform the required action
export function adminReducer(
  currentState: AdminAppState = new AdminAppState(),
  action: AdminAction
): AdminAppState {
  const newState = { ...currentState }; //Spread Operator // Copy
  switch (action.type) {
    case ActionType.GOT_ALL_COMPANIES: {
      newState.companies = action.payload;
      break;
    }
    case ActionType.ADDED_COMPANY: {
      newState.companies.push(action.payload);
      break;
    }
    case ActionType.UPDATED_COMPANY: {
      console.log(newState.companies);
      const idx = newState.companies.findIndex(
        (company) => company.id === action.payload.id
      );
      newState.companies[idx] = action.payload;
      console.log(newState.companies);
      break;
    }

    case ActionType.DELETED_COMPANY: {
      newState.companies = newState.companies.filter(
        (company) => company.id !== action.payload
      );
      break;
    }
    case ActionType.REMOVED_COMPANIES: {
      newState.companies = [];
      break;
    }
    case ActionType.GOT_ALL_CUSTOMERS: {
      newState.customers = action.payload;
      break;
    }
    case ActionType.ADDED_CUSTOMER: {
      newState.customers.push(action.payload);
      break;
    }
    case ActionType.UPDATED_CUSTOMER: {
      console.log(newState.customers);
      const idx = newState.customers.findIndex(
        (customer) => customer.id === action.payload.id
      );
      newState.customers[idx] = action.payload;
      console.log(newState.customers);
      break;
    }

    case ActionType.DELETED_CUSTOMER: {
      newState.customers = newState.customers.filter(
        (customer) => customer.id !== action.payload
      );
      break;
    }
    case ActionType.REMOVED_CUSTOMERS: {
      newState.customers = [];
      break;
    }
  }
  return newState;
}
