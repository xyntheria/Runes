import settings from "../data/config"

export const unavailable = (setting) => {

    if (setting == false ||
        Player.getPlayer() == null ||
        (Client.getMinecraft().field_71474_y.field_74320_O == 0 && settings().disable_on_f5)
    ) return true;

    return false;
}