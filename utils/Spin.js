import { error } from "../utils/RuneErrorMessages"

export const spin = (x, y, z, speed, hforce, vforce, duration, scale, name, animations) => {
    try {
        World.particle?.spawnParticle(
            String(name),
            (x * speed) + Player.getX(),
            y + Player.getY(),
            (z * speed) + Player.getZ(),
            (x * hforce),
            vforce,
            (z * hforce)
        ).setMaxAge(duration).scale(scale)
    }
    catch (e) {
        error(String(animations));
    }
}