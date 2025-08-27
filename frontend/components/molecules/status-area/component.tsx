import { Fragment } from 'react'
import { Status as GraphQLStatus } from '~/lib/generated/graphql/@types'
import { Status as OpenAPIStatus } from '~/lib/generated/openapi/@types'

type Props = {
  data?: OpenAPIStatus | GraphQLStatus
  error?: any
}
const Component: React.FC<Props> = (props) => {
  const { data, error } = props
  if (error) {
    console.log(error)
    return (
      <Fragment>
        <p>Failed to load</p>
      </Fragment>
    )
  }
  if (!data)
    return (
      <Fragment>
        <p>Loading...</p>
      </Fragment>
    )
  return (
    <Fragment>
      <dl>
        <dt>name:</dt>
        <dd>{data.name}</dd>
        <dt>env:</dt>
        <dd>{data.environment}</dd>
        <dt>state:</dt>
        <dd>{data.state}</dd>
        <dt>version:</dt>
        <dd>{data.version}</dd>
      </dl>
    </Fragment>
  )
}
export default Component
