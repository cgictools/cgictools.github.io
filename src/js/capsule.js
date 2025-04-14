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

        physician: "", // H, T, M

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

            if (this.schedFu === "") {
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

        warnPreFu() {
            if (this.schedFu === "") {
                this.$refs.preFu.style.color = this.red;
            } else {
                this.$refs.preFu.style.color = "black";
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

        daysBeforeCapsule(d, format) {
            let date = this.capsuleAppt.minus({ days: d });

            if (format === "long") {
                return date.toLocaleString(DateTime.DATE_HUGE);
            } else if (format === "short") {
                return date.toLocaleString(DateTime.DATE_SHORT);
            }
        },

        hoursBeforeCapsule(h, m = 0) {
            return this.capsuleAppt
                .minus({ hours: h, minutes: m })
                .toLocaleString(DateTime.TIME_SIMPLE);
        },

        hoursAfterCapsule(h, m = 0) {
            return this.capsuleAppt
                .plus({ hours: h, minutes: m })
                .toLocaleString(DateTime.TIME_SIMPLE);
        },

        threeDaysAfterCapsule() {
            return this.capsuleAppt.plus({ days: 3 }).toLocaleString({
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                weekday: "long",
            });
        },

        get numDaysOut() {
            let capsuleDay = this.capsuleAppt.startOf("day");

            return capsuleDay.diff(this.today, "days").toObject().days;
        },

        get fuApptRec() {
            return this.capsuleAppt
                .plus({ weeks: 3 })
                .toLocaleString(DateTime.DATE_SHORT);
        },

        fuApptInput: null,

        get fuApptMin() {
            if (this.capsuleApptInput) {
                return this.capsuleAppt
                    .plus({ days: 1 })
                    .startOf("day")
                    .toISO()
                    .substr(0, 16);
            }
        },

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

        sendInstMethod: "", // email, portal, pickup, mail

        sendInstText: [
            "Email instructions and attach to patient docs.",
            "Attach to patient docs and upload to portal.",
            "Attach to patient docs.",
            "Attach to patient docs. Send tele/order to print and mail.",
        ],

        sendInstAction: [
            "Emailed/attached inst.",
            "Attached/uploaded inst to portal.",
            "Attached inst, patient to pickup.",
            "Attached inst, please print to mail.",
        ],

        get sendInstMessage() {
            if (this.sendInstMethod === "email") {
                return this.sendInstText[0];
            } else if (this.sendInstMethod === "portal") {
                return this.sendInstText[1];
            } else if (this.sendInstMethod === "pickup") {
                return this.sendInstText[2];
            } else {
                return this.sendInstText[3];
            }
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

            if (this.sendInstMethod === "") {
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

        warnCallSendInst() {
            if (this.sendInstMethod === "") {
                this.$refs.callSendInst.style.color = this.red;
            } else {
                this.$refs.callSendInst.style.color = "black";
            }
        },

        // reset

        resetForm() {
            this.reason = "";
            this.physician = "";
            this.schedFu = "";
            this.leftMsg = false;
            this.capsuleApptInput = null;
            this.fuApptInput = null;
            this.sendInstMethod = "";

            this.$refs.preReason.style.color = "black";
            this.$refs.prePhysician.style.color = "black";
            this.$refs.preFu.style.color = "black";

            this.$refs.callCapsuleAppt.style.color = "black";
            this.$refs.callFuAppt.style.color = "black";
            this.$refs.callSendInst.style.color = "black";
        },

        // output

        get greeting() {
            return DateTime.local().setZone("America/Los_Angeles").hour < 12
                ? "Good morning,"
                : "Good afternoon,";
        },

        emailBodyArray() {
            let x = this.emailBodyTemplate;

            // filter out / "remove" matches
            if (this.schedFu == "no") {
                // requires i to be second argument in order to be used as index,
                // even though item is unused
                x = x
                    .filter((item, i) => x[i - 1] !== "{fu}")
                    .filter((item) => item !== "{fu}");
            }

            return x;
        },

        // following 2 functions join array elements, returns a string
        emailBodyHtmlJoin() {
            return this.emailBodyArray().join("<br />");
        },

        emailBodyClipJoin() {
            return this.emailBodyArray().join("\n");
        },

        // string input, replaces keywords
        emailBodyReplace(join) {
            join = join
                .replace("{greeting}", this.greeting)
                .replace(
                    "{capsuleDate}",
                    this.capsuleAppt.toLocaleString(DateTime.DATE_HUGE),
                )
                .replace(
                    "{capsuleTime}",
                    this.capsuleAppt.toLocaleString(DateTime.TIME_SIMPLE),
                )
                .replace("{staffName}", this.staffName);

            if (this.schedFu === "yes") {
                join = join
                    .replace("{fu}", this.emailSnippets.fu)
                    .replace(
                        "{fuApptDate}",
                        this.fuAppt.toLocaleString(DateTime.DATE_HUGE),
                    )
                    .replace(
                        "{fuApptTime}",
                        this.fuAppt.toLocaleString(DateTime.TIME_SIMPLE),
                    );
            }

            return join;
        },

        emailBodyHtml() {
            return this.emailBodyReplace(this.emailBodyHtmlJoin());
        },

        emailBodyClip() {
            return this.emailBodyReplace(this.emailBodyClipJoin());
        },

        copyEmailBody() {
            navigator.clipboard.writeText(this.emailBodyClip());
        },

        get DOS() {
            return (
                "DOS " +
                this.capsuleAppt.toLocaleString({
                    day: "numeric",
                    month: "numeric",
                    year: "2-digit",
                })
            );
        },

        copyDOS() {
            navigator.clipboard.writeText(this.DOS);
        },

        timestamp() {
            let capsule = this.capsuleAppt
                .toLocaleString({
                    day: "numeric",
                    month: "numeric",
                    year: "2-digit",
                    hour: "numeric",
                    minute: "2-digit",
                })
                .replace(/,/g, "");

            let fu = ", f/u TBD";

            if (this.schedFu === "yes") {
                fu =
                    ", f/u " +
                    this.fuAppt
                        .toLocaleString({
                            day: "numeric",
                            month: "numeric",
                            year: "2-digit",
                            hour: "numeric",
                            minute: "2-digit",
                        })
                        .replace(/,/g, "");
            }

            let read = "";

            if (this.physician === "T") {
                if (this.schedFu === "yes") {
                    read =
                        " Sending you tele as reminder to read prior to pt's f/u, thank you.";
                } else {
                    read = " Sending you tele as reminder to read, thank you.";
                }
            }

            let timestamp = "capsule " + capsule + fu + "." + read;

            return timestamp;
        },

        copyTimestamp() {
            navigator.clipboard.writeText(this.timestamp());
        },

        lmTS() {
            let fu = "f/u TBD";

            if (this.schedFu === "yes") {
                fu = "needs f/u";
            }

            return (
                "l/m, " +
                "Dx: " +
                this.reason +
                ", Dr. " +
                this.physician +
                ", " +
                fu
            );
        },

        copyLmTS() {
            navigator.clipboard.writeText(this.lmTS());
        },

        teleReason() {
            let fu = "TBD";

            if (this.schedFu === "yes") {
                fu = this.fuAppt.toLocaleString({
                    month: "numeric",
                    day: "numeric",
                    year: "2-digit",
                });
            }

            return "read capsule, f/u " + fu;
        },

        copyTeleReason() {
            navigator.clipboard.writeText(this.teleReason());
        },

        get apptNotes() {
            let date = DateTime.local()
                .setZone("America/Los_Angeles")
                .toLocaleString({ month: "numeric", day: "numeric" });

            return date + " appt made ";
        },

        copyApptNotes() {
            navigator.clipboard.writeText(this.apptNotes);
        },

        todo() {
            if (this.physician === "H") {
                return 'Select Dr. M as "Provider" in appt screen.';
            } else if (this.physician === "T") {
                if (this.schedFu === "yes") {
                    return (
                        "Date tele for 1 wk prior to f/u (" +
                        this.fuAppt
                            .minus({ weeks: 1 })
                            .toLocaleString(DateTime.DATE_SHORT) +
                        "). Assign to Dr. T. Create tele if needed."
                    );
                } else {
                    return (
                        "Date tele for 2 wks after capsule (" +
                        this.capsuleAppt
                            .plus({ weeks: 2 })
                            .toLocaleString(DateTime.DATE_SHORT) +
                        "). Assign to Dr. T. Create tele if needed."
                    );
                }
            }

            return;
        },

        //

        instDate() {
            return this.capsuleAppt.toLocaleString(DateTime.DATE_HUGE);
        },

        instTime() {
            return this.capsuleAppt.toLocaleString(DateTime.TIME_SIMPLE);
        },
    };
};
