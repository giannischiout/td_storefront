/**
 * Create Provider Workflow Step
 * This workflow step handles the creation of provider entities in the system.
 * Providers represent external service providers or vendors that can supply products
 * or services to the marketplace.
 */

import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { VENDOR_MODULE } from "../../../modules/vendor";
import VendorModuleService from "../../../modules/vendor/service";

type CreateVendorStepInput = {
	name: string;
	handle?: string;
	logo?: string;
};

const createVendorStep = createStep(
	"create-vendor",
	async (vendorData: CreateVendorStepInput, { container }) => {
		// Resolve the vendor module service from the dependency injection container
		const vendorModuleService: VendorModuleService = container.resolve(VENDOR_MODULE);
		const vendor = await vendorModuleService.createVendors(vendorData);
		return new StepResponse(vendor, vendor.id);
	},

	async (vendorId, { container }) => {
		if (!vendorId) {
			return;
		}

		const vendorModuleService: VendorModuleService = container.resolve(VENDOR_MODULE);
		vendorModuleService.deleteVendors(vendorId);
	}
);

export default createVendorStep;
