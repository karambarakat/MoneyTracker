type Truthy = any
/**
 * receive obj and return another object with only properties with truthy value
 * @param obj plain javascript object
 * @returns plain javascript object with properties with truthy value only
 */
export default function truthy(obj: { [key: string]: any }): { [key: string]: Truthy } {
    const rtObj: any = {}

    Object.keys(obj).map(key => {
        if (obj[key]) {
            rtObj[key] = obj[key]
        }
    })

    return rtObj
}