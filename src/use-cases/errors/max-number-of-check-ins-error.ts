export class MaxNumberCheckInsError extends Error{
    constructor(){
        super("max number check ins reached")
    }
}