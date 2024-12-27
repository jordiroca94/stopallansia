import React from "react";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import SimpleAnimation from "./animations/SimpleAnimation";
import Link from "next/link";

const ReserveTickets = () => {
  return (
    <div className="pt-header">
      <Container>
        <Grid className="py-6 lg:py-12">
          <SimpleAnimation className="col-span-full border-b pb-5 border-gray">
            <h1 className="text-3xl lg:text-5xl font-semibold font-secondary">
              Choose your plan
            </h1>
          </SimpleAnimation>
          <div className="col-span-full flex flex-col gap-2">
            <h3 className="text-xl lg:text-2xl font-light">
              Select the type of pass you want to buy.
            </h3>
            <p className="pb-4">
              You can bring your tent for free or reserve a spot in our glamping
              tent
            </p>
            <div className="flex gap-3 items-start">
              <div className="pt-0.5 sm:pt-0">
                <input type="radio" name="option" value="Option 1" />
              </div>
              <p>
                Full Pass | Complete access from Fri 4th, Sun 6th, 12 PM [from X
                €]
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="pt-0.5 sm:pt-0">
                <input type="radio" name="option" value="Option 2" />
              </div>
              <p>
                One Day Pass (Friday) | From Fri 4th, 18 PM to Sat 5th, 12 PM
                [from X €]
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="pt-0.5 sm:pt-0">
                <input type="radio" name="option" value="Option 3" />
              </div>
              <p>
                One Day Pass (Friday) | From Fri 4th, 18 PM to Sat 5th, 12 PM
                [from X €]
              </p>
            </div>
            <Link
              href="/reserve-tickets"
              className="sm:w-fit my-4 lg:mt-10 flex justify-center font-bold text-base uppercase border-black bg-white border py-3 px-6 rounded-lg hover:bg-black hover:text-white"
            >
              Continue
            </Link>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default ReserveTickets;
