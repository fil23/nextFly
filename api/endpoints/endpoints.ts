const URL_PUBLIC = process.env.EXPO_PUBLIC_URL + process.env.EXPO_PUBLIC_PUBLIC_END;

export const endpoints = {
    auth:{
        googleSignIn:URL_PUBLIC + '/auth/google',
    }
}