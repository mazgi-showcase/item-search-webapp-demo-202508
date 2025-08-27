import aspida from '@aspida/fetch'
import useAspidaSWR from '@aspida/swr'
import { GraphQLClient } from 'graphql-request'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { StatusCard } from '~/components/organisms/status-card'
import { getSdkWithHooks } from '~/lib/generated/graphql/sdk'
import api from '~/lib/generated/openapi/$api'
import { Status } from '~/lib/generated/openapi/@types'
import styles from '~/styles/Status.module.css'

const BFFGraphQLStatusCard: React.FC = () => {
  const client = new GraphQLClient('/api/graphql')
  const sdk = getSdkWithHooks(client)
  const { data, error } = sdk.useStatusQuery('status')
  return (
    <StatusCard
      title="BFF (GraphQL)"
      data={data?.status}
      error={error}
    ></StatusCard>
  )
}

const BFFOpenAPIStatusCard: React.FC = () => {
  const client = api(
    aspida(fetch, {
      baseURL: '/api',
    })
  )
  const { data, error } = useAspidaSWR(client.openapi.status)
  return (
    <StatusCard title="BFF (OpenAPI)" data={data} error={error}></StatusCard>
  )
}

const FrontendStatusCard: React.FC = () => {
  const [status, setStatus] = useState<Status>({
    name: 'initial name',
    environment: 'development',
    state: 'unhealthy',
    version: '0.0.0+initial',
  })
  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch('/api/status')
      const json = await res.json()
      setStatus(json)
    }
    fetchStatus()
  }, [])
  return <StatusCard title="Frontend" data={status}></StatusCard>
}

const Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Status</title>
      </Head>
      <main className={styles.main}>
        <h1>Status</h1>
        <div className={styles.grid}>
          <FrontendStatusCard></FrontendStatusCard>
          <BFFGraphQLStatusCard></BFFGraphQLStatusCard>
          <BFFOpenAPIStatusCard></BFFOpenAPIStatusCard>
        </div>
      </main>
    </div>
  )
}
export default Page
