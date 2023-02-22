import { User } from "./../Models/Auth";
export class UserAppState {
    public user: User = { token: "", email: "", clientType: "" };
}

export enum ActionType {
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT",
}

export interface UserAction {
    type: ActionType;
    payload: any;
}

export function loggedIn(user: User): UserAction {
    return {
        type: ActionType.LOGGED_IN,
        payload: user,
    };
}

export function loggedOut(): UserAction {
    return {
        type: ActionType.LOGGED_OUT,
        payload: {},
    };
}

export function userReducer(
    currentState: UserAppState = new UserAppState(),
    action: UserAction
): UserAppState {
    const newState = { ...currentState };
    switch (action.type) {
        case ActionType.LOGGED_IN: {
            newState.user = action.payload;
            break;
        }
        case ActionType.LOGGED_OUT: {
            console.log(newState.user);
            newState.user = { token: "", email: "", clientType: "" };
            console.log(newState.user);
            break;
        }
    }

    return newState;
}
