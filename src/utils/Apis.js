const BACKEND_DOMAIN = '';
const BACKEND_PORT = '5555'
// const BACKEND_PORT = ''
// const BACKEND_DOMAIN = '192.168.43.16';
const mainAddress =  `http://${BACKEND_DOMAIN || 'localhost'}:${BACKEND_PORT}/api/v1/ssmec`

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
        findByRole: `${mainAddress}/user/findByRole?role=`,
        list: `${mainAddress}/user/list`,
    },
    claimApis: {
        
    },
    courseApis: {
        listAllCourses: `${mainAddress}/course/list`,
        findByDepartment: `${mainAddress}/course/findByDepartment?department=`,
        findByFaculty: `${mainAddress}/course/findByFaculty?faculty=`,
        findByCode: `${mainAddress}/course/findByCode?code=`,
        findById: `${mainAddress}/course/findById?id=`,
        update: `${mainAddress}/course/update?id=`,
        delete: `${mainAddress}/course/delete?id=`,
    }
}

module.exports = Apis;