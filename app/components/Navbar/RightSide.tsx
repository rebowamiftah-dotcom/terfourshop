import Image from "next/image"
import Link from "next/link"

interface RightSideProps {
  title: string;
  link: string;
  img: string;
};

const RightSide = ({ title, link, img }: RightSideProps) => {
  return (
    <div className="flex items-center gap-3 shrink-0 group">
      <Link href="/" className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
        <Image 
          src={img}
          alt="Logo Toko"
          width={40}
          height={40}
          className="object-contain rounded-full"
        />
      </Link>
      <Link href={link} className="font-bold text-2xl tracking-tight text-white group-hover:text-gray-300 transition-colors hidden sm:inline ">
      
        {title}
      </Link>
    </div>
  )
}

export default RightSide