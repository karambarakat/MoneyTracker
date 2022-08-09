import { IUserDocument } from "@myTypes/ModelUser";

declare global {
    namespace Express {
        interface User extends IUserDocument { }
    }
}
