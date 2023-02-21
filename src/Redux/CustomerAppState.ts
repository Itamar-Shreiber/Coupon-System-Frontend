import { CouponModel, CustomerModel } from "../Models/Model";

export class CustomersAppState {
    // Step 1 - create the app state object
    public coupons: CouponModel[] = [];
}

// Step 2 - define all required actions
export enum ActionType {
    GOT_ALL_CUSTOMER_COUPONS = "GOT_ALL_CUSTOMER_COUPONS",
    PURCHASE_COUPON = "PURCHASE_COUPON",
    REMOVED_CUSTOMER_COUPONS = "REMOVED_CUSTOMER_COUPONS",
}

// Step 3 - define what is action in terms of data
export interface CustomerAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllCustomerPurchasedCouponsAction(
    tasks: CustomerModel[]
): CustomerAction {
    return {
        type: ActionType.GOT_ALL_CUSTOMER_COUPONS,
        payload: tasks,
    };
}

export function PurchasedCouponAction(task: CustomerModel): CustomerAction {
    return {
        type: ActionType.PURCHASE_COUPON,
        payload: task,
    };
}
export function removeCustomerCoupons(): CustomerAction {
    return {
        type: ActionType.REMOVED_CUSTOMER_COUPONS,
        payload: {},
    };
}

// Step 5 - Reducer function perform the required action
export function customerReducer(
    currentState: CustomersAppState = new CustomersAppState(),
    action: CustomerAction
): CustomersAppState {
    const newState = { ...currentState }; //Spread Operator // Copy
    switch (action.type) {
        case ActionType.GOT_ALL_CUSTOMER_COUPONS: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.PURCHASE_COUPON: {
            newState.coupons.push(action.payload);
            break;
        }
        case ActionType.REMOVED_CUSTOMER_COUPONS: {
            newState.coupons = [];
            break;
        }
    }
    return newState;
}
