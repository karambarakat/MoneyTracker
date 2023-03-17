export default function prune(ss) {
  delete ss.$schema
  return ss
}
