import settings from "../data/config"

register("command", () => {
    settings().getConfig().openGui()

}).setName("runes")