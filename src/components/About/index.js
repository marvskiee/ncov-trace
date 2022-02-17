import React from "react";
const About = () => {
  const data = [
    {
      title: `What is Coronavirus disease (COVID-19)?`,
      body: `Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.
    Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment. However, some will become seriously ill and require medical attention. Older people and those with underlying medical conditions like cardiovascular disease, diabetes, chronic respiratory disease, or cancer are more likely to develop serious illness. Anyone can get sick with COVID-19 and become seriously ill or die at any age. 
    The best way to prevent and slow down transmission is to be well informed about the disease and how the virus spreads. Protect yourself and others from infection by staying at least 1 metre apart from others, wearing a properly fitted mask, and washing your hands or using an alcohol-based rub frequently. Get vaccinated when it’s your turn and follow local guidance.
    The virus can spread from an infected person’s mouth or nose in small liquid particles when they cough, sneeze, speak, sing or breathe. These particles range from larger respiratory droplets to smaller aerosols. It is important to practice respiratory etiquette, for example by coughing into a flexed elbow, and to stay home and self-isolate until you recover if you feel unwell.`,
      list: [],
    },
    {
      title: `How to Protect yourself & Others`,
      body: `Protect yourself and those around you
      Get vaccinated as soon as it’s your turn and follow local guidance on vaccination.`,
      list: [
        " Keep physical distance of at least 1 metre from others, even if they don’t appear to be sick. Avoid crowds and close contact.",
        " Wear a properly fitted mask when physical distancing is not possible and in poorly ventilated settings.",
        " Clean your hands frequently with alcohol-based hand rub or soap and water.",
        " Cover your mouth and nose with a bent elbow or tissue when you cough or sneeze. Dispose of used tissues immediately and clean hands regularly. ",
        " If you develop symptoms or test positive for COVID-19, self-isolate until you recover.",
      ],
    },
  ];
  return (
    <>
      <main className="container">
        {data &&
          data.map((data, index) => (
            <article className="articles" key={index}>
              <h2>{data["title"]}</h2>
              <p>{data["body"]}</p>
              {data.list && (
                <ul>
                  {data.list.map((li, key) => (
                    <li key={key}>{li}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
      </main>
    </>
  );
};

export default About;
