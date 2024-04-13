import { PageContainer } from "@acme/ui-pro";

import { WordTable } from "./components/WordTable";

export default function EnglishPage() {
  return (
    <PageContainer>
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <WordTable />
        <audio controls>
          <track kind="captions" />
          <source
            src="https://dictionary.cambridge.org/vi/media/english/uk_pron_ogg/u/uki/ukimp/ukimpet024.ogg"
            type="audio/ogg"
          />
          <source
            src="https://dictionary.cambridge.org/vi/media/english/uk_pron/u/uki/ukimp/ukimpet024.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        {/* <iframe src="https://viblo.asia/p/alpinejs-neu-react-la-qua-thua-yMnKMjaQZ7P" /> */}
        {/* <button */}
        {/*   onClick={async () => { */}
        {/*     const x = await axios.get( */}
        {/*       "/api/cambridge/search/amp", */}
        {/*       // "https://dictionary.cambridge.org/vi/autocomplete/amp", */}
        {/*       // { */}
        {/*       //   params: { */}
        {/*       //     dataset: "english", */}
        {/*       //     q: "implici", */}
        {/*       //     // __amp_source_origin: "https://dictionary.cambridge.org", */}
        {/*       //   }, */}
        {/*       // }, */}
        {/*       // "https://dictionary.cambridge.org/vi/autocomplete/amp?dataset=english&q=implici&__amp_source_origin=https%3A%2F%2Fdictionary.cambridge.org", */}
        {/*     ); */}
        {/*     console.log("x", x); */}
        {/*   }} */}
        {/* > */}
        {/*   asdasd */}
        {/* </button> */}
      </div>
    </PageContainer>
  );
}
