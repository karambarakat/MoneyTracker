import { PrivateRoute } from '@httpErrors/errTypes'
import { returnHttpError } from '@httpErrors'

const PrivateRouteError = returnHttpError(PrivateRoute)

export default PrivateRouteError
