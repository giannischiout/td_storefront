import {
	AuthenticatedMedusaRequest,
	MedusaResponse,
} from "@medusajs/framework/http"

import {ContainerRegistrationKeys} from "@medusajs/framework/utils";



export const GET = async (
	req: AuthenticatedMedusaRequest,
	res: MedusaResponse
) => {
	const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

	const { data: [vendorAdmins] } = await query.graph({
		entity: "vendor_admin",
		fields: [
			"*", // all vendor_admin columns
			"vendor.*", // include all vendor fields
		],
		filters: {
			id: [
				req.auth_context.actor_id,
			],
		},
	})

	res.json({
		vendorAdmins,
	})
}