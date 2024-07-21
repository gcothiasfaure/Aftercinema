import Link from "next/link";

import { MoveUpRight } from "lucide-react";

export default function TableOfContentLink({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  return (
    <Link href={id} className="hover:underline decoration-h2color text-h2color">
      <div className="flex items-center">
        {label}
        <MoveUpRight width={15} height={15} className="ml-1" />
      </div>
    </Link>
  );
}
