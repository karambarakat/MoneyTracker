import { PrivateRoute } from "@error/HttpErrors";
import { returnHttpError } from "@error/throwHttpError";

const PrivateRouteError = returnHttpError(PrivateRoute)

export default PrivateRouteError