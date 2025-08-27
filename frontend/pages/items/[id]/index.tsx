import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string

  return (
    <div>
      <Head>
        <title>Item: {id}</title>
      </Head>
      <main>
        <h1>Item: {id}</h1>
      </main>
    </div>
  )
}

export default Page
