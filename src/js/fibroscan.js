import { DateTime } from "luxon";

window.fibroscan = function () {
    return {
        emailBodyTemplate: [
            "{greeting}",
            "",
            "Your Fibroscan is scheduled for {fibroDate} at {fibroTime} at our office in Los Alamitos - 4772 Katella Ave, Ste 200, Los Alamitos, CA 90720.",
            "",
            "You will need to fast for 3 hours prior to the exam, beginning at {fastStartTime}. No food or drinks, but water is ok during this time.",
            "",
            "{fu}",
            "",
            "Please contact us at 562-596-5552 if you have any questions.",
            "",
            "Best regards,",
            "{staffName}",
            "Comprehensive GI Care",
        ],

        emailSnippets: {
            fu: "Your post-Fibroscan follow up is scheduled for {fuApptDate} at {fuApptTime}.",
        },

        red: "#dc2626",

        //
        firstFibro: "",

        prevFibroInput: null,

        prevFibroAppt() {
            return DateTime.fromISO(this.prevFibroInput, {
                locale: "en-US",
                zone: "America/Los_Angeles",
            });
        },

        earliestFibroDate() {
            return this.prevFibroAppt()
                .plus({
                    months: 6,
                    days: 1,
                })
                .toLocaleString();
        },

        schedFu: "",

        fuTBD() {
            if (this.schedFu === "no") {
                return true;
            } else if (this.schedFu === "yes") {
                return false;
            }
        },

        //

        checkPre() {
            let incomplete = 0;

            if (this.firstFibro === "") {
                incomplete++;
            }

            if (this.firstFibro === "no" && this.prevFibroInput === null) {
                incomplete++;
            }

            if (this.schedFu === "") {
                incomplete++;
            }

            return incomplete;
        },

        warnPreFirstFibro() {
            if (this.firstFibro === "") {
                this.$refs.preFirstFibro.style.color = this.red;
            } else {
                this.$refs.preFirstFibro.style.color = "black";
            }
        },

        warnPrePrevFibroDate() {
            if (this.firstFibro === "no" && this.prevFibroInput === null) {
                this.$refs.prePrevFibroDate.style.border =
                    "1px solid " + this.red;
            } else {
                this.$refs.prePrevFibroDate.style.border =
                    "1px solid rgb(82, 82, 91)";
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

        fibroApptInput: null,

        fibroApptMin() {
            // return DateTime.now().setZone("America/Los_Angeles").startOf("day");
            let earliest = this.prevFibroAppt()
                .plus({ months: 6, days: 1 })
                .toISO();
            let today = DateTime.local()
                .setZone("America/Los_Angeles")
                .startOf("day")
                .toISO();
            if (this.firstFibro === "no" && today < earliest) {
                return earliest.substr(0, 16);
            } else {
                return today.substr(0, 16);
            }
        },

        fibroAppt() {
            return DateTime.fromISO(this.fibroApptInput, {
                locale: "en-US",
                zone: "America/Los_Angeles",
            });
        },

        fibroApptDate() {
            return this.fibroAppt().toLocaleString(
                DateTime.DATE_MED_WITH_WEEKDAY,
            );
        },

        fibroApptTime() {
            return this.fibroAppt().toLocaleString(DateTime.TIME_SIMPLE);
        },

        hoursBeforeFibro(h, m = 0) {
            return this.fibroAppt()
                .minus({
                    hours: h,
                    minutes: m,
                })
                .toLocaleString(DateTime.TIME_SIMPLE);
        },

        //

        fuApptInput: null,

        fuApptMin() {
            if (this.fibroApptInput) {
                return this.fibroAppt().startOf("day").toISO().substr(0, 16);
            }
        },

        fuApptRec() {
            return this.fibroAppt()
                .plus({ weeks: 2 })
                .toLocaleString(DateTime.DATE_SHORT);
        },

        get fuAppt() {
            return DateTime.fromISO(this.fuApptInput, {
                locale: "en-US",
                zone: "America/Los_Angeles",
            });
        },

        fuApptDate() {
            return this.fuAppt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        },

        fuApptTime() {
            return this.fuAppt.toLocaleString(DateTime.TIME_SIMPLE);
        },

        //

        checkDuring() {
            let incomplete = 0;

            if (!this.fibroApptInput) {
                incomplete++;
            }

            if (!this.fuApptInput && !this.fuTBD()) {
                incomplete++;
            }

            return incomplete;
        },

        warnCallFibroAppt() {
            if (!this.fibroApptInput) {
                this.$refs.callFibroAppt.style.color = this.red;
            } else {
                this.$refs.callFibroAppt.style.color = "black";
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

        emailBodyArray() {
            let x = this.emailBodyTemplate;

            // filter out / "remove" matches
            if (this.fuTBD()) {
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
            return join
                .replace("{greeting}", this.greeting())
                .replace("{fibroDate}", this.fibroApptDate())
                .replace("{fibroTime}", this.fibroApptTime())
                .replace("{fastStartTime}", this.hoursBeforeFibro(3))
                .replace("{fu}", this.emailSnippets.fu)
                .replace("{fuApptDate}", this.fuApptDate())
                .replace("{fuApptTime}", this.fuApptTime())
                .replace("{staffName}", this.staffName);
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

        //

        DOS() {},
    };
};
