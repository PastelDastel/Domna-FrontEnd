import React from "react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <div className="bg-[#f4d6e4] py-20 px-5 text-center flex justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-2xl text-[#4e2a2a] my-5">Ricevi La Newsletter Del Sito</h2>
        <p className="text-base text-[#7c3a3a] my-4">Resta sempre aggiornata!</p>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Nome"
              required
              className="p-3 border border-[#e892bb] rounded-md text-base bg-white text-[#333333]"
            />
            <input
              type="text"
              placeholder="Cognome"
              required
              className="p-3 border border-[#e892bb] rounded-md text-base bg-white text-[#333333]"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="p-3 border border-[#e892bb] rounded-md text-base bg-white text-[#333333]"
            />
            <input
              type="text"
              placeholder="Telefono"
              required
              className="p-3 border border-[#e892bb] rounded-md text-base bg-white text-[#333333]"
            />
          </div>
          <button
            type="submit"
            className="px-10 py-3 bg-transparent border-2 border-[#e892bb] text-[#e892bb] font-bold text-base rounded-md cursor-pointer transition duration-300 hover:bg-[#e892bb] hover:text-white w-44 mx-auto"
          >
            Invia
          </button>
        </form>

        <p className="mt-8 text-sm text-[#7c3a3a]">
          DOMNA di Fruttero Marcella – P.IVA: 03933450045 – Via Monsignor Angelo Soracco 79 – 12045 Fossano (CN) –{" "}
          <Link to="/privacy" className="text-[#e892bb] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
