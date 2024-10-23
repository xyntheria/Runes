import settings from "../data/config"

export const error = (option_name) => {

    if (settings().error) {
        if (Client.getMinecraft().field_71474_y.field_74362_aa != 0) {
            ChatLib.chat("&e[Runes] &cParticle mode must be &7'ALL'&c in the Animation Settings.");

            return false;
        }

        if (option_name == "UNEXPECTED") {
            ChatLib.chat("&e[Runes] &cUnexpected error.");
            ChatLib.chat("&8Could there be another mod that is disabling particles?");

            return false;
        }

        ChatLib.chat("&e[Runes] &cEnable &7'" + option_name + "'&c in the Animation Settings.");
        //ChatLib.chat("&8You can disable this message at /runes -> settings");
    }
}