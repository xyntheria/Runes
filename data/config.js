// Make sure these go to the right directory 
import Settings from "../../Amaterasu/core/Settings"
import DefaultConfig from "../../Amaterasu/core/DefaultConfig"
const config = new DefaultConfig("Runes", "data/settings.json")

    .addSwitch({
        category: "General",
        configName: "music_rune",
        title: "",
        description: "&7Enables &bMusic Rune III&7!",
        subcategory: "Weapon Runes"
    })
    .addSwitch({
        category: "General",
        configName: "meow_music_rune",
        title: "",
        description: "&7Enables &eMeow Music Rune III&7!",
        subcategory: "Weapon Runes"
    })
    .addSwitch({
        category: "General",
        configName: "grand_searing_rune",
        title: "",
        description: "&7Enables &cGrand Searing Rune III&7!",
        subcategory: "Chestplate Runes"
    })
    .addSwitch({
        category: "General",
        configName: "grand_freezing_rune",
        title: "",
        description: "&7Enables &cGrand Freezing Rune III&7!",
        subcategory: "Chestplate Runes"
    })
    .addSwitch({
        category: "General",
        configName: "primal_fear_rune",
        title: "",
        description: "&7Enables &5Primal Fear Rune III&7!",
        subcategory: "Chestplate Runes"
    })
    .addSwitch({
        category: "General",
        configName: "enchant_rune",
        title: "",
        description: "&7Enables &7Enchant Rune III&7! &8Why would you ever use this?",
        subcategory: "Chestplate Runes"
    })
    .addSwitch({
        category: "General",
        configName: "spellbound_rune",
        title: "",
        description: "&7Enables &cSpellbound Rune III&7!",
        subcategory: "Helmet Runes"
    })
    .addSwitch({
        category: "General",
        configName: "smitten_rune",
        title: "",
        description: "&7Enables &cSmitten Rune III&7!",
        subcategory: "Helmet Runes"
    })
    .addSwitch({
        category: "General",
        configName: "rainy_day_rune",
        title: "",
        description: "&7Enables &9Rainy Day Rune III&7!",
        subcategory: "Helmet Runes"
    })
    .addSlider({
        category: "Settings",
        configName: "radius",
        title: "Detection radius",
        description: "\n&7Sets the maximum distance at which combat runes will work.",
        options: [0, 32],
        value: 0,
        subcategory: "Settings"
    })
    .addSwitch({
        category: "Settings",
        configName: "smoke",
        title: "Grand Searing Rune Smoke",
        description: "\n&7Enables the smoke particles for the Grand Searing Rune\n&8By default, the rune disables its smoke particles for the player wearing it to improve visibility.",
        subcategory: "Settings"
    })
    .addSwitch({
        category: "Settings",
        configName: "disable_on_f5",
        title: "Disable effects on First Person View",
        description: "\n&7Only enables the effect when pressing in F5.",
        subcategory: "Settings"
    })
    .addSwitch({
        category: "Settings",
        configName: "error",
        title: "Error messages",
        description: "\n&7Toggles the rune error messages. If a rune is not working, try enabling this option.",
        subcategory: "Settings"
    })

const setting = new Settings("Runes", config, "data/ColorScheme.json", "Runes by eclipseok / xynth") // make sure to set your command with [.setCommand("commandname")]

export default () => setting.settings