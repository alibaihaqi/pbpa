import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ContactList from '@/components/ContactList'

const inter = Inter({ subsets: ['latin'] })

export default function Form() {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <ContactList />
    </main>
  )
}
