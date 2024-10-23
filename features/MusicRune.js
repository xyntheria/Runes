import settings from "../data/config"
import { error } from "../utils/RuneErrorMessages"
import { unavailable } from "../utils/Availability"

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

let particles = new Map()

const notes = () => {
    particles.clear()

    particles.set(0, {"r": 240, "g": 220, "b": 10})
    particles.set(1, {"r": 240, "g": 5, "b": 190})
    particles.set(2, {"r": 35, "g": 90, "b": 240})
    particles.set(3, {"r": 245, "g": 215, "b": 110})
    particles.set(4, {"r": 150, "g": 190, "b": 245})
    particles.set(5, {"r": 65, "g": 170, "b": 165})
    particles.set(6, {"r": 175, "g": 135, "b": 185})
    particles.set(7, {"r": 210, "g": 30, "b": 80})
    particles.set(8, {"r": 65, "g": 240, "b": 40})
}

register("worldLoad", () => {
    notes()
})

register("entityDeath", (entity) => {
    // Availability
    //#region
    if (!settings().music_rune || entity == null) return
    if (entity.distanceTo(Player.getPlayer()) > settings().radius) return
    if (entity.getEntity() instanceof ArmorStand) return;
    //#endregion

    // Logic
    //#region
    playSFX()
    playParticles(entity)
    //#endregion

})

const playSFX = () => {
    const note = Math.floor(Math.random() * 12) + 1
    const result = zeroCheck(note);
    var data = "note_" + result + ".ogg"

    new Sound({ source: data.toString(), volume: 1 }).play()
}

const playParticles = (entity) => {
    const x = entity.getX();
    const y = entity.getY();
    const z = entity.getZ();

    for (var i = 0; i < 3; i++) {

        // this timeout defines the spawn time between notes.

        setTimeout(() => {
            const note = Math.floor(Math.random() * particles.size)
            const data = particles.get(note)

            try {
                World.particle.spawnParticle(
                    "NOTE",
                    x, y + 1.85 + Math.random() * 0.4, z,
                    0, 0, 0)
                    .setColor(data.r / 255, data.g / 255, data.b / 255, 1).setMaxAge(20).scale(0.9 + Math.random() * 0.3);
            }
            catch (e) {
                error("UNEXPECTED")
            }
        }, i * 30)
    }
}

const zeroCheck = (note) => {
    if (note <= 9) {
        return "0" + String(note);
    }
    else {
        return String(note);
    }

    return "01";
}