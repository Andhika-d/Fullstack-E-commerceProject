import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Master() {
  useEffect(() => {
    const mobileMenu = document.getElementById("mobile-menu");
    if (!mobileMenu) return;

    const links = mobileMenu.querySelectorAll("a");
    links.forEach((link) =>
      link.addEventListener("click", () => {
        if (mobileMenu.open) mobileMenu.close();
      })
    );
  }, []);

  return (
    <div className="bg-white text-gray-900">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-gradient-to-r from-[#A8E6CF] to-[#8ED1B2]">
        <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=emerald&shade=400"
                alt="Logo CioBites"
                className="h-8 w-auto"
              />
              <span className="font-semibold text-gray-900">CioBites</span>
            </a>
          </div>

          {/* Tombol menu mobile */}
          <button
            type="button"
            className="lg:hidden -m-2.5 p-2.5 text-gray-700"
            onClick={() => document.getElementById("mobile-menu")?.showModal()}
          >
            <span className="sr-only">Buka menu utama</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-6"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Menu Desktop */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-12">
            {[
              { href: "#produk", label: "Produk" },
              { href: "#tentang-kami", label: "Tentang Kami" },
              { href: "#promo", label: "Promo" },
              { href: "#kontak", label: "Kontak" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold hover:text-emerald-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Tombol Masuk */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/login"
              className="text-sm font-semibold hover:text-emerald-600 transition-colors"
            >
              Masuk <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>

        {/* Menu Mobile */}
        <dialog
          id="mobile-menu"
          className="backdrop:bg-black/40 backdrop:backdrop-blur-sm rounded-lg lg:hidden"
        >
          <div className="fixed inset-0 z-50 mx-auto w-full max-w-sm rounded-lg bg-white shadow-xl">
            {/* Header mobile */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                type="button"
                onClick={() => document.getElementById("mobile-menu")?.close()}
                className="p-2 text-gray-700 hover:text-emerald-600 transition"
              >
                <span className="sr-only">Tutup menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-6 w-6"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Body menu */}
            <nav className="px-6 py-6 space-y-2">
              {["Produk", "Tentang Kami", "Promo", "Kontak"].map((label, i) => (
                <a
                  key={i}
                  href={`#${label.toLowerCase().replace(" ", "-")}`}
                  className="block rounded-md px-4 py-2.5 text-base font-semibold text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  {label}
                </a>
              ))}

              {/* Tombol Masuk */}
              <Link
                to="/login"
                className="block w-full text-center rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-base font-semibold text-white shadow-md hover:from-emerald-600 hover:to-teal-600 transition-transform hover:scale-[1.02]"
              >
                Masuk
              </Link>
            </nav>
          </div>
        </dialog>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative isolate px-6 pt-40 pb-40 text-center lg:px-8">
        <h1 className="text-5xl font-bold sm:text-7xl">
          Makanan Kucing Premium di CioBites
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg font-medium text-gray-600 sm:text-xl">
          Dari kibble kering hingga makanan basah lezat, kami sediakan yang
          terbaik untuk si meong kesayangan Anda.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#produk"
            className="rounded-md bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:from-emerald-500 hover:to-teal-500"
          >
            Belanja Sekarang
          </a>
          <a
            href="#tentang-kami"
            className="text-sm font-semibold hover:text-emerald-700"
          >
            Pelajari Lebih Lanjut →
          </a>
        </div>
      </section>

      {/* ===== PRODUK ===== */}
      <section
        id="produk"
        className="border-t border-gray-200 bg-gray-50 py-20"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="mb-12 inline-block border-b-4 border-emerald-400 pb-2 text-3xl font-bold">
            Produk Kami
          </h2>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                img: "data:image/jpeg;base64,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",
                title: "Cat Choize Adult Tuna & Salmon",
                desc: "Makanan kucing dewasa dengan cita rasa tuna dan salmon yang lezat.",
              },
              {
                img: "data:image/jpeg;base64,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",
                title: "Catchoize Wet Food Tuna",
                desc: "Makanan basah dengan rasa tuna yang menggoda selera kucing kesayanganmu.",
              },
              {
                img: "data:image/jpeg;base64,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",
                title: "Whiskas Ocean Fish",
                desc: "Snack sehat dengan rasa ikan laut segar yang disukai kucing aktif.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="mb-4 h-48 w-full object-contain"
                />
                <h3 className="mb-2 text-xl font-semibold">{p.title}</h3>
                <p className="text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="mt-20 bg-emerald-100 py-8 text-emerald-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center text-sm font-medium md:flex-row md:text-left">
          <p>© 2025 CioBites. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-6 font-semibold">
            <a href="mailto:info@ciobites.com" className="hover:underline">
              info@ciobites.com
            </a>
            <a href="tel:+628123456789" className="hover:underline">
              +62 812-3456-789
            </a>
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
