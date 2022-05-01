import Quote, { QuoteSkeleton } from 'components/quote'
import useHome from './hooks/useHome'
import Footer from 'components/footer'
import Information, { DefaultMessage } from 'components/Information'
import { Stores } from 'services'
import {
  increaseQuoteCounter,
  decreaseQuoteCounter,
} from 'services/quotes/actions'
import { HELPER_HOTKEY_TEXT } from './constants'
import ActionButtons from './partials/ActionButtons'
import useUser from 'helpers/useUser'

import styles from './Home.module.scss'

const Home = () => {
  const {
    QuoteStore: {
      quotes,
      quoteCounter
    }
  } = Stores()
  const isFirstQuote = quoteCounter === 0
  const { user } = useUser()

  const {
    isError,
    isLoading,
    isSuccess,
  } = useHome()

  return (
    <div className={styles.home}>
      <div className={styles.quote}>
        <div>{HELPER_HOTKEY_TEXT}</div>
        {isLoading && (
          <QuoteSkeleton />
        )}
        {isSuccess && (
          <Quote
            quote={quotes[quoteCounter]}
          />
        )}
        {isError && (
          <Information text={DefaultMessage.error} />
        )}
        <div className={styles.footer}>
          <Footer />
        </div>
        <ActionButtons
          disabled={isLoading}
          onClickLeft={decreaseQuoteCounter}
          onClickRight={() => increaseQuoteCounter(user?.id)}
          disabledLeft={isFirstQuote}
        />
      </div>
    </div>
  )
}

export default Home