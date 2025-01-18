

export default function Home() {
  return (
    <>
      <main className="w-full  text-white p-4 flex justify-center items-center h-screen">
        <div className="bg-black/30 flex flex-col gap-10 text-center px-3 py-12 rounded-2xl " >
          <h1> To use this web app you need to pass by the qr order telegram bot </h1>
          <a href="https://t.me/qrorderdzbot" className="bg-main rounded-2xl text-white py-3 px-4" > Join now </a>
        </div>
      </main>
    </>
  );
}

