
export class UserAlreadyExitsError extends Error{
    constructor(){
        super("user already exists")
    }
}