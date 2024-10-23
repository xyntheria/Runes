import settings from "../data/config"
import { error } from "../utils/RuneErrorMessages"

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
const sounds = ["mob.cat.hitt", "mob.cat.meow", "mob.cat.purreow"]

register("entityDeath", (entity) => {
    // Availability
    //#region
    if (!settings().meow_music_rune || entity == null) return
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
    for (var i = 0; i < 2; i++) {
        setTimeout(() => {
            let random = Math.floor(Math.random() * sounds.length)

            World.playSound(sounds[random], 1, 0.9 + Math.random() * 0.2);

    }, i*120)}
}

const playParticles = (entity) => {
    let x = entity.getX();
    let y = entity.getY();
    let z = entity.getZ();

    for (var i = 0; i < 10; i++) {

        // this timeout defines the spawn time between particle spawns.

        setTimeout(() => {
            try {
                /*
                World.particle.spawnParticle(
                    "HEART",
                    x + Math.random() * 0.4, y + 0.1 + Math.random() * 1, z + Math.random() * 0.4,
                    0, 0, 0
                ).setMaxAge(20).scale(0.8 + Math.random() * 0.25)
                */

                if (Math.random() <= 0.66) {
                    World.particle.spawnParticle(
                        "NOTE",
                        x + Math.random() * 0.4, y + 0.1 + Math.random() * 1.7, z + Math.random() * 0.4,
                        0, 0, 0
                    ).setMaxAge(6 + Math.random() * 6).scale(0.66 + Math.random() * 0.2)
                }
            }
            catch (e) {
                error("UNEXPECTED")
            }
        }, i*30) 
    }
}