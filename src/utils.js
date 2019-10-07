export const getInitials = name => {
  const first = name.substring(0, 1)
  let last = name
    .split(' ')
    .slice(1, 2)
    .join('')
    .substring(0, 1)
  return first + last
}
