import { Result } from 'antd'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to="/">Back Home</Link>}
    />
  )
}

export default NotFoundPage
