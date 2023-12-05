import Image from "next/image"
import Link from "next/link"

function Header() {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
      {/* left div */}
      <div className="flex space-x-2 items-center">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        
        <div>
          <h1 className="font-bold">FARAZ <span className="text-sky-300">AI</span> Image Generator</h1>
          <h2 className="text-xs">
            Powered by DALL·E 3, ChatGPT & Microsoft Azure!
          </h2>
        </div>
        </div>
      {/* right div */}
      <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
        <Link href="https://github.com/farazfarid/ai-image-generator-microsoft" className="px-2 font-light text-right">
          GitHub Repo
        </Link>
      </div>
    </header>
  )
}

export default Header