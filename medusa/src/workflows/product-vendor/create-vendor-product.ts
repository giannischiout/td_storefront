import { CreateProductWorkflowInputDTO } from "@medusajs/framework/types";
import { createWorkflow, transform } from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";

type WorkflowInput = {
	vendor_admin_id: string;
	product: CreateProductWorkflowInputDTO;
};

const createVendorProductWorkflow = createWorkflow("create-vendor-product", (input: WorkflowInput) => {
	console.log({ input });
	const { data: stores } = useQueryGraphStep({
		entity: "store",
		fields: ["default_sales_channel_id"],
	});

	const productData = transform(
		{
			input,
			stores,
		},
		(data) => {
			console.log({ data });
		}
	);
	console.log({ stores });
});

export default createVendorProductWorkflow;
