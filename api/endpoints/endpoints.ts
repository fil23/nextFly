const URL_PUBLIC = process.env.EXPO_PUBLIC_URL + process.env.EXPO_PUBLIC_PUBLIC_END;

export const endpoints = {
    auth:{
        googleSignIn:URL_PUBLIC + '/auth/google',
        verifica_email_reg: URL_PUBLIC + '/auth/verifica_email_reg'
    }
}