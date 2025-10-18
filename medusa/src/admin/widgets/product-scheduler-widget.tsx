import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Input, } from "@medusajs/ui"
import {  useState } from "react"

// --- COMPONENT ---
const ProductSchedulerWidget = () => {
	const [schedule, setSchedule] = useState("")

	return (
		<Container className="p-6 space-y-4">
			<Heading level="h2">Scheduler</Heading>
			<Input
				placeholder="test"
				value={schedule}
				onChange={(e) => setSchedule(e.target.value)}
			/>
			{/*<Button  disabled={loading}>*/}
			{/*	{loading ? "Saving..." : "Save"}*/}
			{/*</Button>*/}
		</Container>
	)
}

// --- CONFIGURATION ---
export const config = defineWidgetConfig({
	zone: "product.details.before",
})

export default ProductSchedulerWidget
