import settings from "../data/config"
import { error } from "../utils/RuneErrorMessages"
import { unavailable } from "../utils/Availability"

let t = 0;
let increment = 0.14;

let dirX = 0;
let dirZ = 0;

register("step", () => {

    // Availability
    //#region
    if (unavailable(settings().smitten_rune)) return;
    //#endregion

    // Variables
    //#region
    if (t <= 0.5) {
        t = 2.8;
    }

    let x = 16 * Math.pow(Math.sin(t), 3) / 10;
    let y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 10;

    dirX = Math.cos(Player.getYaw() * (Math.PI / 180));
    dirZ = Math.sin(Player.getYaw() * (Math.PI / 180));

    t -= increment

    let onGround = Player.getPlayer().field_70122_E
    let moving = Player.getMotionX() == 0 && Player.getMotionZ() == 0 && onGround ? false : true
    //#endregion

    // Logic
    //#region
    if (!moving) {
        for (var i = 0; i < 2; i++) {

            const mult = (i == 1) ? -1 : 1

            try {
                World.particle?.spawnParticle(
                    "REDSTONE",
                    Player.getX() + (x * dirX * mult) / 2.5,
                    Player.getY() + (y) / 2.125 + 3.65,
                    Player.getZ() + (x * dirZ * mult) / 2.5,
                    0,
                    0,
                    0,
                ).setMaxAge(15).setAlpha(0.8 + Math.random() * 0.2).scale(0.8 + Math.random() * 0.2);
            }
            catch (e) {
                error("Redstone Animated")
            }
        }
    }
    //#endregion

}).setFps(16);