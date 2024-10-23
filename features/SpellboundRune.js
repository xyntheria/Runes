import settings from "../data/config"
import { error } from "../utils/RuneErrorMessages"
import { unavailable } from "../utils/Availability"

let timer = 0

register("step", () => {
    // Availability
    //#region
    if (unavailable(settings().spellbound_rune)) return;
    //#endregion

    // Variables
    //#region
    timer += 0.175

    let onGround = Player.getPlayer().field_70122_E
    let moving = Player.getMotionX() == 0 && Player.getMotionZ() == 0 && onGround ? false : true
    //#endregion

    // Logic
    //#region
    if (!moving) {
        for (var i = 0; i < 4; i++) {

            let angleOffset = i * (2 * Math.PI / 3);

            try {
                World.particle?.spawnParticle(
                    "ENCHANTMENT_TABLE",
                    Player.getX() + Math.cos(timer + angleOffset) / 2.5,
                    Player.getY() + 2.15,
                    Player.getZ() + Math.sin(timer + angleOffset) / 2.5,
                    0,
                    0,
                    0
                ).setMaxAge(35 + Math.random() * 12).scale(0.7 + Math.random() * 0.2);
            }
            catch (e) {
                error("UNEXPECTED")
            }
        }
    }
    //#endregion

}).setFps(16)