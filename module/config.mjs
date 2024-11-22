import MapLocationControlIcon from "./canvas/map-location-control-icon.mjs";
import { ConsumptionTargetData } from "./data/activity/fields/consumption-targets-field.mjs";
import * as activities from "./documents/activity/_module.mjs";
import * as advancement from "./documents/advancement/_module.mjs";
import { preLocalize } from "./utils.mjs";

// Namespace Configuration Values
const DND5R = {};

// ASCII Artwork
DND5R.ASCII = `_______________________________
______      ______ _____ _____
|  _  \\___  |  _  \\  ___|  ___|
| | | ( _ ) | | | |___ \\| |__
| | | / _ \\/\\ | | |   \\ \\  __|
| |/ / (_>  < |/ //\\__/ / |___
|___/ \\___/\\/___/ \\____/\\____/
_______________________________`;

/**
 * Configuration data for abilities.
 *
 * @typedef {object} AbilityConfiguration
 * @property {string} label                               Localized label.
 * @property {string} abbreviation                        Localized abbreviation.
 * @property {string} fullKey                             Fully written key used as alternate for enrichers.
 * @property {string} [reference]                         Reference to a rule page describing this ability.
 * @property {string} [type]                              Whether this is a "physical" or "mental" ability.
 * @property {Object<string, number|string>}  [defaults]  Default values for this ability based on actor type.
 *                                                        If a string is used, the system will attempt to fetch.
 *                                                        the value of the specified ability.
 * @property {string} [icon]                              An SVG icon that represents the ability.
 */

/**
 * The set of Ability Scores used within the system.
 * @enum {AbilityConfiguration}
 */
DND5R.abilities = {
  str: {
    label: "DND5R.AbilityStr",
    abbreviation: "DND5R.AbilityStrAbbr",
    type: "physical",
    fullKey: "strength",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.nUPv6C66Ur64BIUH",
    icon: "systems/dnd5r/icons/svg/abilities/strength.svg"
  },
  dex: {
    label: "DND5R.AbilityDex",
    abbreviation: "DND5R.AbilityDexAbbr",
    type: "physical",
    fullKey: "dexterity",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ER8CKDUWLsFXuARJ",
    icon: "systems/dnd5r/icons/svg/abilities/dexterity.svg"
  },
  con: {
    label: "DND5R.AbilityCon",
    abbreviation: "DND5R.AbilityConAbbr",
    type: "physical",
    fullKey: "constitution",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MpA4jnwD17Q0RPg7",
    icon: "systems/dnd5r/icons/svg/abilities/constitution.svg"
  },
  int: {
    label: "DND5R.AbilityInt",
    abbreviation: "DND5R.AbilityIntAbbr",
    type: "mental",
    fullKey: "intelligence",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.WzWWcTIppki35YvF",
    icon: "systems/dnd5r/icons/svg/abilities/intelligence.svg",
    defaults: { vehicle: 0 }
  },
  wis: {
    label: "DND5R.AbilityWis",
    abbreviation: "DND5R.AbilityWisAbbr",
    type: "mental",
    fullKey: "wisdom",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.v3IPyTtqvXqN934s",
    icon: "systems/dnd5r/icons/svg/abilities/wisdom.svg",
    defaults: { vehicle: 0 }
  },
  cha: {
    label: "DND5R.AbilityCha",
    abbreviation: "DND5R.AbilityChaAbbr",
    type: "mental",
    fullKey: "charisma",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9FyghudYFV5QJOuG",
    icon: "systems/dnd5r/icons/svg/abilities/charisma.svg",
    defaults: { vehicle: 0 }
  },
  hon: {
    label: "DND5R.AbilityHon",
    abbreviation: "DND5R.AbilityHonAbbr",
    type: "mental",
    fullKey: "honor",
    defaults: { npc: "cha", vehicle: 0 },
    improvement: false
  },
  san: {
    label: "DND5R.AbilitySan",
    abbreviation: "DND5R.AbilitySanAbbr",
    type: "mental",
    fullKey: "sanity",
    defaults: { npc: "wis", vehicle: 0 },
    improvement: false
  }
};
preLocalize("abilities", { keys: ["label", "abbreviation"] });

/**
 * Configure which ability score is used as the default modifier for initiative rolls,
 * when calculating hit points per level and hit dice, and as the default modifier for
 * saving throws to maintain concentration.
 * @enum {string}
 */
DND5R.defaultAbilities = {
  meleeAttack: "str",
  rangedAttack: "dex",
  initiative: "dex",
  hitPoints: "con",
  concentration: "con"
};

/* -------------------------------------------- */

/**
 * Configuration data for skills.
 *
 * @typedef {object} SkillConfiguration
 * @property {string} label        Localized label.
 * @property {string} ability      Key for the default ability used by this skill.
 * @property {string} fullKey      Fully written key used as alternate for enrichers.
 * @property {string} [reference]  Reference to a rule page describing this skill.
 */

/**
 * The set of skill which can be trained with their default ability scores.
 * @enum {SkillConfiguration}
 */
