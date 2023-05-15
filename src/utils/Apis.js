// const BACKEND_DOMAIN = '';
const BACKEND_PORT = '5151';
// const BACKEND_PORT = '';
const BACKEND_DOMAIN = '192.168.43.16';
const mainAddress =  `http://${BACKEND_DOMAIN || 'localhost'}:${BACKEND_PORT}/api/v1/vsb/`;

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
    bookingApis: {
        createNew: `${mainAddress}/booking/add`,
        update: `${mainAddress}/booking/update?id=`,
        delete: `${mainAddress}/booking/delete?id=`,
        list: `${mainAddress}/booking/list`,
        findById: `${mainAddress}/booking/findById?id=`,
        findByCancelDate: `${mainAddress}/booking/findByCancelDate=`,
        findByStatus: `${mainAddress}/booking/findByStatus?status=`,
        findByDuration: `${mainAddress}/booking/findByDuration?duration=`,
        findByEndDate: `${mainAddress}/booking/findByEndDate?endDate=`,
        findBySlotNumber: `${mainAddress}/booking/findBySlotNumber?slotNumber=`,
        findByStartHour: `${mainAddress}/booking/findByStartHour?startHour=`,
        findByTypeOfService: `${mainAddress}/booking/findByTypeOfService?typeOfService=`,
        findByWorkStatus: `${mainAddress}/booking/findByWorkStatus?workStatus=`,
        findByClientConfirmation: `${mainAddress}/booking/findByClientConfirmation?clientConfirmation=`,
    },
    scheduleApis: {
        listAllCourses: `${mainAddress}/schedule/list`,
        findByDepartment: `${mainAddress}/schedule/findByDepartment?department=`,
        findByFaculty: `${mainAddress}/course/findByFaculty?faculty=`,
        findByCode: `${mainAddress}/course/findByCode?code=`,
        findByLecturerId: `${mainAddress}/course/findByLecturerId?lecturerId=`,
        findById: `${mainAddress}/course/findById?id=`,
        update: `${mainAddress}/course/update?id=`,
        delete: `${mainAddress}/course/delete?id=`,
    }
}

module.exports = Apis;