
import { CreateProductWorkflowInputDTO } from "@medusajs/framework/types";
import {createProductsWorkflow, createRemoteLinkStep, useQueryGraphStep} from "@medusajs/medusa/core-flows";
import {createWorkflow, transform, WorkflowResponse} from "@medusajs/framework/workflows-sdk";
import {Modules} from "@medusajs/framework/utils";
import {VENDOR_MODULE} from "../../../modules/vendor";

type WorkflowInput = {
	vendor_admin_id: string;
	product: CreateProductWorkflowInputDTO;
};

const createVendorProductWorkflow = createWorkflow("create-vendor-product", (input: WorkflowInput) => {
	const { data: stores } = useQueryGraphStep({
		entity: "store",
		fields: ["default_sales_channel_id"],
	});

	const productData = transform({ input, stores }, ({ input, stores }) => {
		const defaultChannelId = stores?.[0]?.default_sales_channel_id
		return {
			products: [
				{
					...input.product,
					sales_channels: defaultChannelId
						? [{ id: String(defaultChannelId) }]
						: [],
				},
			],
		}
	})

	const createdProducts = createProductsWorkflow.runAsStep({
		input: productData,
	})
	const { data: vendorAdmins } = useQueryGraphStep({
		entity: "vendor_admin",
		fields: ["vendor.id"],
		filters: {
			id: input.vendor_admin_id,
		},
	}).config({ name: "retrieve-vendor-admins" })

	const linksToCreate = transform({
		input,
		createdProducts,
		vendorAdmins,
	}, (data) => {
		return data.createdProducts.map((product) => {
			return {
				[VENDOR_MODULE]: {
					vendor_id: data.vendorAdmins[0].vendor.id,
				},
				[Modules.PRODUCT]: {
					product_id: product.id,
				},
			}
		})
	})

	createRemoteLinkStep(linksToCreate)

	const { data: products } = useQueryGraphStep({
		entity: "product",
		fields: ["*", "variants.*"],
		filters: {
			id: createdProducts[0].id,
		},
	}).config({ name: "retrieve-products" })

	return new WorkflowResponse({
		product: products[0],
	})
});

export default createVendorProductWorkflow;
