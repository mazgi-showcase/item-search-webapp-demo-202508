import Link from 'next/link'
import { Fragment } from 'react'
import { Item as GraphQLItem } from '~/lib/generated/graphql/sdk'
import { Item as OpenAPIItem } from '~/lib/generated/openapi/@types'
import styles from '~/styles/Items.module.css'

type Props = {
  data?: GraphQLItem[] | OpenAPIItem[]
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
      <div className={styles.itemControls}>
        <div>
          <Link href={`#`}>Delete</Link>
        </div>
        <div>
          <input name="ID" placeholder="ID" type={`text`} size={36}></input>
          <input name="Text" placeholder="Text" type={`text`} size={64}></input>
          <Link href={`#`}>Create</Link>
        </div>
      </div>
      <dl className={styles.items}>
        <div className={styles.itemTitleRow}>
          <dd className={styles.itemCheck}></dd>
          <dt>ID</dt>
          <dd className={styles.itemText}>Text</dd>
        </div>
        {data?.map((item) => (
          <div className={styles.itemRow} key={item.id}>
            <dd className={styles.itemCheck}>
              <input id={`check_${item.id}`} type={'checkbox'}></input>
            </dd>
            <dt>
              <label htmlFor={`check_${item.id}`}>{item.id}</label>
            </dt>
            <dd className={styles.itemText}>{item.text}</dd>
          </div>
        ))}
      </dl>
    </Fragment>
  )
}
export default Component