DND5R.skills = {
  acr: {
    label: "DND5R.SkillAcr",
    ability: "dex",
    fullKey: "acrobatics",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AvvBLEHNl7kuwPkN",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  ani: {
    label: "DND5R.SkillAni",
    ability: "wis",
    fullKey: "animalHandling",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.xb3MCjUvopOU4viE",
    icon: "icons/environment/creatures/horse-brown.webp"
  },
  arc: {
    label: "DND5R.SkillArc",
    ability: "int",
    fullKey: "arcana",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.h3bYSPge8IOqne1N",
    icon: "icons/sundries/books/book-embossed-jewel-silver-green.webp"
  },
  ath: {
    label: "DND5R.SkillAth",
    ability: "str",
    fullKey: "athletics",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.rIR7ttYDUpH3tMzv",
    icon: "icons/magic/control/buff-strength-muscle-damage-orange.webp"
  },
  dec: {
    label: "DND5R.SkillDec",
    ability: "cha",
    fullKey: "deception",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.mqVZ2fz0L7a9VeKJ",
    icon: "icons/magic/control/mouth-smile-deception-purple.webp"
  },
  his: {
    label: "DND5R.SkillHis",
    ability: "int",
    fullKey: "history",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kRBZbdWMGW9K3wdY",
    icon: "icons/sundries/books/book-embossed-bound-brown.webp"
  },
  ins: {
    label: "DND5R.SkillIns",
    ability: "wis",
    fullKey: "insight",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8R5SMbAGbECNgO8z",
    icon: "icons/magic/perception/orb-crystal-ball-scrying-blue.webp"
  },
  itm: {
    label: "DND5R.SkillItm",
    ability: "cha",
    fullKey: "intimidation",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4VHHI2gJ1jEsppfg",
    icon: "icons/skills/social/intimidation-impressing.webp"
  },
  inv: {
    label: "DND5R.SkillInv",
    ability: "int",
    fullKey: "investigation",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Y7nmbQAruWOs7WRM",
    icon: "icons/tools/scribal/magnifying-glass.webp"
  },
  med: {
    label: "DND5R.SkillMed",
    ability: "wis",
    fullKey: "medicine",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.GeYmM7BVfSCAga4o",
    icon: "icons/tools/cooking/mortar-herbs-yellow.webp"
  },
  nat: {
    label: "DND5R.SkillNat",
    ability: "int",
    fullKey: "nature",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ueMx3uF2PQlcye31",
    icon: "icons/magic/nature/plant-sprout-snow-green.webp"
  },
  prc: {
    label: "DND5R.SkillPrc",
    ability: "wis",
    fullKey: "perception",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zjEeHCUqfuprfzhY",
    icon: "icons/magic/perception/eye-ringed-green.webp"
  },
  prf: {
    label: "DND5R.SkillPrf",
    ability: "cha",
    fullKey: "performance",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hYT7Z06yDNBcMtGe",
    icon: "icons/tools/instruments/lute-gold-brown.webp"
  },
  per: {
    label: "DND5R.SkillPer",
    ability: "cha",
    fullKey: "persuasion",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4R5H8iIsdFQTsj3X",
    icon: "icons/skills/social/diplomacy-handshake.webp"
  },
  rel: {
    label: "DND5R.SkillRel",
    ability: "int",
    fullKey: "religion",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.CXVzERHdP4qLhJXM",
    icon: "icons/magic/holy/saint-glass-portrait-halo.webp"
  },
  slt: {
    label: "DND5R.SkillSlt",
    ability: "dex",
    fullKey: "sleightOfHand",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.yg6SRpGNVz9nDW0A",
    icon: "icons/sundries/gaming/playing-cards.webp"
  },
  ste: {
    label: "DND5R.SkillSte",
    ability: "dex",
    fullKey: "stealth",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4MfrpERNiQXmvgCI",
    icon: "icons/magic/perception/shadow-stealth-eyes-purple.webp"
  },
  sur: {
    label: "DND5R.SkillSur",
    ability: "wis",
    fullKey: "survival",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.t3EzDU5b9BVAIEVi",
    icon: "icons/magic/fire/flame-burning-campfire-yellow-blue.webp"
  }
};
preLocalize("skills", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Character alignment options.
 * @enum {string}
 */
DND5R.alignments = {
  lg: "DND5R.AlignmentLG",
  ng: "DND5R.AlignmentNG",
  cg: "DND5R.AlignmentCG",
  ln: "DND5R.AlignmentLN",
  tn: "DND5R.AlignmentTN",
  cn: "DND5R.AlignmentCN",
  le: "DND5R.AlignmentLE",
  ne: "DND5R.AlignmentNE",
  ce: "DND5R.AlignmentCE"
};
preLocalize("alignments");

/* -------------------------------------------- */

/**
 * An enumeration of item attunement types.
 * @enum {string}
 */
DND5R.attunementTypes = {
  required: "DND5R.AttunementRequired",
  optional: "DND5R.AttunementOptional"
};
preLocalize("attunementTypes");

/**
 * An enumeration of item attunement states.
 * @type {{"0": string, "1": string, "2": string}}
 * @deprecated since 3.2, available until 3.4
 */
DND5R.attunements = {
  0: "DND5R.AttunementNone",
  1: "DND5R.AttunementRequired",
  2: "DND5R.AttunementAttuned"
};
preLocalize("attunements");

/* -------------------------------------------- */
/*  Weapon Details                              */
/* -------------------------------------------- */

/**
 * The set of types which a weapon item can take.
 * @enum {string}
 */
DND5R.weaponTypes = {
  simpleM: "DND5R.WeaponSimpleM",
  simpleR: "DND5R.WeaponSimpleR",
  martialM: "DND5R.WeaponMartialM",
  martialR: "DND5R.WeaponMartialR",
  natural: "DND5R.WeaponNatural",
  improv: "DND5R.WeaponImprov",
  siege: "DND5R.WeaponSiege"
};
preLocalize("weaponTypes");

/* -------------------------------------------- */

/**
 * General weapon categories.
 * @enum {string}
 */
DND5R.weaponProficiencies = {
  sim: "DND5R.WeaponSimpleProficiency",
  mar: "DND5R.WeaponMartialProficiency"
};
preLocalize("weaponProficiencies");

/* -------------------------------------------- */

/**
 * @typedef {object} WeaponMasterConfiguration
 * @property {string} label        Localized label for the mastery
 * @property {string} [reference]  Reference to a rule page describing this mastery.
 */

/**
 * Weapon masteries.
 * @enum {WeaponMasterConfiguration}
 */
DND5R.weaponMasteries = {
  cleave: {
    label: "DND5R.WEAPON.Mastery.Cleave"
  },
  graze: {
    label: "DND5R.WEAPON.Mastery.Graze"
  },
  nick: {
    label: "DND5R.WEAPON.Mastery.Nick"
  },
  push: {
    label: "DND5R.WEAPON.Mastery.Push"
  },
  sap: {
    label: "DND5R.WEAPON.Mastery.Sap"
  },
  slow: {
    label: "DND5R.WEAPON.Mastery.Slow"
  },
  topple: {
    label: "DND5R.WEAPON.Mastery.Topple"
  },
  vex: {
    label: "DND5R.WEAPON.Mastery.Vex"
  }
};
preLocalize("weaponMasteries", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * A mapping between `DND5R.weaponTypes` and `DND5R.weaponProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
DND5R.weaponProficienciesMap = {
  simpleM: "sim",
  simpleR: "sim",
  martialM: "mar",
  martialR: "mar"
};

/* -------------------------------------------- */

/**
 * A mapping between `DND5R.weaponTypes` and `DND5R.attackClassifications`. Unlisted types are assumed to be
 * of the "weapon" classification.
 * @enum {string}
 */
DND5R.weaponClassificationMap = {};

/* -------------------------------------------- */

/**
 * A mapping between `DND5R.weaponTypes` and `DND5R.attackTypes`.
 * @enum {string}
 */
DND5R.weaponTypeMap = {
  simpleM: "melee",
  simpleR: "ranged",
  martialM: "melee",
  martialR: "ranged",
  siege: "ranged"
};

/* -------------------------------------------- */

/**
 * The basic weapon types in 5e. This enables specific weapon proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
DND5R.weaponIds = {
  battleaxe: "I0WocDSuNpGJayPb",
  blowgun: "wNWK6yJMHG9ANqQV",
  club: "nfIRTECQIG81CvM4",
  dagger: "0E565kQUBmndJ1a2",
  dart: "3rCO8MTIdPGSW6IJ",
  flail: "UrH3sMdnUDckIHJ6",
  glaive: "rOG1OM2ihgPjOvFW",
  greataxe: "1Lxk6kmoRhG8qQ0u",
  greatclub: "QRCsxkCwWNwswL9o",
  greatsword: "xMkP8BmFzElcsMaR",
  halberd: "DMejWAc8r8YvDPP1",
  handaxe: "eO7Fbv5WBk5zvGOc",
  handcrossbow: "qaSro7kFhxD6INbZ",
  heavycrossbow: "RmP0mYRn2J7K26rX",
  javelin: "DWLMnODrnHn8IbAG",
  lance: "RnuxdHUAIgxccVwj",
  lightcrossbow: "ddWvQRLmnnIS0eLF",
  lighthammer: "XVK6TOL4sGItssAE",
  longbow: "3cymOVja8jXbzrdT",
  longsword: "10ZP2Bu3vnCuYMIB",
  mace: "Ajyq6nGwF7FtLhDQ",
  maul: "DizirD7eqjh8n95A",
  morningstar: "dX8AxCh9o0A9CkT3",
  net: "aEiM49V8vWpWw7rU",
  pike: "tC0kcqZT9HHAO0PD",
  quarterstaff: "g2dWN7PQiMRYWzyk",
  rapier: "Tobce1hexTnDk4sV",
  scimitar: "fbC0Mg1a73wdFbqO",
  shortsword: "osLzOwQdPtrK3rQH",
  sickle: "i4NeNZ30ycwPDHMx",
  spear: "OG4nBBydvmfWYXIk",
  shortbow: "GJv6WkD7D2J6rP6M",
  sling: "3gynWO9sN4OLGMWD",
  trident: "F65ANO66ckP8FDMa",
  warpick: "2YdfjN1PIIrSHZii",
  warhammer: "F0Df164Xv1gWcYt0",
  whip: "QKTyxoO0YDnAsbYe"
};

/* -------------------------------------------- */

/**
 * The basic ammunition types.
 * @enum {string}
 */
DND5R.ammoIds = {
  arrow: "3c7JXOzsv55gqJS5",
  blowgunNeedle: "gBQ8xqTA5f8wP5iu",
  crossbowBolt: "SItCnYBqhzqBoaWG",
  slingBullet: "z9SbsMIBZzuhZOqT"
};

/* -------------------------------------------- */
/*  Bastion Facilities                          */
/* -------------------------------------------- */

/**
 * @typedef FacilityConfiguration
 * @property {Record<string, Record<number, number>>} advancement  The number of free facilities of a given type awarded
 *                                                                 at certain character levels.
 * @property {Record<string, FacilityOrder>} orders                Orders that can be issued to a facility.
 * @property {Record<string, FacilitySize>} sizes                  Facility size categories.
 * @property {Record<string, SubtypeTypeConfiguration>} types      Facility types and subtypes.
 */

/**
 * @typedef FacilityOrder
 * @property {string} label       The human-readable name of the order.
 * @property {string} icon        The SVG icon for this order.
 * @property {boolean} [basic]    Whether this order can be issued to basic facilities.
 * @property {number} [duration]  The amount of time taken to complete the order if different to a normal bastion turn.
 * @property {boolean} [hidden]   This order is not normally available for execution.
 */

/**
 * @typedef FacilitySize
 * @property {string} label    The human-readable name of the size category.
 * @property {number} days     The number of days to build the facility.
 * @property {number} squares  The maximum area the facility may occupy in the bastion plan.
 * @property {number} value    The cost in gold pieces to build the facility.
 */

/**
 * Configuration data for bastion facilities.
 * @type {FacilityConfiguration}
 */
DND5R.facilities = {
  advancement: {
    basic: { 5: 2 },
    special: { 5: 2, 9: 4, 13: 5, 17: 6 }
  },
  orders: {
    build: {
      label: "DND5R.FACILITY.Orders.build.inf",
      icon: "systems/dnd5r/icons/svg/facilities/build.svg"
    },
    change: {
      label: "DND5R.FACILITY.Orders.change.inf",
      icon: "systems/dnd5r/icons/svg/facilities/change.svg",
      duration: 21
    },
    craft: {
      label: "DND5R.FACILITY.Orders.craft.inf",
      icon: "systems/dnd5r/icons/svg/facilities/craft.svg"
    },
    empower: {
      label: "DND5R.FACILITY.Orders.empower.inf",
      icon: "systems/dnd5r/icons/svg/facilities/empower.svg"
    },
    enlarge: {
      label: "DND5R.FACILITY.Orders.enlarge.inf",
      icon: "systems/dnd5r/icons/svg/facilities/enlarge.svg",
      basic: true
    },
    harvest: {
      label: "DND5R.FACILITY.Orders.harvest.inf",
      icon: "systems/dnd5r/icons/svg/facilities/harvest.svg"
    },
    maintain: {
      label: "DND5R.FACILITY.Orders.maintain.inf",
      icon: "systems/dnd5r/icons/svg/facilities/maintain.svg"
    },
    recruit: {
      label: "DND5R.FACILITY.Orders.recruit.inf",
      icon: "systems/dnd5r/icons/svg/facilities/recruit.svg"
    },
    repair: {
      label: "DND5R.FACILITY.Orders.repair.inf",
      icon: "systems/dnd5r/icons/svg/facilities/repair.svg",
      hidden: true
    },
    research: {
      label: "DND5R.FACILITY.Orders.research.inf",
      icon: "systems/dnd5r/icons/svg/facilities/research.svg"
    },
    trade: {
      label: "DND5R.FACILITY.Orders.trade.inf",
      icon: "systems/dnd5r/icons/svg/facilities/trade.svg"
    }
  },
  sizes: {
    cramped: {
      label: "DND5R.FACILITY.Sizes.cramped",
      days: 20,
      squares: 4,
      value: 500
    },
    roomy: {
      label: "DND5R.FACILITY.Sizes.roomy",
      days: 45,
      squares: 16,
      value: 1_000
    },
    vast: {
      label: "DND5R.FACILITY.Sizes.vast",
      days: 125,
      squares: 36,
      value: 3_000
    }
  },
  types: {
    basic: {
      label: "DND5R.FACILITY.Types.Basic.Label.one",
      subtypes: {
        bedroom: "DND5R.FACILITY.Types.Basic.Bedroom",
        diningRoom: "DND5R.FACILITY.Types.Basic.DiningRoom",
        parlor: "DND5R.FACILITY.Types.Basic.Parlor",
        courtyard: "DND5R.FACILITY.Types.Basic.Courtyard",
        kitchen: "DND5R.FACILITY.Types.Basic.Kitchen",
        storage: "DND5R.FACILITY.Types.Basic.Storage"
      }
    },
    special: {
      label: "DND5R.FACILITY.Types.Special.Label.one",
      subtypes: {
        arcaneStudy: "DND5R.FACILITY.Types.Special.ArcaneStudy",
        armory: "DND5R.FACILITY.Types.Special.Armory",
        barrack: "DND5R.FACILITY.Types.Special.Barrack",
        garden: "DND5R.FACILITY.Types.Special.Garden",
        library: "DND5R.FACILITY.Types.Special.Library",
        sanctuary: "DND5R.FACILITY.Types.Special.Sanctuary",
        smithy: "DND5R.FACILITY.Types.Special.Smithy",
        storehouse: "DND5R.FACILITY.Types.Special.Storehouse",
        workshop: "DND5R.FACILITY.Types.Special.Workshop",
        gamingHall: "DND5R.FACILITY.Types.Special.GamingHall",
        greenhouse: "DND5R.FACILITY.Types.Special.Greenhouse",
        laboratory: "DND5R.FACILITY.Types.Special.Laboratory",
        sacristy: "DND5R.FACILITY.Types.Special.Sacristy",
        scriptorium: "DND5R.FACILITY.Types.Special.Scriptorium",
        stable: "DND5R.FACILITY.Types.Special.Stable",
        teleportationCircle: "DND5R.FACILITY.Types.Special.TeleportationCircle",
        theater: "DND5R.FACILITY.Types.Special.Theater",
        trainingArea: "DND5R.FACILITY.Types.Special.TrainingArea",
        trophyRoom: "DND5R.FACILITY.Types.Special.TrophyRoom",
        archive: "DND5R.FACILITY.Types.Special.Archive",
        meditationChamber: "DND5R.FACILITY.Types.Special.MeditationChamber",
        menagerie: "DND5R.FACILITY.Types.Special.Menagerie",
        observatory: "DND5R.FACILITY.Types.Special.Observatory",
        pub: "DND5R.FACILITY.Types.Special.Pub",
        reliquary: "DND5R.FACILITY.Types.Special.Reliquary",
        demiplane: "DND5R.FACILITY.Types.Special.Demiplane",
        guildhall: "DND5R.FACILITY.Types.Special.Guildhall",
        sanctum: "DND5R.FACILITY.Types.Special.Sanctum",
        warRoom: "DND5R.FACILITY.Types.Special.WarRoom"
      }
    }
  }
};
preLocalize("facilities.orders", { key: "label", sort: true });
preLocalize("facilities.sizes", { key: "label", sort: true });
preLocalize("facilities.types", { key: "label", sort: true });
preLocalize("facilities.types.basic.subtypes", { sort: true });
preLocalize("facilities.types.special.subtypes", { sort: true });

/* -------------------------------------------- */
/*  Tool Details                                */
/* -------------------------------------------- */

/**
 * The categories into which Tool items can be grouped.
 *
 * @enum {string}
 */
DND5R.toolTypes = {
  art: "DND5R.ToolArtisans",
  game: "DND5R.ToolGamingSet",
  music: "DND5R.ToolMusicalInstrument"
};
preLocalize("toolTypes", { sort: true });

/**
 * The categories of tool proficiencies that a character can gain.
 *
 * @enum {string}
 */
DND5R.toolProficiencies = {
  ...DND5R.toolTypes,
  vehicle: "DND5R.ToolVehicle"
};
preLocalize("toolProficiencies", { sort: true });

/**
 * @typedef ToolConfiguration
 * @property {string} ability  Default ability used for the tool.
 * @property {string} id       UUID of reference tool or ID within pack defined by `DND5R.sourcePacks.ITEMS`.
 */

/**
 * Configuration data for tools.
 * @enum {ToolConfiguration}
 */
DND5R.tools = {
  alchemist: {
    ability: "int",
    id: "SztwZhbhZeCqyAes"
  },
  bagpipes: {
    ability: "cha",
    id: "yxHi57T5mmVt0oDr"
  },
  brewer: {
    ability: "int",
    id: "Y9S75go1hLMXUD48"
  },
  calligrapher: {
    ability: "dex",
    id: "jhjo20QoiD5exf09"
  },
  card: {
    ability: "wis",
    id: "YwlHI3BVJapz4a3E"
  },
  carpenter: {
    ability: "str",
    id: "8NS6MSOdXtUqD7Ib"
  },
  cartographer: {
    ability: "wis",
    id: "fC0lFK8P4RuhpfaU"
  },
  chess: {
    ability: "wis",
    id: "23y8FvWKf9YLcnBL"
  },
  cobbler: {
    ability: "dex",
    id: "hM84pZnpCqKfi8XH"
  },
  cook: {
    ability: "wis",
    id: "Gflnp29aEv5Lc1ZM"
  },
  dice: {
    ability: "wis",
    id: "iBuTM09KD9IoM5L8"
  },
  disg: {
    ability: "cha",
    id: "IBhDAr7WkhWPYLVn"
  },
  drum: {
    ability: "cha",
    id: "69Dpr25pf4BjkHKb"
  },
  dulcimer: {
    ability: "cha",
    id: "NtdDkjmpdIMiX7I2"
  },
  flute: {
    ability: "cha",
    id: "eJOrPcAz9EcquyRQ"
  },
  forg: {
    ability: "dex",
    id: "cG3m4YlHfbQlLEOx"
  },
  glassblower: {
    ability: "int",
    id: "rTbVrNcwApnuTz5E"
  },
  herb: {
    ability: "int",
    id: "i89okN7GFTWHsvPy"
  },
  horn: {
    ability: "cha",
    id: "aa9KuBy4dst7WIW9"
  },
  jeweler: {
    ability: "int",
    id: "YfBwELTgPFHmQdHh"
  },
  leatherworker: {
    ability: "dex",
    id: "PUMfwyVUbtyxgYbD"
  },
  lute: {
    ability: "cha",
    id: "qBydtUUIkv520DT7"
  },
  lyre: {
    ability: "cha",
    id: "EwG1EtmbgR3bM68U"
  },
  mason: {
    ability: "str",
    id: "skUih6tBvcBbORzA"
  },
  navg: {
    ability: "wis",
    id: "YHCmjsiXxZ9UdUhU"
  },
  painter: {
    ability: "wis",
    id: "ccm5xlWhx74d6lsK"
  },
  panflute: {
    ability: "cha",
    id: "G5m5gYIx9VAUWC3J"
  },
  pois: {
    ability: "int",
    id: "il2GNi8C0DvGLL9P"
  },
  potter: {
    ability: "int",
    id: "hJS8yEVkqgJjwfWa"
  },
  shawm: {
    ability: "cha",
    id: "G3cqbejJpfB91VhP"
  },
  smith: {
    ability: "str",
    id: "KndVe2insuctjIaj"
  },
  thief: {
    ability: "dex",
    id: "woWZ1sO5IUVGzo58"
  },
  tinker: {
    ability: "dex",
    id: "0d08g1i5WXnNrCNA"
  },
  viol: {
    ability: "cha",
    id: "baoe3U5BfMMMxhCU"
  },
  weaver: {
    ability: "dex",
    id: "ap9prThUB2y9lDyj"
  },
  woodcarver: {
    ability: "dex",
    id: "xKErqkLo4ASYr5EP"
  }
};

/**
 * The basic tool types in 5e. This enables specific tool proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
DND5R.toolIds = new Proxy(DND5R.tools, {
  get(target, prop) {
    return target[prop]?.id ?? target[prop];
  },
  set(target, prop, value) {
    foundry.utils.logCompatibilityWarning(
      "Appending to CONFIG.DND5R.toolIds is deprecated, use CONFIG.DND5R.tools instead.",
      { since: "DnD5r 4.0", until: "DnD5r 4.2", once: true }
    );
    target[prop] ??= { ability: "int" };
    target[prop].id = value;
    return true;
  }
});

/* -------------------------------------------- */

/**
 * Time periods that accept a numeric value.
 * @enum {string}
 */
DND5R.scalarTimePeriods = {
  turn: "DND5R.TimeTurn",
  round: "DND5R.TimeRound",
  minute: "DND5R.TimeMinute",
  hour: "DND5R.TimeHour",
  day: "DND5R.TimeDay",
  month: "DND5R.TimeMonth",
  year: "DND5R.TimeYear"
};
preLocalize("scalarTimePeriods");

/* -------------------------------------------- */

/**
 * Time periods for spells that don't have a defined ending.
 * @enum {string}
 */
DND5R.permanentTimePeriods = {
  disp: "DND5R.TimeDisp",
  dstr: "DND5R.TimeDispTrig",
  perm: "DND5R.TimePerm"
};
preLocalize("permanentTimePeriods");

/* -------------------------------------------- */

/**
 * Time periods that don't accept a numeric value.
 * @enum {string}
 */
DND5R.specialTimePeriods = {
  inst: "DND5R.TimeInst",
  spec: "DND5R.Special"
};
preLocalize("specialTimePeriods");

/* -------------------------------------------- */

/**
 * The various lengths of time over which effects can occur.
 * @enum {string}
 */
DND5R.timePeriods = {
  ...DND5R.specialTimePeriods,
  ...DND5R.permanentTimePeriods,
  ...DND5R.scalarTimePeriods
};
preLocalize("timePeriods");

/* -------------------------------------------- */

/**
 * Ways in which to activate an item that cannot be labeled with a cost.
 * @enum {string}
 */
DND5R.staticAbilityActivationTypes = {
  none: "DND5R.NoneActionLabel",
  special: DND5R.timePeriods.spec
};

/**
 * Various ways in which an item or ability can be activated.
 * @enum {string}
 */
DND5R.abilityActivationTypes = {
  ...DND5R.staticAbilityActivationTypes,
  action: "DND5R.Action",
  bonus: "DND5R.BonusAction",
  reaction: "DND5R.Reaction",
  minute: DND5R.timePeriods.minute,
  hour: DND5R.timePeriods.hour,
  day: DND5R.timePeriods.day,
  legendary: "DND5R.LegendaryActionLabel",
  mythic: "DND5R.MythicActionLabel",
  lair: "DND5R.LairActionLabel",
  crew: "DND5R.VehicleCrewAction"
};
preLocalize("abilityActivationTypes");

/* -------------------------------------------- */

/**
 * @typedef {ActivityActivationTypeConfig}
 * @property {string} label            Localized label for the activation type.
 * @property {string} [group]          Localized label for the presentational group.
 * @property {boolean} [scalar=false]  Does this activation type have a numeric value attached?
 */

/**
 * Configuration data for activation types on activities.
 * @enum {ActivityActivationTypeConfig}
 */
DND5R.activityActivationTypes = {
  action: {
    label: "DND5R.Action",
    group: "DND5R.ACTIVATION.Category.Standard"
  },
  bonus: {
    label: "DND5R.BonusAction",
    group: "DND5R.ACTIVATION.Category.Standard"
  },
  reaction: {
    label: "DND5R.Reaction",
    group: "DND5R.ACTIVATION.Category.Standard"
  },
  minute: {
    label: "DND5R.TimeMinute",
    group: "DND5R.ACTIVATION.Category.Time",
    scalar: true
  },
  hour: {
    label: "DND5R.TimeHour",
    group: "DND5R.ACTIVATION.Category.Time",
    scalar: true
  },
  day: {
    label: "DND5R.TimeDay",
    group: "DND5R.ACTIVATION.Category.Time",
    scalar: true
  },
  legendary: {
    label: "DND5R.LegendaryActionLabel",
    group: "DND5R.ACTIVATION.Category.Monster",
    scalar: true
  },
  mythic: {
    label: "DND5R.MythicActionLabel",
    group: "DND5R.ACTIVATION.Category.Monster",
    scalar: true
  },
  lair: {
    label: "DND5R.LairActionLabel",
    group: "DND5R.ACTIVATION.Category.Monster"
  },
  crew: {
    label: "DND5R.VehicleCrewAction",
    group: "DND5R.ACTIVATION.Category.Vehicle",
    scalar: true
  },
  special: {
    label: "DND5R.Special"
  }
};
preLocalize("activityActivationTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Different things that an ability can consume upon use.
 * @enum {string}
 */
DND5R.abilityConsumptionTypes = {
  ammo: "DND5R.ConsumeAmmunition",
  attribute: "DND5R.ConsumeAttribute",
  hitDice: "DND5R.ConsumeHitDice",
  material: "DND5R.ConsumeMaterial",
  charges: "DND5R.ConsumeCharges"
};
preLocalize("abilityConsumptionTypes", { sort: true });

/* -------------------------------------------- */

/**
 * @typedef {object} ActivityConsumptionTargetConfig
 * @property {string} label                                     Localized label for the target type.
 * @property {ConsumptionConsumeFunction} consume               Function used to consume according to this type.
 * @property {ConsumptionLabelsFunction} consumptionLabels      Function used to generate a hint of consumption amount.
 * @property {{value: string, label: string}[]} [scalingModes]  Additional scaling modes for this consumption type in
 *                                                              addition to the default "amount" scaling.
 * @property {boolean} [targetRequiresEmbedded]                 Use text input rather than select when not embedded.
 * @property {ConsumptionValidTargetsFunction} [validTargets]   Function for creating an array of consumption targets.
 */

/**
 * @callback ConsumptionConsumeFunction
 * @this {ConsumptionTargetData}
 * @param {ActivityUseConfiguration} config  Configuration data for the activity usage.
 * @param {ActivityUsageUpdates} updates     Updates to be performed.
 * @throws ConsumptionError
 */

/**
 * @callback ConsumptionLabelsFunction
 * @this {ConsumptionTargetData}
 * @param {ActivityUseConfiguration} config  Configuration data for the activity usage.
 * @param {object} [options={}]
 * @param {boolean} [options.consumed]       Is this consumption currently set to be consumed?
 * @returns {ConsumptionLabels}
 */

/**
 * @typedef ConsumptionLabels
 * @property {string} label      Label displayed for the consumption checkbox.
 * @property {string} hint       Hint text describing what should be consumed.
 * @property {{ type: string, message: string }} [notes]  Additional notes relating to the consumption to be performed.
 * @property {boolean} [warn]    Display a warning icon indicating consumption will fail.
 */

/**
 * @callback ConsumptionValidTargetsFunction
 * @this {ConsumptionTargetData}
 * @returns {FormSelectOption[]}
 */

/**
 * Configuration information for different consumption targets.
 * @enum {ActivityConsumptionTargetConfig}
 */
DND5R.activityConsumptionTypes = {
  activityUses: {
    label: "DND5R.CONSUMPTION.Type.ActivityUses.Label",
    consume: ConsumptionTargetData.consumeActivityUses,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsActivityUses
  },
  itemUses: {
    label: "DND5R.CONSUMPTION.Type.ItemUses.Label",
    consume: ConsumptionTargetData.consumeItemUses,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsItemUses,
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validItemUsesTargets
  },
  material: {
    label: "DND5R.CONSUMPTION.Type.Material.Label",
    consume: ConsumptionTargetData.consumeMaterial,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsMaterial,
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validMaterialTargets
  },
  hitDice: {
    label: "DND5R.CONSUMPTION.Type.HitDice.Label",
    consume: ConsumptionTargetData.consumeHitDice,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsHitDice,
    validTargets: ConsumptionTargetData.validHitDiceTargets
  },
  spellSlots: {
    label: "DND5R.CONSUMPTION.Type.SpellSlots.Label",
    consume: ConsumptionTargetData.consumeSpellSlots,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsSpellSlots,
    scalingModes: [{ value: "level", label: "DND5R.CONSUMPTION.Scaling.SlotLevel" }],
    validTargets: ConsumptionTargetData.validSpellSlotsTargets
  },
  attribute: {
    label: "DND5R.CONSUMPTION.Type.Attribute.Label",
    consume: ConsumptionTargetData.consumeAttribute,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsAttribute,
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validAttributeTargets
  }
};
preLocalize("activityConsumptionTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Configuration data for actor sizes.
 *
 * @typedef {object} ActorSizeConfiguration
 * @property {string} label                   Localized label.
 * @property {string} abbreviation            Localized abbreviation.
 * @property {number} hitDie                  Default hit die denomination for NPCs of this size.
 * @property {number} [token=1]               Default token size.
 * @property {number} [capacityMultiplier=1]  Multiplier used to calculate carrying capacities.
 */

/**
 * Creature sizes ordered from smallest to largest.
 * @enum {ActorSizeConfiguration}
 */
DND5R.actorSizes = {
  tiny: {
    label: "DND5R.SizeTiny",
    abbreviation: "DND5R.SizeTinyAbbr",
    hitDie: 4,
    token: 0.5,
    capacityMultiplier: 0.5
  },
  sm: {
    label: "DND5R.SizeSmall",
    abbreviation: "DND5R.SizeSmallAbbr",
    hitDie: 6,
    dynamicTokenScale: 0.8
  },
  med: {
    label: "DND5R.SizeMedium",
    abbreviation: "DND5R.SizeMediumAbbr",
    hitDie: 8
  },
  lg: {
    label: "DND5R.SizeLarge",
    abbreviation: "DND5R.SizeLargeAbbr",
    hitDie: 10,
    token: 2,
    capacityMultiplier: 2
  },
  huge: {
    label: "DND5R.SizeHuge",
    abbreviation: "DND5R.SizeHugeAbbr",
    hitDie: 12,
    token: 3,
    capacityMultiplier: 4
  },
  grg: {
    label: "DND5R.SizeGargantuan",
    abbreviation: "DND5R.SizeGargantuanAbbr",
    hitDie: 20,
    token: 4,
    capacityMultiplier: 8
  }
};
preLocalize("actorSizes", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */
/*  Canvas                                      */
/* -------------------------------------------- */

/**
 * Colors used to visualize temporary and temporary maximum HP in token health bars.
 * @enum {number}
 */
DND5R.tokenHPColors = {
  damage: 0xFF0000,
  healing: 0x00FF00,
  temp: 0x66CCFF,
  tempmax: 0x440066,
  negmax: 0x550000
};

/* -------------------------------------------- */

/**
 * Colors used when a dynamic token ring effects.
 * @enum {number}
 */
DND5R.tokenRingColors = {
  damage: 0xFF0000,
  defeated: 0x000000,
  healing: 0x00FF00,
  temp: 0x33AAFF
};

/* -------------------------------------------- */

/**
 * Configuration data for a map marker style. Options not included will fall back to the value set in `default` style.
 * Any additional styling options added will be passed into the custom marker class and be available for rendering.
 *
 * @typedef {object} MapLocationMarkerStyle
 * @property {typeof PIXI.Container} [icon]  Map marker class used to render the icon.
 * @property {number} [backgroundColor]      Color of the background inside the circle.
 * @property {number} [borderColor]          Color of the border in normal state.
 * @property {number} [borderHoverColor]     Color of the border when hovering over the marker.
 * @property {string} [fontFamily]           Font used for rendering the code on the marker.
 * @property {number} [shadowColor]          Color of the shadow under the marker.
 * @property {number} [textColor]            Color of the text on the marker.
 */

/**
 * Settings used to render map location markers on the canvas.
 * @enum {MapLocationMarkerStyle}
 */
DND5R.mapLocationMarker = {
  default: {
    icon: MapLocationControlIcon,
    backgroundColor: 0xFBF8F5,
    borderColor: 0x000000,
    borderHoverColor: 0xFF5500,
    fontFamily: "Roboto Slab",
    shadowColor: 0x000000,
    textColor: 0x000000
  }
};

/* -------------------------------------------- */

/**
 * Configuration data for creature types.
 *
 * @typedef {object} CreatureTypeConfiguration
 * @property {string} label               Localized label.
 * @property {string} plural              Localized plural form used in swarm name.
 * @property {string} [reference]         Reference to a rule page describing this type.
 * @property {boolean} [detectAlignment]  Is this type detectable by spells such as "Detect Evil and Good"?
 */

/**
 * Default types of creatures.
 * @enum {CreatureTypeConfiguration}
 */
DND5R.creatureTypes = {
  aberration: {
    label: "DND5R.CreatureAberration",
    plural: "DND5R.CreatureAberrationPl",
    icon: "icons/creatures/tentacles/tentacle-eyes-yellow-pink.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.yy50qVC1JhPHt4LC",
    detectAlignment: true
  },
  beast: {
    label: "DND5R.CreatureBeast",
    plural: "DND5R.CreatureBeastPl",
    icon: "icons/creatures/claws/claw-bear-paw-swipe-red.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6bTHn7pZek9YX2tv"
  },
  celestial: {
    label: "DND5R.CreatureCelestial",
    plural: "DND5R.CreatureCelestialPl",
    icon: "icons/creatures/abilities/wings-birdlike-blue.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.T5CJwxjhBbi6oqaM",
    detectAlignment: true
  },
  construct: {
    label: "DND5R.CreatureConstruct",
    plural: "DND5R.CreatureConstructPl",
    icon: "icons/creatures/magical/construct-stone-earth-gray.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jQGAJZBZTqDFod8d"
  },
  dragon: {
    label: "DND5R.CreatureDragon",
    plural: "DND5R.CreatureDragonPl",
    icon: "icons/creatures/abilities/dragon-fire-breath-orange.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.k2IRXZwGk9W0PM2S"
  },
  elemental: {
    label: "DND5R.CreatureElemental",
    plural: "DND5R.CreatureElementalPl",
    icon: "icons/creatures/magical/spirit-fire-orange.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.7z1LXGGkXpHuzkFh",
    detectAlignment: true
  },
  fey: {
    label: "DND5R.CreatureFey",
    plural: "DND5R.CreatureFeyPl",
    icon: "icons/creatures/magical/fae-fairy-winged-glowing-green.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.OFsRUt3pWljgm8VC",
    detectAlignment: true
  },
  fiend: {
    label: "DND5R.CreatureFiend",
    plural: "DND5R.CreatureFiendPl",
    icon: "icons/magic/death/skull-horned-goat-pentagram-red.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ElHKBJeiJPC7gj6k",
    detectAlignment: true
  },
  giant: {
    label: "DND5R.CreatureGiant",
    plural: "DND5R.CreatureGiantPl",
    icon: "icons/creatures/magical/humanoid-giant-forest-blue.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AOXn3Mv5vPZwo0Uf"
  },
  humanoid: {
    label: "DND5R.CreatureHumanoid",
    plural: "DND5R.CreatureHumanoidPl",
    icon: "icons/environment/people/group.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iFzQs4AenN8ALRvw"
  },
  monstrosity: {
    label: "DND5R.CreatureMonstrosity",
    plural: "DND5R.CreatureMonstrosityPl",
    icon: "icons/creatures/abilities/mouth-teeth-rows-red.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TX0yPEFTn79AMZ8P"
  },
  ooze: {
    label: "DND5R.CreatureOoze",
    plural: "DND5R.CreatureOozePl",
    icon: "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.cgzIC1ecG03D97Fg"
  },
  plant: {
    label: "DND5R.CreaturePlant",
    plural: "DND5R.CreaturePlantPl",
    icon: "icons/magic/nature/tree-animated-strike.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1oT7t6tHE4kZuSN1"
  },
  undead: {
    label: "DND5R.CreatureUndead",
    plural: "DND5R.CreatureUndeadPl",
    icon: "icons/magic/death/skull-horned-worn-fire-blue.webp",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.D2BdqS1GeD5rcZ6q",
    detectAlignment: true
  }
};
preLocalize("creatureTypes", { keys: ["label", "plural"], sort: true });

/* -------------------------------------------- */

/**
 * Classification types for item action types.
 * @enum {string}
 */
DND5R.itemActionTypes = {
  mwak: "DND5R.ActionMWAK",
  rwak: "DND5R.ActionRWAK",
  msak: "DND5R.ActionMSAK",
  rsak: "DND5R.ActionRSAK",
  abil: "DND5R.ActionAbil",
  save: "DND5R.ActionSave",
  ench: "DND5R.ActionEnch",
  summ: "DND5R.ActionSumm",
  heal: "DND5R.ActionHeal",
  util: "DND5R.ActionUtil",
  other: "DND5R.ActionOther"
};
preLocalize("itemActionTypes");

/* -------------------------------------------- */

/**
 * Different ways in which item capacity can be limited.
 * @enum {string}
 */
DND5R.itemCapacityTypes = {
  items: "DND5R.ItemContainerCapacityItems",
  weight: "DND5R.ItemContainerCapacityWeight"
};
preLocalize("itemCapacityTypes", { sort: true });

/* -------------------------------------------- */

/**
 * List of various item rarities.
 * @enum {string}
 */
DND5R.itemRarity = {
  common: "DND5R.ItemRarityCommon",
  uncommon: "DND5R.ItemRarityUncommon",
  rare: "DND5R.ItemRarityRare",
  veryRare: "DND5R.ItemRarityVeryRare",
  legendary: "DND5R.ItemRarityLegendary",
  artifact: "DND5R.ItemRarityArtifact"
};
preLocalize("itemRarity");

/* -------------------------------------------- */

/**
 * Configuration data for limited use periods.
 *
 * @typedef {object} LimitedUsePeriodConfiguration
 * @property {string} label           Localized label.
 * @property {string} abbreviation    Shorthand form of the label.
 * @property {boolean} [formula]      Whether this limited use period restores charges via formula.
 */

/**
 * Enumerate the lengths of time over which an item can have limited use ability.
 * @enum {LimitedUsePeriodConfiguration}
 */
DND5R.limitedUsePeriods = {
  lr: {
    label: "DND5R.UsesPeriods.Lr",
    abbreviation: "DND5R.UsesPeriods.LrAbbreviation"
  },
  sr: {
    label: "DND5R.UsesPeriods.Sr",
    abbreviation: "DND5R.UsesPeriods.SrAbbreviation"
  },
  day: {
    label: "DND5R.UsesPeriods.Day",
    abbreviation: "DND5R.UsesPeriods.DayAbbreviation"
  },
  charges: {
    label: "DND5R.UsesPeriods.Charges",
    abbreviation: "DND5R.UsesPeriods.ChargesAbbreviation",
    formula: true,
    deprecated: true
  },
  dawn: {
    label: "DND5R.UsesPeriods.Dawn",
    abbreviation: "DND5R.UsesPeriods.DawnAbbreviation",
    formula: true
  },
  dusk: {
    label: "DND5R.UsesPeriods.Dusk",
    abbreviation: "DND5R.UsesPeriods.DuskAbbreviation",
    formula: true
  }
};
preLocalize("limitedUsePeriods", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Periods at which enchantments can be re-bound to new items.
 * @enum {{ label: string }}
 */
DND5R.enchantmentPeriods = {
  sr: {
    label: "DND5R.UsesPeriods.Sr"
  },
  lr: {
    label: "DND5R.UsesPeriods.Lr"
  },
  atwill: {
    label: "DND5R.UsesPeriods.AtWill"
  }
};
preLocalize("enchantmentPeriods", { key: "label" });

/* -------------------------------------------- */

/**
 * Specific equipment types that modify base AC.
 * @enum {string}
 */
DND5R.armorTypes = {
  light: "DND5R.EquipmentLight",
  medium: "DND5R.EquipmentMedium",
  heavy: "DND5R.EquipmentHeavy",
  natural: "DND5R.EquipmentNatural",
  shield: "DND5R.EquipmentShield"
};
preLocalize("armorTypes");

/* -------------------------------------------- */

/**
 * Equipment types that aren't armor.
 * @enum {string}
 */
DND5R.miscEquipmentTypes = {
  clothing: "DND5R.EQUIPMENT.Type.Clothing.Label",
  ring: "DND5R.EQUIPMENT.Type.Ring.Label",
  rod: "DND5R.EQUIPMENT.Type.Rod.Label",
  trinket: "DND5R.EQUIPMENT.Type.Trinket.Label",
  vehicle: "DND5R.EQUIPMENT.Type.Vehicle.Label",
  wand: "DND5R.EQUIPMENT.Type.Wand.Label",
  wondrous: "DND5R.EQUIPMENT.Type.Wondrous.Label"
};
preLocalize("miscEquipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of equipment types for armor, clothing, and other objects which can be worn by the character.
 * @enum {string}
 */
DND5R.equipmentTypes = {
  ...DND5R.miscEquipmentTypes,
  ...DND5R.armorTypes
};
preLocalize("equipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The various types of vehicles in which characters can be proficient.
 * @enum {string}
 */
DND5R.vehicleTypes = {
  air: "DND5R.VehicleTypeAir",
  land: "DND5R.VehicleTypeLand",
  space: "DND5R.VehicleTypeSpace",
  water: "DND5R.VehicleTypeWater"
};
preLocalize("vehicleTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of Armor Proficiencies which a character may have.
 * @type {object}
 */
DND5R.armorProficiencies = {
  lgt: "DND5R.ArmorLightProficiency",
  med: "DND5R.ArmorMediumProficiency",
  hvy: "DND5R.ArmorHeavyProficiency",
  shl: "DND5R.EquipmentShieldProficiency"
};
preLocalize("armorProficiencies");

/**
 * A mapping between `DND5R.equipmentTypes` and `DND5R.armorProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
DND5R.armorProficienciesMap = {
  natural: true,
  clothing: true,
  light: "lgt",
  medium: "med",
  heavy: "hvy",
  shield: "shl"
};

/**
 * The basic armor types in 5e. This enables specific armor proficiencies,
 * automated AC calculation in NPCs, and starting equipment.
 * @enum {string}
 */
DND5R.armorIds = {
  breastplate: "SK2HATQ4abKUlV8i",
  chainmail: "rLMflzmxpe8JGTOA",
  chainshirt: "p2zChy24ZJdVqMSH",
  halfplate: "vsgmACFYINloIdPm",
  hide: "n1V07puo0RQxPGuF",
  leather: "WwdpHLXGX5r8uZu5",
  padded: "GtKV1b5uqFQqpEni",
  plate: "OjkIqlW2UpgFcjZa",
  ringmail: "nsXZejlmgalj4he9",
  scalemail: "XmnlF5fgIO3tg6TG",
  splint: "cKpJmsJmU8YaiuqG",
  studded: "TIV3B1vbrVHIhQAm"
};

/**
 * The basic shield in 5e.
 * @enum {string}
 */
DND5R.shieldIds = {
  shield: "sSs3hSzkKBMNBgTs"
};

/**
 * Common armor class calculations.
 * @enum {{ label: string, [formula]: string }}
 */
DND5R.armorClasses = {
  flat: {
    label: "DND5R.ArmorClassFlat",
    formula: "@attributes.ac.flat"
  },
  natural: {
    label: "DND5R.ArmorClassNatural",
    formula: "@attributes.ac.flat"
  },
  default: {
    label: "DND5R.ArmorClassEquipment",
    formula: "@attributes.ac.armor + @attributes.ac.dex"
  },
  mage: {
    label: "DND5R.ArmorClassMage",
    formula: "13 + @abilities.dex.mod"
  },
  draconic: {
    label: "DND5R.ArmorClassDraconic",
    formula: "13 + @abilities.dex.mod"
  },
  unarmoredMonk: {
    label: "DND5R.ArmorClassUnarmoredMonk",
    formula: "10 + @abilities.dex.mod + @abilities.wis.mod"
  },
  unarmoredBarb: {
    label: "DND5R.ArmorClassUnarmoredBarbarian",
    formula: "10 + @abilities.dex.mod + @abilities.con.mod"
  },
  unarmoredBard: {
    label: "DND5R.ArmorClassUnarmoredBard",
    formula: "10 + @abilities.dex.mod + @abilities.cha.mod"
  },
  custom: {
    label: "DND5R.ArmorClassCustom"
  }
};
preLocalize("armorClasses", { key: "label" });

/* -------------------------------------------- */

/**
 * Configuration data for an items that have sub-types.
 *
 * @typedef {object} SubtypeTypeConfiguration
 * @property {string} label                       Localized label for this type.
 * @property {Record<string, string>} [subtypes]  Enum containing localized labels for subtypes.
 */

/**
 * Enumerate the valid consumable types which are recognized by the system.
 * @enum {SubtypeTypeConfiguration}
 */
DND5R.consumableTypes = {
  ammo: {
    label: "DND5R.CONSUMABLE.Type.Ammunition.Label",
    subtypes: {
      arrow: "DND5R.CONSUMABLE.Type.Ammunition.Arrow",
      crossbowBolt: "DND5R.CONSUMABLE.Type.Ammunition.Bolt",
      firearmBullet: "DND5R.CONSUMABLE.Type.Ammunition.BulletFirearm",
      slingBullet: "DND5R.CONSUMABLE.Type.Ammunition.BulletSling",
      blowgunNeedle: "DND5R.CONSUMABLE.Type.Ammunition.Needle"
    }
  },
  potion: {
    label: "DND5R.CONSUMABLE.Type.Potion.Label"
  },
  poison: {
    label: "DND5R.CONSUMABLE.Type.Poison.Label",
    subtypes: {
      contact: "DND5R.CONSUMABLE.Type.Poison.Contact",
      ingested: "DND5R.CONSUMABLE.Type.Poison.Ingested",
      inhaled: "DND5R.CONSUMABLE.Type.Poison.Inhaled",
      injury: "DND5R.CONSUMABLE.Type.Poison.Injury"
    }
  },
  food: {
    label: "DND5R.CONSUMABLE.Type.Food.Label"
  },
  scroll: {
    label: "DND5R.CONSUMABLE.Type.Scroll.Label"
  },
  wand: {
    label: "DND5R.CONSUMABLE.Type.Wand.Label"
  },
  rod: {
    label: "DND5R.CONSUMABLE.Type.Rod.Label"
  },
  trinket: {
    label: "DND5R.CONSUMABLE.Type.Trinket.Label"
  }
};
preLocalize("consumableTypes", { key: "label", sort: true });
preLocalize("consumableTypes.ammo.subtypes", { sort: true });
preLocalize("consumableTypes.poison.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * Types of containers.
 * @enum {string}
 */
DND5R.containerTypes = {
  backpack: "H8YCd689ezlD26aT",
  barrel: "7Yqbqg5EtVW16wfT",
  basket: "Wv7HzD6dv1P0q78N",
  boltcase: "eJtPBiZtr2pp6ynt",
  bottle: "HZp69hhyNZUUCipF",
  bucket: "mQVYcHmMSoCUnBnM",
  case: "5mIeX824uMklU3xq",
  chest: "2YbuclKfhDL0bU4u",
  flask: "lHS63sC6bypENNlR",
  jug: "0ZBWwjFz3nIAXMLW",
  pot: "M8xM8BLK4tpUayEE",
  pitcher: "nXWdGtzi8DXDLLsL",
  pouch: "9bWTRRDym06PzSAf",
  quiver: "4MtQKPn9qMWCFjDA",
  sack: "CNdDj8dsXVpRVpXt",
  saddlebags: "TmfaFUSZJAotndn9",
  tankard: "uw6fINSmZ2j2o57A",
  vial: "meJEfX3gZgtMX4x2"
};

/* -------------------------------------------- */

/**
 * Configuration data for spellcasting foci.
 *
 * @typedef {object} SpellcastingFocusConfiguration
 * @property {string} label                    Localized label for this category.
 * @property {Object<string, string>} itemIds  Item IDs or UUIDs.
 */

/**
 * Type of spellcasting foci.
 * @enum {SpellcastingFocusConfiguration}
 */
DND5R.focusTypes = {
  arcane: {
    label: "DND5R.Focus.Arcane",
    itemIds: {
      crystal: "uXOT4fYbgPY8DGdd",
      orb: "tH5Rn0JVRG1zdmPa",
      rod: "OojyyGfh91iViuMF",
      staff: "BeKIrNIvNHRPQ4t5",
      wand: "KA2P6I48iOWlnboO"
    }
  },
  druidic: {
    label: "DND5R.Focus.Druidic",
    itemIds: {
      mistletoe: "xDK9GQd2iqOGH8Sd",
      totem: "PGL6aaM0wE5h0VN5",
      woodenstaff: "FF1ktpb2YSiyv896",
      yewwand: "t5yP0d7YaKwuKKiH"
    }
  },
  holy: {
    label: "DND5R.Focus.Holy",
    itemIds: {
      amulet: "paqlMjggWkBIAeCe",
      emblem: "laVqttkGMW4B9654",
      reliquary: "gP1URGq3kVIIFHJ7"
    }
  }
};
preLocalize("focusTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Types of "features" items.
 * @enum {SubtypeTypeConfiguration}
 */
DND5R.featureTypes = {
  background: {
    label: "DND5R.Feature.Background"
  },
  class: {
    label: "DND5R.Feature.Class.Label",
    subtypes: {
      arcaneShot: "DND5R.Feature.Class.ArcaneShot",
      artificerInfusion: "DND5R.Feature.Class.ArtificerInfusion",
      channelDivinity: "DND5R.Feature.Class.ChannelDivinity",
      defensiveTactic: "DND5R.Feature.Class.DefensiveTactic",
      eldritchInvocation: "DND5R.Feature.Class.EldritchInvocation",
      elementalDiscipline: "DND5R.Feature.Class.ElementalDiscipline",
      fightingStyle: "DND5R.Feature.Class.FightingStyle",
      huntersPrey: "DND5R.Feature.Class.HuntersPrey",
      ki: "DND5R.Feature.Class.Ki",
      maneuver: "DND5R.Feature.Class.Maneuver",
      metamagic: "DND5R.Feature.Class.Metamagic",
      multiattack: "DND5R.Feature.Class.Multiattack",
      pact: "DND5R.Feature.Class.PactBoon",
      psionicPower: "DND5R.Feature.Class.PsionicPower",
      rune: "DND5R.Feature.Class.Rune",
      superiorHuntersDefense: "DND5R.Feature.Class.SuperiorHuntersDefense"
    }
  },
  monster: {
    label: "DND5R.Feature.Monster"
  },
  race: {
    label: "DND5R.Feature.Species"
  },
  enchantment: {
    label: "DND5R.ENCHANTMENT.Label",
    subtypes: {
      artificerInfusion: "DND5R.Feature.Class.ArtificerInfusion",
      rune: "DND5R.Feature.Class.Rune"
    }
  },
  feat: {
    label: "DND5R.Feature.Feat.Label",
    subtypes: {
      general: "DND5R.Feature.Feat.General",
      origin: "DND5R.Feature.Feat.Origin",
      fightingStyle: "DND5R.Feature.Feat.FightingStyle",
      epicBoon: "DND5R.Feature.Feat.EpicBoon"
    }
  },
  supernaturalGift: {
    label: "DND5R.Feature.SupernaturalGift.Label",
    subtypes: {
      blessing: "DND5R.Feature.SupernaturalGift.Blessing",
      charm: "DND5R.Feature.SupernaturalGift.Charm",
      epicBoon: "DND5R.Feature.SupernaturalGift.EpicBoon"
    }
  }
};
preLocalize("featureTypes", { key: "label" });
preLocalize("featureTypes.class.subtypes", { sort: true });
preLocalize("featureTypes.enchantment.subtypes", { sort: true });
preLocalize("featureTypes.feat.subtypes", { sort: true });
preLocalize("featureTypes.supernaturalGift.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration data for item properties.
 *
 * @typedef {object} ItemPropertyConfiguration
 * @property {string} label           Localized label.
 * @property {string} [abbreviation]  Localized abbreviation.
 * @property {string} [icon]          Icon that can be used in certain places to represent this property.
 * @property {string} [reference]     Reference to a rule page describing this property.
 * @property {boolean} [isPhysical]   Is this property one that can cause damage resistance bypasses?
 * @property {boolean} [isTag]        Is this spell property a tag, rather than a component?
 */

/**
 * The various properties of all item types.
 * @enum {ItemPropertyConfiguration}
 */
DND5R.itemProperties = {
  ada: {
    label: "DND5R.Item.Property.Adamantine",
    isPhysical: true
  },
  amm: {
    label: "DND5R.Item.Property.Ammunition"
  },
  concentration: {
    label: "DND5R.Item.Property.Concentration",
    abbreviation: "DND5R.ConcentrationAbbr",
    icon: "systems/dnd5r/icons/svg/statuses/concentrating.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ow58p27ctAnr4VPH",
    isTag: true
  },
  fin: {
    label: "DND5R.Item.Property.Finesse"
  },
  fir: {
    label: "DND5R.Item.Property.Firearm"
  },
  foc: {
    label: "DND5R.Item.Property.Focus"
  },
  hvy: {
    label: "DND5R.Item.Property.Heavy"
  },
  lgt: {
    label: "DND5R.Item.Property.Light"
  },
  lod: {
    label: "DND5R.Item.Property.Loading"
  },
  material: {
    label: "DND5R.Item.Property.Material",
    abbreviation: "DND5R.ComponentMaterialAbbr",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AeH5eDS4YeM9RETC"
  },
  mgc: {
    label: "DND5R.Item.Property.Magical",
    icon: "systems/dnd5r/icons/svg/properties/magical.svg",
    isPhysical: true
  },
  rch: {
    label: "DND5R.Item.Property.Reach"
  },
  rel: {
    label: "DND5R.Item.Property.Reload"
  },
  ret: {
    label: "DND5R.Item.Property.Returning"
  },
  ritual: {
    label: "DND5R.Item.Property.Ritual",
    abbreviation: "DND5R.RitualAbbr",
    icon: "systems/dnd5r/icons/svg/items/spell.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FjWqT5iyJ89kohdA",
    isTag: true
  },
  sil: {
    label: "DND5R.Item.Property.Silvered",
    isPhysical: true
  },
  somatic: {
    label: "DND5R.Item.Property.Somatic",
    abbreviation: "DND5R.ComponentSomaticAbbr",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qwUNgUNilEmZkSC9"
  },
  spc: {
    label: "DND5R.Item.Property.Special"
  },
  stealthDisadvantage: {
    label: "DND5R.Item.Property.StealthDisadvantage"
  },
  thr: {
    label: "DND5R.Item.Property.Thrown"
  },
  two: {
    label: "DND5R.Item.Property.TwoHanded"
  },
  ver: {
    label: "DND5R.Item.Property.Versatile"
  },
  vocal: {
    label: "DND5R.Item.Property.Verbal",
    abbreviation: "DND5R.ComponentVerbalAbbr",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6UXTNWMCQ0nSlwwx"
  },
  weightlessContents: {
    label: "DND5R.Item.Property.WeightlessContents"
  }
};
preLocalize("itemProperties", { keys: ["label", "abbreviation"], sort: true });

/* -------------------------------------------- */

/**
 * The various properties of an item per item type.
 * @enum {object}
 */
DND5R.validProperties = {
  consumable: new Set([
    "mgc"
  ]),
  container: new Set([
    "mgc",
    "weightlessContents"
  ]),
  equipment: new Set([
    "ada",
    "foc",
    "mgc",
    "stealthDisadvantage"
  ]),
  feat: new Set([
    "mgc"
  ]),
  loot: new Set([
    "mgc"
  ]),
  weapon: new Set([
    "ada",
    "amm",
    "fin",
    "fir",
    "foc",
    "hvy",
    "lgt",
    "lod",
    "mgc",
    "rch",
    "rel",
    "ret",
    "sil",
    "spc",
    "thr",
    "two",
    "ver"
  ]),
  spell: new Set([
    "vocal",
    "somatic",
    "material",
    "concentration",
    "ritual"
  ]),
  tool: new Set([
    "mgc"
  ])
};

/* -------------------------------------------- */

/**
 * Configuration data for an item with the "loot" type.
 *
 * @typedef {object} LootTypeConfiguration
 * @property {string} label                       Localized label for this type.
 */

/**
 * Types of "loot" items.
 * @enum {LootTypeConfiguration}
 */
DND5R.lootTypes = {
  art: {
    label: "DND5R.Loot.Art"
  },
  gear: {
    label: "DND5R.Loot.Gear"
  },
  gem: {
    label: "DND5R.Loot.Gem"
  },
  junk: {
    label: "DND5R.Loot.Junk"
  },
  material: {
    label: "DND5R.Loot.Material"
  },
  resource: {
    label: "DND5R.Loot.Resource"
  },
  treasure: {
    label: "DND5R.Loot.Treasure"
  }
};
preLocalize("lootTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * @typedef {object} CurrencyConfiguration
 * @property {string} label         Localized label for the currency.
 * @property {string} abbreviation  Localized abbreviation for the currency.
 * @property {number} conversion    Number by which this currency should be multiplied to arrive at a standard value.
 * @property {string} icon          Icon representing the currency in the interface.
 */

/**
 * The valid currency denominations with localized labels, abbreviations, and conversions.
 * The conversion number defines how many of that currency are equal to one GP.
 * @enum {CurrencyConfiguration}
 */
DND5R.currencies = {
  pp: {
    label: "DND5R.CurrencyPP",
    abbreviation: "DND5R.CurrencyAbbrPP",
    conversion: 0.1,
    icon: "systems/dnd5r/icons/currency/platinum.webp"
  },
  gp: {
    label: "DND5R.CurrencyGP",
    abbreviation: "DND5R.CurrencyAbbrGP",
    conversion: 1,
    icon: "systems/dnd5r/icons/currency/gold.webp"
  },
  ep: {
    label: "DND5R.CurrencyEP",
    abbreviation: "DND5R.CurrencyAbbrEP",
    conversion: 2,
    icon: "systems/dnd5r/icons/currency/electrum.webp"
  },
  sp: {
    label: "DND5R.CurrencySP",
    abbreviation: "DND5R.CurrencyAbbrSP",
    conversion: 10,
    icon: "systems/dnd5r/icons/currency/silver.webp"
  },
  cp: {
    label: "DND5R.CurrencyCP",
    abbreviation: "DND5R.CurrencyAbbrCP",
    conversion: 100,
    icon: "systems/dnd5r/icons/currency/copper.webp"
  }
};
preLocalize("currencies", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * @typedef CraftingConfiguration
 * @property {CraftingCostsMultiplier} consumable        Discounts for crafting a magical consumable.
 * @property {Record<string, CraftingCosts>} exceptions  Crafting costs for items that are exception to the general
 *                                                       crafting rules, by identifier.
 * @property {Record<string, CraftingCosts>} magic       Magic item crafting costs by rarity.
 * @property {CraftingCostsMultiplier} mundane           Multipliers for crafting mundane items.
 * @property {Record<number, CraftingCosts>} scrolls     Crafting costs for spell scrolls by level.
 */

/**
 * @typedef CraftingCostsMultiplier
 * @property {number} days  The days multiplier.
 * @property {number} gold  The gold multiplier.
 */

/**
 * @typedef CraftingCosts
 * @property {number} days  The number of days required to craft the item, not including its base item.
 * @property {number} gold  The amount of gold required for the raw materials, not including the base item.
 */

/**
 * Configuration data for crafting costs.
 * @type {CraftingConfiguration}
 */
DND5R.crafting = {
  consumable: {
    days: .5,
    gold: .5
  },
  exceptions: {
    "potion-of-healing": {
      days: 1,
      gold: 25
    }
  },
  magic: {
    common: {
      days: 5,
      gold: 50
    },
    uncommon: {
      days: 10,
      gold: 200
    },
    rare: {
      days: 50,
      gold: 2_000
    },
    veryRare: {
      days: 125,
      gold: 20_000
    },
    legendary: {
      days: 250,
      gold: 100_000
    }
  },
  mundane: {
    days: .1,
    gold: .5
  },
  scrolls: {
    0: {
      days: 1,
      gold: 15
    },
    1: {
      days: 1,
      gold: 25
    },
    2: {
      days: 3,
      gold: 100
    },
    3: {
      days: 5,
      gold: 150
    },
    4: {
      days: 10,
      gold: 1_000
    },
    5: {
      days: 25,
      gold: 1_500
    },
    6: {
      days: 40,
      gold: 10_000
    },
    7: {
      days: 50,
      gold: 12_500
    },
    8: {
      days: 60,
      gold: 15_000
    },
    9: {
      days: 120,
      gold: 50_000
    }
  }
};

/* -------------------------------------------- */
/*  Damage                                      */
/* -------------------------------------------- */

/**
 * Standard dice spread available for things like damage.
 * @type {number[]}
 */
DND5R.dieSteps = [4, 6, 8, 10, 12, 20, 100];

/* -------------------------------------------- */

/**
 * Methods by which damage scales relative to the overall scaling increase.
 * @enum {{ label: string }}
 */
DND5R.damageScalingModes = {
  whole: {
    label: "DND5R.DAMAGE.Scaling.Whole"
  },
  half: {
    label: "DND5R.DAMAGE.Scaling.Half"
  }
};
preLocalize("damageScalingModes", { key: "label" });

/* -------------------------------------------- */

/**
 * Configuration data for damage types.
 *
 * @typedef {object} DamageTypeConfiguration
 * @property {string} label          Localized label.
 * @property {string} icon           Icon representing this type.
 * @property {boolean} [isPhysical]  Is this a type that can be bypassed by magical or silvered weapons?
 * @property {string} [reference]    Reference to a rule page describing this damage type.
 * @property {Color} [color]         Visual color of the damage type.
 */

/**
 * Types of damage the can be caused by abilities.
 * @enum {DamageTypeConfiguration}
 */
DND5R.damageTypes = {
  acid: {
    label: "DND5R.DamageAcid",
    icon: "systems/dnd5r/icons/svg/damage/acid.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.IQhbKRPe1vCPdh8v",
    color: new Color(0x839D50)
  },
  bludgeoning: {
    label: "DND5R.DamageBludgeoning",
    icon: "systems/dnd5r/icons/svg/damage/bludgeoning.svg",
    isPhysical: true,
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.39LFrlef94JIYO8m",
    color: new Color(0x0000A0)
  },
  cold: {
    label: "DND5R.DamageCold",
    icon: "systems/dnd5r/icons/svg/damage/cold.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4xsFUooHDEdfhw6g",
    color: new Color(0xADD8E6)
  },
  fire: {
    label: "DND5R.DamageFire",
    icon: "systems/dnd5r/icons/svg/damage/fire.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.f1S66aQJi4PmOng6",
    color: new Color(0xFF4500)
  },
  force: {
    label: "DND5R.DamageForce",
    icon: "systems/dnd5r/icons/svg/damage/force.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.eFTWzngD8dKWQuUR",
    color: new Color(0x800080)
  },
  lightning: {
    label: "DND5R.DamageLightning",
    icon: "systems/dnd5r/icons/svg/damage/lightning.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9SaxFJ9bM3SutaMC",
    color: new Color(0x1E90FF)
  },
  necrotic: {
    label: "DND5R.DamageNecrotic",
    icon: "systems/dnd5r/icons/svg/damage/necrotic.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.klOVUV5G1U7iaKoG",
    color: new Color(0x006400)
  },
  piercing: {
    label: "DND5R.DamagePiercing",
    icon: "systems/dnd5r/icons/svg/damage/piercing.svg",
    isPhysical: true,
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.95agSnEGTdAmKhyC",
    color: new Color(0xC0C0C0)
  },
  poison: {
    label: "DND5R.DamagePoison",
    icon: "systems/dnd5r/icons/svg/damage/poison.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.k5wOYXdWPzcWwds1",
    color: new Color(0x8A2BE2)
  },
  psychic: {
    label: "DND5R.DamagePsychic",
    icon: "systems/dnd5r/icons/svg/damage/psychic.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.YIKbDv4zYqbE5teJ",
    color: new Color(0xFF1493)
  },
  radiant: {
    label: "DND5R.DamageRadiant",
    icon: "systems/dnd5r/icons/svg/damage/radiant.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5tcK9buXWDOw8yHH",
    color: new Color(0xFFD700)
  },
  slashing: {
    label: "DND5R.DamageSlashing",
    icon: "systems/dnd5r/icons/svg/damage/slashing.svg",
    isPhysical: true,
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.sz2XKQ5lgsdPEJOa",
    color: new Color(0x8B0000)
  },
  thunder: {
    label: "DND5R.DamageThunder",
    icon: "systems/dnd5r/icons/svg/damage/thunder.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iqsmMHk7FSpiNkQy",
    color: new Color(0x708090)
  }
};
preLocalize("damageTypes", { keys: ["label"], sort: true });

/* -------------------------------------------- */

/**
 * Display aggregated damage in chat cards.
 * @type {boolean}
 */
DND5R.aggregateDamageDisplay = true;

/* -------------------------------------------- */
/*  Movement                                    */
/* -------------------------------------------- */

/**
 * Different types of healing that can be applied using abilities.
 * @enum {string}
 */
DND5R.healingTypes = {
  healing: {
    label: "DND5R.Healing",
    icon: "systems/dnd5r/icons/svg/damage/healing.svg",
    color: new Color(0x46C252)
  },
  temphp: {
    label: "DND5R.HealingTemp",
    icon: "systems/dnd5r/icons/svg/damage/temphp.svg",
    color: new Color(0x4B66DE)
  }
};
preLocalize("healingTypes", { keys: ["label"] });

/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
DND5R.movementTypes = {
  burrow: "DND5R.MovementBurrow",
  climb: "DND5R.MovementClimb",
  fly: "DND5R.MovementFly",
  swim: "DND5R.MovementSwim",
  walk: "DND5R.MovementWalk"
};
preLocalize("movementTypes", { sort: true });

/* -------------------------------------------- */
/*  Measurement                                 */
/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
DND5R.movementUnits = {
  ft: "DND5R.DistFt",
  mi: "DND5R.DistMi",
  m: "DND5R.DistM",
  km: "DND5R.DistKm"
};
preLocalize("movementUnits");

/* -------------------------------------------- */

/**
 * The types of range that are used for measuring actions and effects.
 * @enum {string}
 */
DND5R.rangeTypes = {
  self: "DND5R.DistSelf",
  touch: "DND5R.DistTouch",
  spec: "DND5R.Special",
  any: "DND5R.DistAny"
};
preLocalize("rangeTypes");

/* -------------------------------------------- */

/**
 * The valid units of measure for the range of an action or effect. A combination of `DND5R.movementUnits` and
 * `DND5R.rangeUnits`.
 * @enum {string}
 */
DND5R.distanceUnits = {
  ...DND5R.movementUnits,
  ...DND5R.rangeTypes
};
preLocalize("distanceUnits");

/* -------------------------------------------- */

/**
 * Configuration data for a weight unit.
 *
 * @typedef {object} WeightUnitConfiguration
 * @property {string} label         Localized label for the unit.
 * @property {string} abbreviation  Localized abbreviation for the unit.
 * @property {number} conversion    Number that by which this unit should be multiplied to arrive at a standard value.
 * @property {string} type          Whether this is an "imperial" or "metric" unit.
 */

/**
 * The valid units for measurement of weight.
 * @enum {WeightUnitConfiguration}
 */
DND5R.weightUnits = {
  lb: {
    label: "DND5R.WeightUnit.Pounds.Label",
    abbreviation: "DND5R.WeightUnit.Pounds.Abbreviation",
    conversion: 1,
    type: "imperial"
  },
  tn: {
    label: "DND5R.WeightUnit.Tons.Label",
    abbreviation: "DND5R.WeightUnit.Tons.Abbreviation",
    conversion: 2000,
    type: "imperial"
  },
  kg: {
    label: "DND5R.WeightUnit.Kilograms.Label",
    abbreviation: "DND5R.WeightUnit.Kilograms.Abbreviation",
    conversion: 2.5,
    type: "metric"
  },
  Mg: {
    label: "DND5R.WeightUnit.Megagrams.Label",
    abbreviation: "DND5R.WeightUnit.Megagrams.Abbreviation",
    conversion: 2500,
    type: "metric"
  }
};
preLocalize("weightUnits", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Encumbrance configuration data.
 *
 * @typedef {object} EncumbranceConfiguration
 * @property {Record<string, number>} currencyPerWeight  Pieces of currency that equal a base weight (lbs or kgs).
 * @property {Record<string, object>} effects            Data used to create encumbrance-related Active Effects.
 * @property {object} threshold                          Amount to multiply strength to get given capacity threshold.
 * @property {Record<string, number>} threshold.encumbered
 * @property {Record<string, number>} threshold.heavilyEncumbered
 * @property {Record<string, number>} threshold.maximum
 * @property {Record<string, {ft: number, m: number}>} speedReduction  Speed reduction caused by encumbered status.
 * @property {Record<string, number>} vehicleWeightMultiplier  Multiplier used to determine vehicle carrying capacity.
 * @property {Record<string, Record<string, string>>} baseUnits  Base units used to calculate carrying weight.
 */

/**
 * Configure aspects of encumbrance calculation so that it could be configured by modules.
 * @type {EncumbranceConfiguration}
 */
DND5R.encumbrance = {
  currencyPerWeight: {
    imperial: 50,
    metric: 110
  },
  effects: {
    encumbered: {
      name: "EFFECT.DND5R.StatusEncumbered",
      icon: "systems/dnd5r/icons/svg/statuses/encumbered.svg"
    },
    heavilyEncumbered: {
      name: "EFFECT.DND5R.StatusHeavilyEncumbered",
      icon: "systems/dnd5r/icons/svg/statuses/heavily-encumbered.svg"
    },
    exceedingCarryingCapacity: {
      name: "EFFECT.DND5R.StatusExceedingCarryingCapacity",
      icon: "systems/dnd5r/icons/svg/statuses/exceeding-carrying-capacity.svg"
    }
  },
  threshold: {
    encumbered: {
      imperial: 5,
      metric: 2.5
    },
    heavilyEncumbered: {
      imperial: 10,
      metric: 5
    },
    maximum: {
      imperial: 15,
      metric: 7.5
    }
  },
  speedReduction: {
    encumbered: {
      ft: 10,
      m: 3
    },
    heavilyEncumbered: {
      ft: 20,
      m: 6
    },
    exceedingCarryingCapacity: {
      ft: 5,
      m: 1.5
    }
  },
  baseUnits: {
    default: {
      imperial: "lb",
      metric: "kg"
    },
    vehicle: {
      imperial: "tn",
      metric: "Mg"
    }
  }
};
preLocalize("encumbrance.effects", { key: "name" });

/* -------------------------------------------- */
/*  Targeting                                   */
/* -------------------------------------------- */

/**
 * Targeting types that apply to one or more distinct targets.
 * @enum {string}
 */
DND5R.individualTargetTypes = {
  self: "DND5R.TargetSelf",
  ally: "DND5R.TargetAlly",
  enemy: "DND5R.TargetEnemy",
  creature: "DND5R.TargetCreature",
  object: "DND5R.TargetObject",
  space: "DND5R.TargetSpace",
  creatureOrObject: "DND5R.TargetCreatureOrObject",
  any: "DND5R.TargetAny",
  willing: "DND5R.TargetWilling"
};
preLocalize("individualTargetTypes");

/* -------------------------------------------- */

/**
 * Information needed to represent different area of effect target types.
 *
 * @typedef {object} AreaTargetDefinition
 * @property {string} label        Localized label for this type.
 * @property {string} template     Type of `MeasuredTemplate` create for this target type.
 * @property {string} [reference]  Reference to a rule page describing this area of effect.
 * @property {string[]} [sizes]    List of available sizes for this template. Options are chosen from the list:
 *                                 "radius", "width", "height", "length", "thickness". No more than 3 dimensions may
 *                                 be specified.
 * @property {boolean} [standard]  Is this a standard area of effect as defined explicitly by the rules?
 */

/**
 * Targeting types that cover an area.
 * @enum {AreaTargetDefinition}
 */
DND5R.areaTargetTypes = {
  circle: {
    label: "DND5R.TargetCircle",
    template: "circle",
    sizes: ["radius"]
  },
  cone: {
    label: "DND5R.TargetCone",
    template: "cone",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DqqAOr5JnX71OCOw",
    sizes: ["length"],
    standard: true
  },
  cube: {
    label: "DND5R.TargetCube",
    template: "rect",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.dRfDIwuaHmUQ06uA",
    sizes: ["width"],
    standard: true
  },
  cylinder: {
    label: "DND5R.TargetCylinder",
    template: "circle",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jZFp4R7tXsIqkiG3",
    sizes: ["radius", "height"],
    standard: true
  },
  line: {
    label: "DND5R.TargetLine",
    template: "ray",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6DOoBgg7okm9gBc6",
    sizes: ["length", "width"],
    standard: true
  },
  radius: {
    label: "DND5R.TargetRadius",
    template: "circle",
    standard: true
  },
  sphere: {
    label: "DND5R.TargetSphere",
    template: "circle",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.npdEWb2egUPnB5Fa",
    sizes: ["radius"],
    standard: true
  },
  square: {
    label: "DND5R.TargetSquare",
    template: "rect",
    sizes: ["width"]
  },
  wall: {
    label: "DND5R.TargetWall",
    template: "ray",
    sizes: ["length", "thickness", "height"]
  }
};
preLocalize("areaTargetTypes", { key: "label", sort: true });

Object.defineProperty(DND5R, "areaTargetOptions", {
  get() {
    const { primary, secondary } = Object.entries(this.areaTargetTypes).reduce((obj, [value, data]) => {
      const entry = { value, label: data.label };
      if ( data.standard ) obj.primary.push(entry);
      else obj.secondary.push(entry);
      return obj;
    }, { primary: [], secondary: [] });
    return [{ value: "", label: "" }, ...primary, { rule: true }, ...secondary];
  }
});

/* -------------------------------------------- */

/**
 * The types of single or area targets which can be applied to abilities.
 * @enum {string}
 */
DND5R.targetTypes = {
  ...DND5R.individualTargetTypes,
  ...Object.fromEntries(Object.entries(DND5R.areaTargetTypes).map(([k, v]) => [k, v.label]))
};
preLocalize("targetTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Denominations of hit dice which can apply to classes.
 * @type {string[]}
 */
DND5R.hitDieTypes = ["d4", "d6", "d8", "d10", "d12"];

/* -------------------------------------------- */

/**
 * Configuration data for rest types.
 *
 * @typedef {object} RestConfiguration
 * @property {Record<string, number>} duration    Duration of different rest variants in minutes.
 * @property {boolean} recoverHitDice             Should hit dice be recovered during this rest?
 * @property {boolean} recoverHitPoints           Should hit points be recovered during this rest?
 * @property {string[]} recoverPeriods            What recovery periods should be applied when this rest is taken. The
 *                                                ordering of the periods determines which is applied if more than one
 *                                                recovery profile is found.
 * @property {Set<string>} recoverSpellSlotTypes  Types of spellcasting slots to recover during this rest.
 */

/**
 * Types of rests.
 * @enum {RestConfiguration}
 */
DND5R.restTypes = {
  short: {
    duration: {
      normal: 60,
      gritty: 480,
      epic: 1
    },
    recoverPeriods: ["sr"],
    recoverSpellSlotTypes: new Set(["pact"])
  },
  long: {
    duration: {
      normal: 480,
      gritty: 10080,
      epic: 60
    },
    recoverHitDice: true,
    recoverHitPoints: true,
    recoverPeriods: ["lr", "sr"],
    recoverSpellSlotTypes: new Set(["leveled", "pact"])
  }
};

/* -------------------------------------------- */

/**
 * The set of possible sensory perception types which an Actor may have.
 * @enum {string}
 */
DND5R.senses = {
  blindsight: "DND5R.SenseBlindsight",
  darkvision: "DND5R.SenseDarkvision",
  tremorsense: "DND5R.SenseTremorsense",
  truesight: "DND5R.SenseTruesight"
};
preLocalize("senses", { sort: true });

/* -------------------------------------------- */
/*  Attacks                                     */
/* -------------------------------------------- */

/**
 * Classifications of attacks based on what is performing them.
 * @enum {{ label: string }}
 */
DND5R.attackClassifications = {
  weapon: {
    label: "DND5R.ATTACK.Classification.Weapon"
  },
  spell: {
    label: "DND5R.ATTACK.Classification.Spell"
  },
  unarmed: {
    label: "DND5R.ATTACK.Classification.Unarmed"
  }
};
preLocalize("attackClassifications", { key: "label" });

/* -------------------------------------------- */

/**
 * Types of attacks based on range.
 * @enum {{ label: string }}
 */
DND5R.attackTypes = Object.seal({
  melee: {
    label: "DND5R.ATTACK.Type.Melee"
  },
  ranged: {
    label: "DND5R.ATTACK.Type.Ranged"
  }
});
preLocalize("attackTypes", { key: "label" });

/* -------------------------------------------- */
/*  Spellcasting                                */
/* -------------------------------------------- */

/**
 * Define the standard slot progression by character level.
 * The entries of this array represent the spell slot progression for a full spell-caster.
 * @type {number[][]}
 */
DND5R.SPELL_SLOT_TABLE = [
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1]
];

/* -------------------------------------------- */

/**
 * Configuration data for pact casting progression.
 *
 * @typedef {object} PactProgressionConfig
 * @property {number} slots  Number of spell slots granted.
 * @property {number} level  Level of spells that can be cast.
 */

/**
 * Define the pact slot & level progression by pact caster level.
 * @enum {PactProgressionConfig}
 */
DND5R.pactCastingProgression = {
  1: { slots: 1, level: 1 },
  2: { slots: 2, level: 1 },
  3: { slots: 2, level: 2 },
  5: { slots: 2, level: 3 },
  7: { slots: 2, level: 4 },
  9: { slots: 2, level: 5 },
  11: { slots: 3, level: 5 },
  17: { slots: 4, level: 5 }
};

/* -------------------------------------------- */

/**
 * Configuration data for spell preparation modes.
 *
 * @typedef {object} SpellPreparationModeConfiguration
 * @property {string} label           Localized name of this spell preparation type.
 * @property {boolean} [upcast]       Whether this preparation mode allows for upcasting.
 * @property {boolean} [cantrips]     Whether this mode allows for cantrips in a spellbook.
 * @property {number} [order]         The sort order of this mode in a spellbook.
 * @property {boolean} [prepares]     Whether this preparation mode prepares spells.
 */

/**
 * Various different ways a spell can be prepared.
 * @enum {SpellPreparationModeConfiguration}
 */
DND5R.spellPreparationModes = {
  prepared: {
    label: "DND5R.SpellPrepPrepared",
    upcast: true,
    prepares: true
  },
  pact: {
    label: "DND5R.PactMagic",
    upcast: true,
    cantrips: true,
    order: 0.5
  },
  always: {
    label: "DND5R.SpellPrepAlways",
    upcast: true,
    prepares: true
  },
  atwill: {
    label: "DND5R.SpellPrepAtWill",
    order: -30
  },
  innate: {
    label: "DND5R.SpellPrepInnate",
    order: -20
  },
  ritual: {
    label: "DND5R.SpellPrepRitual",
    order: -10
  }
};
preLocalize("spellPreparationModes", { key: "label" });

/* -------------------------------------------- */

/**
 * Configuration data for different types of spellcasting supported.
 *
 * @typedef {object} SpellcastingTypeConfiguration
 * @property {string} label                               Localized label.
 * @property {string} img                                 Image used when rendered as a favorite on the sheet.
 * @property {boolean} [shortRest]                        Are these spell slots additionally restored on a short rest?
 * @property {Object<string, SpellcastingProgressionConfiguration>} [progression]  Any progression modes for this type.
 */

/**
 * Configuration data for a spellcasting progression mode.
 *
 * @typedef {object} SpellcastingProgressionConfiguration
 * @property {string} label             Localized label.
 * @property {number} [divisor=1]       Value by which the class levels are divided to determine spellcasting level.
 * @property {boolean} [roundUp=false]  Should fractional values should be rounded up by default?
 */

/**
 * Different spellcasting types and their progression.
 * @type {SpellcastingTypeConfiguration}
 */
DND5R.spellcastingTypes = {
  leveled: {
    label: "DND5R.SpellProgLeveled",
    img: "systems/dnd5r/icons/spell-tiers/{id}.webp",
    progression: {
      full: {
        label: "DND5R.SpellProgFull",
        divisor: 1
      },
      half: {
        label: "DND5R.SpellProgHalf",
        divisor: 2,
        roundUp: true
      },
      third: {
        label: "DND5R.SpellProgThird",
        divisor: 3
      },
      artificer: {
        label: "DND5R.SpellProgArt",
        divisor: 2,
        roundUp: true
      }
    }
  },
  pact: {
    label: "DND5R.SpellProgPact",
    img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
    shortRest: true
  }
};
preLocalize("spellcastingTypes", { key: "label", sort: true });
preLocalize("spellcastingTypes.leveled.progression", { key: "label" });

/* -------------------------------------------- */

/**
 * Ways in which a class can contribute to spellcasting levels.
 * @enum {string}
 */
DND5R.spellProgression = {
  none: "DND5R.SpellNone",
  full: "DND5R.SpellProgFull",
  half: "DND5R.SpellProgHalf",
  third: "DND5R.SpellProgThird",
  pact: "DND5R.SpellProgPact",
  artificer: "DND5R.SpellProgArt"
};
preLocalize("spellProgression", { key: "label" });

/* -------------------------------------------- */

/**
 * Valid spell levels.
 * @enum {string}
 */
DND5R.spellLevels = {
  0: "DND5R.SpellLevel0",
  1: "DND5R.SpellLevel1",
  2: "DND5R.SpellLevel2",
  3: "DND5R.SpellLevel3",
  4: "DND5R.SpellLevel4",
  5: "DND5R.SpellLevel5",
  6: "DND5R.SpellLevel6",
  7: "DND5R.SpellLevel7",
  8: "DND5R.SpellLevel8",
  9: "DND5R.SpellLevel9"
};
preLocalize("spellLevels");

/* -------------------------------------------- */

/**
 * The available choices for how spell damage scaling may be computed.
 * @enum {string}
 */
DND5R.spellScalingModes = {
  none: "DND5R.SpellNone",
  cantrip: "DND5R.SpellCantrip",
  level: "DND5R.SpellLevel"
};
preLocalize("spellScalingModes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration data for spell schools.
 *
 * @typedef {object} SpellSchoolConfiguration
 * @property {string} label        Localized label.
 * @property {string} icon         Spell school icon.
 * @property {string} fullKey      Fully written key used as alternate for enrichers.
 * @property {string} [reference]  Reference to a rule page describing this school.
 */

/**
 * Schools to which a spell can belong.
 * @enum {SpellSchoolConfiguration}
 */
DND5R.spellSchools = {
  abj: {
    label: "DND5R.SchoolAbj",
    icon: "systems/dnd5r/icons/svg/schools/abjuration.svg",
    fullKey: "abjuration",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.849AYEWw9FHD6JNz"
  },
  con: {
    label: "DND5R.SchoolCon",
    icon: "systems/dnd5r/icons/svg/schools/conjuration.svg",
    fullKey: "conjuration",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TWyKMhZJZGqQ6uls"
  },
  div: {
    label: "DND5R.SchoolDiv",
    icon: "systems/dnd5r/icons/svg/schools/divination.svg",
    fullKey: "divination",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HoD2MwzmVbMqj9se"
  },
  enc: {
    label: "DND5R.SchoolEnc",
    icon: "systems/dnd5r/icons/svg/schools/enchantment.svg",
    fullKey: "enchantment",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.SehPXk24ySBVOwCZ"
  },
  evo: {
    label: "DND5R.SchoolEvo",
    icon: "systems/dnd5r/icons/svg/schools/evocation.svg",
    fullKey: "evocation",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kGp1RNuxL2SELLRC"
  },
  ill: {
    label: "DND5R.SchoolIll",
    icon: "systems/dnd5r/icons/svg/schools/illusion.svg",
    fullKey: "illusion",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.smEk7kvVyslFozrB"
  },
  nec: {
    label: "DND5R.SchoolNec",
    icon: "systems/dnd5r/icons/svg/schools/necromancy.svg",
    fullKey: "necromancy",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.W0eyiV1FBmngb6Qh"
  },
  trs: {
    label: "DND5R.SchoolTrs",
    icon: "systems/dnd5r/icons/svg/schools/transmutation.svg",
    fullKey: "transmutation",
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.IYWewSailtmv6qEb"
  }
};
preLocalize("spellSchools", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Types of spell lists.
 * @enum {string}
 */
DND5R.spellListTypes = {
  class: "TYPES.Item.class",
  subclass: "TYPES.Item.subclass",
  background: "TYPES.Item.background",
  race: "TYPES.Item.race",
  other: "JOURNALENTRYPAGE.DND5R.SpellList.Type.Other"
};
preLocalize("spellListTypes");

/* -------------------------------------------- */

/**
 * Spell scroll item ID within the `DND5R.sourcePacks` compendium or a full UUID for each spell level.
 * @enum {string}
 */
DND5R.spellScrollIds = {
  0: "rQ6sO7HDWzqMhSI3",
  1: "9GSfMg0VOA2b4uFN",
  2: "XdDp6CKh9qEvPTuS",
  3: "hqVKZie7x9w3Kqds",
  4: "DM7hzgL836ZyUFB1",
  5: "wa1VF8TXHmkrrR35",
  6: "tI3rWx4bxefNCexS",
  7: "mtyw4NS1s7j2EJaD",
  8: "aOrinPg7yuDZEuWr",
  9: "O4YbkJkLlnsgUszZ"
};

/* -------------------------------------------- */

/**
 * @typedef {object} SpellScrollValues
 * @property {number} bonus  Attack to hit bonus.
 * @property {number} dc     Saving throw DC.
 */

/**
 * Spell scroll save DCs and attack bonus values based on spell level. If matching level isn't found,
 * then the nearest level lower than it will be selected.
 * @enum {SpellScrollValues}
 */
DND5R.spellScrollValues = {
  0: { dc: 13, bonus: 5 },
  3: { dc: 15, bonus: 7 },
  5: { dc: 17, bonus: 9 },
  7: { dc: 18, bonus: 10 },
  9: { dc: 19, bonus: 11 }
};

/* -------------------------------------------- */

/**
 * Compendium packs used for localized items.
 * @enum {string}
 */
DND5R.sourcePacks = {
  BACKGROUNDS: "dnd5r.backgrounds",
  CLASSES: "dnd5r.classes",
  ITEMS: "dnd5r.items",
  RACES: "dnd5r.races"
};

/* -------------------------------------------- */

/**
 * Settings to configure how actors are merged when polymorphing is applied.
 * @enum {string}
 */
DND5R.polymorphSettings = {
  keepPhysical: "DND5R.PolymorphKeepPhysical",
  keepMental: "DND5R.PolymorphKeepMental",
  keepSaves: "DND5R.PolymorphKeepSaves",
  keepSkills: "DND5R.PolymorphKeepSkills",
  mergeSaves: "DND5R.PolymorphMergeSaves",
  mergeSkills: "DND5R.PolymorphMergeSkills",
  keepClass: "DND5R.PolymorphKeepClass",
  keepFeats: "DND5R.PolymorphKeepFeats",
  keepSpells: "DND5R.PolymorphKeepSpells",
  keepItems: "DND5R.PolymorphKeepItems",
  keepBio: "DND5R.PolymorphKeepBio",
  keepVision: "DND5R.PolymorphKeepVision",
  keepSelf: "DND5R.PolymorphKeepSelf",
  keepType: "DND5R.PolymorphKeepType",
  keepHP: "DND5R.PolymorphKeepHP",
  addTemp: "DND5R.PolymorphAddTemp"
};
preLocalize("polymorphSettings", { sort: true });

/**
 * Settings to configure how actors are effects are merged when polymorphing is applied.
 * @enum {string}
 */
DND5R.polymorphEffectSettings = {
  keepAE: "DND5R.PolymorphKeepAE",
  keepOtherOriginAE: "DND5R.PolymorphKeepOtherOriginAE",
  keepOriginAE: "DND5R.PolymorphKeepOriginAE",
  keepEquipmentAE: "DND5R.PolymorphKeepEquipmentAE",
  keepFeatAE: "DND5R.PolymorphKeepFeatureAE",
  keepSpellAE: "DND5R.PolymorphKeepSpellAE",
  keepClassAE: "DND5R.PolymorphKeepClassAE",
  keepBackgroundAE: "DND5R.PolymorphKeepBackgroundAE"
};
preLocalize("polymorphEffectSettings", { sort: true });

/**
 * Settings to configure how actors are merged when preset polymorphing is applied.
 * @enum {object}
 */
DND5R.transformationPresets = {
  wildshape: {
    icon: '<i class="fas fa-paw"></i>',
    label: "DND5R.PolymorphWildShape",
    options: {
      keepBio: true,
      keepClass: true,
      keepFeats: true,
      keepHP: true,
      keepMental: true,
      keepType: true,
      mergeSaves: true,
      mergeSkills: true,
      keepEquipmentAE: false,
      preset: "wildshape"
    }
  },
  polymorph: {
    icon: '<i class="fas fa-pastafarianism"></i>',
    label: "DND5R.Polymorph",
    options: {
      addTemp: true,
      keepHP: true,
      keepType: true,
      keepEquipmentAE: false,
      keepClassAE: false,
      keepFeatAE: false,
      keepBackgroundAE: false,
      preset: "polymorph"
    }
  },
  polymorphSelf: {
    icon: '<i class="fas fa-eye"></i>',
    label: "DND5R.PolymorphSelf",
    options: {
      keepSelf: true,
      preset: "polymorphSelf"
    }
  }
};
preLocalize("transformationPresets", { sort: true, keys: ["label"] });

/* -------------------------------------------- */

/**
 * Skill, ability, and tool proficiency levels.
 * The key for each level represents its proficiency multiplier.
 * @enum {string}
 */
DND5R.proficiencyLevels = {
  0: "DND5R.NotProficient",
  1: "DND5R.Proficient",
  0.5: "DND5R.HalfProficient",
  2: "DND5R.Expertise"
};
preLocalize("proficiencyLevels");

/* -------------------------------------------- */

/**
 * Weapon and armor item proficiency levels.
 * @enum {string}
 */
DND5R.weaponAndArmorProficiencyLevels = {
  0: "DND5R.NotProficient",
  1: "DND5R.Proficient"
};
preLocalize("weaponAndArmorProficiencyLevels");

/* -------------------------------------------- */

/**
 * The amount of cover provided by an object. In cases where multiple pieces
 * of cover are in play, we take the highest value.
 * @enum {string}
 */
DND5R.cover = {
  0: "DND5R.None",
  .5: "DND5R.CoverHalf",
  .75: "DND5R.CoverThreeQuarters",
  1: "DND5R.CoverTotal"
};
preLocalize("cover");

/* -------------------------------------------- */

/**
 * A selection of actor attributes that can be tracked on token resource bars.
 * @type {string[]}
 * @deprecated since v10
 */
DND5R.trackableAttributes = [
  "attributes.ac.value", "attributes.init.bonus", "attributes.movement", "attributes.senses", "attributes.spelldc",
  "attributes.spellLevel", "details.cr", "details.spellLevel", "details.xp.value", "skills.*.passive",
  "abilities.*.value"
];

/* -------------------------------------------- */

/**
 * A selection of actor and item attributes that are valid targets for item resource consumption.
 * @type {string[]}
 */
DND5R.consumableResources = [
  // Configured during init.
];

/* -------------------------------------------- */

/**
 * @typedef {object} _StatusEffectConfig5e
 * @property {string} icon              Icon used to represent the condition on the token.
 * @property {number} [order]           Order status to the start of the token HUD, rather than alphabetically.
 * @property {string} [reference]       UUID of a journal entry with details on this condition.
 * @property {string} [special]         Set this condition as a special status effect under this name.
 * @property {string[]} [riders]        Additional conditions, by id, to apply as part of this condition.
 * @property {string} [exclusiveGroup]  Any status effects with the same group will not be able to be applied at the
 *                                      same time through the token HUD (multiple statuses applied through other
 *                                      effects can still coexist).
 * @property {number} [coverBonus]      A bonus this condition provides to AC and dexterity saving throws.
 */

/**
 * Configuration data for system status effects.
 * @typedef {Omit<StatusEffectConfig, "img"> & _StatusEffectConfig5e} StatusEffectConfig5e
 */

/**
 * @typedef {object} _ConditionConfiguration
 * @property {string} label        Localized label for the condition.
 * @property {boolean} [pseudo]    Is this a pseudo-condition, i.e. one that does not appear in the conditions appendix
 *                                 but acts as a status effect?
 * @property {number} [levels]     The number of levels of exhaustion an actor can obtain.
 * @property {{ rolls: number, speed: number }} [reduction]  Amount D20 Tests & Speed are reduced per exhaustion level
 *                                                           when using the modern rules.
 */

/**
 * Configuration data for system conditions.
 * @typedef {Omit<StatusEffectConfig5e, "name"> & _ConditionConfiguration} ConditionConfiguration
 */

/**
 * Conditions that can affect an actor.
 * @enum {ConditionConfiguration}
 */
DND5R.conditionTypes = {
  bleeding: {
    label: "EFFECT.DND5R.StatusBleeding",
    icon: "systems/dnd5r/icons/svg/statuses/bleeding.svg",
    pseudo: true
  },
  blinded: {
    label: "DND5R.ConBlinded",
    icon: "systems/dnd5r/icons/svg/statuses/blinded.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.0b8N4FymGGfbZGpJ",
    special: "BLIND"
  },
  burning: {
    label: "EFFECT.DND5R.StatusBurning",
    icon: "systems/dnd5r/icons/svg/statuses/burning.svg",
    pseudo: true
  },
  charmed: {
    label: "DND5R.ConCharmed",
    icon: "systems/dnd5r/icons/svg/statuses/charmed.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.zZaEBrKkr66OWJvD"
  },
  cursed: {
    label: "EFFECT.DND5R.StatusCursed",
    icon: "systems/dnd5r/icons/svg/statuses/cursed.svg",
    pseudo: true
  },
  dehydration: {
    label: "EFFECT.DND5R.StatusDehydration",
    icon: "systems/dnd5r/icons/svg/statuses/dehydration.svg",
    pseudo: true
  },
  deafened: {
    label: "DND5R.ConDeafened",
    icon: "systems/dnd5r/icons/svg/statuses/deafened.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.6G8JSjhn701cBITY"
  },
  diseased: {
    label: "DND5R.ConDiseased",
    icon: "systems/dnd5r/icons/svg/statuses/diseased.svg",
    pseudo: true,
    reference: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oNQWvyRZkTOJ8PBq"
  },
  exhaustion: {
    label: "DND5R.ConExhaustion",
    icon: "systems/dnd5r/icons/svg/statuses/exhaustion.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cspWveykstnu3Zcv",
    levels: 6,
    reduction: { rolls: 2, speed: 5 }
  },
  falling: {
    label: "EFFECT.DND5R.StatusFalling",
    icon: "systems/dnd5r/icons/svg/statuses/falling.svg",
    pseudo: true
  },
  frightened: {
    label: "DND5R.ConFrightened",
    icon: "systems/dnd5r/icons/svg/statuses/frightened.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.oreoyaFKnvZCrgij"
  },
  grappled: {
    label: "DND5R.ConGrappled",
    icon: "systems/dnd5r/icons/svg/statuses/grappled.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.gYDAhd02ryUmtwZn"
  },
  incapacitated: {
    label: "DND5R.ConIncapacitated",
    icon: "systems/dnd5r/icons/svg/statuses/incapacitated.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.TpkZgLfxCmSndmpb"
  },
  invisible: {
    label: "DND5R.ConInvisible",
    icon: "systems/dnd5r/icons/svg/statuses/invisible.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.3UU5GCTVeRDbZy9u"
  },
  malnutrition: {
    label: "EFFECT.DND5R.StatusMalnutrition",
    icon: "systems/dnd5r/icons/svg/statuses/malnutrition.svg",
    pseudo: true
  },
  paralyzed: {
    label: "DND5R.ConParalyzed",
    icon: "systems/dnd5r/icons/svg/statuses/paralyzed.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xnSV5hLJIMaTABXP",
    statuses: ["incapacitated"]
  },
  petrified: {
    label: "DND5R.ConPetrified",
    icon: "systems/dnd5r/icons/svg/statuses/petrified.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xaNDaW6NwQTgHSmi",
    statuses: ["incapacitated"]
  },
  poisoned: {
    label: "DND5R.ConPoisoned",
    icon: "systems/dnd5r/icons/svg/statuses/poisoned.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.lq3TRI6ZlED8ABMx"
  },
  prone: {
    label: "DND5R.ConProne",
    icon: "systems/dnd5r/icons/svg/statuses/prone.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.y0TkcdyoZlOTmAFT"
  },
  restrained: {
    label: "DND5R.ConRestrained",
    icon: "systems/dnd5r/icons/svg/statuses/restrained.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cSVcyZyNe2iG1fIc"
  },
  silenced: {
    label: "EFFECT.DND5R.StatusSilenced",
    icon: "systems/dnd5r/icons/svg/statuses/silenced.svg",
    pseudo: true
  },
  stunned: {
    label: "DND5R.ConStunned",
    icon: "systems/dnd5r/icons/svg/statuses/stunned.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.ZyZMUwA2rboh4ObS",
    statuses: ["incapacitated"]
  },
  suffocation: {
    label: "EFFECT.DND5R.StatusSuffocation",
    icon: "systems/dnd5r/icons/svg/statuses/suffocation.svg",
    pseudo: true
  },
  surprised: {
    label: "EFFECT.DND5R.StatusSurprised",
    icon: "systems/dnd5r/icons/svg/statuses/surprised.svg",
    pseudo: true
  },
  transformed: {
    label: "EFFECT.DND5R.StatusTransformed",
    icon: "systems/dnd5r/icons/svg/statuses/transformed.svg",
    pseudo: true
  },
  unconscious: {
    label: "DND5R.ConUnconscious",
    icon: "systems/dnd5r/icons/svg/statuses/unconscious.svg",
    reference: "Compendium.dnd5r.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.UWw13ISmMxDzmwbd",
    statuses: ["incapacitated"],
    riders: ["prone"]
  }
};
preLocalize("conditionTypes", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Various effects of conditions and which conditions apply it. Either keys for the conditions,
 * and with a number appended for a level of exhaustion.
 * @enum {object}
 */
DND5R.conditionEffects = {
  noMovement: new Set(["exhaustion-5", "grappled", "paralyzed", "petrified", "restrained", "stunned", "unconscious"]),
  halfMovement: new Set(["exhaustion-2"]),
  crawl: new Set(["prone", "exceedingCarryingCapacity"]),
  petrification: new Set(["petrified"]),
  halfHealth: new Set(["exhaustion-4"])
};

/* -------------------------------------------- */

/**
 * Extra status effects not specified in `conditionTypes`. If the ID matches a core-provided effect, then this
 * data will be merged into the core data.
 * @enum {Omit<StatusEffectConfig5e, "img"> & { icon: string }}
 */
DND5R.statusEffects = {
  burrowing: {
    name: "EFFECT.DND5R.StatusBurrowing",
    icon: "systems/dnd5r/icons/svg/statuses/burrowing.svg",
    special: "BURROW"
  },
  concentrating: {
    name: "EFFECT.DND5R.StatusConcentrating",
    icon: "systems/dnd5r/icons/svg/statuses/concentrating.svg",
    special: "CONCENTRATING"
  },
  coverHalf: {
    name: "EFFECT.DND5R.StatusHalfCover",
    icon: "systems/dnd5r/icons/svg/statuses/cover-half.svg",
    order: 2,
    exclusiveGroup: "cover",
    coverBonus: 2
  },
  coverThreeQuarters: {
    name: "EFFECT.DND5R.StatusThreeQuartersCover",
    icon: "systems/dnd5r/icons/svg/statuses/cover-three-quarters.svg",
    order: 3,
    exclusiveGroup: "cover",
    coverBonus: 5
  },
  coverTotal: {
    name: "EFFECT.DND5R.StatusTotalCover",
    icon: "systems/dnd5r/icons/svg/statuses/cover-total.svg",
    order: 4,
    exclusiveGroup: "cover"
  },
  dead: {
    name: "EFFECT.DND5R.StatusDead",
    icon: "systems/dnd5r/icons/svg/statuses/dead.svg",
    special: "DEFEATED",
    order: 1
  },
  dodging: {
    name: "EFFECT.DND5R.StatusDodging",
    icon: "systems/dnd5r/icons/svg/statuses/dodging.svg"
  },
  ethereal: {
    name: "EFFECT.DND5R.StatusEthereal",
    icon: "systems/dnd5r/icons/svg/statuses/ethereal.svg"
  },
  flying: {
    name: "EFFECT.DND5R.StatusFlying",
    icon: "systems/dnd5r/icons/svg/statuses/flying.svg",
    special: "FLY"
  },
  hiding: {
    name: "EFFECT.DND5R.StatusHiding",
    icon: "systems/dnd5r/icons/svg/statuses/hiding.svg"
  },
  hovering: {
    name: "EFFECT.DND5R.StatusHovering",
    icon: "systems/dnd5r/icons/svg/statuses/hovering.svg",
    special: "HOVER"
  },
  marked: {
    name: "EFFECT.DND5R.StatusMarked",
    icon: "systems/dnd5r/icons/svg/statuses/marked.svg"
  },
  sleeping: {
    name: "EFFECT.DND5R.StatusSleeping",
    icon: "systems/dnd5r/icons/svg/statuses/sleeping.svg",
    statuses: ["incapacitated", "unconscious"]
  },
  stable: {
    name: "EFFECT.DND5R.StatusStable",
    icon: "systems/dnd5r/icons/svg/statuses/stable.svg"
  }
};

/* -------------------------------------------- */

/**
 * Configuration for the special bloodied status effect.
 * @type {{ name: string, icon: string, threshold: number }}
 */
DND5R.bloodied = {
  name: "EFFECT.DND5R.StatusBloodied",
  icon: "systems/dnd5r/icons/svg/statuses/bloodied.svg",
  threshold: .5
};

/* -------------------------------------------- */
/*  Languages                                   */
/* -------------------------------------------- */

/**
 * Languages a character can learn.
 * @enum {string}
 */
DND5R.languages = {
  standard: {
    label: "DND5R.LanguagesStandard",
    children: {
      common: "DND5R.LanguagesCommon",
      draconic: "DND5R.LanguagesDraconic",
      dwarvish: "DND5R.LanguagesDwarvish",
      elvish: "DND5R.LanguagesElvish",
      giant: "DND5R.LanguagesGiant",
      gnomish: "DND5R.LanguagesGnomish",
      goblin: "DND5R.LanguagesGoblin",
      halfling: "DND5R.LanguagesHalfling",
      orc: "DND5R.LanguagesOrc",
      sign: "DND5R.LanguagesCommonSign"
    }
  },
  exotic: {
    label: "DND5R.LanguagesExotic",
    children: {
      aarakocra: "DND5R.LanguagesAarakocra",
      abyssal: "DND5R.LanguagesAbyssal",
      cant: "DND5R.LanguagesThievesCant",
      celestial: "DND5R.LanguagesCelestial",
      deep: "DND5R.LanguagesDeepSpeech",
      druidic: "DND5R.LanguagesDruidic",
      gith: "DND5R.LanguagesGith",
      gnoll: "DND5R.LanguagesGnoll",
      infernal: "DND5R.LanguagesInfernal",
      primordial: {
        label: "DND5R.LanguagesPrimordial",
        children: {
          aquan: "DND5R.LanguagesAquan",
          auran: "DND5R.LanguagesAuran",
          ignan: "DND5R.LanguagesIgnan",
          terran: "DND5R.LanguagesTerran"
        }
      },
      sylvan: "DND5R.LanguagesSylvan",
      undercommon: "DND5R.LanguagesUndercommon"
    }
  }
};
preLocalize("languages", { key: "label" });
preLocalize("languages.standard.children", { key: "label", sort: true });
preLocalize("languages.exotic.children", { key: "label", sort: true });
preLocalize("languages.exotic.children.primordial.children", { sort: true });

/* -------------------------------------------- */

/**
 * Maximum allowed character level.
 * @type {number}
 */
DND5R.maxLevel = 20;

/**
 * Maximum ability score value allowed by default.
 * @type {number}
 */
DND5R.maxAbilityScore = 20;

/**
 * XP required to achieve each character level.
 * @type {number[]}
 */
DND5R.CHARACTER_EXP_LEVELS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

/**
 * XP granted for each challenge rating.
 * @type {number[]}
 */
DND5R.CR_EXP_LEVELS = [
  10, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000,
  20000, 22000, 25000, 33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000
];

/**
 * Intervals above the maximum XP that result in an epic boon.
 * @type {number}
 */
DND5R.epicBoonInterval = 30000;

/* -------------------------------------------- */

/**
 * Trait configuration information.
 *
 * @typedef {object} TraitConfiguration
 * @property {object} labels
 * @property {string} labels.title         Localization key for the trait name.
 * @property {string} labels.localization  Prefix for a localization key that can be used to generate various
 *                                         plural variants of the trait type.
 * @property {string} icon                 Path to the icon used to represent this trait.
 * @property {string} [actorKeyPath]       If the trait doesn't directly map to an entry as `traits.[key]`, where is
 *                                         this trait's data stored on the actor?
 * @property {string} [configKey]          If the list of trait options doesn't match the name of the trait, where can
 *                                         the options be found within `CONFIG.DND5R`?
 * @property {Boolean|Number} [dataType]   Type of data represented.
 * @property {string} [labelKeyPath]       If config is an enum of objects, where can the label be found?
 * @property {object} [subtypes]           Configuration for traits that take some sort of base item.
 * @property {string} [subtypes.keyPath]   Path to subtype value on base items, should match a category key.
 *                                         Deprecated in favor of the standardized `system.type.value`.
 * @property {string[]} [subtypes.ids]     Key for base item ID objects within `CONFIG.DND5R`.
 * @property {object} [children]           Mapping of category key to an object defining its children.
 * @property {boolean} [sortCategories]    Whether top-level categories should be sorted.
 * @property {boolean} [expertise]         Can an actor receive expertise in this trait?
 * @property {boolean} [mastery]           Can an actor receive mastery in this trait?
 */

/**
 * Configurable traits on actors.
 * @enum {TraitConfiguration}
 */
DND5R.traits = {
  saves: {
    labels: {
      title: "DND5R.ClassSaves",
      localization: "DND5R.TraitSavesPlural"
    },
    icon: "icons/magic/life/ankh-gold-blue.webp",
    actorKeyPath: "system.abilities",
    configKey: "abilities",
    labelKeyPath: "label"
  },
  skills: {
    labels: {
      title: "DND5R.Skills",
      localization: "DND5R.TraitSkillsPlural"
    },
    icon: "icons/tools/instruments/harp-yellow-teal.webp",
    actorKeyPath: "system.skills",
    labelKeyPath: "label",
    expertise: true
  },
  languages: {
    labels: {
      title: "DND5R.Languages",
      localization: "DND5R.TraitLanguagesPlural"
    },
    icon: "icons/skills/social/diplomacy-peace-alliance.webp"
  },
  armor: {
    labels: {
      title: "DND5R.TraitArmorProf",
      localization: "DND5R.TraitArmorPlural"
    },
    icon: "icons/equipment/chest/breastplate-helmet-metal.webp",
    actorKeyPath: "system.traits.armorProf",
    configKey: "armorProficiencies",
    subtypes: { keyPath: "armor.type", ids: ["armorIds", "shieldIds"] }
  },
  weapon: {
    labels: {
      title: "DND5R.TraitWeaponProf",
      localization: "DND5R.TraitWeaponPlural"
    },
    icon: "icons/skills/melee/weapons-crossed-swords-purple.webp",
    actorKeyPath: "system.traits.weaponProf",
    configKey: "weaponProficiencies",
    subtypes: { keyPath: "weaponType", ids: ["weaponIds"] },
    mastery: true
  },
  tool: {
    labels: {
      title: "DND5R.TraitToolProf",
      localization: "DND5R.TraitToolPlural"
    },
    icon: "icons/skills/trades/smithing-anvil-silver-red.webp",
    actorKeyPath: "system.tools",
    configKey: "toolProficiencies",
    subtypes: { keyPath: "toolType", ids: ["toolIds"] },
    children: { vehicle: "vehicleTypes" },
    sortCategories: true,
    expertise: true
  },
  di: {
    labels: {
      title: "DND5R.DamImm",
      localization: "DND5R.TraitDIPlural"
    },
    icon: "systems/dnd5r/icons/svg/trait-damage-immunities.svg",
    configKey: "damageTypes"
  },
  dr: {
    labels: {
      title: "DND5R.DamRes",
      localization: "DND5R.TraitDRPlural"
    },
    icon: "systems/dnd5r/icons/svg/trait-damage-resistances.svg",
    configKey: "damageTypes"
  },
  dv: {
    labels: {
      title: "DND5R.DamVuln",
      localization: "DND5R.TraitDVPlural"
    },
    icon: "systems/dnd5r/icons/svg/trait-damage-vulnerabilities.svg",
    configKey: "damageTypes"
  },
  dm: {
    labels: {
      title: "DND5R.DamMod",
      localization: "DND5R.TraitDMPlural"
    },
    configKey: "damageTypes",
    dataType: Number
  },
  ci: {
    labels: {
      title: "DND5R.ConImm",
      localization: "DND5R.TraitCIPlural"
    },
    icon: "systems/dnd5r/icons/svg/trait-condition-immunities.svg",
    configKey: "conditionTypes"
  }
};
preLocalize("traits", { key: "labels.title" });

/* -------------------------------------------- */

/**
 * Modes used within a trait advancement.
 * @enum {object}
 */
DND5R.traitModes = {
  default: {
    label: "DND5R.AdvancementTraitModeDefaultLabel",
    hint: "DND5R.AdvancementTraitModeDefaultHint"
  },
  expertise: {
    label: "DND5R.AdvancementTraitModeExpertiseLabel",
    hint: "DND5R.AdvancementTraitModeExpertiseHint"
  },
  forcedExpertise: {
    label: "DND5R.AdvancementTraitModeForceLabel",
    hint: "DND5R.AdvancementTraitModeForceHint"
  },
  upgrade: {
    label: "DND5R.AdvancementTraitModeUpgradeLabel",
    hint: "DND5R.AdvancementTraitModeUpgradeHint"
  },
  mastery: {
    label: "DND5R.AdvancementTraitModeMasteryLabel",
    hint: "DND5R.AdvancementTraitModeMasteryHint"
  }
};
preLocalize("traitModes", { keys: ["label", "hint"] });

/* -------------------------------------------- */

/**
 * @typedef {object} CharacterFlagConfig
 * @property {string} name
 * @property {string} hint
 * @property {string} section
 * @property {typeof boolean|string|number} type
 * @property {string} placeholder
 * @property {string[]} [abilities]
 * @property {Object<string, string>} [choices]
 * @property {string[]} [skills]
 */

/**
 * Special character flags.
 * @enum {CharacterFlagConfig}
 */
DND5R.characterFlags = {
  diamondSoul: {
    name: "DND5R.FlagsDiamondSoul",
    hint: "DND5R.FlagsDiamondSoulHint",
    section: "DND5R.Feats",
    type: Boolean
  },
  enhancedDualWielding: {
    name: "DND5R.FLAGS.EnhancedDualWielding.Name",
    hint: "DND5R.FLAGS.EnhancedDualWielding.Hint",
    section: "DND5R.Feats",
    type: Boolean
  },
  elvenAccuracy: {
    name: "DND5R.FlagsElvenAccuracy",
    hint: "DND5R.FlagsElvenAccuracyHint",
    section: "DND5R.RacialTraits",
    abilities: ["dex", "int", "wis", "cha"],
    type: Boolean
  },
  halflingLucky: {
    name: "DND5R.FlagsHalflingLucky",
    hint: "DND5R.FlagsHalflingLuckyHint",
    section: "DND5R.RacialTraits",
    type: Boolean
  },
  initiativeAdv: {
    name: "DND5R.FlagsInitiativeAdv",
    hint: "DND5R.FlagsInitiativeAdvHint",
    section: "DND5R.Feats",
    type: Boolean
  },
  initiativeAlert: {
    name: "DND5R.FlagsAlert",
    hint: "DND5R.FlagsAlertHint",
    section: "DND5R.Feats",
    type: Boolean
  },
  jackOfAllTrades: {
    name: "DND5R.FlagsJOAT",
    hint: "DND5R.FlagsJOATHint",
    section: "DND5R.Feats",
    type: Boolean
  },
  observantFeat: {
    name: "DND5R.FlagsObservant",
    hint: "DND5R.FlagsObservantHint",
    skills: ["prc", "inv"],
    section: "DND5R.Feats",
    type: Boolean
  },
  tavernBrawlerFeat: {
    name: "DND5R.FlagsTavernBrawler",
    hint: "DND5R.FlagsTavernBrawlerHint",
    section: "DND5R.Feats",
    type: Boolean
  },
  powerfulBuild: {
    name: "DND5R.FlagsPowerfulBuild",
    hint: "DND5R.FlagsPowerfulBuildHint",
    section: "DND5R.RacialTraits",
    type: Boolean
  },
  reliableTalent: {
    name: "DND5R.FlagsReliableTalent",
    hint: "DND5R.FlagsReliableTalentHint",
    section: "DND5R.Feats",
    type: Boolean
  },
  remarkableAthlete: {
    name: "DND5R.FlagsRemarkableAthlete",
    hint: "DND5R.FlagsRemarkableAthleteHint",
    abilities: ["str", "dex", "con"],
    section: "DND5R.Feats",
    type: Boolean
  },
  weaponCriticalThreshold: {
    name: "DND5R.FlagsWeaponCritThreshold",
    hint: "DND5R.FlagsWeaponCritThresholdHint",
    section: "DND5R.Feats",
    type: Number,
    placeholder: 20
  },
  spellCriticalThreshold: {
    name: "DND5R.FlagsSpellCritThreshold",
    hint: "DND5R.FlagsSpellCritThresholdHint",
    section: "DND5R.Feats",
    type: Number,
    placeholder: 20
  },
  meleeCriticalDamageDice: {
    name: "DND5R.FlagsMeleeCriticalDice",
    hint: "DND5R.FlagsMeleeCriticalDiceHint",
    section: "DND5R.Feats",
    type: Number,
    placeholder: 0
  }
};
preLocalize("characterFlags", { keys: ["name", "hint", "section"] });

/**
 * Flags allowed on actors. Any flags not in the list may be deleted during a migration.
 * @type {string[]}
 */
DND5R.allowedActorFlags = ["isPolymorphed", "originalActor"].concat(Object.keys(DND5R.characterFlags));

/* -------------------------------------------- */

/**
 * Different types of actor structures that groups can represent.
 * @enum {object}
 */
DND5R.groupTypes = {
  party: "DND5R.Group.TypeParty",
  encounter: "DND5R.Group.TypeEncounter"
};
preLocalize("groupTypes");

/* -------------------------------------------- */

/**
 * Configuration information for activity types.
 *
 * @typedef {object} ActivityTypeConfiguration
 * @property {typeof Activity} documentClass  The activity's document class.
 * @property {boolean} [configurable=true]    Whether the activity is editable via the UI.
 * @property {boolean} [hidden]               Should this activity type be hidden in the selection dialog?
 */
DND5R.activityTypes = {
  attack: {
    documentClass: activities.AttackActivity
  },
  cast: {
    documentClass: activities.CastActivity
  },
  check: {
    documentClass: activities.CheckActivity
  },
  damage: {
    documentClass: activities.DamageActivity
  },
  enchant: {
    documentClass: activities.EnchantActivity
  },
  forward: {
    documentClass: activities.ForwardActivity
  },
  heal: {
    documentClass: activities.HealActivity
  },
  order: {
    documentClass: activities.OrderActivity,
    configurable: false
  },
  save: {
    documentClass: activities.SaveActivity
  },
  summon: {
    documentClass: activities.SummonActivity
  },
  utility: {
    documentClass: activities.UtilityActivity
  }
};

/* -------------------------------------------- */

/**
 * Configuration information for advancement types.
 *
 * @typedef {object} AdvancementTypeConfiguration
 * @property {typeof Advancement} documentClass  The advancement's document class.
 * @property {Set<string>} validItemTypes        What item types this advancement can be used with.
 * @property {boolean} [hidden]                  Should this advancement type be hidden in the selection dialog?
 */

const _ALL_ITEM_TYPES = ["background", "class", "race", "subclass"];

/**
 * Advancement types that can be added to items.
 * @enum {AdvancementTypeConfiguration}
 */
DND5R.advancementTypes = {
  AbilityScoreImprovement: {
    documentClass: advancement.AbilityScoreImprovementAdvancement,
    validItemTypes: new Set(["background", "class", "race"])
  },
  HitPoints: {
    documentClass: advancement.HitPointsAdvancement,
    validItemTypes: new Set(["class"])
  },
  ItemChoice: {
    documentClass: advancement.ItemChoiceAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ItemGrant: {
    documentClass: advancement.ItemGrantAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ScaleValue: {
    documentClass: advancement.ScaleValueAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  Size: {
    documentClass: advancement.SizeAdvancement,
    validItemTypes: new Set(["race"])
  },
  Subclass: {
    documentClass: advancement.SubclassAdvancement,
    validItemTypes: new Set(["class"])
  },
  Trait: {
    documentClass: advancement.TraitAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  }
};

/* -------------------------------------------- */

/**
 * Default artwork configuration for each Document type and sub-type.
 * @type {Record<string, Record<string, string>>}
 */
DND5R.defaultArtwork = {
  Item: {
    background: "systems/dnd5r/icons/svg/items/background.svg",
    class: "systems/dnd5r/icons/svg/items/class.svg",
    consumable: "systems/dnd5r/icons/svg/items/consumable.svg",
    container: "systems/dnd5r/icons/svg/items/container.svg",
    equipment: "systems/dnd5r/icons/svg/items/equipment.svg",
    facility: "systems/dnd5r/icons/svg/items/facility.svg",
    feat: "systems/dnd5r/icons/svg/items/feature.svg",
    loot: "systems/dnd5r/icons/svg/items/loot.svg",
    race: "systems/dnd5r/icons/svg/items/race.svg",
    spell: "systems/dnd5r/icons/svg/items/spell.svg",
    subclass: "systems/dnd5r/icons/svg/items/subclass.svg",
    tool: "systems/dnd5r/icons/svg/items/tool.svg",
    weapon: "systems/dnd5r/icons/svg/items/weapon.svg"
  }
};

/* -------------------------------------------- */
/*  Rules                                       */
/* -------------------------------------------- */

/**
 * Configuration information for rule types.
 *
 * @typedef {object} RuleTypeConfiguration
 * @property {string} label         Localized label for the rule type.
 * @property {string} [references]  Key path for a configuration object that contains reference data.
 */

/**
 * Types of rules that can be used in rule pages and the &Reference enricher.
 * @enum {RuleTypeConfiguration}
 */
DND5R.ruleTypes = {
  rule: {
    label: "DND5R.Rule.Type.Rule",
    references: "rules"
  },
  ability: {
    label: "DND5R.Ability",
    references: "enrichmentLookup.abilities"
  },
  areaOfEffect: {
    label: "DND5R.AreaOfEffect.Label",
    references: "areaTargetTypes"
  },
  condition: {
    label: "DND5R.Rule.Type.Condition",
    references: "conditionTypes"
  },
  creatureType: {
    label: "DND5R.CreatureType",
    references: "creatureTypes"
  },
  damage: {
    label: "DND5R.DamageType",
    references: "damageTypes"
  },
  skill: {
    label: "DND5R.Skill",
    references: "enrichmentLookup.skills"
  },
  spellComponent: {
    label: "DND5R.SpellComponent",
    references: "itemProperties"
  },
  spellSchool: {
    label: "DND5R.SpellSchool",
    references: "enrichmentLookup.spellSchools"
  },
  spellTag: {
    label: "DND5R.SpellTag",
    references: "itemProperties"
  },
  weaponMastery: {
    label: "DND5R.WEAPON.Mastery.Label",
    references: "weaponMasteries"
  }
};
preLocalize("ruleTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * List of rules that can be referenced from enrichers.
 * @enum {string}
 */
DND5R.rules = {
  inspiration: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.nkEPI89CiQnOaLYh",
  carryingcapacity: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1PnjDBKbQJIVyc2t",
  push: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Hni8DjqLzoqsVjb6",
  lift: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Hni8DjqLzoqsVjb6",
  drag: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Hni8DjqLzoqsVjb6",
  encumbrance: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.JwqYf9qb6gJAWZKs",
  hiding: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.plHuoNdS0j3umPNS",
  passiveperception: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.988C2hQNyvqkdbND",
  time: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.eihqNjwpZ3HM4IqY",
  speed: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HhqeIiSj8sE1v1qZ",
  travelpace: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.eFAISahBloR2X8MX",
  forcedmarch: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.uQWQpRKQ1kWhuvjZ",
  difficultterrainpace: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hFW5BR2yHHwwgurD",
  climbing: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KxUXbMrUCIAhv4AF",
  swimming: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KxUXbMrUCIAhv4AF",
  longjump: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1U0myNrOvIVBUdJV",
  highjump: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.raPwIkqKSv60ELmy",
  falling: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kREHL5pgNUOhay9f",
  suffocating: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.BIlnr0xYhqt4TGsi",
  vision: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.O6hamUbI9kVASN8b",
  light: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.O6hamUbI9kVASN8b",
  lightlyobscured: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MAxtfJyvJV7EpzWN",
  heavilyobscured: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.wPFjfRruboxhtL4b",
  brightlight: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RnMokVPyKGbbL8vi",
  dimlight: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.n1Ocpbyhr6HhgbCG",
  darkness: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4dfREIDjG5N4fvxd",
  blindsight: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.sacjsfm9ZXnw4Tqc",
  darkvision: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ldmA1PbnEGVkmE11",
  tremorsense: "Compendium.dnd5r.rules.JournalEntry.eVtpEGXjA2tamEIJ.JournalEntryPage.8AIlZ95v54mL531X",
  truesight: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kNa8rJFbtaTM3Rmk",
  food: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jayo7XVgGnRCpTW0",
  water: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iIEI87J7lr2sqtb5",
  resting: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.dpHJXYLigIdEseIb",
  shortrest: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1s2swI3UsjUUgbt2",
  longrest: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6cLtjbHn4KV2R7G9",
  surprise: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.YmOt8HderKveA19K",
  initiative: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RcwElV4GAcVXKWxo",
  bonusaction: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.2fu2CXsDg8gQmGGw",
  reaction: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.2VqLyxMyMxgXe2wC",
  difficultterrain: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6tqz947qO8vPyxvD",
  beingprone: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.bV8akkBdVUUG21CO",
  droppingprone: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hwTLpAtSS5OqQsI1",
  standingup: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hwTLpAtSS5OqQsI1",
  crawling: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.VWG9qe8PUNtS28Pw",
  movingaroundothercreatures: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9ZWCknaXCOdhyOrX",
  flying: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.0B1fxfmw0a48tPsc",
  size: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HWHRQVBVG7K0RVVW",
  space: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.WIA5bs3P45PmO3OS",
  squeezing: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.wKtOwagDAiNfVoPS",
  attack: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.u4GQCzoBig20yRLj",
  castaspell: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.GLwN36E4WXn3Cp4Z",
  dash: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Jqn0MEvq6fduYNo6",
  disengage: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ZOPRfI48NyjoloEF",
  dodge: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.V1BkwK2HQrtEfa4d",
  help: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KnrD3u2AnQfmtOWj",
  hide: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.BXlHhE4ZoiFwiXLK",
  ready: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8xJzZVelP2AmQGfU",
  search: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5cn1ZTLgQq95vfZx",
  useanobject: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ljqhJx8Qxu2ivo69",
  attackrolls: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5wkqEqhbBD5kDeE7",
  unseenattackers: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5ZJNwEPlsGurecg5",
  unseentargets: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5ZJNwEPlsGurecg5",
  rangedattacks: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.S9aclVOCbusLE3kC",
  range: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HjKXuB8ndjcqOds7",
  rangedattacksinclosecombat: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qEZvxW0NM7ixSQP5",
  meleeattacks: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.GTk6emvzNxl8Oosl",
  reach: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hgZ5ZN4B3y7tmFlt",
  unarmedstrike: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.xJjJ4lhymAYXAOvO",
  opportunityattacks: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zeU0NyCyP10lkLg3",
  twoweaponfighting: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FQTS08uH74A6psL2",
  grappling: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Sl4bniSPSbyrakM2",
  escapingagrapple: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.2TZKy9YbMN3ZY3h8",
  movingagrappledcreature: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.x5bUdhAD7u5Bt2rg",
  shoving: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hrdqMF8hRXJdNzJx",
  cover: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.W7f7PcRubNUMIq2S",
  halfcover: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hv0J61IAfofuhy3Q",
  threequarterscover: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zAMStUjUrPV10dFm",
  totalcover: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.BKUAxXuPEzxiEOeL",
  hitpoints: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.PFbzoMBviI2DD9QP",
  damagerolls: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hd26AqKrCqtcQBWy",
  criticalhits: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.gFL1VhSEljL1zvje",
  damagetypes: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jVOgf7DNEhkzYNIe",
  damageresistance: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.v0WE18nT5SJO8Ft7",
  damagevulnerability: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.v0WE18nT5SJO8Ft7",
  healing: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ICketFqbFslqKiX9",
  instantdeath: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8BG05mA0mEzwmrHU",
  deathsavingthrows: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.JL8LePEJQYFdNuLL",
  deathsaves: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.JL8LePEJQYFdNuLL",
  stabilizing: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.r1CgZXLcqFop6Dlx",
  knockingacreatureout: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.uEwjgKGuCRTNADYv",
  temporaryhitpoints: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AW6HpJZHqxfESXaq",
  temphp: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AW6HpJZHqxfESXaq",
  mounting: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MFpyvUIdcBpC9kIE",
  dismounting: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MFpyvUIdcBpC9kIE",
  controllingamount: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.khmR2xFk1NxoQUgZ",
  underwatercombat: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6zVOeLyq4iMnrQT4",
  spelllevel: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.A6k5fS0kFqPXTW3v",
  knownspells: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oezg742GlxmEwT85",
  preparedspells: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oezg742GlxmEwT85",
  spellslots: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Su6wbb0O9UN4ZDIH",
  castingatahigherlevel: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4H9SLM95OCLfFizz",
  upcasting: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4H9SLM95OCLfFizz",
  castinginarmor: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.z4A8vHSK2pb8YA9X",
  cantrips: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jZD5mCTnMPJ9jW67",
  rituals: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FjWqT5iyJ89kohdA",
  castingtime: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zRVW8Tvyk6BECjZD",
  bonusactioncasting: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RP1WL9FXI3aknlxZ",
  reactioncasting: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.t62lCfinwU9H7Lji",
  longercastingtimes: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.gOAIRFCyPUx42axn",
  spellrange: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RBYPyE5z5hAZSbH6",
  components: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.xeHthAF9lxfn2tII",
  verbal: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6UXTNWMCQ0nSlwwx",
  spellduration: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9mp0SRsptjvJcq1e",
  instantaneous: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kdlgZOpRMB6bGCod",
  concentrating: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ow58p27ctAnr4VPH",
  spelltargets: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.G80AIQr04sxdVpw4",
  areaofeffect: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.wvtCeGHgnUmh0cuj",
  pointoforigin: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8HxbRceQQUAhyWRt",
  spellsavingthrows: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8DajfNll90eeKcmB",
  spellattackrolls: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qAFzmGZKhVvAEUF3",
  combiningmagicaleffects: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TMIN963hG773yZzO",
  schoolsofmagic: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TeF6CKMDRpYpsLd4",
  detectingtraps: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DZ7AhdQ94xggG4bj",
  disablingtraps: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DZ7AhdQ94xggG4bj",
  curingmadness: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6Icem7G3CICdNOkM",
  damagethreshold: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9LJZhqvCburpags3",
  poisontypes: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.I6OMMWUaYCWR9xip",
  contactpoison: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kXnCEqqGUWRZeZDj",
  ingestedpoison: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Y0vsJYSWeQcFpJ27",
  inhaledpoison: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KUyN4eK1xTBzXsjP",
  injurypoison: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.LUL48OUq6SJeMGc7",
  attunement: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.UQ65OwIyGK65eiOK",
  wearingitems: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iPB8mGKuQx3X0Z2J",
  wieldingitems: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iPB8mGKuQx3X0Z2J",
  multipleitemsofthesamekind: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.rLJdvz4Mde8GkEYQ",
  paireditems: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.rd9pCH8yFraSGN34",
  commandword: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HiXixxLYesv6Ff3t",
  consumables: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.UEPAcZFzQ5x196zE",
  itemspells: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DABoaeeF6w31UCsj",
  charges: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.NLRXcgrpRCfsA5mO",
  spellscroll: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.gi8IKhtOlBVhMJrN",
  creaturetags: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9jV1fFF163dr68vd",
  telepathy: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.geTidcFIYWuUvD2L",
  legendaryactions: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.C1awOyZh78pq1xmY",
  lairactions: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.07PtjpMxiRIhkBEp",
  regionaleffects: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.uj8W27NKFyzygPUd",
  disease: "Compendium.dnd5r.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oNQWvyRZkTOJ8PBq"
};

/* -------------------------------------------- */
/*  Token Rings Framework                       */
/* -------------------------------------------- */

/**
 * Token Rings configuration data
 *
 * @typedef {object} TokenRingsConfiguration
 * @property {Record<string, string>} effects        Localized names of the configurable ring effects.
 * @property {string} spriteSheet                    The sprite sheet json source.
 * @property {typeof BaseSamplerShader} shaderClass  The shader class definition associated with the token ring.
 */

/**
 * @type {TokenRingsConfiguration}
 */
DND5R.tokenRings = {
  effects: {
    RING_PULSE: "DND5R.TokenRings.Effects.RingPulse",
    RING_GRADIENT: "DND5R.TokenRings.Effects.RingGradient",
    BKG_WAVE: "DND5R.TokenRings.Effects.BackgroundWave"
  },
  spriteSheet: "systems/dnd5r/tokens/composite/token-rings.json",
  shaderClass: null
};
preLocalize("tokenRings.effects");

/* -------------------------------------------- */
/*  Sources                                     */
/* -------------------------------------------- */

/**
 * List of books available as sources.
 * @enum {string}
 */
DND5R.sourceBooks = {};
preLocalize("sourceBooks", { sort: true });

/* -------------------------------------------- */
/*  Themes                                      */
/* -------------------------------------------- */

/**
 * Themes that can be set for the system or on sheets.
 * @enum {string}
 */
DND5R.themes = {
  light: "SHEETS.DND5R.THEME.Light",
  dark: "SHEETS.DND5R.THEME.Dark"
};
preLocalize("themes");

/* -------------------------------------------- */
/*  Enrichment                                  */
/* -------------------------------------------- */

let _enrichmentLookup;
Object.defineProperty(DND5R, "enrichmentLookup", {
  get() {
    const slugify = value => value?.slugify().replaceAll("-", "");
    if ( !_enrichmentLookup ) {
      _enrichmentLookup = {
        abilities: foundry.utils.deepClone(DND5R.abilities),
        skills: foundry.utils.deepClone(DND5R.skills),
        spellSchools: foundry.utils.deepClone(DND5R.spellSchools),
        tools: foundry.utils.deepClone(DND5R.toolIds)
      };
      const addFullKeys = key => Object.entries(DND5R[key]).forEach(([k, v]) =>
        _enrichmentLookup[key][slugify(v.fullKey)] = { ...v, key: k }
      );
      addFullKeys("abilities");
      addFullKeys("skills");
      addFullKeys("spellSchools");
    }
    return _enrichmentLookup;
  },
  enumerable: true
});

/* -------------------------------------------- */

/**
 * Patch an existing config enum to allow conversion from string values to object values without
 * breaking existing modules that are expecting strings.
 * @param {string} key          Key within DND5R that has been replaced with an enum of objects.
 * @param {string} fallbackKey  Key within the new config object from which to get the fallback value.
 * @param {object} [options]    Additional options passed through to logCompatibilityWarning.
 */
function patchConfig(key, fallbackKey, options) {
  /** @override */
  function toString() {
    const message = `The value of CONFIG.DND5R.${key} has been changed to an object.`
      +` The former value can be acccessed from .${fallbackKey}.`;
    foundry.utils.logCompatibilityWarning(message, options);
    return this[fallbackKey];
  }

  Object.values(DND5R[key]).forEach(o => {
    if ( foundry.utils.getType(o) !== "Object" ) return;
    Object.defineProperty(o, "toString", {value: toString});
  });
}

/* -------------------------------------------- */

export default DND5R;
