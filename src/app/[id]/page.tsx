import SaveContact from "@/components/SaveContact";

import Gmail from "@/icons/Gmail";
import Phone from "@/icons/Phone";
import { fetchApi } from "@/lib/utils";
import type { Customer } from "@/types/types";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { socialMedia } from "../../socialMedia";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const resp = await fetchApi(`/customers/${id}`);
  if (!resp.ok) return notFound();
  const customer = await resp.json<Customer>();

  return (
    <div className="flex flex-col h-dvh w-dvw">
      <div className="h-[50%] relative shrink-0">
        <Image
          src={`https://media.twenty-print.com/${customer.coverImg}`}
          fill
          style={{ objectFit: "cover" }}
          alt="cover"
        />
        <div className="absolute h-25 w-25 left-[50%] top-[100%] translate-[-50%] border-3 border-[#004f9f] rounded-full overflow-hidden">
          <Image
            fill
            src={`https://media.twenty-print.com/${customer.profileImg}`}
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
      </div>
      <div className="h-full flex flex-col gap-8 bg-linear-to-b from-[#004f9f] to-transparent pt-16">
        <div className="flex flex-col justify-center w-full items-center gap-3">
          <h1
            className="text-2xl text-gray-300 font-semibold
"
          >
            {customer.fullName}
          </h1>
          <SaveContact customer={customer} />
        </div>

        <div className="flex items-center flex-col">
          <div className="w-[80%] grid grid-cols-2 place-items-center gap-14 [&>*]:scale-[2]">
            <Link href={`tel:${customer.phoneNumber}`}>
              <Phone />
            </Link>
            <Link href={`mailto:${customer.email}`}>
              <Gmail />
            </Link>
            {Object.entries(JSON.parse(customer.socialMedia as string)).map(
              ([key, value]) => (
                <Link
                  href={value as string}
                  key={key}
                  target="_blank"
                >
                  {socialMedia[key].icon}
                </Link>
              )
            )}
          </div>
        </div>
        <div className="mt-auto flex justify-center">
          <Link
            target="_blank"
            href={"https://www.facebook.com/share/1BLRQguH2s/"}
          >
            <Image
              height={60}
              width={60}
              alt=""
              src={"/logo.svg"}
            />
          </Link>
          POWRED BY{" "}
        </div>
      </div>
    </div>
  );
}
