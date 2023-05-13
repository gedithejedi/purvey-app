import { useRouter } from 'next/router';
import CardDetail from '~/components/AnonCard/Detail'
import TheBackButton from '~/components/TheBackButton'

export default function Page() {
  const router = useRouter();

  const tokenId = Array.isArray(router.query.id)? router.query.id.join('') : router.query.id
  const fakeCard = {
    tokenId: tokenId,
    image: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=826&h=550',
    name: 'GediTheJedi',
    description: 'Missed flight but somehow made to Lisbon with passion for hacking!'
  }

  return (
    <main className="min-h-screen px-4 py-2">
        <div className="space-y-3">
            <TheBackButton />
            <CardDetail card={fakeCard} />
        </div>
    </main>)
}
