import { StatusArea } from '~/components/molecules/status-area'
import { Status as GraphQLStatus } from '~/lib/generated/graphql/@types'
import { Status as OpenAPIStatus } from '~/lib/generated/openapi/@types'
import styles from '~/styles/Status.module.css'

type Props = {
  title: string
  data?: OpenAPIStatus | GraphQLStatus
  error?: any
}
const Component: React.FC<Props> = (props) => {
  const { title, data, error } = props
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <StatusArea data={data} error={error}></StatusArea>
    </div>
  )
}
export default Component
