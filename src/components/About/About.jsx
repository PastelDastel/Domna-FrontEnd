import ParallaxSection from "../Home/Parallax Section/ParallaxSection";
import Hero from "../Home/Hero/Hero";
import style from "./About.module.css";
import Accordion from "./Accordion/Accordion";
import BlogArticle from "./BlogArticle/BlogArticle";
import ParallaxFooter from "./ParallaxFooter/ParallaxFooter";
import ContactSection from "../Home/Contact Section/ContactSection";
const About = () => {
  return (
    <>
      <Hero
        animatedText={"Scopri di più su di me"}
        text={"Conosci Marcella"}
        textAlignment={"center"}
      />
      <div
        style={{ width: "672px", height: "1008px" }}
        className={style.container}
      >
        <div
          className={style.imageSection}
          style={{ backgroundImage: `url(https://placehold.co/1920x1080)` }}
        ></div>
        <div
          className={style.textSection}
          style={{ top: "100px", left: "450px" }}
        >
          <h2>
            <b>LA MIA STORIA</b>
          </h2>
          <p className={style.paragraphFirst}>Sono contento tu sia qui!</p>
          <p className={style.paragraph}>
            La mia storia è una <strong>continua esplorazione</strong>. Fin da
            giovane, ho sentito la necessità di comprendere meglio il mondo che
            mi circondava e, soprattutto, di esplorare le{" "}
            <strong>mie capacità</strong>, i <strong>miei limiti</strong>, e le
            possibilità che la vita mi offriva. La <strong>naturopatia</strong>{" "}
            è stata il mio primo amore, un percorso che mi ha insegnato a{" "}
            <strong>osservare</strong> e ad <strong>ascoltare</strong> la
            natura, ma soprattutto a comprendere i <strong>messaggi</strong> che
            il nostro <strong>corpo</strong> e la nostra <strong>mente</strong>{" "}
            ci inviano ogni giorno. Da lì, ho capito quanto fosse importante
            mantenere un <strong>equilibrio</strong>, rispettare il proprio{" "}
            <strong>ritmo</strong> e coltivare il <strong>benessere</strong>{" "}
            come uno <strong>stile di vita</strong>, non come un obiettivo
            lontano e difficile da raggiungere.
          </p>
          <p className={style.paragraph}>
            Con il passare degli anni, ho unito la passione per la{" "}
            <strong>naturopatia</strong> a quella per il{" "}
            <strong>movimento</strong>. Per me, il corpo è uno{" "}
            <strong>strumento straordinario</strong>, un veicolo che ci permette
            di <strong>esprimerci</strong>, di <strong>crescere</strong> e di{" "}
            <strong>scoprire</strong> chi siamo davvero. Ho sempre creduto che
            il <strong>movimento</strong> non fosse solo una questione fisica,
            ma anche <strong>mentale</strong> e <strong>spirituale</strong>.
          </p>
        </div>
      </div>
      <div className={style.separatorHr}>
        <hr className={style.separatorLine} />
      </div>
      <div className={style.mindsetContainer}>
        <div className={style.mindsetColumn}>
          <h2 className={style.mindsetTitle}>VECCHIA MENTALITÀ</h2>
          <p className={style.mindsetText}>
            Ho seguito gli estremi del fitness. Sono stata schiava della
            palestra. Avevo l&apos;8% di massa grassa. Ho limitato i carboidrati e le
            calorie. Dall&apos;esterno sembravo &quot;sana&quot; e venivo elogiata per la mia
            disciplina. Ora posso dirvi che ciò che sembra sano dall&apos;esterno non
            è sempre sano dall&apos;interno.
          </p>
          <p className={style.mindsetText}>
            Il mio corpo era malato. Ero infertile, senza libido, sempre fredda,
            ansiosa, con i capelli che si assottigliavano, mancanza di spazio
            mentale ed energia per cose diverse dal cibo e dall&apos;esercizio
            fisico, e mai soddisfatta del mio corpo: non era mai abbastanza.
          </p>
        </div>

        <div className={style.mindsetColumn}>
          <h2 className={style.mindsetTitle}>NUOVA MENTALITÀ</h2>
          <p className={style.mindsetText}>
            Ora so che la salute è molto più del numero sulla bilancia o della
            percentuale di massa grassa. Credo che si possa fare qualcosa per se
            stessi ogni singolo giorno, perseguendo la salute senza esaurirsi (e
            senza scombussolare i propri ormoni nel processo). La vera salute
            considera la salute mentale, insieme alla salute fisica, e può
            essere mantenuta in tutte le stagioni e fasi della vita.
          </p>
          <p className={style.mindsetText}>
            Lasciamo da parte gli estremi e diventiamo sani per il lungo
            periodo!
            <br />
            <br />(
            <a href="#" className={style.mindsetLink}>
              Leggi di più sul mio percorso di recupero qui
            </a>
            )
          </p>
        </div>
      </div>
      <div className={style.separatorHrSecond}>
        <hr className={style.separatorLineSecond} />
      </div>
      <div
        style={{ width: "662px", height: "998px" }}
        className={style.container}
      >
        <div
          className={style.imageSection}
          style={{ backgroundImage: `url(https://placehold.co/1920x1080)` }}
        ></div>
        <div
          className={style.textSectionSecond}
          style={{ top: "100px", left: "450px" }}
        >
          <h2>
            <b>La Mia Specialità</b>
          </h2>
          <p className={style.paragraphFirst}>
            <strong>Sono felice di lavorare con te!</strong>
          </p>
          <p className={style.paragraph}>
            L’impegno è stato tanto e la mia{" "}
            <strong>formazione professionale</strong> è continua. Un esempio?
            Per garantire la <strong>massima competenza</strong> sia in termini
            di <strong>educazione al movimento</strong> sia in competenza in
            ambito <strong>nutrizionale</strong>, ho conseguito il diploma di{" "}
            <strong>Nutraceutica Sport Consultant</strong> presso{" "}
            <strong>CNM Italia</strong>, che conferisce il diploma rilasciato da{" "}
            <strong>CNM UK – The College of Naturopathic Medicine UK</strong>,
            oltre alle certificazioni in{" "}
            <strong>Woman Functional Training</strong> e{" "}
            <strong>Primitive Movement</strong> presso la{" "}
            <strong>WTA Academy</strong>.
          </p>
          <p className={style.paragraph}>
            Ma sono soprattutto una donna <strong>grata</strong>, perché tante,
            tantissime donne mi hanno permesso di entrare nella loro vita, di{" "}
            <strong>condividerne gli obiettivi</strong>, di{" "}
            <strong>dar animo ai desideri</strong>, di offrire{" "}
            <strong>spazio ai sogni</strong>, di gioire degli{" "}
            <strong>incredibili risultati</strong>. Essere in contatto con le
            donne in <strong>trasformazione</strong>, metterne in luce la{" "}
            <strong>forza creativa</strong>, prendere parte alla loro{" "}
            <strong>rinascita</strong>, per me è <strong>pura gioia</strong>.
          </p>
        </div>
      </div>
      <div className={style.separatorHr}>
        <hr className={style.separatorLine} />
      </div>
      <Accordion
        items={[
          {
            title: "Referenze",
            content: (
              <>
                <p>Trainer Certificata Woman Functional Training</p>
                <p>Trainer Certificata Primitive Movement</p>
                <p>Trainer Certificata In Human Movement Optimisation</p>
                <p>Diplomata In Nutraceutical Consultant</p>
              </>
            ),
          },
          {
            title: "Esperienze",
            content: (
              <>
                <p>Dettagli esperienza...</p>
              </>
            ),
          },
        ]}
      />

      <div className={style.separatorHr}>
        <hr className={style.separatorLine} />
      </div>

      <ParallaxSection
        id={"FistParallaxSection"}
        imageUrl={"https://placehold.co/1920x1080"}
        text={"Su misura per te"}
        startOffset={3500}
      />
      <div className={style.serviceCards}>
        <BlogArticle
          article={{
            imgURL: "https://placehold.co/300x300",
            overlayText: "Scopri di più",
            title: "Il mio approccio",
            subtitle: "Il mio approccio",
            href: "/blogs",
            content:
              "Il mio approccio è unico e personalizzato. Ogni persona è diversa e ha esigenze diverse. Il mio obiettivo è aiutarti a raggiungere i tuoi obiettivi in modo sano e sostenibile. Sono qui per te, per aiutarti a raggiungere il benessere fisico e mentale che",
          }}
        />
        <BlogArticle
          article={{
            imgURL: "https://placehold.co/300x300",
            overlayText: "Scopri di più",
            title: "Il mio approccio",
            subtitle: "Il mio approccio",
            href: "/blogs",
            content:
              "Il mio approccio è unico e personalizzato. Ogni persona è diversa e ha esigenze diverse. Il mio obiettivo è aiutarti a raggiungere i tuoi obiettivi in modo sano e sostenibile. Sono qui per te, per aiutarti a raggiungere il benessere fisico e mentale che",
          }}
        />
        <BlogArticle
          article={{
            imgURL: "https://placehold.co/300x300",
            overlayText: "Scopri di più",
            title: "Il mio approccio",
            subtitle: "Il mio approccio",
            href: "/blogs",
            content:
              "Il mio approccio è unico e personalizzato. Ogni persona è diversa e ha esigenze diverse. Il mio obiettivo è aiutarti a raggiungere i tuoi obiettivi in modo sano e sostenibile. Sono qui per te, per aiutarti a raggiungere il benessere fisico e mentale che",
          }}
        />
        <BlogArticle
          article={{
            imgURL: "https://placehold.co/300x300",
            overlayText: "Scopri di più",
            title: "Il mio approccio",
            subtitle: "Il mio approccio",
            href: "/blogs",
            content:
              "Il mio approccio è unico e personalizzato. Ogni persona è diversa e ha esigenze diverse. Il mio obiettivo è aiutarti a raggiungere i tuoi obiettivi in modo sano e sostenibile. Sono qui per te, per aiutarti a raggiungere il benessere fisico e mentale che",
          }}
        />
        <BlogArticle
          article={{
            imgURL: "https://placehold.co/300x300",
            overlayText: "Scopri di più",
            title: "Il mio approccio",
            subtitle: "Il mio approccio",
            href: "/blogs",
            content:
              "Il mio approccio è unico e personalizzato. Ogni persona è diversa e ha esigenze diverse. Il mio obiettivo è aiutarti a raggiungere i tuoi obiettivi in modo sano e sostenibile. Sono qui per te, per aiutarti a raggiungere il benessere fisico e mentale che",
          }}
        />
        <BlogArticle
          article={{
            imgURL: "https://placehold.co/300x300",
            overlayText: "Scopri di più",
            title: "Il mio approccio",
            subtitle: "Il mio approccio",
            href: "/blogs",
            content:
              "Il mio approccio è unico e personalizzato. Ogni persona è diversa e ha esigenze diverse. Il mio obiettivo è aiutarti a raggiungere i tuoi obiettivi in modo sano e sostenibile. Sono qui per te, per aiutarti a raggiungere il benessere fisico e mentale che",
          }}
        />
      </div>
      <ParallaxFooter
        id={"ParallaxFooter"}
        imageUrl={"https://placehold.co/1920x1080"}
        mailto={"Contatta Marcella"}
        text={"Hai domande?"}
        startOffset={5000}
      />
      <ContactSection />
    </>
  );
};

export default About;
