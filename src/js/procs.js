import { DateTime } from "luxon";

window.procs = function () {
    return {
        // reference values
        procs: [
            { id: 1, short: "EGD", long: "endoscopy", selected: false },
            { id: 2, short: "colo", long: "colonoscopy", selected: false },
        ],

        preps: [
            {
                name: "ez2go",
                generic: "PEG 3350 / bisacodyl / magnesium citrate",
            },
            {
                name: "Suprep",
                generic:
                    "sodium sulfate / potassium sulfate / magnesium sulfate",
            },
            {
                name: "Clenpiq",
                generic: "sodium picosulfate / magnesium oxide / citric acid",
            },
            {
                name: "Sutab",
                generic:
                    "sodium sulfate / magnesium sulfate / potassium chloride",
            },
            {
                name: "Golytely",
                generic: "PEG 3350 / electrolytes",
            },
            // {
            //     name: "Plenvu",
            //     generic: "PEG 3350 / electrolytes",
            // },
        ],

        facilities: [
            {
                id: 1,
                short: "MOSCL",
                long: "MemorialCare Outpatient Surgical Center Long Beach",
                address: "3833 Worsham Ave, Ste. 200, Long Beach, CA 90808",
                hourOffset: 1,
                minOffset: 0,
                phone: "562-426-2606",
            },
            {
                id: 2,
                short: "PRIME",
                long: "Prime Surgical Center of Newport Beach",
                address: "351 Hospital Rd, Ste. 110, Newport Beach, CA 92663",
                quote: "",
                hourOffset: 1,
                minOffset: 15,
                phone: "949-335-4966",
            },
            {
                id: 3,
                short: "LAMC",
                long: "UCI Health - Los Alamitos",
                address: "3751 Katella Ave, Los Alamitos, CA 90720",
                checkin:
                    "Please report to Patient Registration in the main lobby.",
                hourOffset: 1,
                minOffset: 15,
                // phone: "562-598-1311",
            },
            {
                id: 4,
                short: "LBMMC",
                long: "Long Beach Medical Center",
                address: "2801 Atlantic Ave, Long Beach, CA 90806",
                checkin: "Please report to the main lobby desk.",
                hourOffset: 1,
                minOffset: 0,
                // phone: "562-933-2000",
            },
        ],

        presetInst: [
            {
                id: 1,
                short: "Labs",
                description: "Pre-proc labs",
                body: "Have labs done at least 2 weeks prior to your procedure. Please call us 1 week after for results.",
            },
            {
                id: 2,
                short: "BP",
                description: "Blood pressure meds",
                body: "Take all of your blood pressure medications as normal prior to your procedure.",
            },
            {
                id: 3,
                short: "Dulc",
                description: "Dulcolax",
                body: "Take Dulcolax 5mg 2 tablets the 3rd and 2nd nights prior to your procedure.",
            },
            {
                id: 4,
                short: "Meto",
                description: "Metoclopramide",
                body: "Take Metoclopramide 10mg 1 tablet 30 minutes before each prep administration.",
            },
        ],

        mosclCovid: [
            "Patient needs to notify our office in event of Covid infection prior to procedure. Will need to reschedule procedure to at least 4 weeks after Covid resolved.",
            "Please notify our office if you get Covid prior to the procedure, as your procedure may need to be rescheduled.",
        ],
        emailSubjectTemplate: "{upperProcs}: Instructions and Consent Form",

        emailBodyTemplate: [
            "{greeting}",
            "",
            "Your {joinProcs} is scheduled for {procApptDate} at {procApptTime} at {selectedFacility.long} - {selectedFacility.address}. Please arrive by {procApptArrival}.",
            "",
            "Attached are the consent form and instructions for your prep. Please sign and bring the consent form to your procedure.",
            "{mosclPacket}",
            "{mosclCovid}",
            "",
            "{ez2goKit}",
            "{rxPrep}",
            "",
            "{primeOON}",
            "",
            "You will need someone who can be responsible for you to pick you up from the procedure center.",
            "{primeRide}",
            "",
            "{fu}",
            "",
            "Please give the attached instructions a thorough read at least 1 week prior to your procedure. Please contact us if you have any questions.",
            "",
            "Best regards,",
            "{staffName}",
            "Comprehensive GI Care",
        ],

        emailSnippets: {
            mosclPacket:
                "Also attached are instructions to register at MemorialCare Outpatient Surgical Center Long Beach. You can complete the included questionnaire and bring it to your procedure, or you can wait for the facility to text you a link to complete the questionnaire online.",
            ez2goKit:
                "For your ez2go prep, you can purchase the ingredients over the counter at your local pharmacy [238g PEG 3350 (Miralax) powder, 4 5mg Bisacodyl tablets, 1 bottle Magnesium citrate]. Or, you can pick up our pre-packaged kit for $25 at our office (4772 Katella Ave, Ste. 200, Los Alamitos, CA 90720).",
            rxPrep: "A prescription for {prep} has been sent to your pharmacy. Please let us know if you have issues filling the prescription.",
            primeOON:
                "Please note that Prime Surgical Center is out-of-network with your insurance. Your quoted out-of-pocket amount is ${quote}, which includes the facility and anesthesia fees. Prime will not send you a bill to collect more than your quoted amount, regardless of the amount your insurance is willing to pay. Note that this quote DOES NOT include our physician fees or potential lab/pathologist fees if biopsies are taken. Our physicians are in network with your insurance, and the lab/pathologist we use are in-network with most insurances. You may have an out-of-pocket cost for these services based on your in-network benefits. Please see the attached pamphlet for more details on Prime's billing policies.",
            primeRide:
                "Prime Surgical Center does offer a ride service at no additional cost. The number to call to arrange transport is (818) 937-9969. You can find more details in the attached pamphlet.",
            fu: "Your post-procedure follow up is scheduled for {fuApptDate} at {fuApptTime}.",
        },

        // JS logic

        // procs
        get selectedProcs() {
            return this.procs.filter((proc) => proc.selected);
        },

        joinProcs() {
            return this.selectedProcs.map((proc) => proc.long).join(" and ");
        },

        upperProcs() {
            return this.selectedProcs
                .map(
                    (proc) =>
                        proc.long[0].toUpperCase() + proc.long.substring(1),
                )
                .join(" & ");
        },

        // sedation
        sedationTBD: false,
        sedation: "",
        sedationFinal: "",

        selectedSedation() {
            if (this.sedationTBD) {
                return this.sedationFinal;
            } else {
                return this.sedation;
            }
        },

        // colon preps
        prep: "",
        prepSent: "",

        get prepGeneric() {
            return this.preps.find((prep) => prep.name === this.prep).generic;
        },

        // facilities
        facilityTBD: false,
        facilityIndex: "",
        facilityIndexFinal: "",

        get selectedFacility() {
            if (this.facilityIndex || this.facilityIndexFinal) {
                if (this.facilityTBD) {
                    return this.facilities[this.facilityIndexFinal];
                } else {
                    return this.facilities[this.facilityIndex];
                }
            } else {
                return {};
            }
        },

        // for 'addtional instructions' main textarea to grow with text
        autoExpandMain() {
            this.$refs.textarea.style.height = "auto";
            this.$refs.textarea.style.height =
                this.$refs.textarea.scrollHeight + "px";
        },

        // for 'additional instructions' edit textareas to grow with text
        autoExpandEdit() {
            this.$refs.textareas.style.height = "auto";
            this.$refs.textareas.style.height =
                this.$refs.textareas.scrollHeight + "px";
        },

        // addtional instructions
        noInst: false,
        instructions: [],
        newInst: "",
        editingInst: null,

        setPreset(preset) {
            this.newInst = preset;
        },

        addInst() {
            if (this.newInst.trim() === "") {
                this.newInst = "";
            } else {
                this.instructions.push({
                    id: Date.now(),
                    body: this.newInst.trim(),
                });
                this.newInst = "";

                this.warnPreInst();
            }
        },

        editInst(inst) {
            inst.cachedBody = inst.body;
            this.editingInst = inst;
        },

        cancelEditInst(inst) {
            inst.body = inst.cachedBody;
            this.editingInst = null;
            delete inst.cachedBody;
        },

        editedInst(inst) {
            if (inst.body.trim() === "") {
                return this.deleteInst(inst);
            }
            this.editingInst = null;
        },

        deleteInst(inst) {
            let position = this.instructions.indexOf(inst);
            this.instructions.splice(position, 1);
            this.warnPreInst();
        },

        // check pre-call inputs are complete
        checkPre() {
            let incomplete = 0;

            if (!this.selectedProcs.length) {
                incomplete++;
            }

            if (this.sedation === "" && !this.sedationTBD) {
                incomplete++;
            }

            if (this.procs[1].selected) {
                if (this.prep === "") {
                    incomplete++;
                } else if (this.prep !== "ez2go" && this.prepSent === "") {
                    incomplete++;
                }
            }

            if (this.facilityIndex === "" && !this.facilityTBD) {
                incomplete++;
            }

            if (
                (this.facilityIndex === "1" || this.facilityTBD) &&
                this.facilities[1].quote === ""
            ) {
                incomplete++;
            }

            if (!this.instructions.length && !this.noInst) {
                incomplete++;
            }

            if (this.schedFu === "") {
                incomplete++;
            }

            return incomplete;
        },

        red: "#dc2626",

        warnPreProc() {
            if (!this.selectedProcs.length) {
                this.$refs.preProc.style.color = this.red;
            } else {
                this.$refs.preProc.style.color = "black";
            }
        },

        warnPreSed() {
            if (this.sedation === "" && !this.sedationTBD) {
                this.$refs.preSed.style.color = this.red;
            } else {
                this.$refs.preSed.style.color = "black";
            }
        },

        warnPrePrep() {
            if (this.prep === "") {
                this.$refs.prePrep.style.color = this.red;
            } else {
                this.$refs.prePrep.style.color = "black";
            }
        },

        warnPrePrepSent() {
            if (this.prepSent === "") {
                this.$refs.prePrepSent.style.color = this.red;
            } else if (this.prepSent === "yes") {
                this.$refs.prePrepSent.style.color = "black";
            }
        },

        warnPreFacility() {
            if (this.facilityIndex === "" && !this.facilityTBD) {
                this.$refs.preFacility.style.color = this.red;
            } else {
                this.$refs.preFacility.style.color = "black";
            }
        },

        warnPreQuote() {
            if (this.facilities[1].quote === "") {
                this.$refs.preQuote.style.color = this.red;
            } else {
                this.$refs.preQuote.style.color = "black";
            }
        },

        warnPreInst() {
            if (!this.instructions.length && !this.noInst) {
                this.$refs.preInst.style.color = this.red;
            } else {
                this.$refs.preInst.style.color = "black";
            }
        },

        warnPreFu() {
            if (this.schedFu === "") {
                this.$refs.preFu.style.color = this.red;
            } else {
                this.$refs.preFu.style.color = "black";
            }
        },

        leftMsg: false,

        // procedure date, proc appt
        procApptInput: null,

        procApptMin() {
            // return DateTime.now().setZone("America/Los_Angeles").startOf("day");
            return DateTime.local()
                .setZone("America/Los_Angeles")
                .startOf("day")
                .toISO()
                .substr(0, 16);
        },

        get procAppt() {
            return DateTime.fromISO(this.procApptInput, {
                locale: "en-US",
                zone: "America/Los_Angeles",
            });
        },

        numDaysOut() {
            let procDay = this.procAppt.startOf("day");
            let today = DateTime.local()
                .setZone("America/Los_Angeles")
                .startOf("day");

            return procDay.diff(today, "days").toObject().days;
        },

        procApptDateNumShort() {
            return this.procAppt.toLocaleString({
                day: "numeric",
                month: "numeric",
                year: "2-digit",
            });
        },

        procApptDate() {
            return this.procAppt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        },

        procApptTime() {
            return this.procAppt.toLocaleString(DateTime.TIME_SIMPLE);
        },

        procApptArrival() {
            if (this.selectedFacility) {
                return this.procAppt
                    .minus({
                        hours: this.selectedFacility.hourOffset,
                        minutes: this.selectedFacility.minOffset,
                    })
                    .toLocaleString(DateTime.TIME_SIMPLE);
            }
        },

        procApptPickup() {
            if (this.selectedFacility) {
                return this.procAppt
                    .minus({
                        hours: this.selectedFacility.hourOffset,
                        minutes: this.selectedFacility.minOffset,
                    })
                    .plus({ hours: 3 })
                    .toLocaleString(DateTime.TIME_SIMPLE);
            }
        },

        daysBeforeProc(d) {
            return this.procAppt
                .minus({ days: d })
                .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        },

        isMorningProc() {
            let hour = this.procAppt.hour;
            let x = false;

            if (hour < 11) {
                x = true;
            }

            return x;
        },

        // used in EGD instructions only
        isAfternoonProc() {
            let hour = this.procAppt.hour;
            let x = false;

            if (hour >= 12) {
                x = true;
            }

            return x;
        },

        // for ez2go
        proc2ndDoseTime() {
            return this.procAppt
                .minus({
                    hours: this.selectedFacility.hourOffset,
                    minutes: this.selectedFacility.minOffset,
                })
                .minus({ hours: 6 })
                .toLocaleString(DateTime.TIME_SIMPLE);
        },

        hoursBeforeProc(h, m = 0) {
            return this.procAppt
                .minus({
                    hours: h,
                    minutes: m,
                })
                .toLocaleString(DateTime.TIME_SIMPLE);
        },

        // follow up
        schedFu: "",

        fuTBD() {
            if (this.schedFu === "no") {
                return true;
            } else if (this.schedFu === "yes") {
                return false;
            }
        },

        fuApptInput: null,

        fuApptMin() {
            if (this.procApptInput) {
                return this.procAppt.startOf("day").toISO().substr(0, 16);
            }
        },

        fuApptRec() {
            return this.procAppt
                .plus({ weeks: 3 })
                .toLocaleString(DateTime.DATE_SHORT);
        },

        get fuAppt() {
            return DateTime.fromISO(this.fuApptInput, {
                locale: "en-US",
                zone: "America/Los_Angeles",
            });
        },

        fuApptDateNumShort() {
            return this.fuAppt.toLocaleString({
                day: "numeric",
                month: "numeric",
                year: "2-digit",
            });
        },

        fuApptDate() {
            return this.fuAppt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        },

        fuApptTime() {
            return this.fuAppt.toLocaleString(DateTime.TIME_SIMPLE);
        },

        // send inst method
        sendInstMethod: "",

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

        sendInstMessage() {
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

        // check appointment times

        warnTime(x) {
            let hour = x.hour;
            let min = x.minute;

            if (hour < 7 || hour > 16) {
                return true;
            }

            if (min % 15 !== 0) {
                return true;
            }

            return false;
        },

        overrideProcTime: false,
        overrideFuTime: false,

        // checks during call, for the red number
        checkDuring() {
            let incomplete = 0;

            if (this.facilityTBD && this.facilityIndexFinal === "") {
                incomplete++;
            }

            if (this.sedationTBD && this.sedationFinal === "") {
                incomplete++;
            }

            if (!this.procApptInput) {
                incomplete++;
            }

            if (
                this.procApptInput &&
                this.warnTime(this.procAppt) &&
                this.overrideProcTime === false
            ) {
                incomplete++;
            }

            if (!this.fuApptInput && !this.fuTBD()) {
                incomplete++;
            }

            if (
                this.fuApptInput &&
                this.warnTime(this.fuAppt) &&
                this.overrideFuTime === false
            ) {
                incomplete++;
            }

            if (this.sendInstMethod === "") {
                incomplete++;
            }

            return incomplete;
        },

        // warnings for each subsection in call section, for highlighting h3's in red
        warnCallFacility() {
            if (this.facilityTBD && this.facilityIndexFinal === "") {
                this.$refs.callFacility.style.color = this.red;
            } else {
                this.$refs.callFacility.style.color = "black";
            }
        },

        warnCallSed() {
            if (this.sedationTBD && this.sedationFinal === "") {
                this.$refs.callSed.style.color = this.red;
            } else {
                this.$refs.callSed.style.color = "black";
            }
        },

        warnCallProcAppt() {
            if (!this.procApptInput) {
                this.$refs.callProcAppt.style.color = this.red;
            } else {
                this.$refs.callProcAppt.style.color = "black";
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

        // output

        rxFinal: "",

        emailSubject() {
            return this.emailSubjectTemplate.replace(
                "{upperProcs}",
                this.upperProcs(),
            );
        },

        copyEmailSubject() {
            navigator.clipboard.writeText(this.emailSubject());
        },

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
            if (this.selectedFacility.short === "MOSCL") {
                // requires i to be second argument in order to be used as index,
                // even though item is unused
                x = x
                    .filter((item, i) => x[i - 1] !== "{primeOON}")
                    .filter((item) => item !== "{primeOON}")
                    .filter((item) => item !== "{primeRide}");

                if (!this.procs[0].selected) {
                    x = x.filter((item) => item !== "{mosclCovid}");
                }
            } else if (this.selectedFacility.short === "PRIME") {
                x = x
                    .filter((item) => item !== "{mosclPacket}")
                    .filter((item) => item !== "{mosclCovid}");
            } else {
                x = x
                    .filter((item, i) => x[i - 1] !== "{primeOON}")
                    .filter((item) => item !== "{primeOON}")
                    .filter((item) => item !== "{primeRide}")
                    .filter((item) => item !== "{mosclPacket}")
                    .filter((item) => item !== "{mosclCovid}");
            }

            if (this.prep === "") {
                x = x
                    .filter((item, i) => x[i - 1] !== "{rxPrep}")
                    .filter((item) => item !== "{ez2goKit}")
                    .filter((item) => item !== "{rxPrep}");
            } else if (this.prep === "ez2go") {
                x = x.filter((item) => item !== "{rxPrep}");
            } else {
                x = x.filter((item) => item !== "{ez2goKit}");
            }

            if (this.fuTBD()) {
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

        packetCoverJoin() {
            // return this.emailBodyArray()
            //     .splice(this.emailBodyArray().length - 2, 1)
            //     .splice(0, 1)
            //     .join("<br />");
            let initial = this.emailBodyArray();
            let length = initial.length;
            initial.splice(length - 2, 1);
            initial.splice(0, 1);
            return initial.join("<br />");
        },

        // string input, replaces keywords
        emailBodyReplace(join) {
            return join
                .replace("{greeting}", this.greeting())
                .replace("{joinProcs}", this.joinProcs())
                .replace("{procApptDate}", this.procApptDate())
                .replace("{procApptTime}", this.procApptTime())
                .replace("{selectedFacility.long}", this.selectedFacility.long)
                .replace(
                    "{selectedFacility.address}",
                    this.selectedFacility.address,
                )
                .replace("{procApptArrival}", this.procApptArrival())
                .replace("{mosclPacket}", this.emailSnippets.mosclPacket)
                .replace("{mosclCovid}", this.mosclCovid[1])
                .replace("{ez2goKit}", this.emailSnippets.ez2goKit)
                .replace("{rxPrep}", this.emailSnippets.rxPrep)
                .replace("{prep}", this.prep)
                .replace("{primeOON}", this.emailSnippets.primeOON)
                .replace("{quote}", this.facilities[1].quote)
                .replace("{primeRide}", this.emailSnippets.primeRide)
                .replace("{fu}", this.emailSnippets.fu)
                .replace("{fuApptDate}", this.fuApptDate())
                .replace("{fuApptTime}", this.fuApptTime())
                .replace("{staffName}", this.staffName);
        },

        emailBodyHtml() {
            return this.emailBodyReplace(this.emailBodyHtmlJoin());
        },

        packetCoverHtml() {
            return this.emailBodyReplace(this.packetCoverJoin());
        },

        emailBodyClip() {
            return this.emailBodyReplace(this.emailBodyClipJoin());
        },

        copyEmailBody() {
            navigator.clipboard.writeText(this.emailBodyClip());
        },

        // timestamps
        DOS() {
            return "DOS " + this.procApptDateNumShort();
        },

        copyDOS() {
            navigator.clipboard.writeText(this.DOS());
        },

        procTS() {
            let DOS = ", DOS " + this.procApptDateNumShort();

            if (this.procs[1].selected) {
                return (
                    this.selectedProcs.map((proc) => proc.short).join("/") +
                    " " +
                    this.prep.toLowerCase() +
                    " " +
                    this.selectedSedation().substring(0, 3) +
                    " " +
                    this.selectedFacility.short +
                    DOS +
                    " " +
                    this.procApptTime() +
                    ". "
                );
            } else {
                return (
                    this.selectedProcs.map((proc) => proc.short).join("/") +
                    " " +
                    this.selectedSedation().substring(0, 3) +
                    " " +
                    this.selectedFacility.short +
                    DOS +
                    " " +
                    this.procApptTime() +
                    ". "
                );
            }
        },

        fuTS() {
            if (!this.fuTBD()) {
                return "f/u sched for " + this.fuApptDateNumShort() + ". ";
            } else {
                return "f/u TBD. ";
            }
        },

        actionTS() {
            if (this.sendInstMethod === "email") {
                return this.sendInstAction[0];
            } else if (this.sendInstMethod === "portal") {
                return this.sendInstAction[1];
            } else if (this.sendInstMethod === "pickup") {
                return this.sendInstAction[2];
            } else if (this.sendInstMethod === "mail") {
                return this.sendInstAction[3];
            }
        },

        timestamp() {
            let rx = "";

            if (this.rxFinal === "sent") {
                rx = " " + this.prep + " sent.";
            } else if (this.rxFinal === "forward") {
                rx = " Please send " + this.prep + ".";
            }

            let addInst = this.instructions.map((inst) => inst.body).join(" ");

            if (this.instructions.length && !this.noInst) {
                return (
                    this.procTS() +
                    this.fuTS() +
                    this.actionTS() +
                    rx +
                    " " +
                    addInst
                );
            } else {
                return this.procTS() + this.fuTS() + this.actionTS() + rx;
            }
        },

        copyTimestamp() {
            navigator.clipboard.writeText(this.timestamp());
        },

        lmTS() {
            let rx = "";

            if (this.rxFinal === "sent") {
                rx = this.prep + " sent.";
            } else if (this.rxFinal === "forward") {
                rx = "Need to send " + this.prep + ".";
            }

            let addInst = this.instructions.map((inst) => inst.body).join(" ");

            if (this.procs[1].selected) {
                return (
                    "l/m. " +
                    this.selectedProcs.map((proc) => proc.short).join("/") +
                    " " +
                    this.prep.toLowerCase() +
                    " " +
                    (this.sedationTBD
                        ? "(MAC or twi)"
                        : this.selectedSedation().substring(0, 3)) +
                    " " +
                    (this.facilityTBD
                        ? "(MOSCL or PRIME-$" + this.facilities[1].quote + ")"
                        : this.selectedFacility.short) +
                    (this.facilityIndex === "1" && !this.facilityTBD
                        ? "-$" + this.facilities[1].quote
                        : "") +
                    ". " +
                    (this.fuTBD() ? "f/u TBD." : "Needs f/u.") +
                    " " +
                    rx +
                    " " +
                    addInst
                );
            } else {
                return (
                    "l/m. " +
                    this.selectedProcs.map((proc) => proc.short).join("/") +
                    " " +
                    (this.sedationTBD
                        ? "(MAC or twi)"
                        : this.selectedSedation().substring(0, 3)) +
                    " " +
                    (this.facilityTBD
                        ? "(MOSCL or PRIME-$" + this.facilities[1].quote + ")"
                        : this.selectedFacility.short) +
                    (this.facilityIndex === "1" && !this.facilityTBD
                        ? "-$" + this.facilities[1].quote
                        : "") +
                    ". " +
                    (this.fuTBD() ? "f/u TBD." : "Needs f/u.") +
                    " " +
                    rx +
                    " " +
                    addInst
                );
            }
        },

        copyLmTS() {
            navigator.clipboard.writeText(this.lmTS());
        },

        apptNotes() {
            let date = DateTime.local()
                .setZone("America/Los_Angeles")
                .toLocaleString({ month: "numeric", day: "numeric" });

            if (this.procs[1].selected) {
                return date + " appt made, " + this.prep.toLowerCase() + " ";
            } else {
                return date + " appt made ";
            }
        },

        copyApptNotes() {
            navigator.clipboard.writeText(this.apptNotes());
        },

        // messages for add-on procs
        addOnCount() {
            let count = 0;

            if (this.numDaysOut() < 7) {
                count++;
            }

            if (this.numDaysOut() < 14) {
                count++;
            }

            if (
                this.numDaysOut() < 14 &&
                this.selectedFacility.short === "PRIME"
            ) {
                count++;
            }
        },
    };
};
