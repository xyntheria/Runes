import settings from "../data/config"
import { error } from "../utils/RuneErrorMessages"
import { unavailable } from "../utils/Availability"

register("step", () => {
    // Availability
    //#region
    if (unavailable(settings().enchant_rune)) return;
    //#endregion

    // Variables
    //#region
    const velocity = 16
    const hradius = 1.15 / (velocity/1.5)
    const vradius = 3 / (velocity/1.5)

    let x = (hradius - Math.random() * (hradius*2))
    let y = (Math.random() * vradius)
    let z = (hradius - Math.random() * (hradius * 2))
    //#endregion

    // Logic
    //#region
    for (var i = 0; i < 6; i++) {

        //just dont...

        try {
            World.particle.spawnParticle(
                "ENCHANTMENT_TABLE",
                Player.getX() + x,
                Player.getY() + y,
                Player.getZ() + z,
                x * velocity,
                y * velocity,
                z * velocity
            ).setMaxAge(75).scale(0.6 + Math.random() * 0.25).setAlpha(0.6)
        }
        catch (e) {
            error("UNEXPECTED")
        }
    }
    //#endregion

}).setFps(32)