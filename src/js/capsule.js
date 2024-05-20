import { DateTime } from "luxon";

window.capsule = function () {
    return {
        emailBodyTemplate: [
            "{greeting}",
            "",
            "Your capsule endoscopy is scheduled for {capsuleDate} at {capsuleTime} at our office in Los Alamitos - 4772 Katella Ave, Ste 200, Los Alamitos, CA 90720.",
            "",
            "Attached are the consent form and instructions for your prep. Please sign and bring the consent form to your capsule endoscopy appointment. You will need to purchase the prep ingredients over-the-counter - please see the instructions for more details.",
            "",
            "There will be no sedation for the capsule endoscopy, so you are welcome to drive yourself to the appointment. During the appointment, a staff member will assist you with swallowing the capsule and explain the capsule retrieval process.",
            "",
            "{fu}",
            "",
            "If you have any questions, please call us at 562-596-5552 or send us a message through your patient portal.",
            "",
            "Best regards,",
            "{staffName}",
            "Comprehensive GI Care",
        ],

        emailSnippets: {
            fu: "Your next follow up is scheduled for {fuApptDate} at {fuApptTime}.",
        },

        red: "#dc2626",

        // pre input

        reason: "",

        physician: "", // last initial only (i.e. H, T, M)

        schedFu: "", // yes, no

        //

        checkPre() {
            let incomplete = 0;

            if (this.reason === "") {
                incomplete++;
            }

            if (this.physician === "") {
                incomplete++;
            }

            return incomplete;
        },

        warnPreReason() {
            if (this.reason === "") {
                this.$refs.preReason.style.color = this.red;
            } else {
                this.$refs.preReason.style.color = "black";
            }
        },

        warnPrePhysician() {
            if (this.physician === "") {
                this.$refs.prePhysician.style.color = this.red;
            } else {
                this.$refs.prePhysician.style.color = "black";
            }
        },

        //

        leftMsg: false,

        capsuleApptInput: null,

        get today() {
            return DateTime.local()
                .setZone("America/Los_Angeles")
                .startOf("day");
        },

        get capsuleAppt() {
            return DateTime.fromISO(this.capsuleApptInput, {
                locale: "en-US",
                zone: "America/Los_Angeles",
            });
        },

        numDaysOut() {
            let capsuleDay = this.capsuleAppt.startOf("day");

            return capsuleDay.diff(this.today, "days").toObject().days;
        },

        fuApptRec() {
            return this.fibroAppt
                .plus({ weeks: 3 })
                .toLocaleString(DateTime.DATE_SHORT);
        },

        fuApptInput: null,

        get fuAppt() {
            if (this.fuApptInput) {
                return DateTime.fromISO(this.fuApptInput, {
                    locale: "en-US",
                    zone: "America/Los_Angeles",
                });
            }

            return;
        },

        //

        checkDuring() {
            let incomplete = 0;

            if (!this.capsuleApptInput) {
                incomplete++;
            }

            if (!this.fuApptInput && this.schedFu === "yes") {
                incomplete++;
            }

            return incomplete;
        },

        warnCallCapsuleAppt() {
            if (!this.capsuleApptInput) {
                this.$refs.callCapsuleAppt.style.color = this.red;
            } else {
                this.$refs.callCapsuleAppt.style.color = "black";
            }
        },

        warnCallFuAppt() {
            if (!this.fuApptInput) {
                this.$refs.callFuAppt.style.color = this.red;
            } else {
                this.$refs.callFuAppt.style.color = "black";
            }
        },

        //

        greeting() {
            let hour = DateTime.local().setZone("America/Los_Angeles").hour;

            if (hour < 12) {
                return "Good morning,";
            } else {
                return "Good afternoon,";
            }
        },
    };
};
