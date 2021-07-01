import { NextPage } from 'next'
import Head from 'next/head'

import { Home } from '../components'

const HomePage: NextPage = () => (
  <>
    <Head>
      <title>Translang</title>
    </Head>
    <Home />
  </>
);

export default HomePage;
