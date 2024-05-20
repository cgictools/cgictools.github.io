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

        physician: "",

        firstFibro: "",

        prevFibroInput: null,

        get prevFibroAppt() {
            return DateTime.fromISO(this.prevFibroInput, {
                locale: "en-US",
                zone: "America/Los_Angeles",
            });
        },

        earliestFibroDate() {
            return this.prevFibroAppt
                .plus({
                    months: 6,
                    days: 1,
                })
                .toLocaleString();
        },

        schedFu: "",

        preFuApptInput: null,

        // check pre

        checkPre() {
            let incomplete = 0;

            if (this.reason === "") {
                incomplete++;
            }

            if (this.physician === "") {
                incomplete++;
            }

            if (this.firstFibro === "") {
                incomplete++;
            }

            if (this.firstFibro === "no" && this.prevFibroInput === null) {
                incomplete++;
            }

            if (this.schedFu === "") {
                incomplete++;
            }

            if (this.schedFu === "noHas" && this.preFuApptInput === null) {
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

        warnPreFuApptInput() {
            if (this.schedFu === "noHas" && this.preFuApptInput === null) {
                this.$refs.preFuApptInput.style.border =
                    "1px solid " + this.red;
            } else {
                this.$refs.preFuApptInput.style.border =
                    "1px solid rgb(82, 82, 91)";
            }
        },

        // during input - fibroscan

        leftMsg: false,

        fibroApptInput: null,

        get today() {
            return DateTime.local()
                .setZone("America/Los_Angeles")
                .startOf("day");
        },

        fibroApptMin() {
            // return DateTime.now().setZone("America/Los_Angeles").startOf("day");
            let earliest = this.prevFibroAppt
                .plus({ months: 6, days: 1 })
                .toISO();
            if (this.firstFibro === "no" && this.today.toISO() < earliest) {
                return earliest.substr(0, 16);
            } else {
                return this.today.substr(0, 16);
            }
        },

        get fibroAppt() {
            return DateTime.fromISO(this.fibroApptInput, {
                locale: "en-US",
                zone: "America/Los_Angeles",
            });
        },

        fastStartTime() {
            return this.fibroAppt
                .minus({ hours: 3 })
                .toLocaleString(DateTime.TIME_SIMPLE);
        },

        numDaysOut() {
            let fibroDay = this.fibroAppt.startOf("day");

            return fibroDay.diff(this.today, "days").toObject().days;
        },

        // during input - follow up

        fuApptInput: null,

        fuApptMin() {
            if (this.fibroApptInput) {
                return this.fibroAppt.startOf("day").toISO().substr(0, 16);
            }
        },

        fuApptRec() {
            return this.fibroAppt
                .plus({ weeks: 2 })
                .toLocaleString(DateTime.DATE_SHORT);
        },

        get fuAppt() {
            if (this.preFuApptInput) {
                return DateTime.fromISO(this.preFuApptInput, {
                    locale: "en-US",
                    zone: "America/Los_Angeles",
                });
            } else if (this.fuApptInput) {
                return DateTime.fromISO(this.fuApptInput, {
                    locale: "en-US",
                    zone: "America/Los_Angeles",
                });
            }
            return;
        },

        // check during inputs

        checkDuring() {
            let incomplete = 0;

            if (!this.fibroApptInput) {
                incomplete++;
            }

            if (!this.fuApptInput && this.schedFu === "yes") {
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

        // email

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
            if (this.schedFu == "noTBD") {
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
                .replace("{greeting}", this.greeting())
                .replace(
                    "{fibroDate}",
                    this.fibroAppt.toLocaleString(DateTime.DATE_HUGE),
                )
                .replace(
                    "{fibroTime}",
                    this.fibroAppt.toLocaleString(DateTime.TIME_SIMPLE),
                )
                .replace("{fastStartTime}", this.fastStartTime())
                .replace("{staffName}", this.staffName);

            if (this.schedFu === "yes" || this.schedFu === "noHas") {
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

        // timestamps

        DOS() {
            return (
                "DOS " +
                this.fibroAppt.toLocaleString({
                    day: "numeric",
                    month: "numeric",
                    year: "2-digit",
                })
            );
        },

        copyDOS() {
            navigator.clipboard.writeText(this.DOS());
        },

        timestamp() {
            let fibro = this.fibroAppt
                .toLocaleString({
                    day: "numeric",
                    month: "numeric",
                    year: "2-digit",
                    hour: "numeric",
                    minute: "2-digit",
                })
                .replace(/,/g, "");

            let fu = ", f/u TBD";

            if (this.schedFu === "noHas" || this.schedFu === "yes") {
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

            return (
                "fibro " +
                fibro +
                fu +
                ". Aware fasting 3 hrs prior, water ok. Sent email conf."
            );
        },

        copyTimestamp() {
            navigator.clipboard.writeText(this.timestamp());
        },

        lmTS() {
            let prev = "";

            if (this.firstFibro === "yes") {
                prev = "no prev fibro.";
            } else {
                prev =
                    "prev fibro " +
                    this.prevFibroAppt.toLocaleString({
                        day: "numeric",
                        month: "numeric",
                        year: "2-digit",
                    }) +
                    ", sched on/after " +
                    this.earliestFibroDate() +
                    ". ";
            }

            let fu = "";

            if (this.schedFu === "yes") {
                fu = "Needs f/u.";
            } else if (this.schedFu === "noTBD") {
                fu = "No f/u needed.";
            } else if (this.schedFu === "noHas" && this.preFuApptInput) {
                fu =
                    "Has f/u for " +
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

            return "l/m, " + " Dx: " + this.reason + ". " + prev + " " + fu;
        },

        copyLmTS() {
            navigator.clipboard.writeText(this.lmTS());
        },

        apptNotes() {
            let date = DateTime.local()
                .setZone("America/Los_Angeles")
                .toLocaleString({ month: "numeric", day: "numeric" });

            return date + " appt made, aware fasting, water ok, emailed conf ";
        },

        copyApptNotes() {
            navigator.clipboard.writeText(this.apptNotes());
        },

        apptReason() {
            if (this.checkPre() === 0 && this.checkDuring() === 0) {
                let fu = "";

                if (this.schedFu === "noTBD") {
                    fu = ", no f/u";
                } else {
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

                return this.reason + ". Dr " + this.physician + fu;
            }
        },

        copyApptReason() {
            navigator.clipboard.writeText(this.apptReason());
        },
    };
};
