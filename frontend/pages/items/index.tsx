import aspida from '@aspida/fetch'
import useAspidaSWR from '@aspida/swr'
import { GraphQLClient } from 'graphql-request'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, {
  createContext,
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ItemTable } from '~/components/organisms/item-table'
import { getSdkWithHooks } from '~/lib/generated/graphql/sdk'
import api from '~/lib/generated/openapi/$api'
import styles from '~/styles/Items.module.css'

const TabIds = {
  GraphQL: 'GraphQL',
  OpenAPI: 'OpenAPI',
} as const
// prettier-ignore
type TabIds = typeof TabIds[keyof typeof TabIds]

type TabState = {
  selectedTabId: TabIds
}
const TabContext = createContext<TabState>({
  selectedTabId: TabIds.GraphQL,
})

type TabContainerProps = {
  children: ReactElement<TabProps, any>[] | ReactElement<TabProps, any>
}

const TabContainer: React.FC<TabContainerProps> = (props) => {
  const { children } = props
  const { selectedTabId } = useContext(TabContext)
  const router = useRouter()

  return (
    <div className={styles.cell}>
      <ul className={styles.tabTitles}>
        {Object.values(TabIds).map((tabId) => (
          <li
            className={selectedTabId === tabId ? styles.selected : ''}
            key={tabId}
          >
            <a
              onClick={() => {
                router.query.tab = tabId.toLowerCase()
                router.push({
                  pathname: router.pathname,
                  query: router.query,
                })
              }}
            >
              {tabId}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.tabs}>
        {React.Children.map(children, (child) => (
          <div
            className={`${styles.tab}${
              selectedTabId === child.props.tabId ? ' ' + styles.selected : ''
            }`}
            key={child.props.tabId}
          >
            <div className={styles.tabContent}>{child}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

type TabProps = {
  isActive: boolean
  tabId: string
}

const GraphQLTab: React.FC<TabProps> = (props) => {
  const { isActive } = props
  const client = new GraphQLClient('/api/graphql')
  const sdk = getSdkWithHooks(client)
  const { data, error } = sdk.useItemsQuery('items')

  if (!isActive) return <Fragment />
  return <ItemTable data={data?.items} error={error} />
}

const OpenAPITab: React.FC<TabProps> = (props) => {
  const { isActive } = props
  const client = api(
    aspida(fetch, {
      baseURL: '/api',
    }),
  )
  const { data, error } = useAspidaSWR(client.openapi.items)

  if (!isActive) return <Fragment />
  return <ItemTable data={data} error={error} />
}

const Page: NextPage = () => {
  const router = useRouter()
  const [selectedTabId, setSelectedTabId] = useState<TabIds>(TabIds.GraphQL)

  useEffect(() => {
    if (router.isReady) {
      const query = router.query
      const selectedTab =
        query['tab'] == TabIds.OpenAPI.toLowerCase()
          ? TabIds.OpenAPI
          : TabIds.GraphQL
      setSelectedTabId(selectedTab)
    }
  }, [router.isReady, router.query])

  return (
    <div>
      <Head>
        <title>Items</title>
      </Head>
      <main className={styles.main}>
        <h1>Items</h1>
        <div className={styles.grid}>
          <TabContext.Provider value={{ selectedTabId }}>
            <TabContainer>
              <GraphQLTab
                isActive={selectedTabId === TabIds.GraphQL}
                tabId={TabIds.GraphQL}
              />
              <OpenAPITab
                isActive={selectedTabId === TabIds.OpenAPI}
                tabId={TabIds.OpenAPI}
              />
            </TabContainer>
          </TabContext.Provider>
        </div>
      </main>
    </div>
  )
}

export default Page
