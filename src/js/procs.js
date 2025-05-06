import { DateTime } from "luxon";

window.procs = function () {
    return {
        // reference values
        procs: [
            { id: 1, short: "EGD", long: "endoscopy", selected: false },
            { id: 2, short: "colo", long: "colonoscopy", selected: false },
            {
                id: 3,
                short: "flex sig",
                long: "flexible sigmoidoscopy",
                selected: false,
            },
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
        ],

        facilities: [
            {
                id: 1,
                short: "MOSCL",
                long: "MemorialCare Outpatient Surgical Center Long Beach",
                address: "3833 Worsham Ave, Ste. 200, Long Beach, CA 90808",
                hourOffset: 1,
                minOffset: 0,
                phone: "(562) 426-2606",
            },
            {
                id: 2,
                short: "PRIME",
                long: "Prime Surgical Center of Newport Beach",
                address: "351 Hospital Rd, Ste. 110, Newport Beach, CA 92663",
                quote: "",
                INN: false,
                hourOffset: 1,
                minOffset: 15,
                phone: "(949) 335-4966",
            },
            {
                id: 3,
                short: "LAMC",
                long: "UCI Health - Los Alamitos (Los Alamitos Medical Center)",
                address: "3751 Katella Ave, Los Alamitos, CA 90720",
                checkin:
                    "Please report to Patient Registration in the main lobby.",
                hourOffset: 1,
                minOffset: 15,
                phone: "(562) 598-1311",
            },
            {
                id: 4,
                short: "LBMMC",
                long: "Long Beach Medical Center",
                address: "456 E Columbia St, Long Beach, CA 90806",
                checkin: "Please report to the Outpatient Surgical Pavillion.",
                hourOffset: 1,
                minOffset: 0,
                phone: "(562) 933-0235",
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
            "Your {joinProcs} is scheduled for {procApptDate}. Please arrive by {procApptArrival} at {selectedFacility.long} - {selectedFacility.address}.",
            "",
            "Please find attached the consent form and instructions for your prep. Please sign and send the consent form to us via email at cgicare@cgicare.hush.com or bring it to your procedure.",
            "{mosclPacket}",
            "{mosclCovid}",
            "",
            "{ez2goKit}",
            "{rxPrep}",
            "",
            "{prime}",
            "",
            "You will need someone who can be responsible for you to pick you up from the procedure center.",
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
                "For your ez2go prep, you can purchase the ingredients over the counter at your local pharmacy [238g PEG 3350 (Miralax) powder, 4 5mg Bisacodyl tablets, 1 bottle Magnesium citrate]. Or, you can pick up our pre-packaged kit for $25 at our office (4772 Katella Ave, Ste. 200, Los Alamitos, CA 90720). In addition, you will need two 28-32 oz bottles of Gatorade (or any other electrolyte solution). This cannot be red, orange, or purple.",
            rxPrep: "A prescription for {prep} has been sent to your pharmacy. Please let us know if you have issues filling the prescription.",
            primeOON:
                "Please note that Prime Surgical Center is out-of-network with your insurance. Your quoted out-of-pocket amount is ${quote}, which includes the facility and anesthesia fees. Prime will not send you a bill to collect more than your quoted amount, regardless of the amount your insurance is willing to pay. Note that this quote DOES NOT include our physician fees or potential lab/pathologist fees if biopsies are taken. Our physicians are in network with your insurance, and the lab/pathologist we use are in-network with most insurances. You may have an out-of-pocket cost for these services based on your in-network benefits.",
            primeINN:
                "Your quoted out-of-pocket amount is ${quote}, which includes the Prime Surgical Center facility and anesthesia fees. Prime will not send you a bill to collect more than your quoted amount. Note that this quote DOES NOT include our physician fees or potential lab/pathologist fees if biopsies are taken. You may have an out-of-pocket cost for these services based on your in-network benefits.",
            fu: "Your post-procedure follow up is scheduled for {fuApptDate} at {fuApptTime}.",
        },

        prepTiming: [
            {
                physician: "H",
                first: "6:00 PM",
                firstType: "time",
                secondEarly: "10:00 PM",
                secondEarlyType: "time",
                secondLate: 6,
                secondLateType: "hour",
            },
            {
                physician: "T",
                first: "3:00 to 5:00 PM",
                firstType: "time",
                secondEarly: 6, // used to be "6:00 to 8:00 PM (no sooner than 3 hours after 1st dose)"
                secondEarlyType: "hour", // used to be "time"
                secondLate: 6,
                secondLateType: "hour",
            },
            {
                physician: "M",
                first: "3:00 to 5:00 PM",
                firstType: "time",
                secondEarly: 6,
                secondEarlyType: "hour",
                secondLate: 6,
                secondLateType: "hour",
            },
        ],

        printModal: false,

        printConsent: true,
        printCover: true,
        printPrep: true,
        printDiet: true,

        // JS logic

        // procs
        get selectedProcs() {
            return this.procs.filter((proc) => proc.selected);
        },

        get joinProcs() {
            return this.selectedProcs.map((proc) => proc.long).join(" and ");
        },

        // capitalize the first letter of each word of procedure's long name
        get upperProcs() {
            return this.selectedProcs
                .map((proc) =>
                    proc.long.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
                )
                .join(" & ");
        },

        // sedation
        sedationTBD: false,
        sedation: "",
        sedationFinal: "",

        get selectedSedation() {
            return this.sedationTBD ? this.sedationFinal : this.sedation;
        },

        // colon preps
        prep: "",
        prepSent: "", // "yes" or "no"

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
                return false;
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

        schedFu: "",

        // H, T, M
        physicianMain: "",
        physicianModal: "",

        get physician() {
            if (this.physicianMain) {
                return this.physicianMain;
            }
            if (this.physicianModal) {
                return this.physicianModal;
            }
        },

        // Check pre-call inputs are complete
        red: "#dc2626",

        setWarningColor(ref, condition) {
            if (this.$refs[ref]) {
                this.$refs[ref].style.color = condition ? this.red : "black";
            }
        },

        getPreWarnings() {
            return {
                preProc:
                    !this.selectedProcs.length ||
                    (this.procs[1].selected && this.procs[2].selected),
                preSed: this.sedation === "" && !this.sedationTBD,
                prePrep: this.procs[1].selected && this.prep === "",
                prePrepSent:
                    this.procs[1].selected &&
                    this.prep !== "ez2go" &&
                    this.prepSent === "",
                preFacility: this.facilityIndex === "" && !this.facilityTBD,
                preQuote:
                    this.facilityIndex === "1" &&
                    this.facilities[1].quote === "",
                preInst: !this.instructions.length && !this.noInst,
                preFu: this.schedFu === "",
                prePhysician:
                    this.physicianMain === "" ||
                    (this.facilityIndex === "1" && this.physicianMain !== "T"),
            };
        },

        checkPre() {
            const warnings = this.getPreWarnings();
            return Object.values(warnings).filter(Boolean).length;
        },

        warnAllPreFields() {
            const warnings = this.getPreWarnings();
            Object.entries(warnings).forEach(([ref, condition]) =>
                this.setWarningColor(ref, condition),
            );
        },

        warnPreProc() {
            this.setWarningColor("preProc", this.getPreWarnings().preProc);
        },

        warnPreSed() {
            this.setWarningColor("preSed", this.getPreWarnings().preSed);
        },

        warnPrePrep() {
            this.setWarningColor("prePrep", this.getPreWarnings().prePrep);
        },

        warnPrePrepSent() {
            this.setWarningColor(
                "prePrepSent",
                this.getPreWarnings().prePrepSent,
            );
        },

        warnPreFacility() {
            this.setWarningColor(
                "preFacility",
                this.getPreWarnings().preFacility,
            );
        },

        warnPreQuote() {
            this.setWarningColor("preQuote", this.getPreWarnings().preQuote);
        },

        warnPreInst() {
            this.setWarningColor("preInst", this.getPreWarnings().preInst);
        },

        warnPreFu() {
            this.setWarningColor("preFu", this.getPreWarnings().preFu);
        },

        warnPrePhysician() {
            this.setWarningColor(
                "prePhysician",
                this.getPreWarnings().prePhysician,
            );
        },

        leftMsg: false,

        // procedure date, proc appt
        procApptInput: null,

        get procApptMin() {
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

        get numDaysOut() {
            let procDay = this.procAppt.startOf("day");
            let today = DateTime.local()
                .setZone("America/Los_Angeles")
                .startOf("day");

            return procDay.diff(today, "days").toObject().days;
        },

        get procApptDateNumShort() {
            return this.procAppt.toLocaleString({
                day: "numeric",
                month: "numeric",
                year: "2-digit",
            });
        },

        get procApptDate() {
            return this.procAppt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        },

        get procApptTime() {
            return this.procAppt.toLocaleString(DateTime.TIME_SIMPLE);
        },

        get procApptArrival() {
            if (this.selectedFacility) {
                return this.procAppt
                    .minus({
                        hours: this.selectedFacility.hourOffset,
                        minutes: this.selectedFacility.minOffset,
                    })
                    .toLocaleString(DateTime.TIME_SIMPLE);
            }
        },

        get procApptPickup() {
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

        get isEarlyProc() {
            return this.procAppt.hour < 11 ? true : false;
        },

        // used in EGD instructions only
        // TODO add to flex sig
        get isAfternoonProc() {
            return this.procAppt.hour >= 12 ? true : false;
        },

        hoursBeforeProc(h, m = 0) {
            return this.procAppt
                .minus({
                    hours: h,
                    minutes: m,
                })
                .toLocaleString(DateTime.TIME_SIMPLE);
        },

        prepTimeFormat(what, type) {
            if (type === "time") {
                return what.includes("to") ? "between " + what : "at " + what;
            }

            if (type === "hour") {
                if (this.printModal) {
                    return (
                        what + " hours prior to the arrival time (___________)"
                    );
                } else {
                    return (
                        "at " +
                        this.hoursBeforeProc(
                            what + this.selectedFacility.hourOffset,
                            this.selectedFacility.minOffset,
                        )
                    );
                }
            }
        },

        prepTime(dose) {
            let a = this.prepTiming.find((x) => x.physician === this.physician);

            if (dose === 1) {
                return this.prepTimeFormat(a.first, a.firstType);
            }

            if (dose === 2) {
                if (this.isEarlyProc) {
                    return this.prepTimeFormat(
                        a.secondEarly,
                        a.secondEarlyType,
                    );
                } else {
                    return this.prepTimeFormat(a.secondLate, a.secondLateType);
                }
            }

            return;
        },

        isSecondPrepTimeConstant() {
            let a = this.prepTiming.find((x) => x.physician === this.physician);

            return a.secondEarly === a.secondLate &&
                a.secondEarlyType === a.secondLateType
                ? true
                : false;
        },

        secondPrepModal(time) {
            let a = this.prepTiming.find((x) => x.physician === this.physician);

            if (time === "early") {
                return this.prepTimeFormat(a.secondEarly, a.secondEarlyType);
            }

            if (time === "late") {
                return this.prepTimeFormat(a.secondLate, a.secondLateType);
            }

            return;
        },

        // follow up

        get fuTBD() {
            if (this.schedFu === "no") {
                return true;
            } else if (this.schedFu === "yes") {
                return false;
            }
        },

        fuApptInput: null,

        get fuApptMin() {
            if (this.procApptInput) {
                return this.procAppt.startOf("day").toISO().substr(0, 16);
            }
        },

        get fuApptRec() {
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

        get fuApptDateNumShort() {
            return this.fuAppt.toLocaleString({
                day: "numeric",
                month: "numeric",
                year: "2-digit",
            });
        },

        get fuApptDate() {
            return this.fuAppt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        },

        get fuApptTime() {
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

        // check appointment times

        warnTime(appt) {
            return appt.hour < 7 || appt.hour > 16 || appt.minute % 15 !== 0
                ? true
                : false;
        },

        overrideProcTime: false,
        overrideFuTime: false,

        // checks during call, for the red number
        getDuringWarnings() {
            return {
                callFacility:
                    this.facilityTBD && this.facilityIndexFinal === "",
                callSed: this.sedationTBD && this.sedationFinal === "",
                callProcAppt: !this.procApptInput,
                callFuAppt: !this.fuTBD && !this.fuApptInput,
                callSendInst: this.sendInstMethod === "",
            };
        },

        checkDuring() {
            const warnings = this.getDuringWarnings();
            return Object.values(warnings).filter(Boolean).length;
        },

        // warnings for each subsection in call section, for highlighting h3's in red
        warnCallFacility() {
            this.setWarningColor(
                "callFacility",
                this.getDuringWarnings().callFacility,
            );
        },

        warnCallSed() {
            this.setWarningColor("callSed", this.getDuringWarnings().callSed);
        },

        warnCallProcAppt() {
            this.setWarningColor(
                "callProcAppt",
                this.getDuringWarnings().callProcAppt,
            );
        },

        warnCallFuAppt() {
            this.setWarningColor(
                "callFuAppt",
                this.getDuringWarnings().callFuAppt,
            );
        },

        warnCallSendInst() {
            this.setWarningColor(
                "callSendInst",
                this.getDuringWarnings().callSendInst,
            );
        },

        // reset form
        resetWarnings(refs) {
            refs.forEach((ref) => {
                if (this.$refs[ref]) {
                    this.$refs[ref].style.color = "black";
                }
            });
        },

        resetForm() {
            this.procs.forEach((proc) => (proc.selected = false));

            this.sedationTBD = false;
            this.sedation = "";
            this.sedationFinal = "";

            this.prep = "";
            this.prepSent = "";

            this.facilityTBD = false;
            this.facilityIndex = "";
            this.facilityIndexFinal = "";

            this.noInst = false;
            this.instructions = [];
            this.newInst = "";
            this.editingInst = null;

            this.schedFu = "";

            this.physicianMain = "";
            this.physicianModal = "";

            this.resetWarnings([
                "preProc",
                "preSed",
                "prePrep",
                "prePrepSent",
                "preFacility",
                "preQuote",
                "preInst",
                "preFu",
                "prePhysician",
            ]);

            this.leftMsg = false;

            this.procApptInput = null;

            this.fuApptInput = null;

            this.sendInstMethod = "";

            this.overrideProcTime = false;
            this.overrideFuTime = false;

            this.resetWarnings([
                "callFacility",
                "callSed",
                "callProcAppt",
                "callFuAppt",
                "callSendInst",
            ]);

            this.rxFinal = "";

            this.printModal = false;
            this.printConsent = true;
            this.printCover = true;
            this.printPrep = true;
            this.printDiet = true;

            this.importCode = "";
            this.formLoaded = false;
        },

        // output

        rxFinal: "", // "sent" or "forward"

        get emailSubject() {
            return this.emailSubjectTemplate.replace(
                "{upperProcs}",
                this.upperProcs,
            );
        },

        copyEmailSubject() {
            navigator.clipboard.writeText(this.emailSubject);
        },

        get greeting() {
            return DateTime.local().setZone("America/Los_Angeles").hour < 12
                ? "Good morning,"
                : "Good afternoon,";
        },

        emailBodyArray() {
            let x = this.emailBodyTemplate;

            // filter out / "remove" matches
            if (this.selectedFacility.short === "MOSCL") {
                // requires i to be second argument in order to be used as index,
                // even though item is unused
                x = x
                    .filter((item, i) => x[i - 1] !== "{prime}")
                    .filter((item) => item !== "{prime}");

                if (!this.procs[0].selected) {
                    x = x.filter((item) => item !== "{mosclCovid}");
                }
            } else if (this.selectedFacility.short === "PRIME") {
                x = x
                    .filter((item) => item !== "{mosclPacket}")
                    .filter((item) => item !== "{mosclCovid}");
            } else {
                x = x
                    .filter((item, i) => x[i - 1] !== "{prime}")
                    .filter((item) => item !== "{prime}")
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

            if (this.fuTBD) {
                x = x
                    .filter((item, i) => x[i - 1] !== "{fu}")
                    .filter((item) => item !== "{fu}");
            }

            return x;
        },

        // print blank instructions logic

        // following 2 functions join array elements, returns a string
        emailBodyHtmlJoin() {
            return this.emailBodyArray().join("<br />");
        },

        emailBodyClipJoin() {
            return this.emailBodyArray().join("\n");
        },

        packetCoverJoin() {
            // ? remove name and morning/afternoon greeting from email body array, then join, for packet cover
            let initial = this.emailBodyArray();
            initial.splice(initial.length - 2, 1);
            initial.splice(0, 1);
            return initial.join("<br />");
        },

        // string input, replaces keywords
        emailBodyReplace(join) {
            return join
                .replace("{greeting}", this.greeting)
                .replace("{joinProcs}", this.joinProcs)
                .replace("{procApptDate}", this.procApptDate)
                .replace("{procApptTime}", this.procApptTime)
                .replace("{selectedFacility.long}", this.selectedFacility.long)
                .replace(
                    "{selectedFacility.address}",
                    this.selectedFacility.address,
                )
                .replace("{procApptArrival}", this.procApptArrival)
                .replace("{mosclPacket}", this.emailSnippets.mosclPacket)
                .replace("{mosclCovid}", this.mosclCovid[1])
                .replace("{ez2goKit}", this.emailSnippets.ez2goKit)
                .replace("{rxPrep}", this.emailSnippets.rxPrep)
                .replace("{prep}", this.prep)
                .replace(
                    "{prime}",
                    this.facilities[1].INN
                        ? this.emailSnippets.primeINN
                        : this.emailSnippets.primeOON,
                )
                .replace("{quote}", this.facilities[1].quote)
                .replace("{fu}", this.emailSnippets.fu)
                .replace("{fuApptDate}", this.fuApptDate)
                .replace("{fuApptTime}", this.fuApptTime)
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
        get DOS() {
            return "DOS " + this.procApptDateNumShort;
        },

        copyDOS() {
            navigator.clipboard.writeText(this.DOS);
        },

        get procTS() {
            return (
                this.selectedProcs.map((proc) => proc.short).join("/") +
                " " +
                (this.procs[1].selected ? this.prep.toLowerCase() + " " : "") +
                (this.selectedSedation === "no sedation"
                    ? this.selectedSedation.substring(0, 6)
                    : this.selectedSedation.substring(0, 3)) +
                " " +
                this.selectedFacility.short +
                ", DOS " +
                this.procApptDateNumShort +
                " " +
                this.procApptTime +
                ". "
            );
        },

        get fuTS() {
            return !this.fuTBD
                ? "f/u sched for " + this.fuApptDateNumShort + ". "
                : "f/u TBD. ";
        },

        get actionTS() {
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

            let exportCode = this.exportFormData();

            return (
                this.procTS +
                this.fuTS +
                this.actionTS +
                rx +
                " CODE: " +
                exportCode
            );
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

            return (
                "l/m. " +
                this.selectedProcs.map((proc) => proc.short).join("/") +
                " " +
                (this.procs[1].selected ? this.prep.toLowerCase() + " " : "") +
                (this.sedationTBD
                    ? "(MAC or twi)"
                    : this.selectedSedation === "no sedation"
                      ? this.selectedSedation.substring(0, 6)
                      : this.selectedSedation.substring(0, 3)) +
                " " +
                (this.facilityTBD
                    ? "(MOSCL or PRIME-$" + this.facilities[1].quote + ")"
                    : this.selectedFacility.short) +
                (this.facilityIndex === "1" && !this.facilityTBD
                    ? "-$" + this.facilities[1].quote
                    : "") +
                ". " +
                (this.fuTBD ? "f/u TBD." : "Needs f/u.") +
                " " +
                rx +
                " " +
                addInst
            );
        },

        copyLmTS() {
            navigator.clipboard.writeText(this.lmTS());
        },

        get apptNotes() {
            let date = DateTime.local()
                .setZone("America/Los_Angeles")
                .toLocaleString({ month: "numeric", day: "numeric" });

            return this.procs[1].selected
                ? date + " appt made, " + this.prep.toLowerCase() + " "
                : date + " appt made ";
        },

        copyApptNotes() {
            navigator.clipboard.writeText(this.apptNotes);
        },

        exportFormData() {
            // Encode prep and sedation as index values
            const prepIndex = this.preps.findIndex((p) => p.name === this.prep);
            const sedationList = ["", "MAC", "twilight", "no sedation"];
            const sedationIndex = sedationList.indexOf(this.selectedSedation);

            const data = [
                1, // version
                this.procs.map((p) => (p.selected ? 1 : 0)).join(""), // procs
                sedationIndex, // sedation index
                prepIndex, // prep index
                this.prepSent === "yes" ? 1 : 0, // prepSent
                this.facilityTBD ? this.facilityIndexFinal : this.facilityIndex, // facilityIndex
                this.facilities[1].quote || "", // quote
                this.facilities[1].INN ? 1 : 0, // INN
                this.noInst ? 1 : 0, // noInst
                this.instructions.map((i) => i.body).join("~~"), // instructions
                this.schedFu || "", // schedFu
                this.physicianMain || "", // physicianMain
                this.procApptInput || "", // procApptInput
                this.fuApptInput || "", // fuApptInput
            ];
            // Remove trailing empty fields for compactness
            while (data[data.length - 1] === "") data.pop();
            return data.join("|");
        },

        importFormData(code) {
            try {
                const padded = code.trim().split("|");
                const version = padded[0];
                if (version !== "1") {
                    console.warn("Unsupported export code version:", version);
                    return;
                }
                // Pad to at least 14 fields for backward compatibility
                while (padded.length < 14) padded.push("");

                const [
                    _,
                    procsBinary,
                    sedationIndex,
                    prepIndex,
                    prepSent,
                    facilityIndex,
                    quote,
                    INN,
                    noInst,
                    instructionsRaw,
                    schedFu,
                    physicianMain,
                    procApptInput,
                    fuApptInput,
                ] = padded;

                // Decode sedation and prep from indexes
                const sedationList = ["", "MAC", "twilight", "no sedation"];
                const sedationVal = sedationList[+sedationIndex] || "";

                this.procs.forEach(
                    (p, i) => (p.selected = procsBinary[i] === "1"),
                );
                this.sedation = sedationVal;
                this.prep = this.preps[+prepIndex]?.name || "";
                this.prepSent = prepSent === "1" ? "yes" : "no";
                this.facilityIndex = facilityIndex;
                this.facilities[1].quote = quote;
                this.facilities[1].INN = INN === "1";
                this.noInst = noInst === "1";
                this.instructions = instructionsRaw
                    ? instructionsRaw.split("~~").map((body) => ({
                          id: Date.now() + Math.random(),
                          body,
                      }))
                    : [];
                this.schedFu = schedFu;
                this.physicianMain = physicianMain;
                this.procApptInput = procApptInput;
                this.fuApptInput = fuApptInput;

                this.importCode = "";
                this.formLoaded = true;
            } catch (e) {
                console.warn("Failed to load form code:", e);
            }
        },

        importCode: "",
        formLoaded: false,
    };
};
