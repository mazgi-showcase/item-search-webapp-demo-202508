import aspida from '@aspida/fetch'
import useAspidaSWR from '@aspida/swr'
import { NextPage } from 'next'
import Head from 'next/head'
import { ItemTable } from '~/components/organisms/item-table'
import api from '~/lib/generated/openapi/$api'
import styles from '~/styles/Items.module.css'

const Page: NextPage = () => {
  const client = api(
    aspida(fetch, {
      baseURL: '/api',
    }),
  )
  const { data, error } = useAspidaSWR(
    client.openapi.items.findByText._text('foo'),
  )

  return (
    <div>
      <Head>
        <title>Items Search</title>
      </Head>
      <main className={styles.main}>
        <h1>Search Result</h1>
        <div className={styles.grid}>
          <ItemTable data={data} error={error} />
        </div>
      </main>
    </div>
  )
}

export default Page
