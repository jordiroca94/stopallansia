import React from "react";
import Container from "./ui/Container";
import Image from "next/image";
import AboutImage from "../../public/images/about.png";
import Grid from "./ui/Grid";

const About = () => {
  return (
    <div className="h-screen pt-header">
      <Container>
        <Grid>
          <h1 className="text-2xl lg:text-5xl font-semibold col-span-full font-secondary">
            WHAT IS STOP ALL ANSIA
          </h1>
          <div className="col-span-4 lg:col-span-7 flex flex-col text-xl gap-3 font-medium text-justify">
            <p>
              An opportunity to embrace, grow, and fully immerse oneself in the
              present moment with an open heart and mind.
            </p>
            <p>
              This is a space where art transcends limitations, cultivating an
              authentic and lasting exchange between diverse forms of
              expression.
            </p>
            <p>
              Stop all Ansia Festival is a creative retreat that unites nature,
              people and art in a journey away from everyday anxiety.
            </p>
          </div>
          <Image
            className="lg:col-start-9 col-span-4 rounded-2xl"
            src={AboutImage}
            alt="Who are we?"
          />
        </Grid>
      </Container>
    </div>
  );
};

export default About;
