import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FAQGallery } from "../components/FAQGallery";

export default function FAQPage() {
    return (
        <div className="bg-[#fcfbf7] text-black">
            <Navbar />
            <main className="min-h-screen pt-20">
                <FAQGallery />
            </main>
            <Footer />
        </div>
    );
}
