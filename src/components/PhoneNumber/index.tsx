import Link from "next/link";
import { parsePhoneNumber } from "awesome-phonenumber";

interface PhoneNumberProps {
  phone: string | undefined | null;
}

export default function PhoneNumber({ phone }: PhoneNumberProps) {
  // convert phone to string
  if (phone === undefined || phone === null) {
    return <></>;
  }
  const formattedPhoneNumber = parsePhoneNumber(phone, { regionCode: "US" });

  if (formattedPhoneNumber.valid) {
    return (
      <div>
        <b>Phone:</b>{" "}
        <Link href={`tel:${formattedPhoneNumber.number.e164}`}>
          {formattedPhoneNumber.number.international}
        </Link>
      </div>
    );
  } else {
    return <></>;
  }
}
