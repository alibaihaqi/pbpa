import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import CardList from '@/components/ContactList/CardList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`${styles.main} ${inter.className}`}
    >
      <CardList />
    </main>
  )
}
