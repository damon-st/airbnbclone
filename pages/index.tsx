import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Nearby } from "../models/airbnb.models";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";

const Home = ({
  exploreData,
  cardsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/*Banner  */}
      <Banner />
      {/*  */}
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* Pull some data form a server - API endpoinsts */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 
         lg:grid-cols-3 xl:grid-cols-4"
          >
            {exploreData.map((e: Nearby) => (
              <SmallCard
                distance={e.distance}
                img={e.img}
                location={e.location}
                key={e.img}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div
            className="flex space-x-3 overflow-scroll  scrollbar-hide 
          p-3 -ml-3"
          >
            {cardsData.map((e: Nearby) => (
              <MediumCard key={e.img} img={e.img} title={e.title} />
            ))}
          </div>
        </section>
        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const exploreData: Nearby[] = await fetch(
    "https://www.jsonkeeper.com/b/4G1G"
  ).then((e) => e.json());

  const cardsData: Nearby[] = await fetch(
    "https://www.jsonkeeper.com/b/VHHT"
  ).then((e) => e.json());
  return {
    props: {
      exploreData,
      cardsData,
    },
  };
};
