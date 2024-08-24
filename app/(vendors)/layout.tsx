import Header from './components/header';
import Footer from '@/components/base/footer';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <main className="pb-24">{children}</main>
      <Footer />
    </section>
  );
}
