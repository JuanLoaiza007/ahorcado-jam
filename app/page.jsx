"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center pt-8"
      style={{ backgroundImage: "url('/images/home/ahorcado.png')" }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-8 drop-shadow-lg">
          Juego del Ahorcado
        </h1>
        <button
          onClick={() => router.push("/juego")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300"
        >
          Nuevo Juego
        </button>
      </div>
    </div>
  );
}
