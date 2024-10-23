import settings from "../data/config"
import sleep from "../utils/Sleep"
import { error } from "../utils/RuneErrorMessages"
import { unavailable } from "../utils/Availability"
import { spin } from "../utils/Spin"

let timer = 0

let netherCurrentTick = 0;
let netherMaxTicks = 40;
let netherFound = false;

register("worldLoad", () => {
    nether();
})

register("step", () => {
    // Availability
    //#region
    if (unavailable(settings().grand_searing_rune)) return;
    //#endregion

    // Variables
    //#region
    timer += 0.2616

    var x = Math.cos(timer)
    var z = Math.sin(timer)

    let onGround = Player.getPlayer().field_70122_E
    let moving = Player.getMotionX() == 0 && Player.getMotionZ() == 0 && onGround ? false : true
    //#endregion

    //Logic
    //#region

    if (!netherFound) {
        if (!moving) {
            spin(x, 0.2, z, 0.77, 0.02, 0.04, 15, 0.5, "FLAME", "Flame Animated")
            spin(-x, 0.2, -z, 0.77, 0.02, 0.04, 15, 0.5, "FLAME", "Flame Animated")

            if (settings().smoke == true) {

                try {
                    World.particle?.spawnParticle("SMOKE_LARGE", Player.getX() + (0.3 - Math.random() * 0.6), Player.getY() - 0.2, Player.getZ() + (0.3 - Math.random() * 0.6), 0.025 - Math.random() * 0.05, 0.075, 0.025 - Math.random() * 0.05
                    ).setMaxAge(3 + Math.random() * 35).scale(1.3 + Math.random() * 0.2);
                }
                catch (e) {
                    error("Smoke Animated");
                }

            }

            if (Math.random() <= 0.2) spin(x, 0.75, z, 1.2, 0.05, 0, 15, 0.5, "FLAME", "Flame Animated")
        }
        else if (moving == true && onGround == true) {
            if (Math.random() <= 0.2) {
                const radius = 1.5

                try {
                    World.particle?.spawnParticle("FLAME", Player.getX() + (Math.random() * radius * 2 - radius), Player.getY() + 0.15, Player.getZ() + (Math.random() * radius * 2 - radius), 0, 0, 0
                    ).setMaxAge(15).scale(0.5);
                }
                catch (e) {
                    error("Flame Animated");
                }
            }
        }
    }
    else {
        if (!moving) {
            spin(x * 0.8, 0.26, z * 0.8, 0.77, 0.01, 0.2, 7 + (Math.random() * 22), 0.5, "FLAME", "Flame Animated")
            spin(-x * 0.8, 0.26, -z * 0.8, 0.77, 0.01, 0.2, 7 + (Math.random() * 22), 0.5, "FLAME", "Flame Animated")

            if (settings().smoke == true) {

                try {
                    World.particle?.spawnParticle("SMOKE_LARGE", Player.getX() + (0.3 - Math.random() * 0.6), Player.getY() - 0.2, Player.getZ() + (0.3 - Math.random() * 0.6), 0.025 - Math.random() * 0.05, 0.075, 0.025 - Math.random() * 0.05
                    ).setMaxAge(3 + Math.random() * 35).scale(1.3 + Math.random() * 0.2);
                }
                catch (e) {
                    error("Smoke Animated");
                }

            }

            //if (Math.random() <= 0.2) spin(x, 0.75, z, 1.2, 0.05, 0, 15, 0.5, "FLAME", "Flame Animated")
        }
        else if (moving == true && onGround == true) {
            if (Math.random() <= 0.2) {
                const radius = 1.5

                try {
                    World.particle?.spawnParticle("FLAME", Player.getX() + (Math.random() * radius * 2 - radius), Player.getY() + 0.15, Player.getZ() + (Math.random() * radius * 2 - radius), 0, 0, 0
                    ).setMaxAge(15).scale(0.5);
                }
                catch (e) {
                    error("Flame Animated");
                }
            }
        }
    }
    //#endregion

}).setFps(16)

// Nether Check
//#region
const netherPlaces = [
    "KUUDRA'S HOLLOW (T1)",
    "KUUDRA'S HOLLOW (T2)",
    "KUUDRA'S HOLLOW (T3)",
    "KUUDRA'S HOLLOW (T4)",
    "KUUDRA'S HOLLOW (T5)",
    "CRIMSON ISLE",
    "BARBARIAN OUTPOST",
    "THE BASTION",
    "BLAZING VOLCANO",
    "BURNING DESERT",
    "CATHEDRAL",
    "CRIMSON FIELDS",
    "DOJO",
    "DRAGONTAIL",
    "DRAGONTAIL TOWNSQUARE",
    "FORGOTTEN SKULL",
    "KUUDRA'S END",
    "MAGE OUTPOST",
    "MAGMA CHAMBER",
    "MYSTIC MARSH",
    "ODGER'S MARSH",
    "ODGER'S HUT",
    "RUINS OF ASHFANG",
    "SCARLETON",
    "SCARLETON PLAZA",
    "STRONGHOLD",
    "THE WASTELAND",
    "MATRIARCH'S LAIR",
    "BELLY OF THE BEAST",
    "AURA'S LAB"
];

const nether = () => {

    netherCurrentTick = 0;
    netherFound = false;

    netherTick();
}

const netherTick = () => {

    if (netherFound) {
        //ChatLib.chat("&eNether found!");
        return true;
    }
    if (netherCurrentTick > netherMaxTicks) {
        //ChatLib.chat("&eTimed out");
        return false;
    }

    sleep(200, () => {
        netherCurrentTick++;

        // Scoreboard
        //#region
        const scoreboardLines = Scoreboard.getLines().map(line => line.getName().removeFormatting().toUpperCase());

        scoreboardLines.forEach(line => {
            if (line.includes("⏣")) {
                const place = line.split("⏣ ")[1].replace(/[^\u0000-\u007F]/g, "");
                if (netherPlaces.includes(place)) {

                    netherFound = true;

                    return true;
                }
            }
        });
        //#endregion

        netherTick()
    });
}
//#endregion