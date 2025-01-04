"use client";
import React, { useRef } from "react";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import SimpleAnimation from "./animations/SimpleAnimation";
import TextAnimation from "./animations/TextAnimation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ReserveTickets = () => {
  const refReserveForm = useRef<HTMLFormElement>(null);

  const reserveSchema = z.object({
    option: z.string().min(1, { message: "Please select a pass option" }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      option: "",
    },
    resolver: zodResolver(reserveSchema),
  });

  const handleReserve = async (value: { option: string }) => {
    alert(`You selected: ${value.option}`);
  };

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
            <SimpleAnimation>
              <h3 className="text-xl lg:text-2xl font-light pb-2">
                Select the type of pass you want to buy.
              </h3>
              <p className="pb-4">
                You can bring your tent for free or reserve a spot in our
                glamping tent
              </p>
            </SimpleAnimation>
            <form ref={refReserveForm} onSubmit={handleSubmit(handleReserve)}>
              <TextAnimation className="flex flex-col gap-1 relative pb-10">
                <label className="flex gap-3 items-center">
                  <input
                    type="radio"
                    {...register("option")}
                    value="Full Pass | Complete access from Fri 4th, Sun 6th, 12 PM"
                  />
                  <span>
                    Full Pass | Complete access from Fri 4th, Sun 6th, 12 PM
                    [from X €]
                  </span>
                </label>
                <label className="flex gap-3 items-center">
                  <input
                    type="radio"
                    {...register("option")}
                    value="Full Pass | Complete access from Fri 4th, Sun 6th, 12 PM"
                  />
                  <span>
                    Full Pass | Complete access from Fri 4th, Sun 6th, 12 PM
                    [from X €]
                  </span>
                </label>
                <label className="flex gap-3 items-center">
                  <input
                    type="radio"
                    {...register("option")}
                    value="Full Pass | Complete access from Fri 4th, Sun 6th, 12 PM"
                  />
                  <span>
                    Full Pass | Complete access from Fri 4th, Sun 6th, 12 PM
                    [from X €]
                  </span>
                </label>
                {errors.option && (
                  <p className="text-red absolute bottom-2">
                    {errors.option.message}
                  </p>
                )}
              </TextAnimation>

              <button
                type="submit"
                className="sm:w-fit my-4 flex justify-center font-bold text-base uppercase border-black bg-white border py-3 px-6 rounded-lg hover:bg-black hover:text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default ReserveTickets;
