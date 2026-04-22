import Image from "next/image";
import type { ChipProps } from "./type";

const Chip = ({
  id,
  name,
  value,
  checked,
  onChange,
  image,
  children,
}: ChipProps) => {
  return (
    <label
      htmlFor={id}
      className={`inline-flex cursor-pointer items-center rounded-full gap-[8px] border border-[#F2F2F2] py-[8px] text-base font-semibold transition-colors ${
        checked
          ? "bg-[hsl(var(--black))] text-[#F2F2F2]"
          : "hover:bg-[hsl(var(--gray-100))] bg-white text-gray-700"
      } ${image ? "pl-[8px] pr-[16px]" : "px-[16px]"}`}
    >
      <input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      ) : null}
      {children}
    </label>
  );
};

export default Chip;
