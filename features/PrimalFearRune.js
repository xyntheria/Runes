import settings from "../data/config"
import { error } from "../utils/RuneErrorMessages"
import { unavailable } from "../utils/Availability"

register("step", () => {
    // Availability
    //#region
    if (unavailable(settings().primal_fear_rune)) return;
    //#endregion

    // Variables
    //#region
    let onGround = Player.getPlayer().field_70122_E
    let moving = Player.getMotionX() == 0 && Player.getMotionZ() == 0 && onGround ? false : true
    //#endregion

    // Logic
    //#region
    if (!moving) {

        const random = Math.random() * 100

        var x = Math.cos(random)
        var z = Math.sin(random)

        try {
            World.particle.spawnParticle("SPELL_WITCH", Player.getX() + x * 1.6, Player.getY() + 0.1, Player.getZ() + z * 1.6, 0, -0.5, 0).setMaxAge(Math.random() * 25 + 20).scale(0.9)
            World.particle.spawnParticle("SPELL_INSTANT", Player.getX() - x * 1.6, Player.getY() + 0.1, Player.getZ() - z * 1.6, 0, 0.14, 0).setMaxAge(Math.random() * 15 + 15).scale(0.9)
            World.particle.spawnParticle("SPELL", Player.getX(), Player.getY(), Player.getZ(), -x / 6, 0.13, -z / 6).setMaxAge(Math.random() * 30 + 2).scale(0.85).setColor(0.3, 0.3, 0.3, 1)
        }
        catch (e) { error("Potion Particles") }
    }
    else {
        const radius = 1.5
        try {
            if (Math.random() <= 0.5) World.particle.spawnParticle("SPELL", Player.getX() + (radius - Math.random() * (radius * 2)), Player.getY() + 0.4, Player.getZ() + (radius - Math.random() * (radius * 2)), 0, 0.04, 0
            ).setMaxAge(Math.random() * 30 + 2).scale(0.85).setColor(0.3, 0.3, 0.3, 1)
        }
        catch (e) {
            error("Potion Particles")
        }
    }
    //#endregion

}).setFps(20)