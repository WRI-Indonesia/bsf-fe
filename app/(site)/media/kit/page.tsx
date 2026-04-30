import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const kitItems = [
	{ title: "BSF Logo Pack", type: "ZIP", size: "2.4 MB", image: "/media/gallery.png" },
	{ title: "Brand Guidelines", type: "PDF", size: "2.4 MB", image: "/media/opening.png" },
	{ title: "Press Kit 2026", type: "PDF", size: "2.4 MB", image: "/media/gallery_2.png" },
	{ title: "Fact Sheet", type: "PDF", size: "2.4 MB", image: "/media/cafe.png" },
	{ title: "Brand Guidelines", type: "PDF", size: "2.4 MB", image: "/media/gallery_3.png" },
	{ title: "Press Kit 2026", type: "PDF", size: "2.4 MB", image: "/media/business.png" },
	{ title: "BSF Logo Pack", type: "ZIP", size: "2.4 MB", image: "/media/opening.png" },
	{ title: "Fact Sheet", type: "PDF", size: "2.4 MB", image: "/media/gallery.png" },
];

export default function MediaKitPage() {
	return (
		<div className="min-h-screen bg-white">
			<Header />
			<main className="flex flex-col 2xl:justify-center">
				<section className="flex flex-col mt-[98px] p-20 pt-30 gap-10 max-w-[1280px] overflow-hidden">
					<nav aria-label="Breadcrumb" className="flex items-center gap-5 text-sm text-text-grey-dark">
						<Link href="/" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-6">Home</Link>
						<span className="text-text-grey-dark">/</span>
						<Link href="/media" className="font-[inter] text-text-grey-mid font-medium hover:underline leading-6">Media</Link>
						<span className="text-text-grey-dark">/</span>
						<span className="font-[inter] font-semibold text-text-green leading-6">Media Kit</span>
					</nav>
					<div className="flex flex-col">
						<h1 className="font-semibold text-text-black text-5xl md:text-6xl lg:text-7xl">Media Kit</h1>
					</div>
				</section>

				<section className="flex px-20 pb-30 2xl:justify-center">
					<div className="w-full max-w-[1280px]">
						<div className="grid gap-6 md:grid-cols-2">
							{kitItems.map((item, index) => (
								<button
									key={`${item.title}-${index}`}
									type="button"
									className="flex items-center justify-between gap-6 rounded-2xl border border-outline-grey-light bg-white p-5 text-left"
								>
									<div className="flex items-center gap-4">
										<div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
											<Image src={item.image} alt={item.title} fill className="object-cover" />
										</div>
										<div className="flex flex-col gap-1">
											<p className="font-[inter] text-lg font-semibold text-text-grey-dark">{item.title}</p>
											<p className="font-[inter] text-sm uppercase tracking-wide text-text-grey-mid">
												{item.type} {item.size}
											</p>
										</div>
									</div>
									<span className="text-text-green text-xl" aria-hidden="true">→</span>
								</button>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
