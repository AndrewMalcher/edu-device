import { SearchIcon } from "lucide-react"
import Header from "./components/header"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import Image from "next/image"

const Home = () => {
  return (
    <div>
      {/* HEADER */}
      <Header />
      {/* HEADER */}

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Andrew!</h2>
        <p>Segunda-fera, 05 de agosto.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input type="text" placeholder="Pesquisar..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            className="rounded-xl object-cover"
            fill
            src="/Banner Pizza.png"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
