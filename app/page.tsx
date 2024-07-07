import { auth } from "@/auth";


export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-24"> 
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl md:text-6xl">
        HKBook
      </h1>
      <h4 className="mt-3 text-1xl font-semibold sm:text-3xl">
        あなたのお金管理させてください
      </h4>

      {/* アプリの説明セクション */}
      <section className="mt-6 text-center sm:mt-8 md:mt-10">
        <p className="mt-4 text-base sm:text-lg md:text-xl">
          HKBookは、あなたのお金を簡単かつ<br />効率的に管理できるアプリです<br />
          毎月および毎年の収支を記録します<br />
          収入や支出の登録も簡単に行えます
        </p>
      </section>

      {/* 他のコンテンツ */}
    </main>
  );
}
