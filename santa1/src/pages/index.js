import Head from 'next/head';
import useSWR from 'swr'; 

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';

import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [38.907132, -77.036546]

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const { data, error, isLoading } = useSWR('https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b', fetcher)
  console.log(data);
  return (
    <Layout>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title}>
            Hello World
          </h1>

          <Map className={styles.homeMap} width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                
                <Marker position={DEFAULT_CENTER}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </>
            )}
          </Map>

          <p className={styles.description}>
            <code className={styles.code}>yarn create next-app -e https://github.com/colbyfayock/next-leaflet-starter</code>
          </p>

          <p className={styles.view}>
            <Button href="https://github.com/colbyfayock/next-leaflet-starter">Vew on GitHub</Button>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}

/*
Had issues getting this working 
 <Map className={styles.homeMap} width="800" height="400" center={[0,0]} zoom={1}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {data?.destinations.map(({ id, arrival, departure, location, city, region }) => { 
                  const arrivalDate = new Date(arrival);
                  const arrivalHours = new arrivalDate.getHours();
                  const arrivalMinutes = new arrivalDate.getMinutes();
                  const arrivalTime = `${arrivalHours}:${arrivalMinutes}:`;

                  const departureDate = new Date(departure);
                  const departureHours = new departureDate.getHours();
                  const departureMinutes = new departureDate.getMinutes();
                  const departureTime = `${departureHours}:${departureMinutes}`;

                  return (
                      <Marker key= {id}position={[location.lat,location.lng]}>
                        <Popup>
                          { city } , { region }
                          <br />
                          Arrival: { arrivalTime }
                          <br />
                          Departure: { departureTime }
                        </Popup>
                    </Marker>
                  )
                })}
           
              </>
            )}
          </Map>

*/

