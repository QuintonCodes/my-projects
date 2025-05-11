import Footer from "@/components/footer";
import Header from "@/components/header";
import ScrollToTop from "@/components/scroll-to-top";

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-[90vh]">
        <Header />
        {children}
        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
}
