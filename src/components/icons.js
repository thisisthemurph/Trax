import React from "react"

export const TrashIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="icon trash-icon"
		>
			<polyline points="3 6 5 6 21 6"></polyline>
			<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
		</svg>
	)
}

export const EditIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="icon edit-icon"
		>
			<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
			<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
		</svg>
	)
}

export const SlidersIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="icon sliders-icon"
		>
			<line x1="4" y1="21" x2="4" y2="14"></line>
			<line x1="4" y1="10" x2="4" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="12"></line>
			<line x1="12" y1="8" x2="12" y2="3"></line>
			<line x1="20" y1="21" x2="20" y2="16"></line>
			<line x1="20" y1="12" x2="20" y2="3"></line>
			<line className="sliders-icon__horizontal" x1="1" y1="14" x2="7" y2="14"></line>
			<line className="sliders-icon__horizontal" x1="9" y1="8" x2="15" y2="8"></line>
			<line className="sliders-icon__horizontal" x1="17" y1="16" x2="23" y2="16"></line>
		</svg>
	)
}

export const ChevronRightIcon = () => {
	return (
		<svg
			className="icon chevron-right-icon"
			viewBox="0 0 16 16"
			fill="black"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
			/>
		</svg>
	)
}
