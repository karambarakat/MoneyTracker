const isPlain = (obj: any) => typeof obj === 'object' && !(obj === null || obj instanceof Array)

export default isPlain 