import { CouponModel } from "../Models/Model";

export class CompanyAppState {
    public coupons: CouponModel[] = [];
}

export enum ActionType {
    GOT_ALL_COMPANY_COUPONS = "GOT_ALL_COMPANY_COUPONS",
    ADDED_COUPON = "ADDED_COUPON",
    UPDATED_COUPON = "UPDATED_COUPON",
    DELETED_COUPON = "DELETED_COUPON",
    REMOVED_COMPANY_COUPONS = "REMOVED_COMPANY_COUPONS",
}

export interface CouponAction {
    type: ActionType;
    payload: any;
}

export function gotAllCompanyCouponsAction(
    coupons: CouponModel[]
): CouponAction {
    return {
        type: ActionType.GOT_ALL_COMPANY_COUPONS,
        payload: coupons,
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

export function removeCompanyCoupons(): CouponAction {
    return {
        type: ActionType.REMOVED_COMPANY_COUPONS,
        payload: {},
    };
}

export function companyReducer(
    currentState: CompanyAppState = new CompanyAppState(),
    action: CouponAction
): CompanyAppState {
    const newState = { ...currentState };
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
        case ActionType.REMOVED_COMPANY_COUPONS: {
            newState.coupons = [];
            break;
        }
    }
    return newState;
}
