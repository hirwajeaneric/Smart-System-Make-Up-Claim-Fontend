const mainAddress =  `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_BACKEND_SERVER_PORT}/api/v1/ssmec`

let Apis = {
    userApis: {
        signInAsStudent: `${mainAddress}/user/studentSignIn`,
        signInAsOtherUser: `${mainAddress}/user/signin`,
        signUp:`${mainAddress}/user/signup`,
        requestPasswordReset: `${mainAddress}/user/requestPasswordReset`,
        resetPassword: `${mainAddress}/user/resetPassword?id=`,
        updateUserAccount: `${mainAddress}/user/update?id=`,
        findByRegistrationNumber: `${mainAddress}/user/findByRegistrationNumber?registrationNumber=`,
        findById: `${mainAddress}/user/findById?id=`,
        list: `${mainAddress}/user/list`,
    },
    claimApis: {

    },
    courseApis: {

    }
}

module.exports = Apis;