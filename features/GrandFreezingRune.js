import settings from "../data/config"
import sleep from "../utils/Sleep"
import { error } from "../utils/RuneErrorMessages"
import { unavailable } from "../utils/Availability"
import { spin } from "../utils/Spin"

let timer = 0
let jerryCurrentTick = 0;
let jerryMaxTicks = 40;
let jerryFound = false;

register("worldLoad", () => {
    jerry();
})

register("step", () => {

    // Availability
    //#region
    if (unavailable(settings().grand_freezing_rune)) return;
    //#endregion

    // Variables
    //#region
    timer += 0.2616/1.5

    var x = Math.cos(timer)
    var z = Math.sin(timer)

    var rx = Math.cos(-timer)
    var rz = Math.sin(-timer)

    let onGround = Player.getPlayer().field_70122_E
    let moving = Player.getMotionX() == 0 && Player.getMotionZ() == 0 && onGround ? false : true
    //#endregion

    // Logic
    //#region
    if (!jerryFound) {
        if (!moving) {
            spin(x, 0.65, z, 0.72, 0.036, 0, 45, 1.1, "FIREWORKS_SPARK", "Firework Particles")
            spin(-x, 0.65, -z, 0.72, 0.036, 0, 45, 1.1, "FIREWORKS_SPARK", "Firework Particles")
            createIceParticle(rx * 0.75, 0.65, rz * 0.75, 0);
            createIceParticle(-rx * 0.75, 0.65, -rz * 0.75, 0);

            try {
                if (Math.random() <= 0.4) World.particle.spawnParticle("SNOWBALL", Player.getX(), Player.getY(), Player.getZ(), 0, 1, 0)
                    .setMaxAge(25).scale(1 + Math.random() * 0.15);
            }
            catch (e) {
                error("UNEXPECTED")
            }
        }
        else if (moving == true && onGround == true) {
            if (Math.random() <= 0.15) {
                const radius = 1.5

                try {
                    World.particle.spawnParticle("FIREWORKS_SPARK", Player.getX() + (Math.random() * radius * 2 - radius), Player.getY() + 0.7, Player.getZ() + (Math.random() * radius * 2 - radius), 0, 0, 0)
                        .setMaxAge(15).scale(1.4);
                }
                catch (e) {
                    error("Firework Particles");
                }

                createIceParticle(
                    Math.random() * radius * 2 - radius,
                    0.15,
                    Math.random() * radius * 2 - radius,
                    radius);
            }
        }
    }
    else {
        if (!moving) {
            spin(x * 0.75, 0.65, z * 0.75, 1.2, 0.1, 0.04, 45, 1.1, "FIREWORKS_SPARK", "Firework Particles")
            spin(-x * 0.75, 0.65, -z * 0.75, 1.2, 0.1, 0.04, 45, 1.1, "FIREWORKS_SPARK", "Firework Particles")
            createIceParticle(rx, 0.65, rz, 1);
            createIceParticle(-rx, 0.65, -rz, 1);

            try {
                if (Math.random() <= 0.4) World.particle.spawnParticle("SNOWBALL", Player.getX(), Player.getY(), Player.getZ(), 0, 1, 0)
                    .setMaxAge(25).scale(1 + Math.random() * 0.15);
            }
            catch (e) {
                error("UNEXPECTED")
            }
        }
        else if (moving == true && onGround == true) {
            if (Math.random() <= 0.15) {
                const radius = 1.5

                try {
                    World.particle.spawnParticle("FIREWORKS_SPARK", Player.getX() + (Math.random() * radius * 2 - radius), Player.getY() + 0.7, Player.getZ() + (Math.random() * radius * 2 - radius), 0, 0, 0)
                        .setMaxAge(15).scale(1.4);
                }
                catch (e) {
                    error("Firework Particles");
                }

                createIceParticle(
                    Math.random() * radius * 2 - radius,
                    0.15,
                    Math.random() * radius * 2 - radius,
                    radius);
            }
        }
    }
    //#endregion

}).setFps(24)

const createIceParticle = (x, y, z, speed) => {
    try {
        World.getWorld().func_175688_a(
            //you're welcome.
            net.minecraft.util.EnumParticleTypes.BLOCK_CRACK,
            Player.getX() + x,
            Player.getY() + y,
            Player.getZ() + z,
            speed, -1, speed,
            net.minecraft.block.Block.func_149682_b(net.minecraft.init.Blocks.field_150432_aD)
        )
    }
    catch (e) {
        error("UNEXPECTED")
    }
}

// Jerry Check
//#region
const jerryPlaces = [
    "EINARY'S EMPORIUM",
    "GARY'S SHACK",
    "GLACIAL CAVE",
    "HOT SPRINGS",
    "JERRY'S WORKSHOP",
    "JERRY POND",
    "MOUNT JERRY",
    "REFLECTIVE POND",
    "SHERRY'S SHOWROOM",
    "SUNKEN JERRY POND",
    "TERRY'S SHACK",
];

const jerry = () => {

    jerryCurrentTick = 0;
    jerryFound = false;

    jerryTick();
}

const jerryTick = () => {

    if (jerryFound) {
        //ChatLib.chat("&eJerry found!");
        return true;
    }
    if (jerryCurrentTick > jerryMaxTicks) {
        //ChatLib.chat("&eTimed out");
        return false;
    }

    sleep(200, () => {
        jerryCurrentTick++;

        // Scoreboard
        //#region
        const scoreboardLines = Scoreboard.getLines().map(line => line.getName().removeFormatting().toUpperCase());

        scoreboardLines.forEach(line => {
            if (line.includes("⏣")) {
                const place = line.split("⏣ ")[1].replace(/[^\u0000-\u007F]/g, "");
                if (jerryPlaces.includes(place)) {

                    jerryFound = true;

                    return true;
                }
            }
        });
        //#endregion

        jerryTick()
    });
}
//#endregion