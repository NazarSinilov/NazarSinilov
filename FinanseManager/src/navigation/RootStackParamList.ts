import Categories from "../screens/Categories/Categories";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    GoogleSignIn: undefined,
    Home: undefined;
    ProfileInfo: undefined;
    Profile: undefined;
    Error: {errorMessage : string}
    Categories: undefined
}