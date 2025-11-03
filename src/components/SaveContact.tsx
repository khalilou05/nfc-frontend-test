"use client";
import ID from "@/icons/ID";
import type { Customer } from "@/types/types";
import { Button } from "./ui/button";

export default function SaveContact({ customer }: { customer: Customer }) {
  const saveContact = () => {
    const vcardString = [
      "BEGIN:VCARD",
      "VERSION:4.0",
      `N:${customer.fullName}`,
      `TEL;TYPE=cell:${customer.phoneNumber}`,
      `EMAIL:${customer.email}`,
      `END:VCARD`,
    ].join("\r\n");
    const blob = new Blob([vcardString], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const aLink = document.createElement("a");
    aLink.href = url;
    aLink.download = `${customer.fullName}.vcf`;
    aLink.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Button
      className="w-[80%] h-12 rounded-tl-2xl rounded-br-2xl rounded-bl-none rounded-tr-none"
      onClick={saveContact}
    >
      Enregistrer Le Contact
      <ID />
    </Button>
  );
}
