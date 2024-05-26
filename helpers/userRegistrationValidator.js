class UserRegistrationValidator{
    static validateUserRegistrationInfo(user, usersArray){
        const nameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(user.hasOwnProperty("email") && user.hasOwnProperty("fullName") && user.hasOwnProperty("password") && user.hasOwnProperty("profile")){
            if(user.password == null || user.password.trim() == ''){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "password is null or empty"
                }
            }
            else if(user.fullName == null || user.fullName.trim() == ''){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "fullName  is null or empty"
                }
            }
            else if(!(nameRegex.test(user.fullName))){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "invalid fullName"
                }
            }
            else if(user.email == null || user.email.trim() == ''){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "email  is null or empty"
                }
            }
            else if(!(emailRegex.test(user.email))){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "invalid email"
                }
            }
            else if(usersArray.filter(val => val.email == user.email).length > 0){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "email already registered/exists"
                }
            }
            else if(user.profile == null || user.profile.trim() == ''){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "profile  is null or empty"
                }
            }
            else if(user.profile !== 'organizer' && user.profile !== 'attendee'){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "invalid profile"
                }
            }                         
            else{
                return{
                    "validationStatus" : true,
                    "responseStatus": 201,
                    "message" : "Validated Successfully"
                };
            }            
        }
        else{
            return {
                "validationStatus": false,
                "responseStatus": 400,
                "message": "Missing/incorrect required parameters in user registration details, make sure you provide them all correctly"
            }
        }
    }
}
module.exports = UserRegistrationValidator;