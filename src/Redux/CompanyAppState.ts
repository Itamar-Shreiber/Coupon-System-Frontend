import { CouponModel } from "../Models/Model";

export class CompanyAppState {
    // Step 1 - create the app state object
    public coupons: CouponModel[] = [];
}

// Step 2 - define all required actions
export enum ActionType {
    GOT_ALL_COMPANY_COUPONS = "GOT_ALL_COMPANY_COUPONS",
    GOT_SINGLE_COUPON = "GOT_SINGLE_COUPON",
    ADDED_COUPON = "ADDED_COUPON",
    UPDATED_COUPON = "UPDATED_COUPON",
    DELETED_COUPON = "DELETED_COUPON",
    REMOVED_COUPON = "REMOVED_COUPON",
}

// Step 3 - define what is action in terms of data
export interface CouponAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllCompanyCouponsAction(coupons: CouponModel[]): CouponAction {
    return {
        type: ActionType.GOT_ALL_COMPANY_COUPONS,
        payload: coupons,
    };
}

export function gotSingleCouponAction(coupon: CouponModel): CouponAction {
    return {
        type: ActionType.GOT_SINGLE_COUPON,
        payload: coupon,
    };
}

export function addedCouponAction(coupon: CouponModel): CouponAction {
    return {
        type: ActionType.ADDED_COUPON,
        payload: coupon,
    };
}

export function updatedCouponACtion(coupon: CouponModel): CouponAction {
    return {
        type: ActionType.UPDATED_COUPON,
        payload: coupon,
    };
}

export function deletedCouponAction(id: number): CouponAction {
    return {
        type: ActionType.DELETED_COUPON,
        payload: id,
    };
}

export function removeCoupons(): CouponAction {
    return {
        type: ActionType.REMOVED_COUPON,
        payload: {},
    };
}

// Step 5 - Reducer function perform the required action
export function companyReducer(
    currentState: CompanyAppState = new CompanyAppState(),
    action: CouponAction
): CompanyAppState {
    const newState = { ...currentState }; //Spread Operator // Copy
    switch (action.type) {
        case ActionType.GOT_ALL_COMPANY_COUPONS: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.ADDED_COUPON: {
            newState.coupons.push(action.payload);
            break;
        }
        case ActionType.UPDATED_COUPON: {
            console.log(newState.coupons);
            const idx = newState.coupons.findIndex(
                (coupon) => coupon.id === action.payload.id
            );
            newState.coupons[idx] = action.payload;
            console.log(newState.coupons);
            break;
        }

        case ActionType.DELETED_COUPON: {
            newState.coupons = newState.coupons.filter(
                (coupon) => coupon.id !== action.payload
            );
            break;
        }
        case ActionType.REMOVED_COUPON: {
            newState.coupons = [];
            break;
        }
    }
    return newState;
}