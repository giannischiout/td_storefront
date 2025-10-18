import {
	createStep,
	StepResponse,
} from "@medusajs/framework/workflows-sdk"
import {VENDOR_MODULE} from "../../../modules/vendor";
import VendorModuleService from "../../../modules/vendor/service";

type CreateVendorAdminStepInput = {
	email: string
	first_name?: string
	last_name?: string
	vendor_id: string
}

const linkVendorAdminStep = createStep(
	"link-vendor-admin-step",
	async (
		adminData: CreateVendorAdminStepInput,
		{ container }
	) => {
		const marketplaceModuleService: VendorModuleService =
			container.resolve(VENDOR_MODULE)

		const vendorAdmin = await marketplaceModuleService.createVendorAdmins(
			adminData
		)

		return new StepResponse(
			vendorAdmin,
			vendorAdmin.id
		)
	},
	async (vendorAdminId, { container }) => {
		if (!vendorAdminId) {
			return
		}
		const marketplaceModuleService: VendorModuleService =
			container.resolve(VENDOR_MODULE)

		await marketplaceModuleService.deleteVendorAdmins(vendorAdminId)
	}
)

export default linkVendorAdminStep