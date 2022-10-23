import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

interface Parametros {
  location?: string;
  startDate?: string;
  endDate?: string;
  noOfGuests?: string;
}

export default function Search({
  searchResult,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [params, setParams] = useState<Parametros>({});
  useEffect(() => {
    setParams(router.query);
    return () => {};
  }, [router.query]);

  const formatedStartDate = format(
    new Date(params.startDate ?? "1789 10 20"),
    "dd MMMM yy"
  );
  const formatedEndDate = format(
    new Date(params.endDate ?? "1789 10 20"),
    "dd MMMM yy",
    {
      locale: es,
    }
  );
  const range = `${formatedStartDate} - ${formatedEndDate}`;
  return (
    <div>
      <Header
        placeHolder={`${params.location} | ${range} | ${params.noOfGuests}`}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {params.noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {params.location}
          </h1>

          <div
            className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 
           whitespace-nowrap"
          >
            <p className="button">Cancelarion Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Room and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResult.map((e: any) => (
              <InfoCard
                key={e.img}
                description={e.description}
                img={e.img}
                location={e.location}
                price={e.price}
                star={e.star}
                title={e.title}
                total={e.total}
              />
            ))}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResult={searchResult} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchResult = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
    (e) => e.json()
  );
  return {
    props: {
      searchResult,
    },
  };
};
