import Image from 'next/image'
import Link from 'next/link'

type ImageUser = {
  link: string;
  img: string;
}

export default function ImageUser(
  { link, img }: ImageUser
) {
  return (
    <Link href={link} className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-zinc-700 hover:border-white transition-colors">
      <Image
        src={img}
        alt="Profil Pengguna"
        fill
        className="object-cover"
      />
    </Link>
  )
}