import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ContactForm from '@/features/ContactForm'

const inter = Inter({ subsets: ['latin'] })

export default function ContactFormPage() {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <ContactForm />
    </main>
  )
}
