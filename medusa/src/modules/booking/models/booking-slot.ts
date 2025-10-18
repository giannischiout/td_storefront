import { model } from "@medusajs/framework/utils"
import BookingRule from "./booking-rule";


const BookingSlot = model.define("booking_slot", {
	id: model.id().primaryKey(),
	booking_rule: model.belongsTo(() => BookingRule, {
		mappedBy: "booking_slot",
	}),
})

export default BookingSlot
