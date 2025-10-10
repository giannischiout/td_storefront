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
		// Create the vendor using the module service
		const vendor = await vendorModuleService.createVendors(vendorData);
		// Return the created vendor and its ID for potential rollback
		return new StepResponse(vendor, vendor.id);
	},
	/**
	 * Compensation function for rolling back vendor creation
	 *
	 * This function is called if the workflow needs to be rolled back.
	 * It will delete the vendor that was created in the main step.
	 */
	async (vendorId, { container }) => {
		// If no vendor ID was provided, nothing to rollback
		if (!vendorId) {
			return;
		}

		// Resolve the vendor module service for deletion
		const vendorModuleService: VendorModuleService = container.resolve(VENDOR_MODULE);

		// Delete the vendor to complete the rollback
		vendorModuleService.deleteVendors(vendorId);
	}
);

export default createVendorStep;
