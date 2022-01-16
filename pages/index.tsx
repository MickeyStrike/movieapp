import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { WithCustomStatusArrowsAndIndicators } from '../components/carousel'
import ListMovie from '../components/listMovie'
import { useState } from 'react'
import { ListMoviesHome } from '../interfaces/interface/interface.respose'

const Home: NextPage = () => {

  const [listMovies, setListMovies] = useState<ListMoviesHome>({ list1: true, list2: false, list3: false })

  const getTheIntersection = (isIntersecting: boolean, sequenceItem: number | string):void => {
    switch(sequenceItem) {
      case 1:
        if(!listMovies.list2 && isIntersecting) setListMovies({ ...listMovies, list2: true })
        break;
      case 2:
        if(!listMovies.list3 && isIntersecting) setListMovies({ ...listMovies, list3: true })
        break;
      default:
        break
    }
  }

  // const handleScroll = (e:Event) => {
  //   if(window.scrollY >= 650 && window.scrollY <= 680 && !listMovies.list2) setListMovies({ ...listMovies, list2: true })
  //   else if (window.scrollY >= 1100 && !listMovies.list3) setListMovies({ ...listMovies, list3: true })
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // })

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Movie App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles['main-carousel']}>
        <WithCustomStatusArrowsAndIndicators />
      </main>

      <main className={styles.main}>
        { listMovies.list1 ? <ListMovie key={1} sequenceItem={1} title='New Release' getTheIntersection={getTheIntersection} /> : null }
        { listMovies.list2 ? <ListMovie key={2} sequenceItem={2} title='TV Show' getTheIntersection={getTheIntersection} style={{ marginTop: '2.1rem' }} page={2} /> : null }
        { listMovies.list3 ? <ListMovie key={3} sequenceItem={3} title='Popular' getTheIntersection={getTheIntersection} style={{ marginTop: '2.1rem' }} page={3} /> : null }
      </main>
    </div>
  )
}

export default Home
