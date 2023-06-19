import React from "react";
import Modal from "../Modal"
import Cite from 'citation-js';
import type { Item } from "../Dropdown";
import Dropdown from "../Dropdown";

const SUPPORTED_CITATION_STYLES: Item[] = [
	{ label: "APA", value: "apa" },
	{ label: "Vancouver", value: "vancouver" },
	{ label: "Harvard1", value: "harvard1" },
]

const Citation = ({ title = "-" }: { title?: string }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [citationStyle, setCitationStyle] = React.useState<string | undefined>('apa');
	const [url, setUrl] = React.useState<string | undefined>();

	React.useEffect(() => {
		setUrl(window.location.href);
	}, [title]);


	const [citationHtml, bibliographyHtml] = React.useMemo(() => {
		const citation = new Cite({
			type: 'webpage',
			title: title,
			'container-title': "StarHealth",
			'page': [title],
			author: [
				{ literal: "StarHealth Inc." }
			],
			URL: url,
			issued: { 'date-parts': [[2023]], precision: 'year' },
		});

		return (
			[
				citation.format('citation', {
					format: 'html',
					template: citationStyle,
					lang: 'en-US',
				}),

				citation.format('bibliography', {
					format: 'html',
					template: citationStyle,
					lang: 'en-US',
				})
			]
		)
	}, [title, url, citationStyle])

	const copyToClipboard = (html: string) => {
		const copyArea = document.getElementById("copyArea");
		if (!copyArea) return;
		copyArea.innerHTML = html;
		copyArea.focus();
		document.execCommand("selectAll");
		document.execCommand("copy");
		copyArea.innerHTML = "";
	}

	return (
		<>
			<button
				className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
				onClick={() => setIsOpen(true)}>
				Cite this page
			</button>
			<Modal
				open={isOpen}
				onClose={() => setIsOpen(false)}
				message="Cite this page"
			>
				<Dropdown
					items={SUPPORTED_CITATION_STYLES}
					label="Citation style"
					value={citationStyle}
					onChange={value => setCitationStyle(value)}
					placeholder="Select a citation style"
				/>
				<h4 className="text-md font-bold mt-4">Bibliography</h4>
				<div className="rounded-lg border-solid border p-4 mt-2 bg-gray-50">
					<div dangerouslySetInnerHTML={{ __html: bibliographyHtml }} />
					<button
						className="mt-8 ease focus:shadow-outline select-none rounded-md border text-violet-700 hover:bg-violet-100 border-violet-700 px-4 py-2 transition duration-500 focus:outline-none"
						onClick={() => copyToClipboard(bibliographyHtml)}>
						Copy to clipboard
					</button>
				</div>
				<h4 className="text-md font-bold mt-4">In-text citation</h4>
				<div className="rounded-lg border-solid border p-4 mt-2 bg-gray-50">
					<div dangerouslySetInnerHTML={{ __html: citationHtml }} />
					<button
						className="mt-8 ease focus:shadow-outline select-none rounded-md border text-violet-700 hover:bg-violet-100 border-violet-700 px-4 py-2 transition duration-500 focus:outline-none"
						onClick={() => navigator.clipboard.writeText(citationHtml)}>
						Copy to clipboard
					</button>
				</div>
				<div id="copyArea" className="fixed" style={{ top: -10000, left: -10000 }} contentEditable></div>
			</Modal>
		</>
	)
}

export default Citation;