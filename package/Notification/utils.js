export function getMessageProps (key, props) {
  const defaultProps = {
    key: "id",
    avatar: "avatar",
    content: 'content',
    description: "description",
    time: "time",
    ...props
  }
  return defaultProps[key]
}
