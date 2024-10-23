import settings from "../data/config"
import { error } from "../utils/RuneErrorMessages"
import { unavailable } from "../utils/Availability"

let timer = 0
let lightnings = new Map()

const lightning = () => {
    lightnings.clear()

    lightnings.set(0, { "r": 215, "g": 227, "b": 50 })
    lightnings.set(1, { "r": 101, "g": 120, "b": 28 })
    lightnings.set(2, { "r": 242, "g": 236, "b": 58 })
    lightnings.set(2, { "r": 245, "g": 206, "b": 49 })
}

register("worldLoad", () => {
    lightning()
})

register("step", () => {
    // Availability
    //#region
    if (unavailable(settings().rainy_day_rune)) return;
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
            try {
                let theta = Math.random() * 2 * Math.PI;
                let phi = Math.acos(2 * Math.random() - 1);

                let xOffset = 0.8 * Math.sin(phi) * Math.cos(theta);
                let yOffset = 0.8 * Math.sin(phi) * Math.sin(theta) * 0.35;
                let zOffset = 0.8 * Math.cos(phi);

                World.particle?.spawnParticle(
                    "CLOUD",
                    Player.getX() + xOffset,
                    Player.getY() + 2.75 + yOffset,
                    Player.getZ() + zOffset,
                    (0.5 - Math.random()) * 0.03,
                    0,
                    (0.5 - Math.random()) * 0.03
                ).setMaxAge(35 + Math.random() * 10).scale(0.8 + Math.random() * 1.35);

                if (Math.random() < 0.15) {
                    World.particle?.spawnParticle(
                        "CLOUD",
                        Player.getX() + (0.5 - Math.random()) * 3,
                        Player.getY() + 3 + (0.5 - Math.random()) * 1,
                        Player.getZ() + (0.5 - Math.random()) * 3,
                        (0.5 - Math.random()) * 0.03,
                        0,
                        (0.5 - Math.random()) * 0.03
                    ).setMaxAge(35 + Math.random() * 10).scale(1 + Math.random() * 1.25);
                }
            }
            catch (e) {
                error("UNEXPECTED")
            }
        }

        try {
            World.particle?.spawnParticle(
                "DRIP_WATER",
                Player.getX() + (0.5 - Math.random()) * 1.25,
                Player.getY() + 2.75,
                Player.getZ() + (0.5 - Math.random()) * 1.25,
                0,
                0,
                0
            ).setMaxAge(75);
        }
        catch (e) {
            error("Dripping Water/Lava")
        }

        if (Math.random() < 0.025) {

            let xRayOffset = (0.5 - Math.random()) * 1.33;
            let zRayOffset = (0.5 - Math.random()) * 1.33;

            for (var i = 0; i < 18; i++) {

                xRayOffset += (0.5 - Math.random()) * 0.5
                zRayOffset += (0.5 - Math.random()) * 0.5

                const data = lightnings.get(Math.floor(Math.random() * lightnings.size))

                try {
                    World.particle?.spawnParticle(
                        "REDSTONE",
                        Player.getX() + xRayOffset,
                        Player.getY() + 2.75 - i * 0.166,
                        Player.getZ() + zRayOffset,
                        0,
                        0,
                        0
                    )
                        .setMaxAge(20 + Math.random() * 10)
                        .setColor(data.r / 255, data.g / 255, data.b / 255, 1)
                        .scale(0.3 + Math.random() * 0.15)
                }
                catch (e) {
                    error("Redstone Animated")
                }

            }
        }
    }
    //#endregion

}).setFps(12)