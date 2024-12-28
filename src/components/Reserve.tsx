import React from "react";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import SimpleAnimation from "./animations/SimpleAnimation";
import Link from "next/link";
import TextAnimation from "./animations/TextAnimation";

const Reserve = () => {
  return (
    <div className="pt-header">
      <Container>
        <Grid customGap="gap-4" className="pb-6 lg:pb-12">
          <SimpleAnimation className="col-span-full border-b pb-5 border-gray">
            <h1 className="text-3xl lg:text-5xl font-semibold font-secondary">
              Reserve your spot
            </h1>
          </SimpleAnimation>
          <SimpleAnimation className="col-span-full">
            <h2 className="text-2xl lg:text-4xl font-semibold">
              How to reserve your spot
            </h2>
          </SimpleAnimation>
          <div className="col-span-4 lg:col-span-8 flex flex-col gap-3 text-base text-justify pr-4">
            <SimpleAnimation>
              <h3 className="text-xl lg:text-2xl font-light">
                Fill the form, then keep an eye on your email
              </h3>
            </SimpleAnimation>
            <TextAnimation className="flex flex-col gap-3">
              <p>
                Choose your pass based on when you plan to attend the event, and
                let us know in advance if you d like to reserve meals (you can
                always buy them on-site, but giving us a heads-up helps us with
                planning)
              </p>
              <p>
                Remember, submitting this form does not mean your spot is
                confirmed.
              </p>
              <p>
                Once we review the reservation, we will send you a preliminary
                confirmation and the participation contribution* request via
                email.
              </p>
              <p>
                Your booking will be confirmed after we receive your
                participation contribution.
              </p>
              <p>
                *Participation contribution covers the costs of realizing the
                event; it does not in any way represent a profit for the
                organizers. It depends on the pass you choose (Full or Day pass
                meals).
              </p>
            </TextAnimation>
            <SimpleAnimation>
              <Link
                href="/reserve-tickets"
                className="sm:w-fit my-4 lg:mt-10 flex justify-center font-bold text-base uppercase border-black bg-white border py-3 px-6 rounded-lg hover:bg-black hover:text-white"
              >
                Reserve your spot
              </Link>
            </SimpleAnimation>
          </div>
          <SimpleAnimation className="col-span-4 lg:col-start-9">
            <div className="aspect-[5/6] bg-black text-white flex items-center justify-center rounded-2xl">
              PICTURE HERE
            </div>
          </SimpleAnimation>
        </Grid>
      </Container>
    </div>
  );
};

export default Reserve;
